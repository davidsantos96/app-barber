# 🤝 Contribuindo para o App Barber

Obrigado por considerar contribuir para o **App Barber**! Este documento contém diretrizes para contribuições.

## 📋 Código de Conduta

Este projeto adere ao código de conduta. Ao participar, você deve manter este padrão. Por favor, reporte comportamentos inaceitáveis.

## 🚀 Como Contribuir

### 1. **Reportando Bugs**

Antes de criar um issue:
- ✅ Verifique se já não existe um issue similar
- ✅ Use a template de bug report
- ✅ Inclua informações detalhadas

**Template de Bug Report:**
```markdown
**Descrição do Bug**
Uma descrição clara e concisa do bug.

**Para Reproduzir**
Passos para reproduzir o comportamento:
1. Vá para '...'
2. Clique em '....'
3. Role para baixo até '....'
4. Veja o erro

**Comportamento Esperado**
Uma descrição clara do que você esperava que acontecesse.

**Screenshots**
Se aplicável, adicione screenshots para ajudar a explicar o problema.

**Ambiente:**
 - OS: [ex: Windows 10]
 - Browser: [ex: Chrome, Safari]
 - Versão: [ex: 22]

**Informações Adicionais**
Adicione qualquer outro contexto sobre o problema aqui.
```

### 2. **Sugerindo Melhorias**

Para sugerir uma nova funcionalidade:
- ✅ Use a template de feature request
- ✅ Explique o problema que resolve
- ✅ Descreva a solução proposta
- ✅ Considere alternativas

**Template de Feature Request:**
```markdown
**A funcionalidade está relacionada a um problema?**
Uma descrição clara do problema. Ex: Sempre fico frustrado quando [...]

**Descreva a solução que você gostaria**
Uma descrição clara e concisa do que você quer que aconteça.

**Descreva alternativas consideradas**
Uma descrição clara de qualquer solução ou funcionalidade alternativa.

**Contexto adicional**
Adicione qualquer outro contexto ou screenshots sobre a solicitação aqui.
```

### 3. **Contribuindo com Código**

#### Setup do Ambiente de Desenvolvimento

1. **Fork o repositório**
```bash
git clone https://github.com/seu-usuario/app-barber.git
cd app-barber
```

2. **Instale as dependências**
```bash
# Frontend
npm install

# Backend
cd backend
npm install
```

3. **Configure as variáveis de ambiente**
```bash
# Copie os arquivos de exemplo
cp .env.example .env
cp backend/.env.example backend/.env

# Configure suas variáveis
```

4. **Execute o projeto**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
npm run dev
```

#### Workflow de Contribuição

1. **Crie uma branch para sua feature**
```bash
git checkout -b feature/nova-funcionalidade
# ou
git checkout -b fix/correcao-bug
```

2. **Faça suas mudanças**
- ✅ Escreva código limpo e bem documentado
- ✅ Siga os padrões do projeto
- ✅ Adicione testes se necessário
- ✅ Atualize a documentação

3. **Commit suas mudanças**
```bash
git add .
git commit -m "feat: adiciona nova funcionalidade X"
```

**Padrão de Commits (Conventional Commits):**
- `feat:` nova funcionalidade
- `fix:` correção de bug
- `docs:` mudanças na documentação
- `style:` formatação, não afeta a lógica
- `refactor:` refatoração de código
- `test:` adiciona ou modifica testes
- `chore:` tarefas de build, configurações

4. **Push para sua branch**
```bash
git push origin feature/nova-funcionalidade
```

5. **Abra um Pull Request**
- Use uma descrição clara do que foi alterado
- Referencie issues relacionados
- Inclua screenshots se relevante
- Aguarde o review

## 📏 Padrões de Código

### TypeScript/React
```typescript
// ✅ Bom
interface ClienteProps {
  id: string;
  nome: string;
  telefone: string;
}

