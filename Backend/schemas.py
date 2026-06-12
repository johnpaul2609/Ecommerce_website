from pydantic import BaseModel


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

class ProductUpdate(BaseModel):
    name: str
    description: str
    price: float
    stock_quantity: int
    image_url: str

class CartCreate(BaseModel):
    product_id: int
    quantity: int

class OrderResponse(BaseModel):
    message: str
    total_amount: float