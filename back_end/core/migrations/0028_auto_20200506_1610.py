# Generated by Django 2.2.10 on 2020-05-06 16:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0027_auto_20200506_1418'),
    ]

    operations = [
        migrations.RenameField(
            model_name='productclient',
            old_name='additional_item_select',
            new_name='additional_items',
        ),
    ]
