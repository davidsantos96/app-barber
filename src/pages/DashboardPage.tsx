
// ...existing code...
import Navbar from '../components/Navbar';
import styled from 'styled-components';

const Container = styled.main`
  max-width: 900px;
  margin: 2rem auto;
  background: rgba(30, 30, 30, 0.95);
  border-radius: 16px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.25);
  padding: 2.5rem 2rem;
  color: #f5f5f5;
  @media (max-width: 600px) {
    max-width: 98vw;
    padding: 1rem 0.5rem;
    border-radius: 8px;
  }
`;

const Title = styled.h2`
  font-size: 2.2rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
  letter-spacing: 1px;
  color: #fff;
`;


import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Cliente {
  id: string;
  nome: string;
  apelido?: string;
  telefone: string;
}

interface Agendamento {
  id: string;
  clienteId: string;
  data: string;
  horario: string;
  status: 'confirmado' | 'cancelado';
}

interface CardProps {
  disabled?: boolean;
}
const Card = styled.div<CardProps>`
  background: #232526;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
  padding: 1.2rem 1.5rem;
  margin-bottom: 1.2rem;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  filter: ${({ disabled }) => (disabled ? 'grayscale(0.7)' : 'none')};
    @media (max-width: 600px) {
      padding: 1rem 0.5rem;
      font-size: 0.97rem;
      border-radius: 7px;
    }
  `;

const DashboardPage: React.FC = () => {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    const fetchData = async () => {
  const agRes = await axios.get<Agendamento[]>('https://app-barber-hmm9.onrender.com/agendamentos');
  const clRes = await axios.get<Cliente[]>('https://app-barber-hmm9.onrender.com/clientes');
      setAgendamentos(agRes.data);
      setClientes(clRes.data);
    };
    fetchData();
  }, []);

  // Filtrar agendamentos do dia atual e ordenar por horário
  const hoje = new Date().toISOString().slice(0, 10);
  const agendamentosHoje = agendamentos
    .filter(a => a.data === hoje && a.status === 'confirmado')
    .sort((a, b) => a.horario.localeCompare(b.horario));

  const getCliente = (id: string) => clientes.find(c => c.id === id);

  const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

  return (
    <>
      <Navbar />
      <Container>
        <Title>Agendamentos de Hoje</Title>
        {agendamentosHoje.length === 0 && <p>Nenhum agendamento para hoje.</p>}
        {agendamentosHoje.map(a => {
          const cliente = getCliente(a.clienteId);
          const dataObj = new Date(a.data + 'T00:00:00');
          const diaNome = diasSemana[dataObj.getDay()];
          const dataFormatada = `${dataObj.getDate().toString().padStart(2, '0')}/${(dataObj.getMonth()+1).toString().padStart(2, '0')}/${dataObj.getFullYear()}`;
          // Considera concluído se o horário já passou
          const agora = new Date();
          const horarioAg = new Date(a.data + 'T' + a.horario);
          const isConcluido = a.status === 'cancelado' || horarioAg < agora;
          return (
            <Card key={a.id} disabled={isConcluido}>
              <strong>{a.horario}</strong>
              <span>Data: {dataFormatada} / {diaNome}</span>
              <span>Cliente: {cliente ? cliente.nome : a.clienteId} {cliente?.apelido && `(${cliente.apelido})`}</span>
              <span>Telefone: {cliente?.telefone || '-'}</span>
            </Card>
          );
        })}
      </Container>
    </>
  );
};

export default DashboardPage;
