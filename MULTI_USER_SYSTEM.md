# 🔐 Sistema de Login Multi-Usuário

## 📋 **Visão Geral**

O App Barber agora possui um sistema de login avançado que suporta múltiplos usuários com dados separados e diferentes níveis de acesso.

## 👥 **Tipos de Usuários**

### **1. 🔧 Administrador**
- **Estabelecimento**: Barbearia Central
- **Permissões**: Acesso completo ao sistema
- **Dados**: Sem clientes (dados foram transferidos para Álvaro)
- **Funcionalidades**:
  - Gerenciar todos os usuários
  - Acessar relatórios completos
  - Configurações do sistema
  - Backup e restauração

### **2. 🎯 Demo**
- **Tipo**: Usuário de demonstração
- **Dados**: Fictícios para fins de teste
- **Funcionalidades**:
  - Visualizar dados demo
  - Testar funcionalidades sem afetar dados reais
  - Simular operações
  - Acesso limitado e seguro

### **3. ✂️ Barbeiros Independentes**

#### **Álvaro Barbeiro**
- **Estabelecimento**: Barbearia do Álvaro
- **Dados**: Cartela com clientes Roberto Silva e Fernando Santos (migrados do admin)
- **Funcionalidades**:
  - Gerenciar próprios clientes
  - Agendar atendimentos
  - Visualizar agenda pessoal
  - Controle de serviços

#### **Carlos Barbeiro**
- **Estabelecimento**: Barbearia do Carlos
- **Dados**: Cartela própria de clientes (inicialmente vazia)
- **Funcionalidades**: Mesmas do Álvaro

## 🔄 **Separação de Dados**

### **Isolamento por Usuário**
Cada usuário possui seus próprios dados isolados:

```typescript
USER_DATA = {
  'user-1': { // Administrador
    clientes: [], // Vazio - dados transferidos
    agendamentos: []
  },
  'user-3': { // Álvaro
    clientes: [
      { nome: 'Roberto Silva', apelido: 'Beto' },
      { nome: 'Fernando Santos', apelido: 'Nando' }
    ],
    agendamentos: [...]
  },
  'user-4': { // Carlos
    clientes: [],
    agendamentos: []
  }
}
```

### **Dados Demo Separados**
O usuário demo possui dados fictícios completamente isolados:
- ✅ Nomes brasileiros realistas
- ✅ Telefones fictícios
- ✅ Agendamentos simulados
- ✅ Nenhum impacto em dados reais

## 🚀 **Como Usar**

### **1. Acesso Rápido**
Na tela de login, cada usuário possui um botão "Login Rápido" para acesso direto.

### **2. Login Manual**
Digite as credenciais fornecidas pelo administrador do sistema.

### **3. Identificação Visual**
- O navbar mostra o nome do usuário logado
- O estabelecimento é exibido quando aplicável
- Modo demo possui banner de identificação

## 🛡️ **Segurança e Privacidade**

### **Proteção de Credenciais**
- ⚠️ **IMPORTANTE**: O arquivo `src/data/userData.ts` contém credenciais reais e está no `.gitignore`
- 📄 Use o arquivo `userData.template.ts` como base para configuração
- 🔒 Credenciais nunca são commitadas no repositório
- 👤 Cada desenvolvedor configura suas próprias credenciais
- 📖 Consulte `USER_SETUP.md` para instruções completas

### **Proteção de Dados Reais**
- Usuários demo nunca veem dados de clientes reais
- Cada barbeiro só acessa seus próprios clientes
- Administrador tem controle total quando necessário

### **Isolamento de Contexto**
- Context API detecta automaticamente o tipo de usuário
- Dados são carregados conforme permissões
- Operações são restritas ao escopo do usuário

## 📱 **Interface de Usuário**

### **Página de Perfil (/perfil)**
Cada usuário pode acessar sua página de perfil contendo:
- Informações básicas
- Tipo de conta e permissões
- Estabelecimento (quando aplicável)
- Status do modo demo

### **Navbar Personalizado**
- Nome do usuário logado
- Estabelecimento
- Link direto para perfil

## 🔧 **Implementação Técnica**

### **Context API Atualizado**
```typescript
// Detecção automática do tipo de usuário
const currentUser = getCurrentUser();
if (currentUser) {
  const userData = getUserData(currentUser.id);
  // Carregar dados específicos do usuário
}
```

### **Funções Auxiliares**
```typescript
getCurrentUser() // Usuário atual
isDemoUser()     // Verifica se é demo
getUserData(id)  // Dados específicos do usuário
```

## 🎯 **Benefícios**

1. **👥 Multi-tenancy**: Cada barbeiro tem sua cartela
2. **🔒 Segurança**: Dados isolados e protegidos  
3. **🎭 Demo Seguro**: Testes sem risco aos dados reais
4. **📈 Escalabilidade**: Fácil adição de novos usuários
5. **🎨 UX Aprimorada**: Interface personalizada por usuário

## 🚀 **Próximos Passos**

1. **Dashboard Personalizado**: Métricas específicas por usuário
2. **Relatórios Individuais**: Dados e estatísticas por estabelecimento
3. **Configurações de Usuário**: Personalização de preferências
4. **Sistema de Roles**: Permissões mais granulares

---

**🎉 O sistema agora está pronto para ser usado por múltiplos barbeiros, cada um com seus próprios clientes e agendamentos, mantendo a privacidade e segurança dos dados!**