from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from jose import jwt, JWTError
from fastapi.security import HTTPAuthorizationCredentials

from app import models, schemas
from app.database import get_db
from app.core.security import (
    create_access_token,
    SECRET_KEY,
    ALGORITHM,
    hash_password,
    verify_password,
    security
)

router = APIRouter(prefix="/users")


# ---------------- SIGNUP ----------------
@router.post("/signup")
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):

    existing_user = db.query(models.User).filter(
        models.User.email == user.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    hashed_password = hash_password(user.password)

    new_user = models.User(
        name=user.name,
        email=user.email,
        password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User created successfully"
    }


# ---------------- LOGIN ----------------
@router.post("/login")
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):

    db_user = db.query(models.User).filter(
        models.User.email == user.email
    ).first()

    if not db_user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    try:

        password_valid = verify_password(
            user.password,
            db_user.password
        )

    except Exception as e:

        print("PASSWORD VERIFY ERROR:", e)

        raise HTTPException(
            status_code=500,
            detail="Password verification failed"
        )

    if not password_valid:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    access_token = create_access_token(
        {"sub": db_user.email}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }


# ---------------- AUTH FUNCTION ----------------
def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):

    token = credentials.credentials

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        email = payload.get("sub")

        if email is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid token"
            )

        return email

    except JWTError:

        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )


# ---------------- PROFILE ----------------
@router.get("/profile")
def get_profile(
    user_email: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    user = db.query(models.User).filter(
        models.User.email == user_email
    ).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return {
        "name": user.name,
        "email": user.email
    }
