import logging

from core import messages
from core.tasks import send_reset_password_email_task, send_verification_email_task
from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from rest_framework import serializers

from .models import CustomUser

logger = logging.getLogger(__name__)

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data["email"],
            username=validated_data["username"],
            password=validated_data["password"],
        )
        send_verification_email_task.delay(user.id)
        return user


class VerifyEmailSerializer(serializers.Serializer):
    token = serializers.CharField()

    def validate(self, data):
        token = data.get("token")
        try:
            user = User.objects.get(verification_token=token)
        except User.DoesNotExist:
            raise serializers.ValidationError(messages.INVALID_TOKEN)
        return data

    def save(self, **kwargs):
        token = self.validated_data["token"]
        user = User.objects.get(verification_token=token)
        user.is_verified = True
        user.verification_token = None
        user.save()
        return user


class ForgotPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        try:
            user = CustomUser.objects.get(email=value)
        except CustomUser.DoesNotExist:
            raise serializers.ValidationError("Invalid email")
        return value

    def save(self, **kwargs):
        email = self.validated_data["email"]
        user = CustomUser.objects.get(email=email)
        send_reset_password_email_task.delay(user.id)


class ResetPasswordSerializer(serializers.Serializer):
    token = serializers.CharField()
    new_password = serializers.CharField(write_only=True)

    def validate(self, data):
        token = data.get("token")
        try:
            user = CustomUser.objects.get(reset_password_token=token)
        except CustomUser.DoesNotExist:
            raise serializers.ValidationError("Invalid token")

        # You can add additional checks for token validity here, like expiration time if needed

        return data

    def save(self, **kwargs):
        token = self.validated_data["token"]
        new_password = self.validated_data["new_password"]
        user = CustomUser.objects.get(reset_password_token=token)
        user.set_password(new_password)
        user.reset_password_token = None
        user.save()
        return user


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True)
    new_password = serializers.CharField(write_only=True)

    def __init__(self, *args, **kwargs):
        self.user = kwargs.pop("user")
        super().__init__(*args, **kwargs)

    def validate_old_password(self, value):
        logger.debug(f"Validating old password for user {self.user.username}")
        if not self.user.check_password(value):
            logger.debug("Old password does not match")
            raise serializers.ValidationError(messages.INVALID_OLD_PASSWORD)
        logger.debug("Old password matches")
        return value

    def validate_new_password(self, value):
        logger.debug(f"Validating new password for user {self.user.username}")
        # Add any custom password validation logic here if needed
        if len(value) < 8:
            logger.debug("New password is too short")
            raise serializers.ValidationError(
                "New password must be at least 8 characters long."
            )
        return value

    def save(self, **kwargs):
        new_password = self.validated_data["new_password"]
        logger.debug(f"Setting new password for user {self.user.username}")
        self.user.set_password(new_password)
        self.user.save()
        logger.debug("Password updated successfully")


class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["username"]


class UpdateEmailSerializer(serializers.Serializer):
    new_email = serializers.EmailField()

    def validate_new_email(self, value):
        if CustomUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email is already in use.")
        return value

    def save(self, **kwargs):
        user = self.context["request"].user
        user.new_email = self.validated_data["new_email"]
        user.save()
        send_verification_email_task.delay(user.id, email=user.new_email)
        return user
