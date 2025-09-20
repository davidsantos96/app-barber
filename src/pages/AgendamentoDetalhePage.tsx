import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  PageBg,
  HeaderBar,
  HeaderTitle,
  BackButton,
  ClienteSection,
  Avatar,
  ClienteNome,
  ClienteSub,
  InfoSection,
  InfoItem,
  InfoIcon,
  InfoLabel,
  InfoValue,
  Actions,
  RemarcarButton,
  EditarButton,
  CancelarButton
} from './AgendamentoDetalhePage.style';
import { FiScissors, FiCalendar, FiCheck } from 'react-icons/fi';

const AgendamentoDetalhePage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [agendamento, setAgendamento] = useState<any>(null);
  const [cliente, setCliente] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const agRes = await axios.get(`https://app-barber-hmm9.onrender.com/agendamentos/${id}`);
      setAgendamento(agRes.data);
      const clRes = await axios.get(`https://app-barber-hmm9.onrender.com/clientes/${agRes.data.clienteId}`);
      setCliente(clRes.data);
    }
    fetchData();
  }, [id]);

  function formatarDataHora(data: string, hora: string) {
    const meses = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
    const d = new Date(data + 'T' + hora);
    return `${d.getDate()} de ${meses[d.getMonth()]}, ${d.getFullYear()} às ${hora}`;
  }

  if (!agendamento || !cliente) return <PageBg><HeaderBar><HeaderTitle>Detalhes do Agendamento</HeaderTitle></HeaderBar></PageBg>;

  return (
    <PageBg>
      <HeaderBar>
        <BackButton onClick={() => navigate(-1)}>&#8592;</BackButton>
        <HeaderTitle>Detalhes do Agendamento</HeaderTitle>
      </HeaderBar>
      <ClienteSection>
        <Avatar src={cliente.avatarUrl || '/icon1.png'} alt={cliente.nome} />
        <div>
          <ClienteNome>{cliente.nome}</ClienteNome>
          <ClienteSub>Cliente recorrente</ClienteSub>
        </div>
      </ClienteSection>
      <InfoSection>
        <InfoItem>
          <InfoIcon><FiScissors color="#FFD700" size={24} /></InfoIcon>
          <div>
            <InfoLabel>Serviço</InfoLabel>
            <InfoValue>{agendamento.servico}</InfoValue>
          </div>
        </InfoItem>
        <InfoItem>
          <InfoIcon><FiCalendar color="#FFD700" size={24} /></InfoIcon>
          <div>
            <InfoLabel>Data e Hora</InfoLabel>
            <InfoValue>{formatarDataHora(agendamento.data, agendamento.horario)}</InfoValue>
          </div>
        </InfoItem>
        <InfoItem>
          <InfoIcon><FiCheck color="#FFD700" size={24} /></InfoIcon>
          <div>
            <InfoLabel>Status</InfoLabel>
            <InfoValue>{agendamento.status === 'confirmado' ? 'Confirmado' : agendamento.status}</InfoValue>
          </div>
        </InfoItem>
      </InfoSection>
      <Actions>
        <RemarcarButton onClick={async () => {
          const novaData = prompt('Nova data (YYYY-MM-DD):', agendamento.data);
          const novoHorario = prompt('Novo horário (HH:mm):', agendamento.horario);
          if (novaData && novoHorario) {
            try {
              await axios.put(`https://app-barber-hmm9.onrender.com/agendamentos/${agendamento.id}`, {
                data: novaData,
                horario: novoHorario
              });
              alert('Agendamento remarcado!');
              window.location.reload();
            } catch (err: any) {
              alert(err.response?.data?.error || 'Erro ao remarcar');
            }
          }
        }}>Remarcar</RemarcarButton>
        <EditarButton onClick={async () => {
          const novoServico = prompt('Novo serviço:', agendamento.servico);
          if (novoServico) {
            try {
              await axios.put(`https://app-barber-hmm9.onrender.com/agendamentos/${agendamento.id}`, {
                servico: novoServico
              });
              alert('Serviço atualizado!');
              window.location.reload();
            } catch (err: any) {
              alert(err.response?.data?.error || 'Erro ao editar');
            }
          }
        }}>Editar</EditarButton>
      </Actions>
      <CancelarButton onClick={async () => {
        if (window.confirm('Deseja cancelar este agendamento?')) {
          try {
            await axios.delete(`https://app-barber-hmm9.onrender.com/agendamentos/${agendamento.id}`);
            alert('Agendamento cancelado!');
            window.location.reload();
          } catch (err: any) {
            alert(err.response?.data?.error || 'Erro ao cancelar');
          }
        }
      }}>Cancelar Agendamento</CancelarButton>
    </PageBg>
  );
};

export default AgendamentoDetalhePage;
