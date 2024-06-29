from django.urls import path

from .views import TestTaskView

urlpatterns = [
    path("test-task/", TestTaskView.as_view(), name="test-task"),
]
