# Generated by Django 5.1.3 on 2024-11-29 05:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('restro', '0009_menu_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='menu',
            name='image',
        ),
    ]
