# -*- coding: utf-8 -*-
# Generated by Django 1.10.7 on 2017-11-01 00:36
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('instance', '0095_auto_20170925_0108'),
    ]

    operations = [
        migrations.AddField(
            model_name='openedxappserver',
            name='configuration_theme_settings',
            field=models.TextField(blank=True, help_text='YAML vars for theme configuration'),
        ),
    ]
