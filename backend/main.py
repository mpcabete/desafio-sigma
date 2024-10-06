from os import getenv
from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

from . import crud, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:3000"
]
print(getenv("PRODUCTION"))
if(getenv("PRODUCTION")=="true"):
    endpoint = getenv("FRONTEND_ENDPOINT")
    print(endpoint)
    if endpoint != None:
        origins = [
                endpoint
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
