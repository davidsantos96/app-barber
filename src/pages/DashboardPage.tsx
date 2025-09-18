import ReactDOM from 'react-dom';
// Horários fixos disponíveis
const HORARIOS = Array.from({ length: (20 - 9) * 2 + 1 }, (_, i) => {
  const hora = 9 + Math.floor(i / 2);
  const minuto = (i % 2) * 30;
  return `${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`;
});

const isPausaAlmoco = (horario: string, data: string): boolean => {
  if (!data) return false;
  const dia = new Date(data + 'T00:00:00').getDay();
  // dia: 0=Dom, 1=Seg, ..., 6=Sab
  if (dia >= 1 && dia <= 5) { // Segunda a Sexta
    return horario === '12:00' || horario === '12:30';
  }
  if (dia === 6) { // Sábado
    return horario === '13:00' || horario === '13:30';
  }
  return false;
};

const ModalBg = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.55);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ModalBox = styled.div`
  background: #181818;
  border-radius: 12px;
  padding: 2rem 1.5rem;
  min-width: 280px;
  max-width: 95vw;
  color: #fff;
  box-shadow: 0 2px 16px rgba(0,0,0,0.25);
`;
const ModalTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 1.2rem;
  font-size: 1.2rem;
`;
const ModalSelect = styled.select`
  width: 100%;
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #444;
  background: #232526;
  color: #fff;
  font-size: 1rem;
  margin-bottom: 1.2rem;
`;
const ModalActions = styled.div`
  display: flex;
  gap: 0.7rem;
  justify-content: flex-end;
`;

// ...existing code...
import Navbar from '../components/Navbar';
import styled from 'styled-components';

const Container = styled.main`
  max-width: 900px;
  margin: 2rem auto;
  background: rgba(15, 15, 15, 0.97);
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
import { toast } from 'react-toastify';

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
  status: 'confirmado' | 'cancelado' | 'concluido';
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
  position: relative;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  filter: ${({ disabled }) => (disabled ? 'grayscale(0.7)' : 'none')};
  @media (max-width: 600px) {
    padding: 1rem 0.5rem;
    font-size: 0.97rem;
    border-radius: 7px;
  }
`;

const CardActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.38rem;
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  align-items: flex-end;
  @media (max-width: 600px) {
    top: 0.7rem;
    right: 0.5rem;
    gap: 0.28rem;
  }
`;

