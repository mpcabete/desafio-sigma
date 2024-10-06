from sqlalchemy.orm import Session

from . import models, schemas




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
    

    db_item = db.query(models.Produto).get(produto.id) 
    if(db_item == None): 
        return #TODO handle if id does not exist

    for key,value in produto:
        if key == "id":
            continue
        setattr(db_item,key,value)

    db.commit()
    db.refresh(db_item)
    return db_item
