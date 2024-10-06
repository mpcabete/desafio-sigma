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
docker compose db
```

### Inicialize o frontend no modo desenvolvimento:

```bash
cd frontend
npm run start
```

### Inicialize o backend no modo desenvolvimento:

```bash
cd backend
source ./venv/bin/activate
fastapi dev main.py
```
