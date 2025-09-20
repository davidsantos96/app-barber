
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  PageBg,
  HeaderBar,
  BackButton,
  HeaderTitle,
  MainContent,
  Form,
  FieldGroup,
  IconLeft,
  Select,
  Input,
  Footer,
  AgendarButton
} from './AgendaPage.style';
import { FiUser, FiScissors, FiCalendar, FiClock } from 'react-icons/fi';
import { useRef } from 'react';

const NovoAgendamentoPage: React.FC = () => {
  const dateInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [clientes, setClientes] = useState([]);
  // Removido duplicidade de clienteId/setClienteId
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [clienteId, setClienteId] = useState('');
  const [servicoId, setServicoId] = useState('');
  const [servicoNome, setServicoNome] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const horaInputRef = useRef<HTMLSelectElement>(null);
  // Gerar horários de 30 em 30 minutos das 9h às 20h
  const horarios = Array.from({ length: ((20 - 9) * 2) + 1 }, (_, i) => {
    const h = 9 + Math.floor(i / 2);
    const m = (i % 2) * 30;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  });
  const [loading, setLoading] = useState(false);
  const [searchCliente, setSearchCliente] = useState('');


interface Servico {
  id: string;
  nome: string;
  preco: number;
}
const [servicos, setServicos] = useState<Servico[]>([]);


  useEffect(() => {
    axios.get('https://app-barber-hmm9.onrender.com/clientes').then(res => setClientes(res.data));
    axios.get('https://app-barber-hmm9.onrender.com/servicos').then(res => setServicos(res.data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clienteId || !servicoId || !data || !hora) {
      alert('Preencha todos os campos!');
      return;
    }
    setLoading(true);
    try {
      await axios.post('https://app-barber-hmm9.onrender.com/agendamentos', {
        clienteId,
        servicoId,
        servico: servicoNome,
        data,
        horario: hora
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
        <Form onSubmit={handleSubmit}>
          <FieldGroup style={{ position: 'relative' }}>
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
              style={{ paddingLeft: '2.8rem', marginBottom: '0.7rem' }}
            />
            {showSuggestions && searchCliente.trim() && (
              <ul style={{
                position: 'absolute',
                top: '110%',
                left: 0,
                right: 0,
                background: '#232526',
                borderRadius: '0.75rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                zIndex: 10,
                maxHeight: '180px',
                overflowY: 'auto',
                margin: 0,
                padding: '0.3rem 0',
                listStyle: 'none',
              }}>
                {clientes
                  .filter((c: any) =>
                    c.nome.toLowerCase().includes(searchCliente.toLowerCase()) ||
                    (c.apelido && c.apelido.toLowerCase().includes(searchCliente.toLowerCase()))
                  )
                  .map((c: any) => (
                    <li
                      key={c.id}
                      style={{
                        padding: '0.7rem 1.2rem',
                        cursor: 'pointer',
                        color: '#fff',
                        borderBottom: '1px solid #333',
                        background: clienteId === c.id ? '#3B82F6' : 'transparent',
                      }}
                      onMouseDown={() => {
                        setClienteId(c.id);
                        setSearchCliente(c.nome + (c.apelido ? ` (${c.apelido})` : ''));
                        setShowSuggestions(false);
                      }}
                    >
                      {c.nome} {c.apelido && `(${c.apelido})`}
                    </li>
                  ))}
                {clientes.filter((c: any) =>
                  c.nome.toLowerCase().includes(searchCliente.toLowerCase()) ||
                  (c.apelido && c.apelido.toLowerCase().includes(searchCliente.toLowerCase()))
                ).length === 0 && (
                    <li style={{ padding: '0.7rem 1.2rem', color: '#aaa' }}>Nenhum cliente encontrado</li>
                  )}
              </ul>
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
              }}
              required
            >
              <option value="">Selecione o Serviço</option>
              {servicos.map((s: any) => (
                <option key={s.id} value={s.id}>{s.nome}</option>
              ))}
            </Select>
          </FieldGroup>
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
              style={{ paddingLeft: '2.8rem' }}
            >
              <option value="">Selecione o horário</option>
              {horarios.map(h => (
                <option key={h} value={h}>{h}</option>
              ))}
            </Select>
          </FieldGroup>
          <Footer>
            <AgendarButton type="submit">
              {loading ? 'Agendando...' : 'Agendar'}
            </AgendarButton>
          </Footer>
        </Form>
      </MainContent>
    </PageBg>
  );
};

export default NovoAgendamentoPage;
