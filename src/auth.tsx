import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from './data/userData';
import { USERS, getCurrentUser } from './data/userData';
import api from './api';

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Verificar se existe usuário logado ao inicializar
  useEffect(() => {
    const initAuth = () => {
      try {
        const currentUser = getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        }
      } catch (error) {
        console.error('Erro ao inicializar autenticação:', error);
      } finally {
        setIsInitialized(true);
      }
    };
    
    initAuth();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const foundUser = USERS.find(u => u.username === username && u.password === password);
      if (!foundUser) {
        console.warn('[AUTH] Usuário não encontrado ou senha incorreta');
        return false;
      }

      // Usuário demo não gera token → pode setar direto
      if (foundUser.role === 'demo') {
        console.log('[AUTH] Login demo - sem token');
        setUser(foundUser);
        localStorage.setItem('userId', foundUser.id);
        localStorage.setItem('user', foundUser.username);
        localStorage.setItem('auth', '1');
        localStorage.removeItem('authToken');
        return true;
      }

      // Primeiro tenta obter token para evitar estado sem token
      let token: string | null = null;
      try {
        const res = await api.post('/auth/login', { user: username, pass: password });
        token = res.data?.token || null;
        if (!token) {
          console.error('[AUTH] Backend não retornou token para usuário não-demo');
          return false;
        }
        console.log('[AUTH] Token recebido tamanho:', token.length);
      } catch (err) {
        console.error('[AUTH] Falha na chamada /auth/login:', err);
        return false;
      }

      // Agora persiste usuário e token juntos
      setUser(foundUser);
      localStorage.setItem('userId', foundUser.id);
      localStorage.setItem('user', foundUser.username);
      localStorage.setItem('auth', '1');
      if (token) localStorage.setItem('authToken', token);

      return true;
    } catch (error) {
      console.error('[AUTH] Erro inesperado no login:', error);
      return false;
    }
  };
  
  const logout = () => {
    try {
      setUser(null);
      localStorage.removeItem('userId');
      localStorage.removeItem('user');
      localStorage.removeItem('auth');
      localStorage.removeItem('authToken');
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  };

  // Não renderizar até inicializar para evitar flicker
  if (!isInitialized) {
    return <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      color: 'white',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      Carregando...
    </div>;
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
