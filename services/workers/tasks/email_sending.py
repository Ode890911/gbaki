"""
Email sending tasks
"""
from celery_app import celery_app
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from app.config import settings


@celery_app.task(name="send_email")
def send_email_task(to_email: str, subject: str, html_content: str, from_email: str = "noreply@gbakidigital.com"):
    """Send email using SendGrid"""
    try:
        message = Mail(
            from_email=from_email,
            to_emails=to_email,
            subject=subject,
            html_content=html_content,
        )
        
        sg = SendGridAPIClient(settings.SENDGRID_API_KEY)
        response = sg.send(message)
        
        return {
            "status_code": response.status_code,
            "message_id": response.headers.get("X-Message-Id"),
        }
    except Exception as e:
        print(f"Error sending email: {str(e)}")
        raise

