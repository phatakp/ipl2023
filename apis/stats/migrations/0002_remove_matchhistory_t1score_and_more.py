# Generated by Django 4.1.5 on 2023-02-14 09:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stats', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='matchhistory',
            name='t1score',
        ),
        migrations.RemoveField(
            model_name='matchhistory',
            name='t2score',
        ),
        migrations.AddField(
            model_name='matchhistory',
            name='win_margin',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='matchhistory',
            name='win_type',
            field=models.CharField(blank=True, choices=[('runs', 'Runs'), ('wickets', 'Wickets'), ('superover', 'Superover')], max_length=10, null=True),
        ),
    ]
