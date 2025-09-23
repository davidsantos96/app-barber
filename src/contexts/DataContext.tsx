import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useApi } from './ApiContext';
import { isDemoUser, getUserData, getCurrentUser } from '../data/userData';

export interface Cliente {
  id: string;
  nome: string;
  apelido?: string;
  telefone: string;
  avatarUrl?: string | null;
}

export interface Servico {
  id: string;
  nome: string;
  preco?: number;
}

type DataContextType = {
  clientes: Cliente[];
  servicos: Servico[];
  loading: boolean;
  refreshClientes: () => Promise<void>;
  refreshServicos: () => Promise<void>;
  getClienteById: (id: string) => Cliente | undefined;
  createCliente: (cliente: Omit<Cliente, 'id'>) => Promise<Cliente>;
  updateCliente: (id: string, updates: Partial<Cliente>) => Promise<Cliente>;
};

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const api = useApi();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshClientes = useCallback(async () => {
    try {
      // Se for usuário demo, usar dados fictícios
      if (isDemoUser()) {
        const demoData = getUserData('demo');
        setClientes(demoData.clientes);
        return;
      }

      // Para usuários reais (Álvaro, admin, etc.), carregar do banco de dados
      try {
        const { data } = await api.get<Cliente[]>('/clientes');
        setClientes(data);
      } catch (apiError) {
        console.warn('API não disponível, usando dados locais como fallback');
        // Fallback para dados locais apenas se a API falhar
        const currentUser = getCurrentUser();
        if (currentUser) {
          const userData = getUserData(currentUser.id);
          setClientes(userData.clientes || []);
        } else {
          setClientes([]);
        }
      }
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      setClientes([]);
    }
  }, [api]);

  const refreshServicos = useCallback(async () => {
    try {
      // Se for usuário demo, usar dados fictícios  
      if (isDemoUser()) {
        const demoData = getUserData('demo');
        if ('servicos' in demoData) {
          setServicos(demoData.servicos);
        }
        return;
      }

      // Para usuários reais, usar serviços padrão por enquanto
      const currentUser = getCurrentUser();
      if (currentUser) {
        setServicos([
          { id: 'servico-1', nome: 'Corte Masculino', preco: 25.00 },
          { id: 'servico-2', nome: 'Corte + Barba', preco: 35.00 },
          { id: 'servico-3', nome: 'Barba Completa', preco: 20.00 },
          { id: 'servico-4', nome: 'Sobrancelha', preco: 15.00 }
        ]);
        return;
      }
      
      const { data } = await api.get<Servico[]>('/servicos');
      setServicos(data);
    } catch (error) {
      console.error('Erro ao buscar serviços:', error);
    }
  }, [api]);

  const getClienteById = useCallback((id: string) => {
    return clientes.find(c => c.id === id);
  }, [clientes]);

  const createCliente = useCallback(async (cliente: Omit<Cliente, 'id'>) => {
    // Se for usuário demo, simular criação
    if (isDemoUser()) {
      const novoCliente: Cliente = {
        ...cliente,
        id: `demo-cliente-${Date.now()}`,
        avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(cliente.nome)}&background=667eea&color=fff`
      };
      setClientes(prev => [novoCliente, ...prev]);
      return novoCliente;
    }
    
    const { data } = await api.post<Cliente>('/clientes', cliente);
    setClientes(prev => [data, ...prev]);
    return data;
  }, [api]);

  const updateCliente = useCallback(async (id: string, updates: Partial<Cliente>) => {
    // Se for usuário demo, simular atualização
    if (isDemoUser()) {
      const clienteAtualizado = { ...clientes.find(c => c.id === id)!, ...updates };
      setClientes(prev => prev.map(c => (c.id === id ? clienteAtualizado : c)));
      return clienteAtualizado;
    }
    
    const { data } = await api.put<Cliente>(`/clientes/${id}`, updates);
    setClientes(prev => prev.map(c => (c.id === id ? data : c)));
    return data;
  }, [api]);

  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      await Promise.all([refreshClientes(), refreshServicos()]);
      setLoading(false);
    };
    
    loadInitialData();
  }, [refreshClientes, refreshServicos]);

  return (
    <DataContext.Provider 
      value={{ 
        clientes, 
        servicos, 
        loading,
        refreshClientes, 
        refreshServicos, 
        getClienteById,
        createCliente,
        updateCliente
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData deve ser usado dentro de DataProvider');
  }
  return context;
}