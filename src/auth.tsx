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

const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('auth'));
  const login = (user: string, pass: string) => {
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      localStorage.setItem('auth', '1');
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
