import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useApi } from './ApiContext';
import { isDemoUser, getUserData, getCurrentUser } from '../data/userData';

export interface Agendamento {
  id: string;
  clienteId: string;
  servicoId?: string | null;
  servico: string;
  data: string;    // YYYY-MM-DD
  horario: string; // HH:mm
  status: 'confirmado' | 'cancelado' | 'concluido';
}

type CreateAgendamentoData = {
  clienteId: string;
  servicoId?: string;
  servico: string;
  data: string;
  horario: string;
};

type AgendamentosContextType = {
  agendamentos: Agendamento[];
  loading: boolean;
  refresh: () => Promise<void>;
  create: (data: CreateAgendamentoData) => Promise<Agendamento>;
  update: (id: string, updates: Partial<Agendamento>) => Promise<Agendamento>;
  cancel: (id: string) => Promise<void>;
  getAgendamentoById: (id: string) => Agendamento | undefined;
  getAgendamentosAtivos: () => Agendamento[];
  getAgendamentosPorData: (data: string) => Agendamento[];
};

const AgendamentosContext = createContext<AgendamentosContextType | null>(null);

export const AgendamentosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const api = useApi();
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      
      // Se for usuário demo, usar dados fictícios
      if (isDemoUser()) {
        const demoData = getUserData('demo');
        if ('agendamentos' in demoData) {
          setAgendamentos(demoData.agendamentos);
        }
        return;
      }

      // Para usuários reais, carregar seus agendamentos específicos
      const currentUser = getCurrentUser();
      if (currentUser) {
        const userData = getUserData(currentUser.id);
        if ('agendamentos' in userData) {
          setAgendamentos(userData.agendamentos);
        } else {
          setAgendamentos([]);
        }
        return;
      }
      
      const { data } = await api.get<Agendamento[]>('/agendamentos');
      setAgendamentos(data);
    } catch (error) {
      console.error('Erro ao buscar agendamentos:', error);
    } finally {
      setLoading(false);
    }
  }, [api]);

  const create = useCallback(async (data: CreateAgendamentoData) => {
    // Se for usuário demo, simular criação
    if (isDemoUser()) {
      const novoAgendamento: Agendamento = {
        ...data,
        id: `demo-agendamento-${Date.now()}`,
        status: 'confirmado' as const
      };
      setAgendamentos(prev => [novoAgendamento, ...prev]);
      return novoAgendamento;
    }
    
    const payload = { ...data, status: 'confirmado' as const };
    const response = await api.post<Agendamento>('/agendamentos', payload);
    setAgendamentos(prev => [response.data, ...prev]);
    return response.data;
  }, [api]);

  const update = useCallback(async (id: string, updates: Partial<Agendamento>) => {
    // Se for usuário demo, simular atualização
    if (isDemoUser()) {
      const agendamentoAtualizado = { ...agendamentos.find(a => a.id === id)!, ...updates };
      setAgendamentos(prev => prev.map(a => (a.id === id ? agendamentoAtualizado : a)));
      return agendamentoAtualizado;
    }
    
    const { data } = await api.put<Agendamento>(`/agendamentos/${id}`, updates);
    setAgendamentos(prev => prev.map(a => (a.id === id ? data : a)));
    return data;
  }, [api, agendamentos]);

  const cancel = useCallback(async (id: string) => {
    // Se for usuário demo, simular cancelamento
    if (isDemoUser()) {
      setAgendamentos(prev => 
        prev.map(a => (a.id === id ? { ...a, status: 'cancelado' } as Agendamento : a))
      );
      return;
    }
    
    await api.delete(`/agendamentos/${id}`);
    // Marca como cancelado localmente
    setAgendamentos(prev => 
      prev.map(a => (a.id === id ? { ...a, status: 'cancelado' } as Agendamento : a))
    );
  }, [api]);

  const getAgendamentoById = useCallback((id: string) => {
    return agendamentos.find(a => a.id === id);
  }, [agendamentos]);

  const getAgendamentosAtivos = useCallback(() => {
    return agendamentos.filter(a => a.status !== 'cancelado');
  }, [agendamentos]);

  const getAgendamentosPorData = useCallback((data: string) => {
    return agendamentos.filter(a => a.data === data && a.status !== 'cancelado');
  }, [agendamentos]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <AgendamentosContext.Provider 
      value={{ 
        agendamentos, 
        loading,
        refresh, 
        create, 
        update, 
        cancel,
        getAgendamentoById,
        getAgendamentosAtivos,
        getAgendamentosPorData
      }}
    >
      {children}
    </AgendamentosContext.Provider>
  );
};

export function useAgendamentos() {
  const context = useContext(AgendamentosContext);
  if (!context) {
    throw new Error('useAgendamentos deve ser usado dentro de AgendamentosProvider');
  }
  return context;
}