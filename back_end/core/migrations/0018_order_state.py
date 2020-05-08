# Generated by Django 2.2.10 on 2020-04-30 21:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0017_auto_20200430_1427'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='state',
            field=models.CharField(blank=True, choices=[('P', 'primary'), ('S', 'success'), ('D', 'danger'), ('W', 'warning')], max_length=1, null=True),
        ),
    ]
