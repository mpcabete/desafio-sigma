from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import Column, Integer, String #, ForeignKey
# from sqlalchemy.orm import relationship

from .database import engine

class Base(DeclarativeBase):
    pass

# class User(Base):
#     __tablename__ = "users"

#     id = Column(Integer, primary_key=True)
#     username = Column(String, unique=True, index=True)
#     email = Column(String, unique=True, index=True)
#     hashed_password = Column(String)

#     items = relationship("Produto", back_populates="dono")


class Produto(Base):
    __tablename__ = "produtos"

    id = Column(Integer, primary_key=True)
    nome = Column(String, index=True)
    valor = Column(Integer, index=True) # em centavos
    descricao = Column(String)
    # dono = relationship("User", back_populates="produtos")

    
Base.metadata.create_all(engine) #TODO move to migration
