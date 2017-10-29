# -*- coding: utf-8 -*-
# Generated by Django 1.10.7 on 2017-10-29 03:51
from __future__ import unicode_literals

from django.db import migrations, models
import registration.models


class Migration(migrations.Migration):

    dependencies = [
        ('registration', '0005_add_design_fields_v2'),
    ]

    operations = [
        migrations.AlterField(
            model_name='betatestapplication',
            name='logo',
            field=models.ImageField(default='opencraft_logo_small.png', help_text="Your branding to be displayed throughout your instance. It should be 48px tall. If unset, OpenCraft's logo will be used.", null=True, upload_to='', validators=[registration.models.validate_logo_height]),
        ),
    ]