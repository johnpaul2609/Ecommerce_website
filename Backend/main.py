from fastapi import FastAPI
from database import engine
from models import Base
from routes.auth import router as auth_router
from routes.products import router as product_router
from routes.cart import router as cart_router
from routes.orders import router as order_router

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(auth_router)
app.include_router(product_router)
app.include_router(cart_router)
app.include_router(order_router)

@app.get("/")
def home():
    return {"message": "Ecommerce Backend Running"}