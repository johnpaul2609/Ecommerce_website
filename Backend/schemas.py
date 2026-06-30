from pydantic import BaseModel
from datetime import datetime


class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class ProductCreate(BaseModel):
    name: str
    description: str
    price: float
    stock_quantity: int
    image_url: str
    category: str

class ProductUpdate(BaseModel):
    name: str
    description: str
    price: float
    stock_quantity: int
    image_url: str
    category: str

class CartCreate(BaseModel):
    product_id: int
    quantity: int


class OrderResponse(BaseModel):
    id: int
    total_amount: float
    status: str
    created_at: datetime

    class Config:
        from_attributes = True
        

class WishlistCreate(BaseModel):
    product_id: int