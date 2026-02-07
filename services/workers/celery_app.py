"""
Celery Application Configuration
"""
from celery import Celery
from app.config import settings

celery_app = Celery(
    "gbaki_digital",
    broker=settings.REDIS_URL,
    backend=settings.REDIS_URL,
    include=["tasks.llc_filing", "tasks.email_sending", "tasks.document_generation"],
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    task_track_started=True,
    task_time_limit=30 * 60,  # 30 minutes
    task_soft_time_limit=25 * 60,  # 25 minutes
)

