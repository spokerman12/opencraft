"""
Development environment settings
"""

from opencraft.settings import * #pylint: disable=wildcard-import,unused-wildcard-import

DEBUG = True

HUEY['consumer_options']['loglevel'] = logging.DEBUG
HUEY['always_eager'] = True

from opencraft.local_settings import * #pylint: disable=wildcard-import,unused-wildcard-import