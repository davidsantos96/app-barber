
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import styled from 'styled-components';

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
const Container = styled.main`
  max-width: 800px;
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
  font-size: 2rem;
  margin-bottom: 1.2rem;
  font-weight: 700;
  color: #fff;
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
  const horariosFixos = Array.from({ length: 13 }, (_, i) => {
    const h = 8 + i;
    return `${h.toString().padStart(2, '0')}:00`;
  });
  const [agendados, setAgendados] = useState<string[]>([]);

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
          {horariosFixos.map(h => (
            <option key={h} value={h} disabled={agendados.includes(h)}>
              {h} {agendados.includes(h) ? '(Indisponível)' : ''}
            </option>
          ))}
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
      <Container>
        <Title>Agenda</Title>
        <AppointmentForm onSuccess={fetchAgendamentos} />
        <SubTitle>Agendamentos</SubTitle>
        <List>
          {agendamentos.map(a => (
            <ListItem key={a.id}>
              <span>{a.data} {a.horario} - Cliente: {getClienteNome(a.clienteId)}</span>
              <CancelButton onClick={() => cancelar(a.id)}>Cancelar</CancelButton>
            </ListItem>
          ))}
        </List>
      </Container>
    </>
  );
};

export default AgendaPage;
