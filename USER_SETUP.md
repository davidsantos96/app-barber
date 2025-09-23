# 🔐 Configuração de Usuários

## 📋 **Instruções para Configuração**

O arquivo `userData.ts` contém credenciais sensíveis e não é versionado no repositório por questões de segurança.

### **⚙️ Setup Inicial**

1. **Copie o arquivo template:**
   ```bash
   cp src/data/userData.template.ts src/data/userData.ts
   ```

2. **Configure as credenciais reais:**
   Edite o arquivo `src/data/userData.ts` e substitua:
   - `CONFIGURE_SENHA_ADMIN` → Senha real do administrador
   - `CONFIGURE_USERNAME` → Username do primeiro barbeiro
   - `CONFIGURE_SENHA` → Senha do primeiro barbeiro
   - `CONFIGURE_NOME_BARBEIRO` → Nome completo do barbeiro
   - `CONFIGURE_NOME_BARBEARIA` → Nome do estabelecimento

### **🔒 Segurança**

- ✅ O arquivo `userData.ts` está no `.gitignore`
- ✅ Credenciais nunca serão enviadas ao repositório
- ✅ Cada desenvolvedor configura suas próprias credenciais
- ✅ Dados demo permanecem públicos (são fictícios)

### **👥 Estrutura de Usuários**

O sistema suporta:
- **1 Administrador** - Acesso completo
- **1 Usuário Demo** - Dados fictícios para demonstração
- **N Barbeiros** - Cada um com sua cartela de clientes

### **⚠️ Importante**

- Nunca commite o arquivo `userData.ts`
- Use senhas seguras em produção
- O usuário demo sempre usa a senha `demo` (é seguro, dados são fictícios)
- Mantenha backup das configurações importantes

### **🚀 Exemplo de Configuração**

```typescript
export const USERS: User[] = [
  {
    id: 'user-1',
    username: 'admin',
    password: 'MinhaSenh@Segura123',
    name: 'Administrador',
    role: 'admin',
    barbearia: 'Barbearia Central'
  },
  {
    id: 'user-3',
    username: 'alvaro',
    password: 'barbeiro@10',
    name: 'Álvaro Barbeiro',
    role: 'barbeiro',
    barbearia: 'Barbearia do Álvaro'
  }
  // ... outros usuários
];
```