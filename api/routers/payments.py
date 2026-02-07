from fastapi import APIRouter

router = APIRouter()

@router.post("/checkout")
async def create_checkout():
    """Create Stripe checkout session"""
    # TODO: Implement
    return {"message": "Checkout endpoint"}

