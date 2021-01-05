# Generated by Django 2.2.12 on 2021-01-04 10:44

import django.contrib.postgres.fields.jsonb
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pr_watch', '0011_unique_constraints_watched_pr_squashed_0012_updated_unique_constraint'),
    ]

    operations = [
        migrations.AddField(
            model_name='watchedfork',
            name='ansible_appserver_playbook',
            field=models.CharField(blank=True, help_text='The path to the common appserver playbook to run on all appservers.', max_length=256, null=True),
        ),
        migrations.AddField(
            model_name='watchedfork',
            name='ansible_appserver_repo_url',
            field=models.URLField(blank=True, help_text='The repository to pull the default Ansible playbook from.', max_length=256, null=True),
        ),
        migrations.AddField(
            model_name='watchedfork',
            name='ansible_appserver_requirements_path',
            field=models.CharField(blank=True, help_text='The path to the requirements file for the common appserver playbook.', max_length=256, null=True),
        ),
        migrations.AddField(
            model_name='watchedfork',
            name='ansible_appserver_version',
            field=models.CharField(blank=True, help_text='The version of the Ansible playbook repository to checkout.', max_length=256, null=True),
        ),
        migrations.AddField(
            model_name='watchedfork',
            name='openstack_server_base_image',
            field=django.contrib.postgres.fields.jsonb.JSONField(blank=True, help_text='JSON openstack base image selector, e.g. {"name": "xenial-16.04-unmodified"} Defaults to settings.OPENSTACK_SANDBOX_BASE_IMAGE on server creation.', null=True),
        ),
    ]
