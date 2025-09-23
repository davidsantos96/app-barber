# 🎨 Guia de Estilo e Design System

## 🎨 Paleta de Cores

### Cores Primárias
```css
:root {
  /* Gradient Principal */
  --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  
  /* Cores Sólidas */
  --primary-blue: #667eea;
  --primary-purple: #764ba2;
  
  /* Tons de Cinza */
  --dark-bg: #1a1a1a;
  --card-bg: #2a2a2a;
  --text-primary: #ffffff;
  --text-secondary: #cccccc;
  --text-muted: #888888;
  
  /* Cores de Estado */
  --success: #4caf50;
  --warning: #ff9800;
  --error: #f44336;
  --info: #2196f3;
}
```

### Aplicação das Cores
- **Backgrounds**: Dark theme com gradientes sutis
- **Texto**: Branco para títulos, cinza para textos secundários
- **Botões**: Gradiente primary para ações principais
- **Cards**: Fundo escuro com bordas sutis

## 📱 Responsividade

### Breakpoints
```css
/* Mobile First Approach */
:root {
  --mobile: 320px;
  --tablet: 768px;
  --desktop: 1024px;
  --large: 1440px;
}

@media (min-width: 768px) {
  /* Tablet styles */
}

@media (min-width: 1024px) {
  /* Desktop styles */
}
```

### Grid System
- **Mobile**: 1 coluna, stack vertical
- **Tablet**: 2-3 colunas flexíveis
- **Desktop**: 3-4 colunas com sidebar

## 🔤 Tipografia

### Fonte Principal
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
             Oxygen, Ubuntu, Cantarell, sans-serif;
```

### Escala Tipográfica
```css
--font-size-xs: 0.75rem;    /* 12px */
--font-size-sm: 0.875rem;   /* 14px */
--font-size-base: 1rem;     /* 16px */
--font-size-lg: 1.125rem;   /* 18px */
--font-size-xl: 1.25rem;    /* 20px */
--font-size-2xl: 1.5rem;    /* 24px */
--font-size-3xl: 1.875rem;  /* 30px */
```

## 🎯 Componentes

### Botões
```tsx
// Primary Button
const PrimaryButton = styled.button`
  background: var(--gradient-primary);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }
`;

// Secondary Button
const SecondaryButton = styled.button`
  background: transparent;
  color: var(--text-primary);
  border: 2px solid var(--primary-blue);
  border-radius: 8px;
  padding: 10px 22px;
`;
```

### Cards
```tsx
const Card = styled.div`
  background: var(--card-bg);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-4px);
  }
`;
```

### Inputs
```tsx
const Input = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 12px 16px;
  color: white;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: var(--primary-blue);
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
  }
  
  &::placeholder {
    color: var(--text-muted);
  }
`;
```

## 🎭 Animações

### Transições Padrão
```css
/* Micro-interactions */
.transition-fast { transition: all 0.15s ease; }
.transition-normal { transition: all 0.2s ease; }
.transition-slow { transition: all 0.3s ease; }

/* Hover Effects */
.hover-lift:hover {
  transform: translateY(-2px);
}

.hover-scale:hover {
  transform: scale(1.02);
}
```

### Loading States
```tsx
const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
```

## 📐 Espaçamento

### Sistema de Espaçamento (8px grid)
```css
:root {
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px */
  --space-5: 1.25rem;  /* 20px */
  --space-6: 1.5rem;   /* 24px */
  --space-8: 2rem;     /* 32px */
  --space-10: 2.5rem;  /* 40px */
  --space-12: 3rem;    /* 48px */
}
```

## 🎨 Iconografia

### React Icons
- **Navegação**: FiHome, FiUser, FiSettings
- **Ações**: FiPlus, FiEdit, FiTrash
- **Interface**: FiSearch, FiFilter, FiCalendar
- **Status**: FiCheck, FiX, FiAlert

### Tamanhos de Ícones
```tsx
// Small: 16px
<FiHome size={16} />

// Medium: 20px (padrão)
<FiHome size={20} />

// Large: 24px
<FiHome size={24} />

// Extra Large: 32px
<FiHome size={32} />
```

## 🖱️ Estados Interativos

### Estados de Botão
```css
.button {
  /* Default */
  opacity: 1;
  
  /* Hover */
  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }
  
  /* Active */
  &:active {
    transform: translateY(0);
  }
  
  /* Disabled */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
  
  /* Loading */
  &.loading {
    pointer-events: none;
  }
}
```

## 📋 Exemplos de Uso

### Layout de Página
```tsx
const PageContainer = styled.div`
  min-height: 100vh;
  background: var(--dark-bg);
  padding: var(--space-4);
  
  @media (min-width: 768px) {
    padding: var(--space-6);
  }
`;

const ContentCard = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: var(--card-bg);
  border-radius: 12px;
  padding: var(--space-6);
`;
```

### Formulário
```tsx
const FormGroup = styled.div`
  margin-bottom: var(--space-4);
  
  label {
    display: block;
    margin-bottom: var(--space-2);
    color: var(--text-primary);
    font-weight: 500;
  }
`;
```

Este design system garante consistência visual em toda a aplicação e facilita a manutenção do código.