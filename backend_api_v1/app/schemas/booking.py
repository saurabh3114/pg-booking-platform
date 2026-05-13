from pydantic import BaseModel
from datetime import date

class BookingCreate(BaseModel):
    pg_id: int
    check_in: date
    check_out: date

class BookingResponse(BaseModel):
    id: int
    user_id: int
    pg_id: int
    check_in: date
    check_out: date

    class Config:
        from_attributes = True