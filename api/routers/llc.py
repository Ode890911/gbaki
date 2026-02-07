from fastapi import APIRouter

router = APIRouter()

@router.post("/formation")
async def create_llc():
    """Submit LLC formation request"""
    # TODO: Implement
    return {"message": "LLC formation endpoint"}

