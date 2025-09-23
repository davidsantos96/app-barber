// Dados fictícios para demonstração
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
      data: new Date().toISOString().split('T')[0], // Hoje
      horario: '14:00',
      status: 'confirmado' as const
    },
    {
      id: 'demo-agendamento-2', 
      clienteId: 'demo-cliente-2',
      servicoId: 'demo-servico-2',
      servico: 'Corte + Barba',
      data: new Date().toISOString().split('T')[0], // Hoje
      horario: '15:30',
      status: 'confirmado' as const
    },
    {
      id: 'demo-agendamento-3',
      clienteId: 'demo-cliente-3', 
      servicoId: 'demo-servico-3',
      servico: 'Barba Completa',
      data: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Amanhã
      horario: '10:00',
      status: 'confirmado' as const
    },
    {
      id: 'demo-agendamento-4',
      clienteId: 'demo-cliente-4',
      servicoId: 'demo-servico-4', 
      servico: 'Sobrancelha',
      data: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Amanhã
      horario: '16:00',
      status: 'confirmado' as const
    }
  ]
};

// Função para verificar se é usuário demo
export const isDemoUser = () => {
  const user = localStorage.getItem('user');
  return user === 'demo';
};