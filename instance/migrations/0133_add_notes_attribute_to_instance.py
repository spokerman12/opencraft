# Generated by Django 2.2.12 on 2020-06-15 18:52

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ('instance', '0132_remove_instancereference_notes'),
    ]

    operations = [
        migrations.AddField(
            model_name='instancereference',
            name='notes',
            field=models.TextField(blank=True),
            preserve_default=False,
        ),
    ]