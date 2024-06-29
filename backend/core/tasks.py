# core/tasks.py
from accounts.models import CustomUser
from celery import shared_task
from core.email_utils import send_reset_password_email, send_verification_email
from django.utils.crypto import get_random_string


@shared_task
def send_verification_email_task(user_id, email=None):
    user = CustomUser.objects.get(id=user_id)
    token = get_random_string(length=32)
    user.verification_token = token
    user.save()
    if email:
        send_verification_email(user, token, email)
    else:
        send_verification_email(user, token)


@shared_task
def send_reset_password_email_task(user_id):
    user = CustomUser.objects.get(id=user_id)
    token = get_random_string(length=32)
    user.reset_password_token = token
    user.save()
    send_reset_password_email(user, token)
