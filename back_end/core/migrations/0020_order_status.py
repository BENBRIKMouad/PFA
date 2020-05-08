# Generated by Django 2.2.10 on 2020-04-30 21:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0019_remove_order_state'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='status',
            field=models.CharField(choices=[('ND', 'not delivered'), ('D', 'delivered'), ('Q', 'in queue'), ('W', 'in the way')], default='ND', max_length=2),
        ),
    ]
