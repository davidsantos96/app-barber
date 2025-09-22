import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  DashboardContainer,
  Header,
  Title,
  AddButton,
  Section,
  SectionTitle,
  CardList,
  Card,
  Avatar,
  CardInfo,
  ServiceName,
  ServiceTime,
  FooterNav,
  NavItem
} from './DashboardPage.style';
import { FiPlus, FiUser, FiScissors, FiSettings, FiCalendar } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

// ...existing code...
// ...existing code...

interface Cliente {
  id: string;
  nome: string;
  avatarUrl?: string;
}

interface Agendamento {
  id: string;
  clienteId: string;
  servico: string;
  data: string;
  horario: string;
  status: string;
}

const DashboardPage: React.FC = () => {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const navigate = useNavigate();

  const fetchAgendamentos = async () => {
    try {
      const agRes = await axios.get('https://app-barber-hmm9.onrender.com/agendamentos');
      setAgendamentos(agRes.data);
    } catch (err) {}
  };
  const fetchClientes = async () => {
    try {
      const clRes = await axios.get('https://app-barber-hmm9.onrender.com/clientes');
      setClientes(clRes.data);
    } catch (err) {}
  };
  useEffect(() => {
    fetchAgendamentos();
    fetchClientes();
  }, []);

  // Agrupa agendamentos por data
  const hojeISO = new Date().toISOString().slice(0, 10);
  const amanhaISO = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
  const agHoje = agendamentos.filter(a => a.data === hojeISO && a.status !== 'cancelado');
  const agAmanha = agendamentos.filter(a => a.data === amanhaISO && a.status !== 'cancelado');

  const getCliente = (id: string) => clientes.find(c => c.id === id);

  async function handleCardClick(a: Agendamento) {
    navigate(`/agendamento/${a.id}`);
  }

  async function handleCancel(a: Agendamento) {
    if (window.confirm('Deseja cancelar este agendamento?')) {
      try {
        await axios.delete(`https://app-barber-hmm9.onrender.com/agendamentos/${a.id}`);
        await fetchAgendamentos();
      } catch (err) {
        alert('Erro ao cancelar agendamento');
      }
    }
  }

  function renderCards(ags: Agendamento[]) {
    return (
      <CardList>
        {ags.map(a => {
          const cliente = getCliente(a.clienteId);
          return (
            <Card key={a.id} style={{ cursor: 'pointer', position: 'relative' }}>
              <Avatar src={cliente?.avatarUrl || '/icon1.png'} alt={cliente?.nome || 'Cliente'} />
              <CardInfo onClick={() => handleCardClick(a)}>
                <ServiceName>{a.servico}</ServiceName>
                <ServiceTime>{a.horario}</ServiceTime>
                <ServiceTime style={{ color: '#fff', fontWeight: 500 }}>{cliente?.nome || 'Cliente'}</ServiceTime>
              </CardInfo>
              <button style={{ position: 'absolute', top: 10, right: 10, background: 'none', border: 'none', color: '#ff3b3b', fontWeight: 700, fontSize: 18, cursor: 'pointer' }} onClick={e => { e.stopPropagation(); handleCancel(a); }}>✕</button>
            </Card>
          );
        })}
      </CardList>
    );
  }

  return (
    <DashboardContainer>
      <Header>
        <Title>Agendamentos</Title>
        <AddButton onClick={() => navigate('/novo-agendamento')}>
          <FiPlus />
        </AddButton>
      </Header>
      <Section>
        <SectionTitle>Hoje</SectionTitle>
        {agHoje.length > 0 ? renderCards(agHoje) : <ServiceTime>Nenhum agendamento para hoje.</ServiceTime>}
      </Section>
      <Section>
        <SectionTitle>Amanhã</SectionTitle>
        {agAmanha.length > 0 ? renderCards(agAmanha) : <ServiceTime>Nenhum agendamento para amanhã.</ServiceTime>}
      </Section>
      <FooterNav>
        <NavItem href="/dashboard" className="active"><FiCalendar size={22}/> Agendamentos</NavItem>
        <NavItem href="/clientes"><FiUser size={22}/> Clientes</NavItem>
        <NavItem href="/servicos"><FiScissors size={22}/> Serviços</NavItem>
        <NavItem style={{ pointerEvents: 'none', opacity: 0.5, cursor: 'not-allowed' }} href="#"><FiSettings size={22}/> Configurações</NavItem>
      </FooterNav>
    </DashboardContainer>
  );
};

export default DashboardPage;
