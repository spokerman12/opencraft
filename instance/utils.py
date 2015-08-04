# -*- coding: utf-8 -*-
#
# OpenCraft -- tools to aid developing and hosting free software projects
# Copyright (C) 2015 OpenCraft <xavier@opencraft.com>
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as
# published by the Free Software Foundation, either version 3 of the
# License, or (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
"""
Instance app - Util functions
"""

# Imports #####################################################################

from mock import Mock

import json
import socket


# Functions ###################################################################

def is_port_open(ip, port):
    """
    Check if the port is open on the provided ip
    """
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    return sock.connect_ex((ip, port)) == 0


def to_json(obj):
    """
    Convert an object to a JSON string
    """
    def dumper(obj2):
        """
        Serializer that avoids throwing exceptions on objects it can't serialize
        """
        if isinstance(obj2, Mock):
            return repr(obj2)
        try:
            return obj2.toJSON()
        except: #pylint: disable=bare-except
            return repr(obj2)

    if not hasattr(obj, 'toJSON'):
        obj = obj.__dict__
    return json.dumps(obj, sort_keys=True, indent=4, default=dumper)
