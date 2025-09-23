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
  
  // Verificar se existe usuário logado ao inicializar
  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    const foundUser = USERS.find(u => u.username === username && u.password === password);
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('userId', foundUser.id);
      localStorage.setItem('user', foundUser.username); // Para compatibilidade
      localStorage.setItem('auth', '1'); // Para compatibilidade
      return true;
    }
    return false;
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem('userId');
    localStorage.removeItem('user');
    localStorage.removeItem('auth');
  };

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
