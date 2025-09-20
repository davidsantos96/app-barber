import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import AgendaPage from '../pages/AgendaPage';
import NovoAgendamentoPage from '../pages/NovoAgendamentoPage';
import ClientesPage from '../pages/ClientesPage';
import NovoClientePage from '../pages/NovoClientePage';
import DisponibilidadePage from '../pages/DisponibilidadePage';
import ServicosPage from '../pages/ServicosPage';
import AgendamentoDetalhePage from '../pages/AgendamentoDetalhePage';
import { useAuth } from '../auth';

const PrivateRoute = ({ element }: { element: React.JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/" />;
};

const RoutesConfig: React.FC = () => (
  <Routes>
    <Route path="/" element={<LoginPage />} />
    <Route path="/dashboard" element={<PrivateRoute element={<DashboardPage />} />} />
  <Route path="/agenda" element={<PrivateRoute element={<AgendaPage />} />} />
  <Route path="/novo-agendamento" element={<PrivateRoute element={<NovoAgendamentoPage />} />} />
  <Route path="/clientes" element={<PrivateRoute element={<ClientesPage />} />} />
  <Route path="/novo-cliente" element={<PrivateRoute element={<NovoClientePage />} />} />
    <Route path="/servicos" element={<PrivateRoute element={<ServicosPage />} />} />
    <Route path="/agendamento/:id" element={<PrivateRoute element={<AgendamentoDetalhePage />} />} />
    <Route path="/disponibilidade" element={<PrivateRoute element={<DisponibilidadePage />} />} />
  </Routes>
);

export default RoutesConfig;
