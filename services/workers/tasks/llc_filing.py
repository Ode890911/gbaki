"""
LLC Formation tasks
"""
from celery_app import celery_app
from typing import Dict
import httpx
from app.config import settings


@celery_app.task(name="process_llc_formation")
def process_llc_formation_task(business_data: Dict):
    """Process LLC formation request"""
    # TODO: Integrate with ZenBusiness or Northwest Registered Agent API
    try:
        # Placeholder for actual API integration
        print(f"Processing LLC formation for: {business_data.get('business_name')}")
        
        # Simulate API call
        # response = httpx.post(
        #     f"{settings.ZENBUSINESS_API_URL}/llc/formation",
        #     headers={"Authorization": f"Bearer {settings.ZENBUSINESS_API_KEY}"},
        #     json=business_data,
        # )
        
        return {
            "status": "submitted",
            "business_name": business_data.get("business_name"),
            "formation_id": "placeholder-id",
        }
    except Exception as e:
        print(f"Error processing LLC formation: {str(e)}")
        raise

