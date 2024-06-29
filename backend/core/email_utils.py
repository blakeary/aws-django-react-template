# core/email_utils.py
from django.conf import settings
from django.core.mail import send_mail


def send_verification_email(user, token, email=None):
    verification_link = f"{settings.FRONTEND_URL}/verify-email?token={token}"
    subject = "Verify your email address"
    if email:
        message = f"Hi {user.username},\n\nPlease verify your new email address by clicking the link below:\n{verification_link}\n\nThank you!"
        recipient_list = [email]
    else:
        message = f"Hi {user.username},\n\nPlease verify your email address by clicking the link below:\n{verification_link}\n\nThank you!"
        recipient_list = [user.email]
    from_email = settings.DEFAULT_FROM_EMAIL
    send_mail(subject, message, from_email, recipient_list)


def send_reset_password_email(user, token):
    reset_link = f"{settings.FRONTEND_URL}/reset-password?token={token}"
    subject = "Reset your password"
    message = f"Hi {user.username},\n\nPlease reset your password by clicking the link below:\n{reset_link}\n\nThank you!"
    from_email = settings.DEFAULT_FROM_EMAIL
    recipient_list = [user.email]
    send_mail(subject, message, from_email, recipient_list)
