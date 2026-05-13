from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.routes import user, pg, booking

from app.models.user import User
from app.models.pg import PG
from app.models.booking import Booking

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(user.router)
app.include_router(pg.router)
app.include_router(booking.router)
@app.get("/")
def home():
    return {"message": "PG Booking Backend Running Successfully"}