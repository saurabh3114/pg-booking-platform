from sqlalchemy import Column, Integer, String, ForeignKey
from app.database import Base
from sqlalchemy import Column, Integer, String, Boolean

class PG(Base):
    __tablename__ = "pgs"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    location = Column(String)
    price = Column(Integer)

    owner_id = Column(Integer, ForeignKey("users.id"))  # 🔥 LINK USER
    is_booked = Column(Boolean, default=False)
    available_rooms = Column(Integer, default=5)
    image_url = Column(String, nullable=True)
