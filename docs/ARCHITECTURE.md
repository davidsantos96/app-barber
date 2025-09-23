# 🏗️ Arquitetura do Projeto

## 📋 Visão Geral

O **App Barber** segue uma arquitetura moderna de aplicação full-stack, com separação clara entre frontend e backend, utilizando as melhores práticas de desenvolvimento.

## 🎯 Princípios Arquiteturais

### 1. **Separação de Responsabilidades**
- **Frontend**: Interface de usuário e experiência
- **Backend**: Lógica de negócio e persistência de dados
- **Database**: Gerenciamento de dados com Supabase

### 2. **Component-Based Architecture**
- Componentes reutilizáveis e modulares
- Props tipadas com TypeScript
- Styled Components para encapsulamento de estilos

### 3. **Context API Pattern**
- Estado global centralizado
- Eliminação de prop drilling
- Caching automático de dados

## 🏠 Frontend Architecture

### 📁 Estrutura de Pastas
```
src/
├── 📁 components/         # Componentes reutilizáveis
│   ├── ClientForm.tsx     # Formulário de cliente
│   └── Navbar.tsx         # Barra de navegação
│
├── 📁 contexts/           # Gerenciamento de Estado Global
│   ├── ApiContext.tsx     # Cliente HTTP centralizado
│   ├── DataContext.tsx    # Dados (clientes, serviços)
│   ├── AgendamentosContext.tsx # Agendamentos
│   └── index.ts           # Exports centralizados
│
├── 📁 pages/              # Páginas da aplicação
│   ├── Dashboard/         # Página principal
│   ├── Agendamento/       # Gerenciamento de agendamentos
│   ├── Clientes/          # Gestão de clientes
│   └── Login/             # Autenticação
│
├── 📁 routes/             # Configuração de rotas
│   └── routes.tsx         # React Router setup
│
├── 📁 styles/             # Estilos globais
│   ├── global.css         # Estilos base
│   └── GlobalStyle.ts     # Styled Components globais
│
├── App.tsx                # Componente raiz
└── main.tsx              # Entry point
```

### 🔄 Context API Flow

```typescript
// Estrutura hierárquica dos contexts
<ApiProvider>          // HTTP client + interceptors
  <DataProvider>        // Clientes, serviços, CRUD
    <AgendamentosProvider>  // Agendamentos, filtros
      <App />
    </AgendamentosProvider>
  </DataProvider>
</ApiProvider>
```

### 🎯 Padrões de Componentes

#### 1. **Page Components**
```typescript
// Padrão para páginas
const DashboardPage: React.FC = () => {
  const { agendamentos } = useAgendamentos();
  const { clientes } = useData();
  
  return (
    <PageContainer>
      <Header />
      <Content />
      <Footer />
    </PageContainer>
  );
};
```

#### 2. **Form Components**
```typescript
// Padrão para formulários
const ClientForm: React.FC<ClientFormProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState(initialData);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
};
```

#### 3. **Custom Hooks**
```typescript
// Padrão para hooks personalizados
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};
```

## 🖥️ Backend Architecture

### 📁 Estrutura de Pastas
```
backend/
├── 📁 src/
│   ├── 📁 controllers/    # Lógica de negócio
│   │   ├── agendamentosController.ts
│   │   ├── clientesController.ts
│   │   └── authController.ts
│   │
│   ├── 📁 routes/         # Definição de rotas
│   │   ├── agendamentos.ts
│   │   ├── clientes.ts
│   │   └── auth.ts
│   │
│   ├── 📁 middlewares/    # Middlewares personalizados
│   │   └── authMiddleware.ts
│   │
│   ├── 📁 models/         # Modelos de dados
│   │   ├── Agendamento.ts
│   │   └── Cliente.ts
│   │
│   ├── config.ts          # Configurações
│   ├── server.ts          # Servidor Express
│   └── index.ts           # Entry point
│
└── 📁 data/               # Dados e backups
    ├── agendamentos.json
    ├── clientes.json
    └── backups/
```

