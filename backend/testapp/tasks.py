import time

from celery import shared_task


@shared_task
def test_task():
    print("Celery task started.")
    time.sleep(10)
    print("Celery task finished.")
