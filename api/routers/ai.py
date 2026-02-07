from fastapi import APIRouter

router = APIRouter()

@router.post("/chatbot")
async def chatbot_message():
    """Handle chatbot message"""
    # TODO: Implement
    return {"message": "Chatbot endpoint"}

