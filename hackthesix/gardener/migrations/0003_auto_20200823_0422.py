# Generated by Django 3.1 on 2020-08-23 04:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gardener', '0002_auto_20200823_0331'),
    ]

    operations = [
        migrations.AddField(
            model_name='gardeneritem',
            name='objectid',
            field=models.CharField(default='1', max_length=140),
        ),
        migrations.AlterField(
            model_name='gardeneritem',
            name='content',
            field=models.TextField(default='a plant'),
        ),
    ]