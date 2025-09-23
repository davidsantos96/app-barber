import React, { createContext, useContext, useState } from 'react';

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (user: string, pass: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => false,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

// Credenciais para demo
const DEMO_USERS = [
  { user: 'admin', pass: 'admin' },
  { user: 'demo', pass: 'demo' },
  { user: 'barber', pass: '123' },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('auth'));
  
  const login = (user: string, pass: string) => {
    // Verificar se é uma das credenciais válidas
    const isValidUser = DEMO_USERS.some(u => u.user === user && u.pass === pass);
    
    if (isValidUser) {
      localStorage.setItem('auth', '1');
      localStorage.setItem('user', user);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };
  const logout = () => {
    localStorage.removeItem('auth');
    setIsAuthenticated(false);
  };
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
