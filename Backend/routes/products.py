from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models import Product,User
from fastapi import HTTPException
from schemas import ProductCreate, ProductUpdate
from utils.dependencies import get_current_admin

router = APIRouter()

@router.post("/products")
def create_product(
    product: ProductCreate,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin)
):

    new_product = Product(
            name=product.name,
            description=product.description,
            price=product.price,
            stock_quantity=product.stock_quantity,
            image_url=product.image_url,
            category=product.category
        )

    db.add(new_product)
    db.commit()

    return {"message": "Product Added Successfully"}

@router.get("/products")
def get_products(db: Session = Depends(get_db)):

    products = db.query(Product).all()

    return products
@router.get("/products/{product_id}")
def get_product(
    product_id: int,
    db: Session = Depends(get_db)
):

    product = db.query(Product).filter(
        Product.id == product_id
    ).first()

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    return product
@router.delete("/products/{product_id}")
def delete_product(
    product_id: int,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin)
):

    product = db.query(Product).filter(
        Product.id == product_id
    ).first()

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    db.delete(product)
    db.commit()

    return {
        "message": "Product deleted successfully"
    }

@router.put("/products/{product_id}")
def update_product(
    product_id: int,
    updated_product: ProductUpdate,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin)
):

    product = db.query(Product).filter(
        Product.id == product_id
    ).first()

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    product.name = updated_product.name
    product.description = updated_product.description
    product.price = updated_product.price
    product.stock_quantity = updated_product.stock_quantity
    product.image_url = updated_product.image_url
    product.category = updated_product.category

    db.commit()

    return {
        "message": "Product updated successfully"
    }
