import React, { createContext, useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
// Usar logo1.png da pasta public
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AgendaPage from './pages/AgendaPage';
import ClientesPage from './pages/ClientesPage';
import DisponibilidadePage from './pages/DisponibilidadePage';
import { ToastContainer } from 'react-toastify';
import api from './api';
import 'react-toastify/dist/ReactToastify.css';

// Auth Context

// AuthContext fixo para uso exclusivo do barbeiro (admin)
interface AuthContextType {
  isAuthenticated: boolean;
  login: (user: string, pass: string) => Promise<boolean>;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => Promise.resolve(false),
  logout: () => { },
});
export const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('authToken'));

  const login = async (user: string, pass: string) => {
    try {
      const response = await api.post('/auth/login', { user, pass });
      const { token } = response.data;
      localStorage.setItem('authToken', token);
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error("Falha no login", error);
      return false;
    }
  };
  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Rota protegida
const PrivateRoute = ({ element }: { element: React.JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/" />;
};


const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    min-height: 100vh;
    font-family: 'Segoe UI', Arial, sans-serif;
    background: linear-gradient(135deg, #232526 0%, #414345 100%);
    color: #f5f5f5;
    position: relative;
    overflow-x: hidden;
  }
  body::before {
    content: '';
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 60vw;
    max-width: 500px;
    height: 60vw;
    max-height: 500px;
    background: url('/logo1.png') no-repeat center center;
    background-size: contain;
  opacity: 0.20;
    z-index: 0;
    pointer-events: none;
  }
`;

const Header = styled.header`
  width: 100%;
  background: linear-gradient(90deg, #232526 0%, #434343 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  min-height: 64px;
  height: 64px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  position: relative;
  overflow: hidden;
`;

const Logo = styled.img`
  height: 48px;
  display: block;
`;

function App() {
  return (
    <AuthProvider>
      <GlobalStyle />
      <Header>
        <Logo src="/logo1.png" alt="Logo AppBarber" />
      </Header>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<PrivateRoute element={<DashboardPage />} />} />
          <Route path="/agenda" element={<PrivateRoute element={<AgendaPage />} />} />
          <Route path="/clientes" element={<PrivateRoute element={<ClientesPage />} />} />
          <Route path="/disponibilidade" element={<PrivateRoute element={<DisponibilidadePage />} />} />
        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={3000} />
    </AuthProvider>
  );
}

export default App;
