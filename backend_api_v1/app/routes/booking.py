from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import HTTPAuthorizationCredentials
from jose import jwt

from app.database import get_db
from app.models.booking import Booking
from app.models.pg import PG
from app.schemas.booking import BookingCreate
from app.core.security import security, SECRET_KEY, ALGORITHM
from app import models

router = APIRouter(
    prefix="/booking",
    tags=["Booking"]
)


# ✅ CREATE BOOKING
@router.post("/")
def create_booking(
    booking: BookingCreate,
    db: Session = Depends(get_db),
    credentials: HTTPAuthorizationCredentials = Depends(security)
):

    token = credentials.credentials

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        user_email = payload.get("sub")

    except:

        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    user = db.query(models.User).filter(
        models.User.email == user_email
    ).first()

    if not user:

        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    pg = db.query(PG).filter(
        PG.id == booking.pg_id
    ).first()

    if not pg:

        raise HTTPException(
            status_code=404,
            detail="PG not found"
        )

    # ✅ check room availability
    if pg.available_rooms <= 0:

        raise HTTPException(
            status_code=400,
            detail="No rooms available"
        )

    # ✅ reduce rooms
    pg.available_rooms -= 1

    # ✅ auto booked
    if pg.available_rooms == 0:

        pg.is_booked = True

    new_booking = Booking(
        user_id=user.id,
        pg_id=booking.pg_id,
        check_in=booking.check_in,
        check_out=booking.check_out
    )

    db.add(new_booking)

    db.commit()

    db.refresh(new_booking)

    return new_booking


# ✅ DELETE BOOKING
@router.delete("/{booking_id}")
def delete_booking(
    booking_id: int,
    db: Session = Depends(get_db)
):

    booking = db.query(Booking).filter(
        Booking.id == booking_id
    ).first()

    if not booking:

        raise HTTPException(
            status_code=404,
            detail="Booking not found"
        )

    pg = db.query(PG).filter(
        PG.id == booking.pg_id
    ).first()

    if pg:

        pg.available_rooms += 1

        pg.is_booked = False

    db.delete(booking)

    db.commit()

    return {
        "message": "Booking deleted successfully"
    }


# ✅ GET USER BOOKINGS
@router.get("/")
def get_bookings(
    db: Session = Depends(get_db),
    credentials: HTTPAuthorizationCredentials = Depends(security)
):

    token = credentials.credentials

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        user_email = payload.get("sub")

    except:

        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )

    user = db.query(models.User).filter(
        models.User.email == user_email
    ).first()

    if not user:

        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    bookings = db.query(Booking).filter(
        Booking.user_id == user.id
    ).all()

    return bookings