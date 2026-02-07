import stripe
from sqlalchemy.orm import Session
from typing import Optional, Dict
from uuid import UUID
from app.config import settings
from app.models.order import Order
from app.models.user import User

# Initialize Stripe
stripe.api_key = settings.STRIPE_SECRET_KEY


class PaymentService:
    """Service for payment processing"""
    
    @staticmethod
    def create_payment_intent(
        order_id: UUID,
        amount: float,
        currency: str = "usd",
        metadata: Optional[Dict] = None
    ) -> Dict:
        """Create a Stripe payment intent"""
        try:
            intent = stripe.PaymentIntent.create(
                amount=int(amount * 100),  # Convert to cents
                currency=currency,
                metadata={
                    "order_id": str(order_id),
                    **(metadata or {})
                },
                automatic_payment_methods={
                    "enabled": True,
                },
            )
            
            return {
                "client_secret": intent.client_secret,
                "payment_intent_id": intent.id,
                "status": intent.status
            }
        except stripe.error.StripeError as e:
            raise Exception(f"Payment intent creation failed: {str(e)}")
    
    @staticmethod
    def confirm_payment(
        payment_intent_id: str
    ) -> Dict:
        """Confirm a payment intent"""
        try:
            intent = stripe.PaymentIntent.retrieve(payment_intent_id)
            
            if intent.status == "succeeded":
                return {
                    "success": True,
                    "payment_intent_id": intent.id,
                    "amount": intent.amount / 100,
                    "status": intent.status
                }
            else:
                return {
                    "success": False,
                    "status": intent.status,
                    "error": "Payment not completed"
                }
        except stripe.error.StripeError as e:
            raise Exception(f"Payment confirmation failed: {str(e)}")
    
    @staticmethod
    def update_order_payment_status(
        db: Session,
        order_id: UUID,
        payment_status: str,
        payment_intent_id: Optional[str] = None
    ) -> Optional[Order]:
        """Update order payment status"""
        order = db.query(Order).filter(Order.id == order_id).first()
        
        if not order:
            return None
        
        order.payment_status = payment_status
        
        # Store payment intent ID in metadata if needed
        # (You might want to add a payment_intent_id column to Order model)
        
        db.commit()
        db.refresh(order)
        
        return order
    
    @staticmethod
    def handle_webhook(
        payload: bytes,
        sig_header: str
    ) -> Dict:
        """Handle Stripe webhook"""
        try:
            event = stripe.Webhook.construct_event(
                payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
            )
            
            # Handle the event
            if event['type'] == 'payment_intent.succeeded':
                payment_intent = event['data']['object']
                # Update order payment status
                return {
                    "success": True,
                    "event_type": event['type'],
                    "payment_intent_id": payment_intent['id']
                }
            else:
                return {
                    "success": False,
                    "event_type": event['type'],
                    "message": "Unhandled event type"
                }
        except ValueError as e:
            raise Exception("Invalid payload")
        except stripe.error.SignatureVerificationError as e:
            raise Exception("Invalid signature")

