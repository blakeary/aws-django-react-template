from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import (
    ChangePasswordView,
    ForgotPasswordView,
    RegisterView,
    ResetPasswordView,
    UpdateEmailView,
    UpdateUserView,
    VerifyEmailView,
    VerifyNewEmailView,
)

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("verify-email/", VerifyEmailView.as_view(), name="verify-email"),
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("forgot-password/", ForgotPasswordView.as_view(), name="forgot-password"),
    path("reset-password/", ResetPasswordView.as_view(), name="reset-password"),
    path("change-password/", ChangePasswordView.as_view(), name="change-password"),
    path("update-user/", UpdateUserView.as_view(), name="update-user"),
    path("update-email/", UpdateEmailView.as_view(), name="update-email"),
    path("verify-new-email/", VerifyNewEmailView.as_view(), name="verify-new-email"),
]
