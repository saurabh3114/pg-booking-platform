from pydantic import BaseModel

class PGCreate(BaseModel):

    name: str

    location: str

    price: int

    available_rooms: int

    image_url: str

class PGResponse(PGCreate):
    id: int
    owner_id: int   # 👈 add this

    class Config:
        orm_mode = True