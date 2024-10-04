from pydantic import BaseModel


class ProdutoBase(BaseModel): #propriedades genéricas para produto
    nome: str
    descricao: str | None = None


class ProdutoCreate(ProdutoBase): #propriedades adicionais ao criar produto
    pass


class Produto(ProdutoBase): #propriedades adicionais ao buscar produto
    id: int
    # owner_id: int

    # config para ele funcionar com o lazy loading das propriedades relacionais
    #class Config:
    #    orm_mode = True



# class UserBase(BaseModel):
#     email: str


# class UserCreate(UserBase):
#     password: str


# class User(UserBase):
#     id: int
#     is_active: bool
#     items: list[Item] = []

#     class Config:
#         orm_mode = True
