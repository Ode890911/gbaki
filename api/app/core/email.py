from typing import Optional, List, Dict
from app.config import settings
import logging

logger = logging.getLogger(__name__)

# Initialize Resend
try:
    import resend
    if settings.RESEND_API_KEY:
        resend.api_key = settings.RESEND_API_KEY
    else:
        resend = None
        logger.warning("Resend API key not configured")
except (ImportError, AttributeError) as e:
    resend = None
    logger.warning(f"Resend not available: {str(e)}")


class EmailService:
    """Email service using Resend"""
    
    @staticmethod
    async def send_email(
        to: List[str],
        subject: str,
        html: str,
        reply_to: Optional[str] = None,
        attachments: Optional[List] = None
    ) -> bool:
        """Send email via Resend"""
        if not resend or not settings.RESEND_API_KEY:
            logger.warning("Resend API key not configured, email not sent")
            return False
        
        try:
            params = {
                "from": f"{settings.FROM_NAME} <{settings.FROM_EMAIL}>",
                "to": to,
                "subject": subject,
                "html": html,
            }
            
            if reply_to:
                params["reply_to"] = reply_to
            
            if attachments:
                params["attachments"] = attachments
            
            # Resend API call - check if it's resend.Emails.send or resend.emails.send
            try:
                response = resend.Emails.send(params)
            except AttributeError:
                # Try alternative API format
                response = resend.emails.send(params)
            
            logger.info(f"Email sent successfully: {response}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to send email: {str(e)}")
            return False
    
    @staticmethod
    async def send_welcome_email(email: str, first_name: str, verification_token: str):
        """Send welcome email with verification link"""
        verification_link = f"{settings.FRONTEND_URL}/verify-email?token={verification_token}"
        
        html = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Gbaki Digital Solutions</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 0;">
                <tr>
                    <td align="center">
                        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                            
                            <!-- Header with gradient -->
                            <tr>
                                <td style="background: linear-gradient(135deg, #22c55e 0%, #10b981 100%); padding: 40px; text-align: center;">
                                    <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">
                                        Welcome to Gbaki Digital! 🎉
                                    </h1>
                                </td>
                            </tr>
                            
                            <!-- Content -->
                            <tr>
                                <td style="padding: 40px;">
                                    <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                        Hi {first_name},
                                    </p>
                                    
                                    <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                        Welcome to Gbaki Digital Solutions! We're thrilled to have you join hundreds of African entrepreneurs who are building their American dreams.
                                    </p>
                                    
                                    <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                                        To get started, please verify your email address by clicking the button below:
                                    </p>
                                    
                                    <!-- CTA Button -->
                                    <table width="100%" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td align="center" style="padding: 20px 0;">
                                                <a href="{verification_link}" style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #22c55e 0%, #10b981 100%); color: #ffffff; text-decoration: none; border-radius: 12px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(34, 197, 94, 0.3);">
                                                    Verify Email Address
                                                </a>
                                            </td>
                                        </tr>
                                    </table>
                                    
                                    <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 20px 0 0 0;">
                                        Or copy and paste this link into your browser:<br>
                                        <a href="{verification_link}" style="color: #22c55e; word-break: break-all;">{verification_link}</a>
                                    </p>
                                    
                                    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
                                    
                                    <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 10px 0;">
                                        <strong>What's Next?</strong>
                                    </p>
                                    
                                    <ul style="color: #374151; font-size: 16px; line-height: 1.8; margin: 0 0 20px 0; padding-left: 20px;">
                                        <li>Choose your business package</li>
                                        <li>Complete your profile information</li>
                                        <li>Meet your dedicated account manager</li>
                                        <li>Launch your business in 21 days!</li>
                                    </ul>
                                    
                                    <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0;">
                                        If you have any questions, our team is here to help. Just reply to this email!
                                    </p>
                                </td>
                            </tr>
                            
                            <!-- Footer -->
                            <tr>
                                <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                                    <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0;">
                                        Gbaki Digital Solutions<br>
                                        Elkridge, Maryland, USA
                                    </p>
                                    <p style="color: #6b7280; font-size: 12px; margin: 0;">
                                        © 2024 Gbaki Digital Solutions. All rights reserved.
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        """
        
        return await EmailService.send_email(
            to=[email],
            subject="Welcome to Gbaki Digital Solutions! 🎉",
            html=html
        )
    
    @staticmethod
    async def send_password_reset_email(email: str, first_name: str, reset_token: str):
        """Send password reset email"""
        reset_link = f"{settings.FRONTEND_URL}/reset-password?token={reset_token}"
        
        html = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Reset Your Password</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 0;">
                <tr>
                    <td align="center">
                        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                            
                            <!-- Header -->
                            <tr>
                                <td style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); padding: 40px; text-align: center;">
                                    <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">
                                        Reset Your Password
                                    </h1>
                                </td>
                            </tr>
                            
                            <!-- Content -->
                            <tr>
                                <td style="padding: 40px;">
                                    <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                        Hi {first_name},
                                    </p>
                                    
                                    <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                        We received a request to reset your password. Click the button below to create a new password:
                                    </p>
                                    
                                    <!-- CTA Button -->
                                    <table width="100%" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td align="center" style="padding: 20px 0;">
                                                <a href="{reset_link}" style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: #ffffff; text-decoration: none; border-radius: 12px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(59, 130, 246, 0.3);">
                                                    Reset Password
                                                </a>
                                            </td>
                                        </tr>
                                    </table>
                                    
                                    <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 20px 0 0 0;">
                                        Or copy and paste this link into your browser:<br>
                                        <a href="{reset_link}" style="color: #3b82f6; word-break: break-all;">{reset_link}</a>
                                    </p>
                                    
                                    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
                                    
                                    <p style="color: #ef4444; font-size: 14px; line-height: 1.6; margin: 0; padding: 15px; background-color: #fef2f2; border-left: 4px solid #ef4444; border-radius: 8px;">
                                        <strong>⚠️ Security Notice:</strong> This link expires in 1 hour. If you didn't request this password reset, please ignore this email or contact support if you have concerns.
                                    </p>
                                </td>
                            </tr>
                            
                            <!-- Footer -->
                            <tr>
                                <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                                    <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0;">
                                        Gbaki Digital Solutions<br>
                                        Elkridge, Maryland, USA
                                    </p>
                                    <p style="color: #6b7280; font-size: 12px; margin: 0;">
                                        © 2024 Gbaki Digital Solutions. All rights reserved.
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        """
        
        return await EmailService.send_email(
            to=[email],
            subject="Reset Your Password - Gbaki Digital",
            html=html
        )
    
    @staticmethod
    async def send_order_confirmation_email(
        email: str,
        first_name: str,
        order_number: str,
        package_type: str,
        amount: float
    ):
        """Send order confirmation email"""
        dashboard_link = f"{settings.FRONTEND_URL}/dashboard/orders"
        
        html = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Order Confirmation</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 0;">
                <tr>
                    <td align="center">
                        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                            
                            <!-- Header -->
                            <tr>
                                <td style="background: linear-gradient(135deg, #22c55e 0%, #10b981 100%); padding: 40px; text-align: center;">
                                    <h1 style="color: #ffffff; margin: 0 0 10px 0; font-size: 32px;">✅</h1>
                                    <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">
                                        Order Confirmed!
                                    </h1>
                                </td>
                            </tr>
                            
                            <!-- Content -->
                            <tr>
                                <td style="padding: 40px;">
                                    <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                        Hi {first_name},
                                    </p>
                                    
                                    <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                                        Thank you for choosing Gbaki Digital Solutions! We're excited to help you launch your business. Your order has been confirmed and we're already getting started.
                                    </p>
                                    
                                    <!-- Order Details Box -->
                                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 12px; overflow: hidden; margin-bottom: 30px;">
                                        <tr>
                                            <td style="padding: 20px;">
                                                <h3 style="color: #111827; margin: 0 0 15px 0; font-size: 18px;">Order Details</h3>
                                                <table width="100%" cellpadding="0" cellspacing="0">
                                                    <tr>
                                                        <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Order Number:</td>
                                                        <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: bold; text-align: right;">{order_number}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Package:</td>
                                                        <td style="padding: 8px 0; color: #111827; font-size: 14px; font-weight: bold; text-align: right;">{package_type.title()}</td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Amount:</td>
                                                        <td style="padding: 8px 0; color: #22c55e; font-size: 18px; font-weight: bold; text-align: right;">${amount:,.2f}</td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </table>
                                    
                                    <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 10px 0;">
                                        <strong>What Happens Next?</strong>
                                    </p>
                                    
                                    <ol style="color: #374151; font-size: 16px; line-height: 1.8; margin: 0 0 30px 0; padding-left: 20px;">
                                        <li>We'll assign a dedicated account manager (within 24 hours)</li>
                                        <li>You'll receive a welcome call to gather information</li>
                                        <li>We'll start your LLC formation immediately</li>
                                        <li>Track progress in real-time on your dashboard</li>
                                    </ol>
                                    
                                    <!-- CTA Button -->
                                    <table width="100%" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td align="center" style="padding: 20px 0;">
                                                <a href="{dashboard_link}" style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #22c55e 0%, #10b981 100%); color: #ffffff; text-decoration: none; border-radius: 12px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(34, 197, 94, 0.3);">
                                                    View Order Status
                                                </a>
                                            </td>
                                        </tr>
                                    </table>
                                    
                                    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
                                    
                                    <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0;">
                                        Questions? We're here to help! Reply to this email or visit our <a href="{settings.FRONTEND_URL}/support" style="color: #22c55e; text-decoration: none; font-weight: 600;">Support Center</a>.
                                    </p>
                                </td>
                            </tr>
                            
                            <!-- Footer -->
                            <tr>
                                <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                                    <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0;">
                                        Gbaki Digital Solutions<br>
                                        Elkridge, Maryland, USA
                                    </p>
                                    <p style="color: #6b7280; font-size: 12px; margin: 0;">
                                        © 2024 Gbaki Digital Solutions. All rights reserved.
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        """
        
        return await EmailService.send_email(
            to=[email],
            subject=f"Order Confirmation - {order_number}",
            html=html
        )
    
    @staticmethod
    async def send_order_status_update_email(
        email: str,
        first_name: str,
        order_number: str,
        old_status: str,
        new_status: str,
        message: str
    ):
        """Send order status update email"""
        dashboard_link = f"{settings.FRONTEND_URL}/dashboard/orders"
        
        status_messages = {
            "processing": "We're gathering your information",
            "llc_filed": "Your LLC documents have been filed! 🎉",
            "ein_approved": "Your EIN has been approved! 🎊",
            "website_building": "Your website is being designed",
            "website_review": "Your website is ready for review",
            "completed": "Your business is live! 🚀"
        }
        
        status_title = status_messages.get(new_status, "Order Status Update")
        
        html = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Order Update</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 0;">
                <tr>
                    <td align="center">
                        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                            
                            <!-- Header -->
                            <tr>
                                <td style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); padding: 40px; text-align: center;">
                                    <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">
                                        {status_title}
                                    </h1>
                                </td>
                            </tr>
                            
                            <!-- Content -->
                            <tr>
                                <td style="padding: 40px;">
                                    <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                        Hi {first_name},
                                    </p>
                                    
                                    <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                                        Great news! Your order <strong>{order_number}</strong> has been updated.
                                    </p>
                                    
                                    <!-- Status Change Box -->
                                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 12px; overflow: hidden; margin-bottom: 30px;">
                                        <tr>
                                            <td style="padding: 20px;">
                                                <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0;">Status updated from:</p>
                                                <p style="color: #374151; font-size: 18px; font-weight: bold; margin: 0 0 10px 0;">
                                                    {old_status.replace('_', ' ').title()} → {new_status.replace('_', ' ').title()}
                                                </p>
                                                <p style="color: #6b7280; font-size: 14px; margin: 0;">
                                                    {message}
                                                </p>
                                            </td>
                                        </tr>
                                    </table>
                                    
                                    <!-- CTA Button -->
                                    <table width="100%" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td align="center" style="padding: 20px 0;">
                                                <a href="{dashboard_link}" style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: #ffffff; text-decoration: none; border-radius: 12px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(139, 92, 246, 0.3);">
                                                    View Full Details
                                                </a>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            
                            <!-- Footer -->
                            <tr>
                                <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                                    <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0;">
                                        Gbaki Digital Solutions<br>
                                        Elkridge, Maryland, USA
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        """
        
        return await EmailService.send_email(
            to=[email],
            subject=f"Order Update - {order_number}",
            html=html
        )
    
    @staticmethod
    async def send_document_request_email(
        email: str,
        first_name: str,
        order_number: str,
        order_id: str
    ):
        """Send document request email"""
        dashboard_link = f"{settings.FRONTEND_URL}/dashboard/documents?order_id={order_id}"
        
        html = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Documents Needed</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 0;">
                <tr>
                    <td align="center">
                        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                            
                            <!-- Header -->
                            <tr>
                                <td style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); padding: 40px; text-align: center;">
                                    <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">
                                        Documents Needed 📄
                                    </h1>
                                </td>
                            </tr>
                            
                            <!-- Content -->
                            <tr>
                                <td style="padding: 40px;">
                                    <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                        Hi {first_name},
                                    </p>
                                    
                                    <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                        To proceed with your order <strong>#{order_number}</strong>, please upload the following documents:
                                    </p>
                                    
                                    <ul style="color: #374151; font-size: 16px; line-height: 1.8; margin: 0 0 30px 0; padding-left: 20px;">
                                        <li>Government-issued ID (passport or driver's license)</li>
                                        <li>Proof of address (utility bill or bank statement)</li>
                                        <li>Business formation documents (if applicable)</li>
                                    </ul>
                                    
                                    <!-- CTA Button -->
                                    <table width="100%" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td align="center" style="padding: 20px 0;">
                                                <a href="{dashboard_link}" style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: #ffffff; text-decoration: none; border-radius: 12px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(59, 130, 246, 0.3);">
                                                    Upload Documents
                                                </a>
                                            </td>
                                        </tr>
                                    </table>
                                    
                                    <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 20px 0 0 0;">
                                        Or visit: <a href="{dashboard_link}" style="color: #3b82f6; word-break: break-all;">{dashboard_link}</a>
                                    </p>
                                </td>
                            </tr>
                            
                            <!-- Footer -->
                            <tr>
                                <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                                    <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0;">
                                        Gbaki Digital Solutions<br>
                                        Elkridge, Maryland, USA
                                    </p>
                                    <p style="color: #6b7280; font-size: 12px; margin: 0;">
                                        © 2024 Gbaki Digital Solutions. All rights reserved.
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        """
        
        return await EmailService.send_email(
            to=[email],
            subject=f"Documents Needed for Order #{order_number}",
            html=html
        )
    
    @staticmethod
    async def send_document_approved_email(
        email: str,
        first_name: str,
        document_name: str
    ):
        """Send document approval email"""
        dashboard_link = f"{settings.FRONTEND_URL}/dashboard/documents"
        
        html = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document Approved</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 0;">
                <tr>
                    <td align="center">
                        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                            
                            <!-- Header -->
                            <tr>
                                <td style="background: linear-gradient(135deg, #22c55e 0%, #10b981 100%); padding: 40px; text-align: center;">
                                    <div style="width: 60px; height: 60px; background-color: rgba(255, 255, 255, 0.2); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px;">
                                        <span style="font-size: 30px; color: #ffffff;">✓</span>
                                    </div>
                                    <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">
                                        Document Approved!
                                    </h1>
                                </td>
                            </tr>
                            
                            <!-- Content -->
                            <tr>
                                <td style="padding: 40px;">
                                    <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                        Hi {first_name},
                                    </p>
                                    
                                    <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                        Great news! Your document <strong>{document_name}</strong> has been reviewed and approved.
                                    </p>
                                    
                                    <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                                        We're one step closer to completing your order!
                                    </p>
                                    
                                    <!-- CTA Button -->
                                    <table width="100%" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td align="center" style="padding: 20px 0;">
                                                <a href="{dashboard_link}" style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #22c55e 0%, #10b981 100%); color: #ffffff; text-decoration: none; border-radius: 12px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(34, 197, 94, 0.3);">
                                                    View Documents
                                                </a>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            
                            <!-- Footer -->
                            <tr>
                                <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                                    <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0;">
                                        Gbaki Digital Solutions<br>
                                        Elkridge, Maryland, USA
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        """
        
        return await EmailService.send_email(
            to=[email],
            subject="Document Approved ✓",
            html=html
        )
    
    @staticmethod
    async def send_milestone_completed_email(
        email: str,
        first_name: str,
        milestone_title: str,
        order_id: str
    ):
        """Send milestone completion email"""
        dashboard_link = f"{settings.FRONTEND_URL}/dashboard/orders/{order_id}"
        
        html = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Milestone Completed</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 0;">
                <tr>
                    <td align="center">
                        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                            
                            <!-- Header -->
                            <tr>
                                <td style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); padding: 40px; text-align: center;">
                                    <div style="width: 60px; height: 60px; background-color: rgba(255, 255, 255, 0.2); border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px;">
                                        <span style="font-size: 30px; color: #ffffff;">🎉</span>
                                    </div>
                                    <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">
                                        Milestone Completed!
                                    </h1>
                                </td>
                            </tr>
                            
                            <!-- Content -->
                            <tr>
                                <td style="padding: 40px;">
                                    <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                        Hi {first_name},
                                    </p>
                                    
                                    <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                        Exciting news! We've completed the <strong>{milestone_title}</strong> milestone for your order.
                                    </p>
                                    
                                    <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                                        You're making great progress! Check your dashboard to see what's next.
                                    </p>
                                    
                                    <!-- CTA Button -->
                                    <table width="100%" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td align="center" style="padding: 20px 0;">
                                                <a href="{dashboard_link}" style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: #ffffff; text-decoration: none; border-radius: 12px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(139, 92, 246, 0.3);">
                                                    View Progress
                                                </a>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            
                            <!-- Footer -->
                            <tr>
                                <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                                    <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0;">
                                        Gbaki Digital Solutions<br>
                                        Elkridge, Maryland, USA
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        """
        
        return await EmailService.send_email(
            to=[email],
            subject=f"Milestone Completed: {milestone_title}",
            html=html
        )
    
    @staticmethod
    async def send_support_reply_email(
        email: str,
        first_name: str,
        ticket_number: str,
        ticket_subject: str,
        ticket_id: str
    ):
        """Send support ticket reply email"""
        dashboard_link = f"{settings.FRONTEND_URL}/dashboard/support/{ticket_id}"
        
        html = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Support Reply</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 0;">
                <tr>
                    <td align="center">
                        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                            
                            <!-- Header -->
                            <tr>
                                <td style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 40px; text-align: center;">
                                    <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">
                                        New Reply on Your Ticket
                                    </h1>
                                </td>
                            </tr>
                            
                            <!-- Content -->
                            <tr>
                                <td style="padding: 40px;">
                                    <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                        Hi {first_name},
                                    </p>
                                    
                                    <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                        You have a new reply on your support ticket <strong>#{ticket_number}</strong>:
                                    </p>
                                    
                                    <div style="background-color: #f9fafb; border-left: 4px solid #f59e0b; padding: 20px; border-radius: 8px; margin: 20px 0;">
                                        <p style="color: #111827; font-size: 16px; font-weight: bold; margin: 0 0 10px 0;">
                                            {ticket_subject}
                                        </p>
                                    </div>
                                    
                                    <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                                        Our support team has responded to your inquiry. Click below to view the full reply.
                                    </p>
                                    
                                    <!-- CTA Button -->
                                    <table width="100%" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td align="center" style="padding: 20px 0;">
                                                <a href="{dashboard_link}" style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: #ffffff; text-decoration: none; border-radius: 12px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(245, 158, 11, 0.3);">
                                                    View Reply
                                                </a>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            
                            <!-- Footer -->
                            <tr>
                                <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                                    <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0;">
                                        Gbaki Digital Solutions<br>
                                        Elkridge, Maryland, USA
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        """
        
        return await EmailService.send_email(
            to=[email],
            subject=f"Reply on Ticket #{ticket_number}",
            html=html
        )


# Export singleton
email_service = EmailService()
