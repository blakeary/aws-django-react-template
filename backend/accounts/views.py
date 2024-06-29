import logging

from core import log_messages, messages
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from .models import CustomUser
from .serializers import (
    ChangePasswordSerializer,
    ForgotPasswordSerializer,
    RegisterSerializer,
    ResetPasswordSerializer,
    UpdateEmailSerializer,
    UpdateUserSerializer,
    VerifyEmailSerializer,
)

logger = logging.getLogger(__name__)


class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]


class VerifyEmailView(generics.GenericAPIView):
    serializer_class = VerifyEmailSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"detail": messages.EMAIL_VERIFICATION_SUCCESS}, status=status.HTTP_200_OK
        )


class ForgotPasswordView(generics.GenericAPIView):
    serializer_class = ForgotPasswordSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"detail": messages.PASSWORD_RESET_EMAIL_SENT}, status=status.HTTP_200_OK
        )


class ResetPasswordView(generics.GenericAPIView):
    serializer_class = ResetPasswordSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"detail": messages.PASSWORD_RESET_SUCCESS}, status=status.HTTP_200_OK
        )


class ChangePasswordView(generics.GenericAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = ChangePasswordSerializer

    def get_object(self):
        return self.request.user

    def post(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data, user=self.object)
        logger.info(
            log_messages.CHANGE_PASSWORD_REQUEST_RECEIVED.format(
                username=self.object.username
            )
        )

        if serializer.is_valid():
            serializer.save()
            logger.info(log_messages.PASSWORD_CHANGE_SUCCESSFUL)
            return Response(
                {"detail": messages.PASSWORD_CHANGE_SUCCESS}, status=status.HTTP_200_OK
            )

        logger.warning(
            log_messages.PASSWORD_CHANGE_FAILED.format(errors=serializer.errors)
        )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateUserView(generics.UpdateAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = UpdateUserSerializer

    def get_object(self):
        return self.request.user


class UpdateEmailView(generics.GenericAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = UpdateEmailSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {"detail": messages.EMAIL_UPDATE_SUCCESS}, status=status.HTTP_200_OK
        )


class VerifyNewEmailView(generics.GenericAPIView):
    serializer_class = VerifyEmailSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        user.email = user.new_email
        user.new_email = None
        user.save()
        return Response(
            {"detail": messages.NEW_EMAIL_VERIFICATION_SUCCESS},
            status=status.HTTP_200_OK,
        )
