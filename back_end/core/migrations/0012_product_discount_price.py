# Generated by Django 2.2 on 2020-04-19 18:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0011_auto_20200419_1820'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='discount_price',
            field=models.FloatField(blank=True, null=True),
        ),
    ]