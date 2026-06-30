from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import Cart, User, Product
from schemas import CartCreate
from utils.dependencies import get_current_user

router = APIRouter()

@router.put("/cart/{cart_id}")
def update_cart_quantity(
    cart_id: int,
    action: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    cart_item = db.query(Cart).filter(
        Cart.id == cart_id,
        Cart.user_id == current_user.id
    ).first()

    if not cart_item:
        raise HTTPException(
            status_code=404,
            detail="Cart item not found"
        )

    if action == "increase":
        cart_item.quantity += 1

    elif action == "decrease":

        if cart_item.quantity > 1:
            cart_item.quantity -= 1
        else:
            db.delete(cart_item)
            db.commit()

            return {
                "message": "Item removed from cart"
            }

    db.commit()

    return {
        "message": "Quantity updated successfully"
    }

@router.post("/cart/add")
def add_to_cart(
    cart: CartCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    product = db.query(Product).filter(
        Product.id == cart.product_id
    ).first()

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    if cart.quantity > product.stock_quantity:
        raise HTTPException(
            status_code=400,
            detail="Insufficient stock"
        )

    existing_cart_item = db.query(Cart).filter(
        Cart.user_id == current_user.id,
        Cart.product_id == cart.product_id
    ).first()

    if existing_cart_item:

        existing_cart_item.quantity += cart.quantity

        db.commit()

        return {
            "message": "Cart updated successfully"
        }

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

    cart_data = []

    for item in cart_items:

        product = db.query(Product).filter(
            Product.id == item.product_id
        ).first()

        
        if not product:
            db.delete(item)
            db.commit()
            continue

        cart_data.append({
            "cart_id": item.id,
            "product_id": product.id,
            "product_name": product.name,
            "price": product.price,
            "quantity": item.quantity,
            "image_url": product.image_url
        })

    return cart_data



@router.delete("/cart/{cart_id}")
def remove_from_cart(
    cart_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    cart_item = db.query(Cart).filter(
        Cart.id == cart_id,
        Cart.user_id == current_user.id
    ).first()

    if not cart_item:
        raise HTTPException(
            status_code=404,
            detail="Cart item not found"
        )

    db.delete(cart_item)
    db.commit()

    return {
        "message": "Item removed from cart"
    }