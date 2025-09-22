
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import { PageBg, HeaderBar, BackButton, HeaderTitle, MainContent } from './AgendaPage.style';
import { Input, Select, Button, Form, Field, Label, ErrorMsg, SuccessMsg, Footer } from './AgendaPage.style';


interface Cliente {
  id: string;
  nome: string;
  apelido?: string;
  telefone: string;
}

const AgendaPage: React.FC = () => {
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

  const isPausaAlmoco = (horario: string, dataSelecionada: string): boolean => {
    if (!dataSelecionada) return false;
    const dia = new Date(dataSelecionada + 'T00:00:00').getDay();
    // dia: 0=Dom, 1=Seg, ..., 6=Sab
    if (dia >= 1 && dia <= 5) {
      return horario === '12:00' || horario === '12:30';
    }
    if (dia === 6) {
      return horario === '13:00' || horario === '13:30';
    }
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setSucesso('');
    if (!clienteId || !data || !horario) {
      setErro('Preencha todos os campos obrigatórios.');
      return;
    }
    setLoading(true);
    try {
      await axios.post('https://app-barber-hmm9.onrender.com/agendamentos', { clienteId, data, horario });
      setSucesso('Agendamento realizado com sucesso!');
      setClienteId('');
      setData('');
      setHorario('');
    } catch (err: any) {
      setErro(err.response?.data?.error || 'Erro ao agendar');
    } finally {
      setLoading(false);
    }
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
        </MainContent>
        <Footer />
      </PageBg>
    </>
  );
};

export default AgendaPage;
