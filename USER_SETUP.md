# 🔐 Configuração de Usuários

## 📋 **Instruções para Configuração**

O sistema possui uma estratégia dupla para gerenciamento de credenciais:

### **🚀 Deploy de Produção**
- `userData.ts` - Versão commitada com credenciais demo/desenvolvimento
- `userData.prod.ts` - Template de produção que pode ser customizado
- Credenciais de produção seguras para demonstração online

### **🔒 Desenvolvimento Local**
- `userData.local.ts` - Suas credenciais reais (ignorado pelo git)
- Permite desenvolvimento com dados e senhas personalizados
- Mantém segurança das credenciais sensíveis

### **⚙️ Setup para Desenvolvimento Local**

1. **Restaure suas credenciais locais:**
   ```bash
   cp src/data/userData.local.ts src/data/userData.ts
   ```
   OU
   ```bash
   cp src/data/userData.template.ts src/data/userData.ts
   ```

2. **Configure suas credenciais reais:**
   Edite o arquivo `src/data/userData.ts` e substitua as senhas demo por suas senhas reais

3. **Para retornar ao modo de produção:**
   ```bash
   cp src/data/userData.prod.ts src/data/userData.ts
   ```

### **🔒 Segurança**

- ✅ `userData.ts` versão de produção commitada (senhas demo)
- ✅ `userData.local.ts` suas credenciais reais (no .gitignore)  
- ✅ `userData.prod.ts` template para customização de produção
- ✅ Deploy funciona automaticamente no Vercel
- ✅ Desenvolvimento local mantém suas credenciais

### **👥 Estrutura de Usuários**

O sistema suporta:
- **1 Administrador** - Acesso completo
- **1 Usuário Demo** - Dados fictícios para demonstração
- **N Barbeiros** - Cada um com sua cartela de clientes

### **⚠️ Importante**

- Nunca commite credenciais reais no arquivo `userData.ts`
- Use senhas seguras em produção
- Mantenha backup das configurações importantes
- As credenciais demo são apenas para demonstração online

### **🚀 Exemplo de Configuração**

```typescript
export const USERS: User[] = [
  {
    id: 'user-1',
    username: 'admin',
    password: 'SUA_SENHA_ADMIN_AQUI',
    name: 'Administrador',
    role: 'admin',
    barbearia: 'Barbearia Central'
  },
  {
    id: 'user-3',
    username: 'seu_usuario',
    password: 'SUA_SENHA_AQUI',
    name: 'Seu Nome Barbeiro',
    role: 'barbeiro',
    barbearia: 'Nome da Sua Barbearia'
  }
  // ... outros usuários
];
```