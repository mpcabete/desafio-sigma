from sqlalchemy.orm import DeclarativeBase
from sqlalchemy import Column, Integer, String #, ForeignKey
# from sqlalchemy.orm import relationship

from .database import engine

class Base(DeclarativeBase):
    pass

class Produto(Base):
    __tablename__ = "produtos"

    id = Column(Integer, primary_key=True)
    nome = Column(String, index=True)
    valor = Column(Integer, index=True) # em centavos
    descricao = Column(String)
    # dono = relationship("User", back_populates="produtos")

    
Base.metadata.create_all(engine) #TODO move to migration
