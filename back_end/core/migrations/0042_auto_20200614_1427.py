# Generated by Django 2.2.10 on 2020-06-14 13:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0041_auto_20200613_1444'),
    ]

    operations = [
        migrations.AlterField(
            model_name='client',
            name='photo',
            field=models.ImageField(default='http://127.0.0.1:8000/media/gallery/avatar.png', upload_to='gallery'),
        ),
    ]
