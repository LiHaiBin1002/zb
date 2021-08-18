# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.AutoField(primary_key=True, verbose_name='ID', auto_created=True, serialize=False)),
                ('contractno', models.CharField(max_length=100)),
                ('projectname', models.CharField(max_length=100)),
                ('clientname', models.CharField(max_length=100)),
                ('salename', models.CharField(max_length=100)),
                ('department', models.CharField(max_length=100)),
                ('workdate', models.DateField(default='2018-06-26')),
                ('province', models.CharField(max_length=100)),
                ('city', models.CharField(max_length=100)),
                ('county', models.CharField(max_length=100)),
                ('workload', models.CharField(max_length=100)),
                ('othercost', models.TextField()),
                ('fixedcost', models.CharField(max_length=100)),
                ('workcontent', models.TextField()),
                ('toresult', models.TextField()),
                ('membername', models.CharField(max_length=100)),
                ('memberid', models.CharField(max_length=100)),
                ('request', models.TextField()),
            ],
            options={
                'db_table': 'project_info',
            },
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(primary_key=True, verbose_name='ID', auto_created=True, serialize=False)),
                ('username', models.CharField(max_length=100)),
                ('real_name', models.CharField(max_length=100)),
                ('password', models.CharField(max_length=100)),
                ('user_role', models.CharField(max_length=100)),
                ('position', models.CharField(max_length=100)),
                ('level', models.CharField(max_length=100)),
                ('status', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'user_info',
            },
        ),
        migrations.CreateModel(
            name='work',
            fields=[
                ('id', models.AutoField(primary_key=True, verbose_name='ID', auto_created=True, serialize=False)),
                ('contractno', models.CharField(max_length=100)),
                ('projectname', models.CharField(max_length=100)),
                ('clientname', models.CharField(max_length=100)),
                ('salename', models.CharField(max_length=100)),
                ('department', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'work',
            },
        ),
    ]
