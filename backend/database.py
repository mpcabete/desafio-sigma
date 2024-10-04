from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from dotenv import load_dotenv
from os import getenv

if(getenv("PRODUCTION")!=True):
    load_dotenv("../.env",verbose=True)

user = getenv("POSTGRES_USER")
password = getenv("POSTGRES_PASSWORD")
db_name = getenv("POSTGRES_DB")
endpoint = getenv("POSTGRES_ENDPOINT")

SQLALCHEMY_DATABASE_URL = f"postgresql://{user}:{password}@{endpoint}/{db_name}"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    echo=True
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


