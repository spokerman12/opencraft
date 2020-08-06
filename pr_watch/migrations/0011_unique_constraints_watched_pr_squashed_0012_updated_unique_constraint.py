# Generated by Django 2.2.12 on 2020-08-06 20:12

from django.db import migrations, models


class Migration(migrations.Migration):

    replaces = [('pr_watch', '0011_unique_constraints_watched_pr'), ('pr_watch', '0012_updated_unique_constraint')]

    dependencies = [
        ('pr_watch', '0010_auto_20200207_1556'),
    ]

    operations = [
        migrations.AlterField(
            model_name='watchedpullrequest',
            name='branch_name',
            field=models.CharField(db_index=True, default='master', max_length=255),
        ),
        migrations.AlterUniqueTogether(
            name='watchedpullrequest',
            unique_together={('github_organization_name', 'github_repository_name', 'branch_name', 'watched_fork', 'github_pr_url')},
        ),
    ]
