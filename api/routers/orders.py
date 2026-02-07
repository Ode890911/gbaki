from fastapi import APIRouter

router = APIRouter()

@router.post("/")
async def create_order():
    """Create new order"""
    # TODO: Implement
    return {"message": "Create order endpoint"}

