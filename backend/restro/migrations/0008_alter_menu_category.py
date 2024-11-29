# Generated by Django 5.1.3 on 2024-11-28 06:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restro', '0007_order'),
    ]

    operations = [
        migrations.AlterField(
            model_name='menu',
            name='category',
            field=models.CharField(choices=[('main_course', 'Main Course'), ('beverage', 'Beverage'), ('salad', 'Salad')], default='main_course', max_length=20),
        ),
    ]
