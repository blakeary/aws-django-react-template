from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from testapp.tasks import test_task


class TestTaskView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        test_task.delay()
        return Response({"message": "Test task started."}, status=status.HTTP_200_OK)
