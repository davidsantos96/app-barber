
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PageBg,
  HeaderBar,
  BackButton,
  HeaderTitle,
  MainContent,
  FormCard,
  FieldGroup,
  IconLeft,
  Input,
  Select,
  AgendarButton,
  ClienteSuggestions,
  ClienteSuggestionItem,
  ClienteSuggestionEmpty,

} from '../AgendaPage.style';
import { FiUser, FiScissors, FiCalendar, FiClock } from 'react-icons/fi';
import { useRef } from 'react';
import { useData, useAgendamentos } from '../../../contexts';

const NovoAgendamentoPage: React.FC = () => {
  const dateInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { clientes, servicos } = useData();
  const { create, agendamentos } = useAgendamentos();
  
  // Removido duplicidade de clienteId/setClienteId
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [clienteId, setClienteId] = useState('');
  const [servicoId, setServicoId] = useState('');
  const [servicoNome, setServicoNome] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  // Duração derivada do serviço selecionado
  const [duracao, setDuracao] = useState<number | undefined>(undefined);
  const horaInputRef = useRef<HTMLSelectElement>(null);
  // Gerar horários de 30 em 30 minutos das 9h às 20h
  const horarios = Array.from({ length: ((20 - 9) * 2) + 1 }, (_, i) => {
    const h = 9 + Math.floor(i / 2);
    const m = (i % 2) * 30;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  });
  // Helpers para checar conflitos
  const toMinutes = (hm: string) => {
    const [h, m] = hm.split(':').map(Number); return h * 60 + m;
  };
  const FIM_EXPEDIENTE = 20 * 60; // 20:00

  const agendamentosDoDia = agendamentos.filter(a => a.data === data && a.status === 'confirmado');

  const isHorarioConflitante = (inicio: string): boolean => {
    if (!data) return false; // ainda não selecionou data
    const dur = (duracao || servicos.find(s=>s.id===servicoId)?.duracao_minutos || 30);
    const start = toMinutes(inicio);
    const end = start + dur;
    // Ultrapassa expediente
    if (end > FIM_EXPEDIENTE) return true;
    return agendamentosDoDia.some(a => {
      const aStart = toMinutes(a.horario);
      const aDur = a.duracao_minutos || 30;
      const aEnd = aStart + aDur;
      return (start < aEnd) && (end > aStart);
    });
  };

  const [loading, setLoading] = useState(false);
  const [searchCliente, setSearchCliente] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clienteId || !servicoId || !data || !hora) {
      alert('Preencha todos os campos!');
      return;
    }
    setLoading(true);
    try {
      await create({
        clienteId,
        servicoId,
        servico: servicoNome,
        data,
        horario: hora,
        duracao_minutos: duracao || servicos.find(s=>s.id===servicoId)?.duracao_minutos || 30
      });
      navigate(-1);
    } catch (err: any) {
      alert(err.response?.data?.error || 'Erro ao agendar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageBg>
      <HeaderBar>
        <BackButton onClick={() => navigate(-1)}>
          &#8592;
        </BackButton>
        <HeaderTitle>Novo Agendamento</HeaderTitle>
        <div style={{ width: 32 }} />
      </HeaderBar>
      <MainContent>
        <FormCard as="form" onSubmit={handleSubmit}>
          <FieldGroup>
            <IconLeft><FiUser /></IconLeft>
            <Input
              type="text"
              placeholder="Pesquisar cliente..."
              value={searchCliente}
              onChange={e => {
                setSearchCliente(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            />
            {showSuggestions && searchCliente.trim() && (
              <ClienteSuggestions>
                {clientes
                  .filter((c) =>
                    c.nome.toLowerCase().includes(searchCliente.toLowerCase()) ||
                    (c.apelido && c.apelido.toLowerCase().includes(searchCliente.toLowerCase()))
                  )
                  .map((c) => (
                    <ClienteSuggestionItem
                      key={c.id}
                      $selected={clienteId === c.id}
                      onMouseDown={() => {
                        setClienteId(c.id);
                        setSearchCliente(c.nome + (c.apelido ? ` (${c.apelido})` : ''));
                        setShowSuggestions(false);
                      }}
                    >
                      {c.nome} {c.apelido && `(${c.apelido})`}
                    </ClienteSuggestionItem>
                  ))}
                {clientes.filter((c) =>
                  c.nome.toLowerCase().includes(searchCliente.toLowerCase()) ||
                  (c.apelido && c.apelido.toLowerCase().includes(searchCliente.toLowerCase()))
                ).length === 0 && (
                    <ClienteSuggestionEmpty>Nenhum cliente encontrado</ClienteSuggestionEmpty>
                  )}
              </ClienteSuggestions>
            )}
          </FieldGroup>
          <FieldGroup>
            <IconLeft><FiScissors /></IconLeft>
            <Select
              value={servicoId}
              onChange={e => {
                setServicoId(e.target.value);
                const servico = servicos.find(s => s.id === e.target.value);
                setServicoNome(servico ? servico.nome : '');
                setDuracao(servico?.duracao_minutos || 30);
              }}
              required
            >
              <option value="">Selecione o Serviço</option>
              {servicos.map((s) => (
                <option key={s.id} value={s.id}>{s.nome}</option>
              ))}
            </Select>
          </FieldGroup>
          {servicoId && (
            <div style={{ color: '#aaa', margin: '-0.6rem 0 0.8rem 2.2rem', fontSize: '0.85rem' }}>
              Duração: {duracao || servicos.find(s=>s.id===servicoId)?.duracao_minutos || 30} min
            </div>
          )}
          <FieldGroup>
            <IconLeft>
              <FiCalendar style={{ cursor: 'pointer' }} onClick={() => dateInputRef.current?.showPicker()} />
            </IconLeft>
            <Input
              ref={dateInputRef}
              type="date"
              value={data}
              onChange={e => setData(e.target.value)}
              required
              placeholder="Data"
            />
          </FieldGroup>
          <FieldGroup>
            <IconLeft>
              <FiClock style={{ cursor: 'pointer' }} onClick={() => horaInputRef.current?.focus()} />
            </IconLeft>
            <Select
              ref={horaInputRef}
              value={hora}
              onChange={e => setHora(e.target.value)}
              required
              disabled={!data || !servicoId}
            >
              <option value="">Selecione o horário</option>
              {horarios.map(h => {
                const disabled = isHorarioConflitante(h);
                return (
                  <option key={h} value={h} disabled={disabled}>
                    {h}{disabled ? ' (indisp.)' : ''}
                  </option>
                );
              })}
            </Select>
          </FieldGroup>
          <AgendarButton type="submit">
            {loading ? 'Agendando...' : 'Agendar'}
          </AgendarButton>
        </FormCard>
      </MainContent>
    </PageBg>
  );
};

export default NovoAgendamentoPage;
