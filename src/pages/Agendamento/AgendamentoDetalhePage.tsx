import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApi, useAgendamentos } from '../../contexts';
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
  CancelarButton,
  ModalBg,
  ModalBox,
  ModalTitle,
  ModalText,
  ModalInputRow,
  ModalInput,
  ModalActions,
  ModalButton,
  ModalCancelButton
} from './AgendamentoDetalhePage.style';
import { FiScissors, FiCalendar, FiCheck } from 'react-icons/fi';

type Agendamento = {
  id: string;
  clienteId: string;
  servico: string;
  data: string; // YYYY-MM-DD
  horario: string; // HH:mm
  status: 'confirmado' | 'cancelado' | 'concluido' | string;
};

type Cliente = {
  id: string;
  nome: string;
  apelido?: string;
  telefone?: string;
  avatarUrl?: string;
};

const AgendamentoDetalhePage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const api = useApi();
  const { update, cancel } = useAgendamentos();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [agendamento, setAgendamento] = useState<Agendamento | null>(null);
  const [cliente, setCliente] = useState<Cliente | null>(null);

  // Modal states
  const [openRemarcar, setOpenRemarcar] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [openCancelar, setOpenCancelar] = useState(false);
  const [novaData, setNovaData] = useState('');
  const [novoHorario, setNovoHorario] = useState('');
  const [novoServico, setNovoServico] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const { data: ag } = await api.get<Agendamento>(`/agendamentos/${id}`);
        if (!alive) return;
        setAgendamento(ag);
        if (ag?.clienteId) {
          const { data: cli } = await api.get<Cliente>(`/clientes/${ag.clienteId}`);
          if (!alive) return;
          setCliente(cli);
        }
      } catch (e: any) {
        if (!alive) return;
        setError(e?.response?.data?.error || 'Não foi possível carregar o agendamento.');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [id, api]);

  function formatarDataHora(data: string, hora: string) {
    const meses = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
    const d = new Date(data + 'T' + hora);
    return `${d.getDate()} de ${meses[d.getMonth()]}, ${d.getFullYear()} às ${hora}`;
  }

  if (!id) {
    return (
      <PageBg>
        <HeaderBar>
          <BackButton onClick={() => navigate(-1)}>&#8592;</BackButton>
          <HeaderTitle>Agendamento inválido</HeaderTitle>
        </HeaderBar>
      </PageBg>
    );
  }

  if (loading) {
    return (
      <PageBg>
        <HeaderBar>
          <BackButton onClick={() => navigate(-1)}>&#8592;</BackButton>
          <HeaderTitle>Carregando...</HeaderTitle>
        </HeaderBar>
      </PageBg>
    );
  }

  if (error) {
    return (
      <PageBg>
        <HeaderBar>
          <BackButton onClick={() => navigate(-1)}>&#8592;</BackButton>
          <HeaderTitle>Detalhes do Agendamento</HeaderTitle>
        </HeaderBar>
        <InfoSection>
          <InfoItem>
            <div>
              <InfoLabel>Erro</InfoLabel>
              <InfoValue>{error}</InfoValue>
            </div>
          </InfoItem>
        </InfoSection>
      </PageBg>
    );
  }

  if (!agendamento) {
    return (
      <PageBg>
        <HeaderBar>
          <BackButton onClick={() => navigate(-1)}>&#8592;</BackButton>
          <HeaderTitle>Agendamento não encontrado</HeaderTitle>
        </HeaderBar>
      </PageBg>
    );
  }

  return (
    <PageBg>
      <HeaderBar>
        <BackButton onClick={() => navigate(-1)}>&#8592;</BackButton>
        <HeaderTitle>Detalhes do Agendamento</HeaderTitle>
      </HeaderBar>
      <ClienteSection>
        <Avatar src={(cliente && cliente.avatarUrl) || '/icon1.png'} alt={cliente?.nome || 'Cliente'} />
        <div>
          <ClienteNome>{cliente?.nome || 'Cliente'}</ClienteNome>
          <ClienteSub>{cliente?.apelido ? `(${cliente.apelido})` : 'Cliente'}</ClienteSub>
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
        <RemarcarButton onClick={() => {
          setNovaData(agendamento.data);
          setNovoHorario(agendamento.horario);
          setOpenRemarcar(true);
        }}>Remarcar</RemarcarButton>
        <EditarButton onClick={() => {
          setNovoServico(agendamento.servico);
          setOpenEditar(true);
        }}>Editar</EditarButton>
      </Actions>
      <CancelarButton onClick={() => setOpenCancelar(true)}>Cancelar Agendamento</CancelarButton>

      {openRemarcar && (
        <ModalBg>
          <ModalBox>
            <ModalTitle>Remarcar agendamento</ModalTitle>
            <ModalInputRow>
              <ModalInput
                type="date"
                value={novaData}
                onChange={(e) => setNovaData(e.target.value)}
              />
              <ModalInput
                type="time"
                value={novoHorario}
                onChange={(e) => setNovoHorario(e.target.value)}
              />
            </ModalInputRow>
            <ModalActions>
              <ModalCancelButton onClick={() => setOpenRemarcar(false)}>Cancelar</ModalCancelButton>
              <ModalButton
                onClick={async () => {
                  setSaving(true);
                  try {
                    const updated = await update(agendamento.id, { data: novaData, horario: novoHorario });
                    setAgendamento(updated);
                    setOpenRemarcar(false);
                  } catch (err: any) {
                    alert(err.response?.data?.error || 'Erro ao remarcar');
                  } finally {
                    setSaving(false);
                  }
                }}
                disabled={saving || !novaData || !novoHorario}
              >
                Salvar
              </ModalButton>
            </ModalActions>
          </ModalBox>
        </ModalBg>
      )}

      {openEditar && (
        <ModalBg>
          <ModalBox>
            <ModalTitle>Editar serviço</ModalTitle>
            <ModalInputRow>
              <ModalInput
                type="text"
                placeholder="Serviço"
                value={novoServico}
                onChange={(e) => setNovoServico(e.target.value)}
              />
            </ModalInputRow>
            <ModalActions>
              <ModalCancelButton onClick={() => setOpenEditar(false)}>Cancelar</ModalCancelButton>
              <ModalButton
                onClick={async () => {
                  if (!novoServico.trim()) return;
                  setSaving(true);
                  try {
                    const updated = await update(agendamento.id, { servico: novoServico.trim() });
                    setAgendamento(updated);
                    setOpenEditar(false);
                  } catch (err: any) {
                    alert(err.response?.data?.error || 'Erro ao editar');
                  } finally {
                    setSaving(false);
                  }
                }}
                disabled={saving || !novoServico.trim()}
              >
                Salvar
              </ModalButton>
            </ModalActions>
          </ModalBox>
        </ModalBg>
      )}

      {openCancelar && (
        <ModalBg>
          <ModalBox>
            <ModalTitle>Cancelar agendamento</ModalTitle>
            <ModalText>Tem certeza que deseja cancelar este agendamento?</ModalText>
            <ModalActions>
              <ModalCancelButton onClick={() => setOpenCancelar(false)}>Voltar</ModalCancelButton>
              <ModalButton
                onClick={async () => {
                  setSaving(true);
                  try {
                    await cancel(agendamento.id);
                    setOpenCancelar(false);
                    navigate(-1);
                  } catch (err: any) {
                    alert(err.response?.data?.error || 'Erro ao cancelar');
                  } finally {
                    setSaving(false);
                  }
                }}
                disabled={saving}
              >
                Confirmar
              </ModalButton>
            </ModalActions>
          </ModalBox>
        </ModalBg>
      )}
    </PageBg>
  );
};

export default AgendamentoDetalhePage;
