# Generated by Django 5.0.6 on 2024-06-29 15:35

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("accounts", "0004_customuser_reset_password_token"),
    ]

    operations = [
        migrations.AddField(
            model_name="customuser",
            name="verification_token",
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
