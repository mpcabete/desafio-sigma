from sqlalchemy.orm import Session

from . import models, schemas


# def get_user(db: Session, user_id: int):
#     return db.query(models.User).filter(models.User.id == user_id).first()


# def get_user_by_email(db: Session, email: str):
#     return db.query(models.User).filter(models.User.email == email).first()


# def get_users(db: Session, skip: int = 0, limit: int = 100):
#     return db.query(models.User).offset(skip).limit(limit).all()


# def create_user(db: Session, user: schemas.UserCreate):
#     fake_hashed_password = user.password + "notreallyhashed"
#     db_user = models.User(email=user.email, hashed_password=fake_hashed_password)
#     db.add(db_user)
#     db.commit()
#     db.refresh(db_user)
#     return db_user


def get_produtos(db: Session):
    return db.query(models.Produto).order_by(models.Produto.id).all()


def create_produto(db: Session, produto: schemas.ProdutoCreate):
    #TODO add user_id as arg, and ownler_id = user_id
    db_item = models.Produto(**produto.dict()) #TODO corrigir deprecation
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


def delete_produto(db: Session, produtoID: int):
    #TODO add user_id as arg, and ownler_id = user_id
    db_item = db.get(models.Produto,produtoID)
    db.delete(db_item)
    db.commit()
    return db_item


def update_produto(db: Session, produto: schemas.ProdutoUpdate):
    #TODO add user_id as arg, and ownler_id = user_id
    

    db_item = db.query(models.Produto).get(produto.id) #TODO handle if id does not exist
    if(db_item == None): 
        return

    for key,value in produto:
        if key == "id":
            continue
        setattr(db_item,key,value)

    db.commit()
    db.refresh(db_item)
    return db_item
