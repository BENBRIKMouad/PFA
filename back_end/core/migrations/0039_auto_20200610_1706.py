# Generated by Django 2.2.10 on 2020-06-10 16:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0038_auto_20200610_1548'),
    ]

    operations = [
        migrations.AddField(
            model_name='refund',
            name='in_queue',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='refund',
            name='accepted',
            field=models.BooleanField(default=False),
        ),
    ]
