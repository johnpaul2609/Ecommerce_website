from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import Cart, User, Product
from schemas import CartCreate
from utils.dependencies import get_current_user

router = APIRouter()


@router.post("/cart/add")
def add_to_cart(
    cart: CartCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    # Check product exists
    product = db.query(Product).filter(
        Product.id == cart.product_id
    ).first()

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    # Check stock
    if cart.quantity > product.stock_quantity:
        raise HTTPException(
            status_code=400,
            detail="Insufficient stock"
        )

    # Check if product already exists in cart
    existing_cart_item = db.query(Cart).filter(
        Cart.user_id == current_user.id,
        Cart.product_id == cart.product_id
    ).first()

    # Update quantity if already exists
    if existing_cart_item:
        existing_cart_item.quantity += cart.quantity
        db.commit()

        return {
            "message": "Cart updated successfully"
        }

    # Create new cart item
    new_cart_item = Cart(
        user_id=current_user.id,
        product_id=cart.product_id,
        quantity=cart.quantity
    )

    db.add(new_cart_item)
    db.commit()

    return {
        "message": "Product added to cart"
    }


@router.get("/cart")
def view_cart(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    cart_items = db.query(Cart).filter(
        Cart.user_id == current_user.id
    ).all()

    return cart_items