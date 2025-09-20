
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import styled from 'styled-components';
import { PageBg, HeaderBar, BackButton, HeaderTitle, MainContent, Footer } from './AgendaPage.style';

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

const Form = styled.form`
  background: rgba(40, 40, 40, 0.98);
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
  max-width: 400px;
  margin: 2rem auto 2rem auto;
  color: #f5f5f5;
`;
const Field = styled.div`
  margin-bottom: 1.2rem;
`;
const Label = styled.label`
  display: block;
  margin-bottom: 0.4rem;
  font-weight: 500;
`;
const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #444;
  background: #232526;
  color: #fff;
  font-size: 1rem;
  @media (max-width: 600px) {
    font-size: 0.97rem;
    padding: 0.4rem 0.7rem;
    border-radius: 7px;
  }
`;
const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #444;
  background: #232526;
  color: #fff;
  font-size: 1rem;
  @media (max-width: 600px) {
    font-size: 0.97rem;
    padding: 0.4rem 0.7rem;
    border-radius: 7px;
  }
`;
const Button = styled.button`
  background: #434343;
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: background 0.2s;
  margin-top: 0.5rem;
  &:hover {
    background: #232526;
  }
  @media (max-width: 600px) {
    font-size: 0.97rem;
    padding: 0.6rem 1rem;
    border-radius: 7px;
  }
`;
const ErrorMsg = styled.div`
  color: #ff4d4f;
  margin-top: 0.5rem;
`;
const SuccessMsg = styled.div`
  color: #4caf50;
  margin-top: 0.5rem;
`;
const SubTitle = styled.h3`
  font-size: 1.2rem;
  margin-top: 2rem;
  color: #ccc;
`;
const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;
const ListItem = styled.li`
  padding: 0.5rem 0;
  border-bottom: 1px solid #333;
  color: #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const CancelButton = styled(Button)`
  background: #ff4d4f;
  margin-left: 1rem;
  &:hover {
    background: #b71c1c;
  }
`;

const AppointmentForm: React.FC<{ onSuccess?: () => void }> = ({ onSuccess }) => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clienteId, setClienteId] = useState('');
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [loading, setLoading] = useState(false);
  const horariosFixos = Array.from({ length: (20 - 9) * 2 + 1 }, (_, i) => {
    const hora = 9 + Math.floor(i / 2);
    const minuto = (i % 2) * 30;
    return `${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}`;
  });
  const [agendados, setAgendados] = useState<string[]>([]);

  const isPausaAlmoco = (horario: string, dataSelecionada: string): boolean => {
    if (!dataSelecionada) return false;
    const dia = new Date(dataSelecionada + 'T00:00:00').getDay();
    // dia: 0=Dom, 1=Seg, ..., 6=Sab
    if (dia >= 1 && dia <= 5) { // Segunda a Sexta
      return horario === '12:00' || horario === '12:30';
    }
    if (dia === 6) { // Sábado
      return horario === '13:00' || horario === '13:30';
    }
    return false;
  };

  useEffect(() => {
  axios.get('https://app-barber-hmm9.onrender.com/clientes').then(res => setClientes(res.data));
  }, []);

  useEffect(() => {
    // Buscar horários agendados para o dia selecionado
    if (data) {
      const resAgendados = async () => {
  const res = await axios.get('https://app-barber-hmm9.onrender.com/agendamentos');
        const ags = res.data.filter((a: any) => a.data === data && a.status === 'confirmado');
        setAgendados(ags.map((a: any) => a.horario));
      };
      resAgendados();
    } else {
      setAgendados([]);
    }
    setHorario('');
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setSucesso('');
    if (!clienteId || !data || !horario) {
      toast.error('Preencha todos os campos obrigatórios.');
      return;
    }
    setLoading(true);
    try {
  await axios.post('https://app-barber-hmm9.onrender.com/agendamentos', { clienteId, data, horario });
      toast.success('Agendamento realizado!');
      setClienteId('');
      setData('');
      setHorario('');
      if (onSuccess) onSuccess();
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Erro ao agendar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Field>
        <Label>Cliente*</Label>
        <Select value={clienteId} onChange={e => setClienteId(e.target.value)} required>
          <option value="">Selecione</option>
          {clientes.map(c => (
            <option key={c.id} value={c.id}>{c.nome} {c.apelido && `(${c.apelido})`}</option>
          ))}
        </Select>
      </Field>
      <Field>
        <Label>Data*</Label>
        <Input type="date" value={data} onChange={e => setData(e.target.value)} required />
      </Field>
      <Field>
        <Label>Horário*</Label>
        <Select value={horario} onChange={e => setHorario(e.target.value)} required disabled={!data}>
          <option value="">Selecione</option>
          {horariosFixos.map(h => {
            const isAlmoco = isPausaAlmoco(h, data);
            const isAgendado = agendados.includes(h);
            const isDisabled = isAlmoco || isAgendado;
            return (
              <option key={h} value={h} disabled={isDisabled}>
                {h} {isAgendado ? '(Indisponível)' : isAlmoco ? '(Almoço)' : ''}
              </option>
            );
          })}
        </Select>
      </Field>
      <Button type="submit" disabled={loading}>Agendar</Button>
      {erro && <ErrorMsg>{erro}</ErrorMsg>}
      {sucesso && <SuccessMsg>{sucesso}</SuccessMsg>}
    </Form>
  );
};

const AgendaPage: React.FC = () => {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);

  const fetchAgendamentos = async () => {
  const res = await axios.get<Agendamento[]>('https://app-barber-hmm9.onrender.com/agendamentos');
    setAgendamentos(res.data.filter(a => a.status === 'confirmado'));
  };

  const fetchClientes = async () => {
  const res = await axios.get<Cliente[]>('https://app-barber-hmm9.onrender.com/clientes');
    setClientes(res.data);
  };

  useEffect(() => {
    fetchAgendamentos();
    fetchClientes();
  }, []);

  const cancelar = async (id: string) => {
  await axios.delete(`https://app-barber-hmm9.onrender.com/agendamentos/${id}`);
    fetchAgendamentos();
  };

  const getClienteNome = (id: string) => {
    const cliente = clientes.find(c => c.id === id);
    return cliente ? `${cliente.nome}${cliente.apelido ? ' (' + cliente.apelido + ')' : ''}` : id;
  };

  return (
    <>
      <Navbar />
      <PageBg>
        <HeaderBar>
          <BackButton onClick={() => window.history.back()}>
            &#8592;
          </BackButton>
          <HeaderTitle>Novo Agendamento</HeaderTitle>
          <div style={{ width: 32 }} />
        </HeaderBar>
        <MainContent>
          <AppointmentForm onSuccess={fetchAgendamentos} />
        </MainContent>
        <Footer />
      </PageBg>
    </>
  );
};

export default AgendaPage;
