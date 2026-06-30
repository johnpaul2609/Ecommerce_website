from fastapi.responses import FileResponse
from reportlab.pdfgen import canvas
import os

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import Order, OrderItem, Cart, Product, User
from utils.dependencies import get_current_user
from models import Order, OrderItem, Cart, Product, User
from utils.dependencies import (
    get_current_user,
    get_current_admin
)
from sqlalchemy import func

router = APIRouter()
@router.put("/admin/orders/{order_id}/status")
def update_order_status(
    order_id: int,
    status: str,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin)
):

    order = db.query(Order).filter(
        Order.id == order_id
    ).first()

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    order.status = status

    db.commit()

    return {
        "message": "Order status updated",
        "status": order.status
    }


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
        total_amount=total_amount,
        status="Pending"
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

    order_data = []

    for order in orders:

        order_items = db.query(OrderItem).filter(
            OrderItem.order_id == order.id
        ).all()

        items = []

        for item in order_items:

                product = db.query(Product).filter(
                    Product.id == item.product_id
                ).first()

                items.append({
                    "product_name":
                        product.name if product else "Product Removed",
                    "quantity": item.quantity,
                    "price": item.price
                })

        order_data.append({
            "id": order.id,
            "total_amount": order.total_amount,
            "status": order.status,
            "created_at": order.created_at,
            "items": items
        })

    return order_data


@router.get("/admin/orders")
def get_all_orders(
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin)
):

    orders = db.query(Order).all()

    order_data = []

    for order in orders:

        user = db.query(User).filter(
            User.id == order.user_id
        ).first()

        order_items = db.query(OrderItem).filter(
            OrderItem.order_id == order.id
        ).all()

        items = []

        for item in order_items:

            product = db.query(Product).filter(
                Product.id == item.product_id
            ).first()

            items.append({
                 "product_name":
                    product.name if product else "Product Removed",
                "quantity": item.quantity,
                "price": item.price
            })

        order_data.append({
            "order_id": order.id,
            "customer": user.name,
            "customer_email": user.email,
            "status": order.status,
            "total_amount": order.total_amount,
            "created_at": order.created_at,
            "items": items
        })

    return order_data

@router.get("/orders/{order_id}")
def get_order_details(
    order_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    order = db.query(Order).filter(
        Order.id == order_id,
        Order.user_id == current_user.id
    ).first()

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    order_items = db.query(OrderItem).filter(
        OrderItem.order_id == order_id
    ).all()

    items = []

    for item in order_items:

        product = db.query(Product).filter(
            Product.id == item.product_id
        ).first()

        items.append({
            "product_name": product.name,
            "quantity": item.quantity,
            "price": item.price
        })

    return {
        "order_id": order.id,
        "total_amount": order.total_amount,
        "items": items
    }

@router.get("/admin/stats")
def get_admin_stats(
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin)
):

    total_users = db.query(User).count()

    total_products = db.query(Product).count()

    total_orders = db.query(Order).count()

    total_revenue = (
        db.query(func.sum(Order.total_amount))
        .scalar()
    ) or 0

    return {
        "total_users": total_users,
        "total_products": total_products,
        "total_orders": total_orders,
        "total_revenue": total_revenue
    }

@router.get("/invoice/{order_id}")
def download_invoice(
    order_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    order = db.query(Order).filter(
        Order.id == order_id,
        Order.user_id == current_user.id
    ).first()

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    order_items = db.query(OrderItem).filter(
        OrderItem.order_id == order_id
    ).all()

    filename = f"invoice_{order_id}.pdf"

    c = canvas.Canvas(filename)

    c.setFont("Helvetica-Bold", 18)
    c.drawString(200, 800, "Ecommerce Store")

    c.setFont("Helvetica", 12)
    c.drawString(50, 760, f"Invoice ID: {order.id}")
    c.drawString(50, 740, f"Status: {order.status}")
    c.drawString(
        50,
        720,
        f"Total Amount: Rs.{order.total_amount}"
    )

    y = 680

    c.drawString(
        50,
        y,
        "Products"
    )

    y -= 30

    for item in order_items:

        product = db.query(Product).filter(
            Product.id == item.product_id
        ).first()

        c.drawString(
            50,
            y,
            f"{product.name} | Qty: {item.quantity} | ₹{item.price}"
        )

        y -= 20

    c.save()

    return FileResponse(
        filename,
        media_type="application/pdf",
        filename=filename
    )