from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models.user import User, UserRole
from app.config import settings

# Create database session
engine = create_engine(settings.DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
db = SessionLocal()

def make_user_admin(email: str):
    try:
        user = db.query(User).filter(User.email == email).first()
        if not user:
            print(f"User with email {email} not found.")
            return

        # Update user to be admin
        user.is_superuser = True
        user.role = UserRole.ADMIN
        
        db.commit()
        db.refresh(user)
        
        print(f"Successfully made {email} an admin!")
        print(f"is_superuser: {user.is_superuser}")
        print(f"role: {user.role}")

    except Exception as e:
        print(f"Error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    make_user_admin("test@example.com")
