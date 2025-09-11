import React, { createContext, useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import logo from './assets/react.svg'; // Substitua pelo logo real depois
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AgendaPage from './pages/AgendaPage';
import ClientesPage from './pages/ClientesPage';
import DisponibilidadePage from './pages/DisponibilidadePage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Auth Context

// AuthContext fixo para uso exclusivo do barbeiro (admin)
interface AuthContextType {
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

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

// Rota protegida
const PrivateRoute = ({ element }: { element: React.JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/" />;
};


const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    min-height: 100vh;
    font-family: 'Segoe UI', Arial, sans-serif;
    background: linear-gradient(135deg, #232526 0%, #414345 100%);
    color: #f5f5f5;
  }
`;

const Header = styled.header`
  width: 100%;
  background: linear-gradient(90deg, #232526 0%, #434343 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0;
  min-height: 64px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
`;

const Logo = styled.img`
  height: 40px;
  display: block;
`;

function App() {
  return (
    <AuthProvider>
      <GlobalStyle />
      <Header>
        <Logo src={logo} alt="Logo AppBarber" />
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
