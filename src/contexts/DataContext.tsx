import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useApi } from './ApiContext';
import { DEMO_DATA, isDemoUser } from '../data/demoData';

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
        setClientes(DEMO_DATA.clientes);
        return;
      }
      
      const { data } = await api.get<Cliente[]>('/clientes');
      setClientes(data);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  }, [api]);

  const refreshServicos = useCallback(async () => {
    try {
      // Se for usuário demo, usar dados fictícios  
      if (isDemoUser()) {
        setServicos(DEMO_DATA.servicos);
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