from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

from . import crud, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Cria nova sessão para cada request e garante que ela é finalizada
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# @app.post("/users/", response_model=schemas.User)
# def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
#     db_user = crud.get_user_by_email(db, email=user.email)
#     if db_user:
#         raise HTTPException(status_code=400, detail="Email already registered")
#     return crud.create_user(db=db, user=user)


# @app.get("/users/", response_model=list[schemas.User])
# def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     users = crud.get_users(db, skip=skip, limit=limit)
#     return users


# @app.get("/users/{user_id}", response_model=schemas.User)
# def read_user(user_id: int, db: Session = Depends(get_db)):
#     db_user = crud.get_user(db, user_id=user_id)
#     if db_user is None:
#         raise HTTPException(status_code=404, detail="User not found")
#     return db_user

@app.get("/produtos/", response_model=list[schemas.Produto])
def read_produtos(db: Session = Depends(get_db)):
    produtos = crud.get_produtos(db)
    return produtos

@app.post("/produtos/", response_model=schemas.Produto)
def create_produto( produto: schemas.ProdutoCreate, db: Session = Depends(get_db)):
    return crud.create_produto(db=db, produto=produto )

@app.delete("/produtos/", response_model=schemas.Produto)
def delete_produto( produtoID: int, db: Session = Depends(get_db)):
    return crud.delete_produto(db=db, produtoID=produtoID )

@app.put("/produtos/", response_model=schemas.Produto)
def update_produto( produto: schemas.ProdutoUpdate, db: Session = Depends(get_db)):
    return crud.update_produto(db=db, produto=produto )
