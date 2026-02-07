from fastapi import APIRouter

router = APIRouter()

@router.post("/create")
async def create_website():
    """Create website for business"""
    # TODO: Implement
    return {"message": "Website creation endpoint"}

