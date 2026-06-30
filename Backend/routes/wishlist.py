from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from database import get_db
from models import Wishlist, Product, User
from schemas import WishlistCreate
from utils.dependencies import get_current_user

router = APIRouter()

@router.post("/wishlist/add")
def add_to_wishlist(
    wishlist: WishlistCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    product = db.query(Product).filter(
        Product.id == wishlist.product_id
    ).first()

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    existing = db.query(Wishlist).filter(
        Wishlist.user_id == current_user.id,
        Wishlist.product_id == wishlist.product_id
    ).first()

    if existing:
        return {"message": "Already in wishlist"}

    new_item = Wishlist(
        user_id=current_user.id,
        product_id=wishlist.product_id
    )

    db.add(new_item)
    db.commit()

    return {"message": "Added to wishlist"}


@router.get("/wishlist")
def view_wishlist(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    items = db.query(Wishlist).filter(
        Wishlist.user_id == current_user.id
    ).all()

    result = []

    for item in items:

        product = db.query(Product).filter(
            Product.id == item.product_id
        ).first()

        if product:
            result.append({
                "wishlist_id": item.id,
                "product_id": product.id,
                "name": product.name,
                "price": product.price,
                "image_url": product.image_url
            })

    return result

@router.delete("/wishlist/{wishlist_id}")
def remove_wishlist(
    wishlist_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    item = db.query(Wishlist).filter(
        Wishlist.id == wishlist_id,
        Wishlist.user_id == current_user.id
    ).first()

    if not item:
        raise HTTPException(
            status_code=404,
            detail="Wishlist item not found"
        )

    db.delete(item)
    db.commit()

    return {"message": "Removed from wishlist"}