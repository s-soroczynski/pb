from sqlalchemy.orm import Session

from app.public_toilets import models, schemas
from app.users.schemas import User


def get_public_toilet(db: Session, id: int):
    return db.query(models.PublicToilet).filter(models.PublicToilet.id == id).first()


def get_public_toilet_by_name(db: Session, name: str):
    return (
        db.query(models.PublicToilet).filter(models.PublicToilet.name == name).first()
    )


def get_public_toilets(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.PublicToilet).offset(skip).limit(limit).all()


def get_user_public_toilets(db: Session, user_id: int):
    return (
        db.query(models.PublicToilet)
        .filter(models.PublicToilet.user_id == user_id)
        .all()
    )


def create_public_toilet(db: Session, public_toilet: schemas.PublicToilet, user: User):
    db_public_toilet = models.PublicToilet(
        name=public_toilet.name,
        lat=public_toilet.lat,
        lng=public_toilet.lng,
        user=user,
        description=public_toilet.description,
    )
    db.add(db_public_toilet)
    db.commit()
    db.refresh(db_public_toilet)
    return db_public_toilet


def update_public_toilet(db: Session, id: int, item: schemas.PublicToilet):
    item_without_none = item.dict().copy()
    for key, value in item.dict().items():
        if value is None:
            del item_without_none[key]

    db.query(models.PublicToilet).filter(models.PublicToilet.id == id).update(item_without_none)
    db.commit()
    return get_public_toilet(db, id)
