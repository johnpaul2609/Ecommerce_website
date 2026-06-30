from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models import User
from schemas import UserCreate, UserLogin
from utils.security import (
    hash_password,
    verify_password
)
from utils.dependencies import get_current_user
from fastapi.security import OAuth2PasswordRequestForm
from utils.jwt import create_access_token
import random

from utils.email_sender import send_otp_email
from utils.otp_storage import otp_storage
from pydantic import BaseModel
class ProfileUpdate(BaseModel):
    name: str
    phone: str | None = None
    address: str | None = None

router = APIRouter()

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(
    User.email == user.email
        ).first()

    if existing_user:
        return {"message": "Email already registered"}

    hashed_password = hash_password(user.password)

    new_user = User(
        name=user.name,
        email=user.email,
        password=hashed_password
    )

    db.add(new_user)
    db.commit()

    return {"message": "User Registered Successfully"} 

@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):

    db_user = db.query(User).filter(
        User.email == form_data.username
    ).first()

    if not db_user:
        return {"message": "User not found"}

    if not verify_password(
        form_data.password,
        db_user.password
    ):
        return {"message": "Invalid password"}

    token = create_access_token(
        {"sub": db_user.email}
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "is_admin": db_user.role=="admin"
    }

@router.get("/profile")
def profile(
    current_user: User = Depends(get_current_user)
):
    return {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email,
        "phone": current_user.phone,
        "address": current_user.address
    }

@router.put("/profile")
def update_profile(
    profile: ProfileUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    current_user.name = profile.name
    current_user.phone = profile.phone
    current_user.address = profile.address

    db.commit()

    return {
        "message": "Profile updated successfully"
    }

@router.post("/forgot-password")
def forgot_password(
    email: str,
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.email == email
    ).first()

    if not user:
        return {
            "message": "Email not found"
        }

    otp = str(
        random.randint(
            100000,
            999999
        )
    )

    otp_storage[email] = otp

    send_otp_email(
        email,
        otp
    )

    return {
        "message": "OTP Sent"
    }

@router.post("/verify-otp")
def verify_otp(
    email: str,
    otp: str
):

    if otp_storage.get(email) == otp:

        return {
            "message": "OTP Verified"
        }

    return {
        "message": "Invalid OTP"
    }
@router.post("/reset-password")
def reset_password(
    email: str,
    new_password: str,
    db: Session = Depends(get_db)
):

    user = db.query(User).filter(
        User.email == email
    ).first()

    if not user:
        return {
            "message": "User not found"
        }

    user.password = hash_password(
        new_password
    )

    db.commit()

    otp_storage.pop(
        email,
        None
    )

    return {
        "message": "Password Updated"
    }