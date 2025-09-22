import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/Login/LoginPage';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import AgendaPage from '../pages/Agendamento/AgendaPage';
import NovoAgendamentoPage from '../pages/Agendamento/NovoAgendamento/NovoAgendamentoPage';
import ClientesPage from '../pages/Clientes/ClientesPage';
import NovoClientePage from '../pages/Clientes/NovoCliente/NovoClientePage';
import DisponibilidadePage from '../pages/Disponibilidade/DisponibilidadePage';
import ServicosPage from '../pages/Servicos/ServicosPage';
import AgendamentoDetalhePage from '../pages/Agendamento/AgendamentoDetalhePage';
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
