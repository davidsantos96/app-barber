# 🚀 Guia de Deploy

## 📋 Visão Geral

Este guia detalha o processo completo de deploy do **App Barber** em produção, incluindo frontend, backend e configurações de banco de dados.

## 🔧 Pré-requisitos

- Node.js 18+
- Conta no Vercel (frontend)
- Conta no Render ou Railway (backend)
- Projeto configurado no Supabase

## 🌐 Deploy do Frontend (Vercel)

### 1. **Preparação**

Certifique-se que o projeto está buildando corretamente:
```bash
npm run build
npm run preview
```

### 2. **Configuração das Variáveis de Ambiente**

Crie um arquivo `.env.production`:
```env
VITE_API_URL=https://sua-api.onrender.com
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua_supabase_anon_key
```

### 3. **Deploy via Vercel CLI**

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### 4. **Deploy via GitHub (Recomendado)**

1. **Conectar repositório** no dashboard do Vercel
2. **Configurar build settings**:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. **Adicionar variáveis de ambiente** no dashboard
4. **Deploy automático** a cada push na branch main

### 5. **Configurações Avançadas**

**vercel.json**:
```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

## 🖥️ Deploy do Backend (Render)

### 1. **Preparação**

Certifique-se que o backend está funcionando:
```bash
cd backend
npm run dev
```

### 2. **Configuração do Dockerfile (Opcional)**

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3001

CMD ["npm", "start"]
```

### 3. **Deploy no Render**

1. **Criar novo Web Service** no dashboard do Render
2. **Conectar repositório GitHub**
3. **Configurar build settings**:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
4. **Configurar variáveis de ambiente**

### 4. **Variáveis de Ambiente (Backend)**

```env
NODE_ENV=production
PORT=3001
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SERVICE_KEY=sua_service_key
CORS_ORIGIN=https://seu-frontend.vercel.app
```

### 5. **Health Check**

Adicione uma rota de health check:
```typescript
// src/routes/health.ts
import { Router } from 'express';

const router = Router();

router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

export default router;
```

## 🗄️ Configuração do Banco de Dados (Supabase)

### 1. **Setup do Projeto**

1. **Criar projeto** no Supabase
2. **Configurar autenticação**
3. **Criar tabelas necessárias**

### 2. **Schema SQL**

```sql
-- Tabela de clientes
CREATE TABLE clientes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  apelido VARCHAR(100),
  telefone VARCHAR(20) NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de serviços
CREATE TABLE servicos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  preco DECIMAL(10,2) NOT NULL,
  duracao INTEGER NOT NULL, -- em minutos
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de agendamentos
CREATE TABLE agendamentos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  cliente_id UUID REFERENCES clientes(id),
  servico_id UUID REFERENCES servicos(id),
  servico VARCHAR(255) NOT NULL,
  data DATE NOT NULL,
  horario TIME NOT NULL,
  status VARCHAR(20) DEFAULT 'agendado',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Índices para performance
CREATE INDEX idx_agendamentos_data ON agendamentos(data);
CREATE INDEX idx_agendamentos_cliente ON agendamentos(cliente_id);
CREATE INDEX idx_clientes_nome ON clientes(nome);
```

### 3. **Row Level Security (RLS)**

```sql
-- Habilitar RLS
ALTER TABLE clientes ENABLE ROW LEVEL SECURITY;
ALTER TABLE agendamentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE servicos ENABLE ROW LEVEL SECURITY;

-- Políticas (ajuste conforme suas necessidades)
CREATE POLICY "Permitir todas as operações para usuários autenticados" 
ON clientes FOR ALL 
TO authenticated 
USING (true);

CREATE POLICY "Permitir todas as operações para usuários autenticados" 
ON agendamentos FOR ALL 
TO authenticated 
USING (true);

CREATE POLICY "Permitir leitura para todos" 
ON servicos FOR SELECT 
TO authenticated 
USING (true);
```