const ActionButton = styled.button<{ color?: string }>`
  background: ${({ color }) => color || '#232526'};
  color: #fff;
  border: 1px solid ${({ color }) => color || '#444'};
  border-radius: 6px;
  padding: 0.28rem 0.7rem;
  font-size: 0.93rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border 0.2s;
  &:hover {
    filter: brightness(1.1);
    opacity: 0.92;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;


const DashboardPage: React.FC = () => {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [totalClientes, setTotalClientes] = useState<number>(0);
  const [totalAgendamentos, setTotalAgendamentos] = useState<number>(0);
  const [proximosAgendamentos, setProximosAgendamentos] = useState<Agendamento[]>([]);
  const [modalAgendamento, setModalAgendamento] = useState<Agendamento|null>(null);
  const [novoHorario, setNovoHorario] = useState('');
  const [loadingReagendar, setLoadingReagendar] = useState(false);

  const fetchData = async () => {
    try {
      // Busca dashboard e dados completos
      const dashRes = await axios.get('https://app-barber-hmm9.onrender.com/dashboard');
      setTotalClientes(dashRes.data.totalClientes ?? 0);
      setTotalAgendamentos(dashRes.data.totalAgendamentos ?? 0);
      setProximosAgendamentos(dashRes.data.proximosAgendamentos ?? []);

      // Busca todos agendamentos e clientes para funcionalidades da tela
      const [agRes, clRes] = await Promise.all([
        axios.get<Agendamento[]>('https://app-barber-hmm9.onrender.com/agendamentos'),
        axios.get<Cliente[]>('https://app-barber-hmm9.onrender.com/clientes')
      ]);
      setAgendamentos(agRes.data);
      setClientes(clRes.data);
    } catch (error) {
      toast.error("Falha ao buscar dados do servidor.");
      console.error("Fetch data error:", error);
    }
  };
  // Exemplo de exibição das métricas e próximos agendamentos
  // Adicione onde desejar no JSX:
  // <Card>
  //   <div>Total de clientes: {totalClientes}</div>
  //   <div>Total de agendamentos: {totalAgendamentos}</div>
  //   <div>Próximos agendamentos:</div>
  //   <ul>
  //     {proximosAgendamentos.map(a => (
  //       <li key={a.id}>{a.data} {a.horario} - Cliente: {getCliente(a.clienteId)?.nome ?? a.clienteId}</li>
  //     ))}
  //   </ul>
  // </Card>

  const handleConcluir = async (agendamentoId: string) => {
    if (window.confirm('Marcar este agendamento como concluído?')) {
      try {
        await axios.put(`https://app-barber-hmm9.onrender.com/agendamentos/${agendamentoId}`, { status: 'concluido' });
        await fetchData();
        toast.success('Agendamento concluído!');
      } catch (err: any) {
        toast.error(err.response?.data?.error || 'Erro ao concluir agendamento.');
      }
    }
  };

  const handleCancelar = async (agendamentoId: string) => {
    if (window.confirm('Deseja cancelar este agendamento?')) {
      try {
        await axios.delete(`https://app-barber-hmm9.onrender.com/agendamentos/${agendamentoId}`);
        await fetchData();
        toast.success('Agendamento cancelado!');
      } catch (err: any) {
        toast.error(err.response?.data?.error || 'Erro ao cancelar agendamento.');
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filtrar agendamentos do dia atual e ordenar por horário
  const hoje = new Date().toISOString().slice(0, 10);
  const agendamentosHoje = agendamentos
    .filter(a => a.data === hoje && a.status === 'confirmado')
    .sort((a, b) => a.horario.localeCompare(b.horario));

  const getCliente = (id: string) => clientes.find(c => c.id === id);
  const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

  // Horários disponíveis para reagendar (não ocupados no mesmo dia)
  function getHorariosDisponiveis(data: string, agendamentoId?: string) {
    const ocupados = agendamentos.filter(a => a.data === data && a.status === 'confirmado' && a.id !== agendamentoId).map(a => a.horario);
    return HORARIOS.filter(h => !ocupados.includes(h) && !isPausaAlmoco(h, data));
  }

  async function handleReagendar() {
    if (!modalAgendamento || !novoHorario) return;
    setLoadingReagendar(true);
    try {
      await axios.put(`https://app-barber-hmm9.onrender.com/agendamentos/${modalAgendamento.id}`, {
        ...modalAgendamento,
        horario: novoHorario
      });
      setModalAgendamento(null);
      setNovoHorario('');
      // Atualizar lista
      const agRes = await axios.get<Agendamento[]>('https://app-barber-hmm9.onrender.com/agendamentos');
      setAgendamentos(agRes.data);
      toast.success('Horário reagendado!');
    } catch {
      toast.error('Erro ao reagendar.');
    } finally {
      setLoadingReagendar(false);
    }
  }

  return (
    <>
      <Navbar />
      <Container>
        <Title>Agendamentos de Hoje</Title>
        <Card>
          <div><b>Total de clientes:</b> {totalClientes}</div>
          <div><b>Total de agendamentos:</b> {totalAgendamentos}</div>
          <div><b>Próximos agendamentos:</b></div>
          <ul>
            {proximosAgendamentos.map(a => (
              <li key={a.id}>{a.data} {a.horario} - Cliente: {getCliente(a.clienteId)?.nome ?? a.clienteId}</li>
            ))}
          </ul>
        </Card>
        {agendamentosHoje.length === 0 && <p>Nenhum agendamento para hoje.</p>}
        {agendamentosHoje.map(a => {
          const cliente = getCliente(a.clienteId);
          const dataObj = new Date(a.data + 'T00:00:00');
          const diaNome = diasSemana[dataObj.getDay()];
          const dataFormatada = `${dataObj.getDate().toString().padStart(2, '0')}/${(dataObj.getMonth()+1).toString().padStart(2, '0')}/${dataObj.getFullYear()}`;
          // Considera concluído se o horário já passou
          const agora = new Date();
          const horarioAg = new Date(a.data + 'T' + a.horario);
          const isConcluido = a.status === 'cancelado' || a.status === 'concluido' || horarioAg < agora;
          return (
            <Card key={a.id} disabled={isConcluido}>
              <CardActions>
                <ActionButton color="#218838" disabled={isConcluido} onClick={() => handleConcluir(a.id)}>Concluído</ActionButton>
                {
                <ActionButton color="#185fa9" disabled={isConcluido} onClick={() => {
                  setModalAgendamento(a);
                  setNovoHorario('');
                }}>Reagendar</ActionButton>
                }
                <ActionButton color="#a82323" disabled={isConcluido} onClick={() => handleCancelar(a.id)}>Cancelar</ActionButton>
              </CardActions>
              <strong>{a.horario}</strong>
              <span>Data: {dataFormatada} / {diaNome}</span>
              <span>Cliente: {cliente ? cliente.nome : a.clienteId} {cliente?.apelido && `(${cliente.apelido})`}</span>
              <span>Telefone: {cliente?.telefone || '-'}</span>
            </Card>
          );
        })}
        {modalAgendamento && ReactDOM.createPortal(
          <ModalBg>
            <ModalBox>
              <ModalTitle>Reagendar horário</ModalTitle>
              <div style={{marginBottom: '0.7rem'}}>
                <b>Cliente:</b> {getCliente(modalAgendamento.clienteId)?.nome || modalAgendamento.clienteId}<br/>
                <b>Data:</b> {modalAgendamento.data}
              </div>
              <ModalSelect value={novoHorario} onChange={e => setNovoHorario(e.target.value)}>
                <option value="">Selecione um novo horário</option>
                {getHorariosDisponiveis(modalAgendamento.data, modalAgendamento.id).map(h => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </ModalSelect>
              <ModalActions>
                <ActionButton color="#444" onClick={() => setModalAgendamento(null)} disabled={loadingReagendar}>Fechar</ActionButton>
                <ActionButton color="#218838" onClick={handleReagendar} disabled={!novoHorario || loadingReagendar}>
                  {loadingReagendar ? 'Salvando...' : 'Salvar'}
                </ActionButton>
              </ModalActions>
            </ModalBox>
          </ModalBg>, document.body)}
      </Container>
    </>
  );
};

export default DashboardPage;
