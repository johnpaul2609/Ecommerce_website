from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import Order, OrderItem, Cart, Product, User
from utils.dependencies import get_current_user

router = APIRouter()


@router.post("/orders")
def place_order(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    cart_items = db.query(Cart).filter(
        Cart.user_id == current_user.id
    ).all()

    if not cart_items:
        raise HTTPException(
            status_code=400,
            detail="Cart is empty"
        )

    total_amount = 0

    for item in cart_items:

        product = db.query(Product).filter(
            Product.id == item.product_id
        ).first()

        total_amount += (
            product.price * item.quantity
        )

    new_order = Order(
        user_id=current_user.id,
        total_amount=total_amount
    )

    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    for item in cart_items:

        product = db.query(Product).filter(
            Product.id == item.product_id
        ).first()

        order_item = OrderItem(
            order_id=new_order.id,
            product_id=item.product_id,
            quantity=item.quantity,
            price=product.price
        )

        db.add(order_item)

    # Reduce stock
    for item in cart_items:

        product = db.query(Product).filter(
            Product.id == item.product_id
        ).first()

        product.stock_quantity -= item.quantity

    # Clear cart
    for item in cart_items:
        db.delete(item)

    db.commit()

    return {
        "message": "Order placed successfully",
        "total_amount": total_amount
    }


@router.get("/orders")
def get_orders(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    orders = db.query(Order).filter(
        Order.user_id == current_user.id
    ).all()

    return orders