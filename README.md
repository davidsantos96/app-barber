# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# 💈 App Barber - Sistema de Agendamento para Barbearias

<div align="center">
  <img src="./public/logo1.png" alt="App Barber Logo" width="120">
  
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
  [![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)](https://styled-components.com/)
  [![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

  <p align="center">
    Sistema completo de gerenciamento para barbearias com interface moderna e responsiva
  </p>

  [🚀 Demo Live](https://app-barber-frontend.vercel.app) • [📱 Screenshots](#-screenshots) • [🛠️ Instalação](#️-instalação)
</div>

---

## 📋 Sobre o Projeto

O **App Barber** é uma aplicação full-stack completa para gerenciamento de barbearias, desenvolvida com as tecnologias mais modernas do mercado. O sistema permite o controle total de agendamentos, clientes e serviços, oferecendo uma experiência otimizada tanto para profissionais quanto para clientes.

### ✨ Principais Funcionalidades

- 📅 **Agendamento Inteligente**: Sistema completo de agendamentos com validação de conflitos
- 👥 **Gestão de Clientes**: CRUD completo com pesquisa e histórico
- ✂️ **Catálogo de Serviços**: Gerenciamento de serviços com preços e duração
- 📊 **Dashboard Analytics**: Visão geral dos agendamentos e métricas
- 🔒 **Autenticação Segura**: Sistema de login com Supabase Auth
- 📱 **Design Responsivo**: Interface adaptada para todos os dispositivos
- ⚡ **Performance Otimizada**: Context API para gerenciamento eficiente de estado

## 🎯 Demonstração

### 🖥️ Screenshots

<details>
<summary>📱 Clique para ver as capturas de tela</summary>

| Dashboard | Agendamentos | Clientes |
|-----------|--------------|----------|
| ![Dashboard](./docs/screenshots/dashboard.png) | ![Agendamentos](./docs/screenshots/agendamentos.png) | ![Clientes](./docs/screenshots/clientes.png) |

</details>

## 🏗️ Arquitetura do Projeto

```
app-barber/
├── 📁 frontend/              # Aplicação React + TypeScript
│   ├── 📁 src/
│   │   ├── 📁 components/    # Componentes reutilizáveis
│   │   ├── 📁 contexts/      # Context API (Estado Global)
│   │   ├── 📁 pages/         # Páginas da aplicação
│   │   ├── 📁 routes/        # Configuração de rotas
│   │   └── 📁 styles/        # Estilos globais
│   └── 📁 public/            # Assets estáticos
│
└── 📁 backend/               # API Node.js + Express
    ├── 📁 src/
    │   ├── 📁 controllers/   # Lógica de negócio
    │   ├── 📁 routes/        # Definição de rotas
    │   ├── 📁 middlewares/   # Middlewares personalizados
    │   └── 📁 models/        # Modelos de dados
    └── 📁 data/              # Dados e backups
```

## 🛠️ Tecnologias Utilizadas

### Frontend
- **⚛️ React 19** - Biblioteca para interfaces de usuário
- **🔷 TypeScript** - Superset do JavaScript com tipagem estática
- **🎨 Styled Components** - CSS-in-JS para estilização
- **🚀 Vite** - Build tool moderna e rápida
- **🧭 React Router** - Roteamento SPA
- **🔗 Axios** - Cliente HTTP para comunicação com API
- **🎯 Context API** - Gerenciamento de estado global
- **📱 React Icons** - Biblioteca de ícones

### Backend
- **🟢 Node.js** - Ambiente de execução JavaScript
- **🚂 Express.js** - Framework web minimalista
- **🔐 Supabase** - Backend-as-a-Service com autenticação
- **🛡️ CORS** - Middleware para Cross-Origin Resource Sharing
- **🆔 UUID** - Geração de identificadores únicos

### Ferramentas de Desenvolvimento
- **📏 ESLint** - Linter para qualidade de código
- **🔧 ts-node-dev** - Desenvolvimento com hot reload
- **🌍 Vercel** - Deploy e hospedagem

## ⚡ Instalação e Configuração

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Git

### 🚀 Configuração do Projeto

1. **Clone o repositório**
```bash
git clone https://github.com/davidsantos96/app-barber.git
cd app-barber
```

2. **Instale as dependências do Frontend**
```bash
npm install
```

3. **Instale as dependências do Backend**
```bash
cd backend
npm install
```

4. **Configure as variáveis de ambiente**

Crie um arquivo `.env` na pasta `backend/`:
```env
SUPABASE_URL=sua_supabase_url
SUPABASE_KEY=sua_supabase_key
PORT=3001
```

5. **Execute o projeto**

**Backend (Terminal 1):**
```bash
cd backend
npm run dev
```

**Frontend (Terminal 2):**
```bash
npm run dev
```

6. **Acesse a aplicação**
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3001`

## 📱 Funcionalidades Detalhadas

### 🏠 Dashboard
- Visão geral dos agendamentos do dia
- Agendamentos de amanhã
- Cancelamento rápido de agendamentos
- Navegação intuitiva

### 📅 Sistema de Agendamentos
- **Criar**: Novo agendamento com validações
- **Visualizar**: Lista filtrada por data
- **Editar**: Modificação de agendamentos existentes
- **Cancelar**: Cancelamento com confirmação

### 👥 Gestão de Clientes
- **CRUD Completo**: Criar, listar, editar clientes
- **Busca Inteligente**: Por nome ou telefone
- **Avatars Automáticos**: Geração automática de avatars
- **Histórico**: Acompanhamento de agendamentos por cliente

### ✂️ Catálogo de Serviços
- Listagem de serviços disponíveis
- Preços e informações detalhadas
- Integração com sistema de agendamento

## 🎨 Padrões de Design

### Context API Pattern
```typescript
// Exemplo de uso dos contexts
const { clientes, createCliente, updateCliente } = useData();
const { agendamentos, create, cancel } = useAgendamentos();
```

### Styled Components Pattern
```typescript
// Componentes estilizados reutilizáveis
const Button = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
`;
```

## 🚀 Deploy

### Frontend (Vercel)
```bash
npm run build
vercel --prod
```

### Backend (Render/Railway)
```bash
npm run start
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**David Santos**
- GitHub: [@davidsantos96](https://github.com/davidsantos96)
- LinkedIn: [David Santos](https://linkedin.com/in/david-santos-dev)
- Email: david.santos.dev@email.com

---

<div align="center">
  <p>⭐ Se este projeto te ajudou, considere dar uma estrela!</p>
  <p>Desenvolvido com ❤️ por David Santos</p>
</div>

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
