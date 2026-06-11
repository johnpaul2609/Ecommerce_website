from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models import User
from schemas import UserCreate, UserLogin
from utils.security import (
    hash_password,
    verify_password
)
from utils.jwt import create_access_token

router = APIRouter()

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):

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
def login(user: UserLogin, db: Session = Depends(get_db)):

    db_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if not db_user:
        return {"message": "User not found"}

    if not verify_password(
        user.password,
        db_user.password
    ):
        return {"message": "Invalid password"}

    token = create_access_token(
    {"sub": db_user.email}
)

    return {
        "access_token": token,
        "token_type": "bearer"
    }