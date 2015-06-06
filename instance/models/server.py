"""
Instance app models - Server
"""
#pylint: disable=no-init


# Imports #####################################################################

import novaclient
import time

from pprint import pformat
from swampdragon.pubsub_providers.data_publisher import publish_data

from django.conf import settings
from django.db.models.signals import post_save
from django.db import models
from django.db.models import Q, query
from django_extensions.db.models import TimeStampedModel

from .. import openstack
from ..utils import is_port_open
from .logging import LoggerMixin


# Constants ###################################################################

SERVER_STATUS_CHOICES = (
    ('new', 'New - Not yet loaded'),
    ('started', 'Started - Running but not active yet'),
    ('active', 'Active - Running but not booted yet'),
    ('booted', 'Booted - Booted but not ready to be added to the application'),
    ('ready', 'Ready - Ready to be added to the application'),
    ('live', 'Live - Is actively used in the application and/or accessed by users'),
    ('stopping', 'Stopping - Stopping temporarily'),
    ('stopped', 'Stopped - Stopped temporarily'),
    ('terminating', 'Terminating - Stopping forever'),
    ('terminated', 'Terminated - Stopped forever'),
)


# Models ######################################################################

class ServerQuerySet(query.QuerySet):
    '''
    Additional methods for server querysets
    Also used as the standard manager for the Server model (`Server.objects`)
    '''
    def terminate(self, *args, **kwargs):
        qs = self.filter(~Q(status='terminated'), *args, **kwargs)
        for server in qs:
            server.terminate()
        return qs


class Server(TimeStampedModel, LoggerMixin):
    '''
    A single server VM
    '''
    status = models.CharField(max_length=10, default='new', choices=SERVER_STATUS_CHOICES, db_index=True)

    objects = ServerQuerySet().as_manager()

    class Meta:
        abstract = True

    def _set_status(self, status):
        self.status = status
        self.log('info', 'Changed status for {}: {}'.format(self, self.status))
        self.save()
        return self.status

    def sleep_until_status(self, target_status):
        self.log('info', 'Waiting for server {} to reach the {} status...'.format(self, target_status))
        while True:
            self.update_status()
            if self.status == target_status:
                break
            time.sleep(1)
        return self.status

    @staticmethod
    def on_post_save(sender, instance, created, **kwargs):
        publish_data('notification', {
            'type': 'server_update',
            'server_pk': instance.pk,
        })


class OpenStackServer(Server):
    '''
    A Server VM hosted on an OpenStack cloud
    '''
    instance = models.ForeignKey('OpenEdXInstance', related_name='server_set')
    openstack_id = models.CharField(max_length=250, db_index=True)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.nova = openstack.get_nova_client()

    def __str__(self):
        if self.openstack_id:
            return self.openstack_id
        else:
            return 'New OpenStack Server'

    @property
    def os_server(self):
        if not self.openstack_id:
            assert self.status == 'new'
            self.start()
        return self.nova.servers.get(self.openstack_id)

    @property
    def public_ip(self):
        '''
        Return one of the public address(es)
        '''
        if not self.openstack_id:
            return None

        public_addr = openstack.get_server_public_address(self.os_server)
        if not public_addr:
            return None

        return public_addr['addr']

    def update_status(self):
        '''
        Refresh the status by querying the openstack server via nova

        TODO: Check when server is stopped or terminated
        '''
        # Ensure the 'started' mode by getting the server instance from openstack
        os_server = self.os_server
        self.log('debug', 'Updating status for {} from nova (currently {}):\n{}'\
                          .format(self, self.status, pformat(os_server.__dict__)))

        if self.status == 'started':
            #pylint: disable=protected-access
            self.log('debug', 'Server {}: loaded="{}" status="{}"'\
                              .format(self, os_server._loaded, os_server.status))
            if os_server._loaded and os_server.status == 'ACTIVE':
                self._set_status('active')

        if self.status == 'active':
            if is_port_open(self.public_ip, 22):
                self._set_status('booted')

        return self.status

    def start(self):
        '''
        Get a server instance started and an openstack_id assigned

        TODO: Add handling of quota limitations & waiting list
        TODO: Create the key dynamically
        '''
        self.log('info', 'Starting server {} (status={})...'.format(self, self.status))
        if self.status == 'new':
            os_server = openstack.create_server(self.nova,
                self.instance.sub_domain,
                settings.OPENSTACK_SANDBOX_FLAVOR,
                settings.OPENSTACK_SANDBOX_BASE_IMAGE,
                key_name=settings.OPENSTACK_SANDBOX_SSH_KEYNAME,
            )
            self.openstack_id = os_server.id
            self.log('info', 'Server {} got assigned OpenStack id {}'.format(self, self.openstack_id))
            self._set_status('started')
        else:
            raise NotImplementedError

    def terminate(self):
        self.log('info', 'Terminating server {} (status={})...'.format(self, self.status))
        if self.status == 'terminated':
            return
        elif self.status == 'new':
            self._set_status('terminated')
            return

        try:
            self.os_server.delete()
        except novaclient.exceptions.NotFound:
            self.log('exception', 'Error while attempting to terminate server {}: could not find OS server'\
                                  .format(self))

        self._set_status('terminated')

post_save.connect(Server.on_post_save, sender=OpenStackServer)