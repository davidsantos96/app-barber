# 🔌 API Documentation

## Base URL
```
https://app-barber-hmm9.onrender.com
```

## Endpoints

### 🔐 Autenticação

#### POST /auth/login
Realiza login do usuário.

**Request Body:**
```json
{
  "email": "usuario@email.com",
  "password": "senha123"
}
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "usuario@email.com"
  },
  "token": "jwt_token"
}
```

---

### 👥 Clientes

#### GET /clientes
Lista todos os clientes.

**Response:**
```json
[
  {
    "id": "uuid",
    "nome": "João Silva",
    "apelido": "João",
    "telefone": "(11)99999-9999",
    "avatarUrl": "https://ui-avatars.com/api/..."
  }
]
```

#### POST /clientes
Cria um novo cliente.

**Request Body:**
```json
{
  "nome": "João Silva",
  "apelido": "João",
  "telefone": "(11)99999-9999"
}
```

#### PUT /clientes/:id
Atualiza um cliente existente.

**Request Body:**
```json
{
  "nome": "João Santos",
  "apelido": "João",
  "telefone": "(11)88888-8888"
}
```

#### DELETE /clientes/:id
Remove um cliente.

---

### ✂️ Serviços

#### GET /servicos
Lista todos os serviços disponíveis.

**Response:**
```json
[
  {
    "id": "uuid",
    "nome": "Corte de Cabelo",
    "preco": 25.00,
    "duracao": 30
  }
]
```

#### POST /servicos
Cria um novo serviço.

**Request Body:**
```json
{
  "nome": "Corte + Barba",
  "preco": 35.00,
  "duracao": 45
}
```

---

### 📅 Agendamentos

#### GET /agendamentos
Lista todos os agendamentos.

**Query Parameters:**
- `data` - Filtrar por data (YYYY-MM-DD)
- `status` - Filtrar por status (agendado, cancelado, concluido)

**Response:**
```json
[
  {
    "id": "uuid",
    "clienteId": "uuid",
    "servicoId": "uuid",
    "servico": "Corte de Cabelo",
    "data": "2024-01-15",
    "horario": "14:30",
    "status": "agendado"
  }
]
```

#### POST /agendamentos
Cria um novo agendamento.

**Request Body:**
```json
{
  "clienteId": "uuid",
  "servicoId": "uuid",
  "servico": "Corte de Cabelo",
  "data": "2024-01-15",
  "horario": "14:30"
}
```

#### PUT /agendamentos/:id
Atualiza um agendamento.

**Request Body:**
```json
{
  "data": "2024-01-16",
  "horario": "15:00",
  "status": "agendado"
}
```

#### DELETE /agendamentos/:id
Cancela um agendamento.

---

### 📊 Dashboard

#### GET /dashboard
Retorna dados para o dashboard.

**Response:**
```json
{
  "agendamentosHoje": 5,
  "agendamentosAmanha": 3,
  "totalClientes": 150,
  "receitaDoMes": 2500.00
}
```

---

## Códigos de Status

| Código | Descrição |
|--------|-----------|
| 200 | Sucesso |
| 201 | Criado com sucesso |
| 400 | Requisição inválida |
| 401 | Não autorizado |
| 404 | Não encontrado |
| 500 | Erro interno do servidor |

## Exemplos de Uso

### JavaScript/Axios
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://app-barber-hmm9.onrender.com',
  timeout: 10000
});

// Listar clientes
const clientes = await api.get('/clientes');

// Criar agendamento
const novoAgendamento = await api.post('/agendamentos', {
  clienteId: 'uuid-cliente',
  servicoId: 'uuid-servico',
  servico: 'Corte de Cabelo',
  data: '2024-01-15',
  horario: '14:30'
});
```

### cURL
```bash
# Listar agendamentos
curl -X GET "https://app-barber-hmm9.onrender.com/agendamentos"

# Criar cliente
curl -X POST "https://app-barber-hmm9.onrender.com/clientes" \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "telefone": "(11)99999-9999"
  }'
```