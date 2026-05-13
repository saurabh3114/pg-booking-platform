from sqlalchemy import Column, Integer, ForeignKey, Date
from app.database import Base

class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"))
    pg_id = Column(Integer, ForeignKey("pgs.id"))

    check_in = Column(Date)
    check_out = Column(Date)