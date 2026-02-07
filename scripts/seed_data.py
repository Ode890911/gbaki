"""
Seed initial data for development
"""
import asyncio
import sys
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from sqlalchemy import create_engine, text
from app.config import settings


def seed_packages():
    """Seed initial packages"""
    engine = create_engine(settings.DATABASE_URL)
    
    packages = [
        {
            "name": "Essential Package",
            "slug": "essential",
            "tier": "starter",
            "price": 997.00,
            "description": "Perfect for getting started with your business",
            "services": {
                "llc_formation": True,
                "ein": True,
                "basic_website": True,
                "virtual_phone": True,
                "business_bank_account": True,
            },
            "features": [
                "LLC Formation (all 50 states)",
                "EIN Registration",
                "5-page Basic Website",
                "Virtual Phone Number",
                "Business Bank Account Setup",
                "Registered Agent (1 year)",
            ],
        },
        {
            "name": "Professional Package",
            "slug": "professional",
            "tier": "growth",
            "price": 2497.00,
            "description": "Everything you need to launch and grow",
            "services": {
                "llc_formation": True,
                "ein": True,
                "professional_website": True,
                "virtual_phone": True,
                "business_bank_account": True,
                "branding": True,
                "seo_setup": True,
                "customer_support": True,
            },
            "features": [
                "Everything in Essential",
                "10-15 Page Professional Website",
                "Logo & Brand Identity",
                "SEO Setup",
                "Social Media Setup",
                "Email Marketing Setup",
                "Customer Support (3 months)",
            ],
        },
        {
            "name": "Enterprise Package",
            "slug": "enterprise",
            "tier": "premium",
            "price": 4997.00,
            "description": "Complete business solution with AI and marketing",
            "services": {
                "llc_formation": True,
                "ein": True,
                "premium_website": True,
                "virtual_phone": True,
                "business_bank_account": True,
                "branding": True,
                "seo_setup": True,
                "ai_chatbot": True,
                "ai_content_generator": True,
                "marketing_automation": True,
                "business_coaching": True,
            },
            "features": [
                "Everything in Professional",
                "Unlimited Page Premium Website",
                "AI Chatbot Setup",
                "AI Content Generator",
                "Marketing Automation",
                "Business Coaching (3 months)",
                "Priority Support",
                "Dedicated Success Manager",
            ],
        },
    ]
    
    with engine.connect() as conn:
        for package in packages:
            conn.execute(
                text("""
                    INSERT INTO packages (name, slug, tier, price, description, services, features)
                    VALUES (:name, :slug, :tier, :price, :description, :services::jsonb, :features)
                    ON CONFLICT (slug) DO NOTHING
                """),
                package
            )
        conn.commit()
    
    print("✅ Packages seeded successfully")


if __name__ == "__main__":
    print("🌱 Seeding database...")
    seed_packages()
    print("✅ Seeding complete!")

