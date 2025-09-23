import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from './data/userData';
import { USERS, getCurrentUser } from './data/userData';

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => false,
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

  const login = (username: string, password: string): boolean => {
    try {
      const foundUser = USERS.find(u => u.username === username && u.password === password);
      
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('userId', foundUser.id);
        localStorage.setItem('user', foundUser.username);
        localStorage.setItem('auth', '1');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro no login:', error);
      return false;
    }
  };
  
  const logout = () => {
    try {
      setUser(null);
      localStorage.removeItem('userId');
      localStorage.removeItem('user');
      localStorage.removeItem('auth');
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
    <AuthContext.Provider value={{ 
      user,
      isAuthenticated: !!user, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