### 🛣️ API Routes Pattern

```typescript
// Padrão de rota RESTful
const router = express.Router();

// GET /api/agendamentos
router.get('/', agendamentosController.list);

// POST /api/agendamentos  
router.post('/', agendamentosController.create);

// PUT /api/agendamentos/:id
router.put('/:id', agendamentosController.update);

// DELETE /api/agendamentos/:id
router.delete('/:id', agendamentosController.delete);
```

### 🎛️ Controller Pattern

```typescript
// Padrão de controller
export const agendamentosController = {
  list: async (req: Request, res: Response) => {
    try {
      const agendamentos = await AgendamentoService.findAll();
      res.json(agendamentos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  
  create: async (req: Request, res: Response) => {
    try {
      const agendamento = await AgendamentoService.create(req.body);
      res.status(201).json(agendamento);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};
```

## 🔄 Data Flow

### 1. **Request Flow**
```
User Interaction → React Component → Context Hook → Axios → API Endpoint → Controller → Service → Database
```

### 2. **Response Flow**
```
Database → Service → Controller → API Response → Axios → Context → React Component → UI Update
```

### 3. **State Management Flow**
```typescript
// Exemplo de fluxo de dados
const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [clientes, setClientes] = useState([]);
  const { api } = useApi();
  
  const fetchClientes = async () => {
    const response = await api.get('/clientes');
    setClientes(response.data);
  };
  
  const createCliente = async (data) => {
    const response = await api.post('/clientes', data);
    setClientes(prev => [...prev, response.data]);
  };
  
  return (
    <DataContext.Provider value={{ clientes, createCliente }}>
      {children}
    </DataContext.Provider>
  );
};
```

## 🔒 Security Architecture

### 1. **Authentication Flow**
```
Login → Supabase Auth → JWT Token → Context Storage → API Headers
```

### 2. **Authorization Pattern**
```typescript
// Middleware de autenticação
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Token required' });
  }
  
  // Validar token com Supabase
  supabase.auth.getUser(token)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(() => res.status(401).json({ error: 'Invalid token' }));
};
```

## 🚀 Performance Optimizations

### 1. **Frontend Optimizations**
- **Code Splitting**: Carregamento lazy de rotas
- **Context Caching**: Cache automático de dados
- **Debounced Search**: Otimização de busca em tempo real
- **Image Optimization**: Avatars responsivos

### 2. **Backend Optimizations**
- **CORS Configuration**: Headers otimizados
- **Request Timeout**: Timeout de 10 segundos
- **JSON Parsing**: Limite de tamanho de payload
- **Error Handling**: Tratamento global de erros

## 📊 Monitoring & Debugging

### 1. **Error Handling**
```typescript
// Context com error boundary
const ErrorBoundary: React.FC = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    const handleError = (error: Error) => {
      console.error('App Error:', error);
      setHasError(true);
    };
    
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);
  
  if (hasError) {
    return <ErrorFallback />;
  }
  
  return <>{children}</>;
};
```

### 2. **Logging Pattern**
```typescript
// Interceptor para logging
api.interceptors.request.use(config => {
  console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
  return config;
});

api.interceptors.response.use(
  response => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  error => {
    console.error(`API Error: ${error.response?.status} ${error.config?.url}`);
    return Promise.reject(error);
  }
);
```

## 🔄 Deployment Architecture

### 1. **Frontend (Vercel)**
- Build otimizado com Vite
- Deploy automático via Git
- Environment variables seguras

### 2. **Backend (Render/Railway)**
- Container Docker (opcional)
- Auto-deploy via Git
- Health checks configurados

### 3. **Database (Supabase)**
- PostgreSQL managed
- Backup automático
- Row Level Security (RLS)

Esta arquitetura garante escalabilidade, manutenibilidade e performance otimizada para o projeto.