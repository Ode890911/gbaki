from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_packages():
    """Get all available packages"""
    # TODO: Implement
    return {"message": "Packages endpoint"}