const Cliente: React.FC<ClienteProps> = ({ id, nome, telefone }) => {
  return (
    <div>
      <h3>{nome}</h3>
      <p>{telefone}</p>
    </div>
  );
};

// ❌ Evitar
const Cliente = (props: any) => {
  return <div>{props.nome}</div>;
};
```

### Styled Components
```typescript
// ✅ Bom
const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  
  ${props => props.variant === 'primary' && css`
    background: var(--gradient-primary);
    color: white;
  `}
`;

// ❌ Evitar
const Button = styled.button`
  padding: 12px 24px;
  background: ${props => props.primary ? 'blue' : 'gray'};
`;
```

### Estrutura de Arquivos
```
src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.style.ts
│   │   └── index.ts
│   └── index.ts
```

## 🧪 Testes

### Executando Testes
```bash
# Todos os testes
npm test

# Testes em watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

### Escrevendo Testes
```typescript
// ClienteForm.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ClienteForm } from './ClienteForm';

describe('ClienteForm', () => {
  it('deve renderizar os campos obrigatórios', () => {
    render(<ClienteForm />);
    
    expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/telefone/i)).toBeInTheDocument();
  });

  it('deve validar campos obrigatórios', () => {
    render(<ClienteForm />);
    
    const submitButton = screen.getByRole('button', { name: /salvar/i });
    fireEvent.click(submitButton);
    
    expect(screen.getByText(/nome é obrigatório/i)).toBeInTheDocument();
  });
});
```

## 📝 Documentação

### Atualizando a Documentação
- README.md para mudanças gerais
- docs/ para documentação técnica
- JSDoc para funções complexas
- CHANGELOG.md para releases

### Exemplo de JSDoc
```typescript
/**
 * Cria um novo agendamento no sistema
 * @param agendamento - Dados do agendamento
 * @param agendamento.clienteId - ID do cliente
 * @param agendamento.servicoId - ID do serviço
 * @param agendamento.data - Data do agendamento (YYYY-MM-DD)
 * @param agendamento.horario - Horário do agendamento (HH:MM)
 * @returns Promise com o agendamento criado
 * @throws {Error} Quando há conflito de horário
 */
export async function createAgendamento(
  agendamento: CreateAgendamentoData
): Promise<Agendamento> {
  // implementação
}
```

## 🔍 Review Process

### Para Reviewers
- ✅ Verifique se o código segue os padrões
- ✅ Teste as funcionalidades localmente
- ✅ Verifique se não quebra funcionalidades existentes
- ✅ Avalie performance e segurança
- ✅ Seja construtivo nos comentários

### Para Contributors
- ✅ Responda aos comentários de review
- ✅ Faça as correções solicitadas
- ✅ Teste novamente após mudanças
- ✅ Notifique quando estiver pronto para re-review

## 🎯 Prioridades de Contribuição

### 🔥 Alta Prioridade
- Correções de bugs críticos
- Melhorias de segurança
- Performance improvements
- Responsividade mobile

### 📋 Média Prioridade
- Novas funcionalidades pequenas
- Melhorias de UX
- Refatorações
- Testes adicionais

### 💡 Baixa Prioridade
- Funcionalidades nice-to-have
- Otimizações menores
- Melhorias na documentação

## 🏷️ Labels do GitHub

- `bug` - Algo não está funcionando
- `enhancement` - Nova funcionalidade ou solicitação
- `documentation` - Melhorias ou adições à documentação
- `good first issue` - Bom para novos contribuidores
- `help wanted` - Ajuda extra é bem-vinda
- `priority: high` - Alta prioridade
- `priority: low` - Baixa prioridade
- `wontfix` - Não será corrigido

## 📞 Suporte

Se você tiver dúvidas:
- 📧 Abra um issue no GitHub
- 💬 Entre em contato via email: david.santos.dev@email.com

## 🙏 Reconhecimento

Todos os contribuidores serão adicionados ao README.md e reconhecidos por suas contribuições!

---

**Obrigado por contribuir! 🚀**