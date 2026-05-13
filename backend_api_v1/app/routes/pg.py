from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import HTTPAuthorizationCredentials
from jose import jwt
from fastapi import HTTPException

from app.database import get_db
from app.models.pg import PG
from app.schemas.pg import PGCreate
from app.core.security import security, SECRET_KEY, ALGORITHM
from app import models

router = APIRouter(prefix="/pg", tags=["PG"])


# ✅ CREATE PG
@router.post("/")
def create_pg(
    pg: PGCreate,
    db: Session = Depends(get_db),
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    token = credentials.credentials

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_email = payload.get("sub")
    except:
        raise HTTPException(status_code=401, detail="Invalid token")

    # get logged-in user
    user = db.query(models.User).filter(models.User.email == user_email).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # create PG with owner
    new_pg = PG(
    name=pg.name,
    location=pg.location,
    price=pg.price,
    available_rooms=pg.available_rooms,
    image_url=pg.image_url,
    owner_id=user.id
)

    db.add(new_pg)
    db.commit()
    db.refresh(new_pg)

    return new_pg


# ✅ GET ALL PG
@router.get("/")
def get_pgs(db: Session = Depends(get_db)):
    return db.query(PG).all()


# ✅ UPDATE PG
@router.put("/{pg_id}")
def update_pg(
    pg_id: int,
    updated_pg: PGCreate,
    db: Session = Depends(get_db),
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    token = credentials.credentials

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_email = payload.get("sub")
    except:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = db.query(models.User).filter(models.User.email == user_email).first()

    pg = db.query(PG).filter(PG.id == pg_id).first()

    if not pg:
        raise HTTPException(status_code=404, detail="PG not found")

    # owner verification
    if pg.owner_id != user.id:
        raise HTTPException(status_code=403, detail="Not authorized")

    # update PG
    pg.name = updated_pg.name
    pg.location = updated_pg.location
    pg.price = updated_pg.price
    pg.available_rooms = updated_pg.available_rooms

    pg.image_url = updated_pg.image_url

    db.commit()
    db.refresh(pg)

    return {
        "message": "PG updated successfully",
        "data": pg
    }


# ✅ DELETE PG
@router.delete("/{pg_id}")
def delete_pg(
    pg_id: int,
    db: Session = Depends(get_db),
    credentials: HTTPAuthorizationCredentials = Depends(security)
):
    token = credentials.credentials

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_email = payload.get("sub")
    except:
        raise HTTPException(status_code=401, detail="Invalid token")

    user = db.query(models.User).filter(models.User.email == user_email).first()

    pg = db.query(PG).filter(PG.id == pg_id).first()

    if not pg:
        raise HTTPException(status_code=404, detail="PG not found")

    # owner verification
    if pg.owner_id != user.id:
        raise HTTPException(status_code=403, detail="Not authorized")

    db.delete(pg)
    db.commit()

    return {
        "message": "PG deleted successfully"
    }
# ✅ GET SINGLE PG
@router.get("/{pg_id}")
def get_single_pg(
    pg_id: int,
    db: Session = Depends(get_db)
):

    pg = db.query(PG).filter(PG.id == pg_id).first()

    if not pg:
        raise HTTPException(
            status_code=404,
            detail="PG not found"
        )

    return pg