## 🔐 Configuração de Segurança

### 1. **CORS Configuration**

```typescript
// backend/src/server.ts
import cors from 'cors';

const allowedOrigins = [
  'http://localhost:5173',
  'https://seu-frontend.vercel.app'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  optionsSuccessStatus: 200
}));
```

### 2. **Environment Variables Security**

**Frontend (.env.production)**:
```env
# Apenas variáveis que começam com VITE_ são expostas no build
VITE_API_URL=https://sua-api.onrender.com
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua_supabase_anon_key
```

**Backend (Render/Railway)**:
```env
# Variáveis sensíveis (nunca commit no repositório)
SUPABASE_SERVICE_KEY=sua_service_key_secreta
DATABASE_URL=postgresql://...
JWT_SECRET=seu_jwt_secret_muito_forte
```

## 📊 Monitoramento

### 1. **Logs de Aplicação**

```typescript
// Logger simples
const logger = {
  info: (message: string, data?: any) => {
    console.log(`[INFO] ${new Date().toISOString()}: ${message}`, data);
  },
  error: (message: string, error?: any) => {
    console.error(`[ERROR] ${new Date().toISOString()}: ${message}`, error);
  }
};

// Usar nos controllers
export const createAgendamento = async (req, res) => {
  try {
    logger.info('Criando novo agendamento', { clienteId: req.body.clienteId });
    // ...
  } catch (error) {
    logger.error('Erro ao criar agendamento', error);
    res.status(500).json({ error: 'Erro interno' });
  }
};
```

### 2. **Health Checks**

```typescript
// Endpoint para monitoramento
app.get('/api/health', async (req, res) => {
  try {
    // Testar conexão com Supabase
    const { data, error } = await supabase
      .from('clientes')
      .select('count(*)')
      .limit(1);
    
    if (error) throw error;
    
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected',
      uptime: process.uptime()
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      error: error.message
    });
  }
});
```

## 🔄 CI/CD Pipeline

### 1. **GitHub Actions (Exemplo)**

`.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build

  deploy-frontend:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 📋 Checklist de Deploy

### ✅ Pré-Deploy
- [ ] Todos os testes passando
- [ ] Build sem erros
- [ ] Variáveis de ambiente configuradas
- [ ] Banco de dados migrado
- [ ] CORS configurado corretamente

### ✅ Deploy
- [ ] Frontend deployado no Vercel
- [ ] Backend deployado no Render/Railway
- [ ] URLs atualizadas nas variáveis de ambiente
- [ ] SSL/HTTPS funcionando

### ✅ Pós-Deploy
- [ ] Health checks funcionando
- [ ] Logs sendo gerados corretamente
- [ ] Funcionalidades principais testadas
- [ ] Performance aceitável
- [ ] Backup configurado

## 🆘 Troubleshooting

### Problemas Comuns

**1. CORS Error**
```
Access to fetch at 'api-url' from origin 'frontend-url' has been blocked by CORS policy
```
**Solução**: Verificar configuração do CORS no backend

**2. Build Error no Vercel**
```
Module not found: Can't resolve 'styled-components'
```
**Solução**: Verificar se todas as dependências estão no package.json

**3. 500 Error no Backend**
```
Internal Server Error
```
**Solução**: Verificar logs no dashboard do Render e variáveis de ambiente

### Comandos Úteis

```bash
# Verificar logs do Vercel
vercel logs

# Testar build local
npm run build && npm run preview

# Verificar health do backend
curl https://sua-api.onrender.com/api/health

# Testar conectividade
ping sua-api.onrender.com
```

## 🔗 Links Úteis

- [Documentação Vercel](https://vercel.com/docs)
- [Documentação Render](https://render.com/docs)
- [Documentação Supabase](https://supabase.com/docs)
- [Vite Build Guide](https://vitejs.dev/guide/build.html)

Seguindo este guia, você terá seu App Barber rodando em produção de forma segura e escalável! 🚀