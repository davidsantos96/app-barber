// Dados de produção para deploy - SEM credenciais sensíveis
export interface User {
  id: string;
  username: string;
  password: string;
  name: string;
  role: 'admin' | 'barbeiro' | 'demo';
  barbearia?: string;
}

export const USERS: User[] = [
  {
    id: 'user-1',
    username: 'admin',
    password: 'admin',
    name: 'Administrador',
    role: 'admin',
    barbearia: 'Barbearia Central'
  },
  {
    id: 'user-2', 
    username: 'demo',
    password: 'demo',
    name: 'Usuário Demo',
    role: 'demo'
  },
  {
    id: 'user-3',
    username: 'alvaro',
    password: 'demo123',
    name: 'Álvaro Barbeiro',
    role: 'barbeiro',
    barbearia: 'Barbearia do Álvaro'
  },
  {
    id: 'user-4',
    username: 'carlos', 
    password: 'demo123',
    name: 'Carlos Barbeiro',
    role: 'barbeiro',
    barbearia: 'Barbearia do Carlos'
  }
];

// Dados separados por usuário
export const USER_DATA = {
  'user-1': {
    clientes: [],
    agendamentos: []
  },
  'user-3': {
    clientes: [
      {
        id: 'alvaro-cliente-1',
        nome: 'Roberto Silva',
        apelido: 'Beto',
        telefone: '(11)98888-1111',
        userId: 'user-3'
      },
      {
        id: 'alvaro-cliente-2',
        nome: 'Fernando Santos',
        apelido: 'Nando',
        telefone: '(11)98888-2222', 
        userId: 'user-3'
      }
    ],
    agendamentos: [
      {
        id: 'alvaro-agendamento-1',
        clienteId: 'alvaro-cliente-1',
        servicoId: 'servico-1',
        servico: 'Corte de Cabelo',
        data: new Date().toISOString().split('T')[0],
        horario: '09:00',
        status: 'confirmado' as const,
        userId: 'user-3'
      }
    ]
  },
  'user-4': {
    clientes: [],
    agendamentos: []
  }
};

// Dados demo (mesmo que antes)
export const DEMO_DATA = {
  clientes: [
    {
      id: 'demo-cliente-1',
      nome: 'João Silva',
      apelido: 'João',
      telefone: '(11)99999-1111',
      avatarUrl: 'https://ui-avatars.com/api/?name=João Silva&background=667eea&color=fff'
    },
    {
      id: 'demo-cliente-2', 
      nome: 'Maria Santos',
      apelido: 'Mari',
      telefone: '(11)99999-2222',
      avatarUrl: 'https://ui-avatars.com/api/?name=Maria Santos&background=764ba2&color=fff'
    },
    {
      id: 'demo-cliente-3',
      nome: 'Pedro Oliveira', 
      apelido: 'Pedrão',
      telefone: '(11)99999-3333',
      avatarUrl: 'https://ui-avatars.com/api/?name=Pedro Oliveira&background=ff6b6b&color=fff'
    },
    {
      id: 'demo-cliente-4',
      nome: 'Ana Costa',
      apelido: 'Aninha', 
      telefone: '(11)99999-4444',
      avatarUrl: 'https://ui-avatars.com/api/?name=Ana Costa&background=4ecdc4&color=fff'
    }
  ],

  servicos: [
    {
      id: 'demo-servico-1',
      nome: 'Corte de Cabelo',
      preco: 25.00,
      duracao: 30
    },
    {
      id: 'demo-servico-2',
      nome: 'Corte + Barba',
      preco: 35.00,
      duracao: 45
    },
    {
      id: 'demo-servico-3',
      nome: 'Barba Completa',
      preco: 20.00,
      duracao: 25
    },
    {
      id: 'demo-servico-4',
      nome: 'Sobrancelha',
      preco: 15.00,
      duracao: 15
    }
  ],

  agendamentos: [
    {
      id: 'demo-agendamento-1',
      clienteId: 'demo-cliente-1',
      servicoId: 'demo-servico-1',
      servico: 'Corte de Cabelo',
      data: new Date().toISOString().split('T')[0],
      horario: '14:00',
      status: 'confirmado' as const
    },
    {
      id: 'demo-agendamento-2', 
      clienteId: 'demo-cliente-2',
      servicoId: 'demo-servico-2',
      servico: 'Corte + Barba',
      data: new Date().toISOString().split('T')[0],
      horario: '15:30',
      status: 'confirmado' as const
    },
    {
      id: 'demo-agendamento-3',
      clienteId: 'demo-cliente-3', 
      servicoId: 'demo-servico-3',
      servico: 'Barba Completa',
      data: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      horario: '10:00',
      status: 'confirmado' as const
    },
    {
      id: 'demo-agendamento-4',
      clienteId: 'demo-cliente-4',
      servicoId: 'demo-servico-4', 
      servico: 'Sobrancelha',
      data: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      horario: '16:00',
      status: 'confirmado' as const
    }
  ]
};

// Funções auxiliares
export const getCurrentUser = (): User | null => {
  const userId = localStorage.getItem('userId');
  return userId ? USERS.find((u: User) => u.id === userId) || null : null;
};

export const isDemoUser = () => {
  const user = getCurrentUser();
  return user?.role === 'demo';
};

export const getUserData = (userId: string) => {
  if (userId === 'demo' || isDemoUser()) {
    return DEMO_DATA;
  }
  return USER_DATA[userId as keyof typeof USER_DATA] || { clientes: [], agendamentos: [] };
};