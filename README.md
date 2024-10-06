# Desafio Sigma

## Inicialização para produção

### Crie um .env utilizando o arquivo .env.example como base:

```bash
cp .env.example .env
```

### Construa e inicialize os conteiners com o docker compose:


```bash
docker compose up
```

## Inicialização para Desenvolvimento

### inicialize o banco de dados:

```bash
docker compose up db
```

### Inicialize o frontend no modo desenvolvimento:

```bash
cd frontend
echo 'REACT_APP_BACKEND_ENDPOINT="http://127.0.0.1:8000"' > .env
npm install
npm run start
```

### Inicialize o backend no modo desenvolvimento:

```bash
cd backend
python3 -m venv ./venv
source ./venv/bin/activate
pip3 install -r requirements.txt
fastapi dev main.py
```
