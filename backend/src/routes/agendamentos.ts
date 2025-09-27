import { Router, Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../supabaseClient';

const router = Router();

// Define the path to the data file

interface Agendamento {
  id: string;
  clienteId: string;
  servicoId: string;
  servico: string;
  data: string; // formato ISO
  horario: string; // HH:mm
  duracao_minutos?: number;
  status: 'confirmado' | 'cancelado' | 'concluido';
  user_id: string;
}

// CRUD de agendamentos

// Listar agendamentos
router.get('/', async (req: Request, res) => {
  const userId = req.user?.username;
  if (!userId) return res.status(401).json({ error: 'Não autenticado' });
  const { data, error } = await supabase.from('agendamentos').select('*').eq('user_id', userId);
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data ?? []);
});

// Buscar agendamento por id
router.get('/:id', async (req: Request, res) => {
  const userId = req.user?.username;
  if (!userId) return res.status(401).json({ error: 'Não autenticado' });
  const { id } = req.params;
  const { data, error } = await supabase.from('agendamentos').select('*').eq('id', id).eq('user_id', userId);
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  if (!data || data.length === 0) {
    return res.status(404).json({ error: 'Agendamento não encontrado' });
  }
  res.json(data[0]);
});


// Criar agendamento
router.post('/', async (req: Request, res) => {
  const userId = req.user?.username;
  if (!userId) return res.status(401).json({ error: 'Não autenticado' });
  const { clienteId, servicoId, servico, data: dataAgendamento, horario, duracao_minutos } = req.body;
  if (!clienteId || !servicoId || !servico || !dataAgendamento || !horario) {
    return res.status(400).json({ error: 'Dados obrigatórios ausentes' });
  }
  const duracao = Number(duracao_minutos) > 0 ? Number(duracao_minutos) : 30;
  // Carrega todos do dia para checar intervalo
  const { data: existentes, error: errorExistentes } = await supabase
    .from('agendamentos')
    .select('*')
    .eq('data', dataAgendamento)
    .eq('status', 'confirmado');
  if (errorExistentes) {
    return res.status(500).json({ error: errorExistentes.message });
  }
  const [h, m] = horario.split(':').map(Number);
  const inicioNovo = h * 60 + m;
  const fimNovo = inicioNovo + duracao;
  const conflito = (existentes || []).some(a => {
    if (!a.horario) return false;
    const aDur = a.duracao_minutos || 30;
    const [ah, am] = a.horario.split(':').map(Number);
    const inicioA = ah * 60 + am;
    const fimA = inicioA + aDur;
    return (inicioNovo < fimA) && (fimNovo > inicioA);
  });
  if (conflito) {
    return res.status(409).json({ error: 'Conflito de horário dentro da duração escolhida' });
  }
  const novoAgendamento: Agendamento = {
    id: uuidv4(),
    clienteId,
    servicoId,
    servico,
    data: dataAgendamento,
    horario,
    duracao_minutos: duracao,
    status: 'confirmado',
    user_id: userId
  };
  const { data, error } = await supabase.from('agendamentos').insert([novoAgendamento]).select();
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.status(201).json(data?.[0] ?? novoAgendamento);
});



// Atualizar agendamento (reagendar)
router.put('/:id', async (req: Request, res) => {
  const userId = req.user?.username;
  if (!userId) return res.status(401).json({ error: 'Não autenticado' });
  const { id } = req.params;
  const { horario, data: dataAgendamento, status, duracao_minutos } = req.body;
  // Verifica se existe agendamento
  const { data: agendamentoAtual, error: errorAtual } = await supabase
    .from('agendamentos')
    .select('*')
    .eq('id', id)
    .eq('user_id', userId);
  if (errorAtual) {
    return res.status(500).json({ error: errorAtual.message });
  }
  if (!agendamentoAtual || agendamentoAtual.length === 0) {
    return res.status(404).json({ error: 'Agendamento não encontrado' });
  }
  // Verifica sobreposição de horários
  if ((dataAgendamento || horario || duracao_minutos)) {
    const dataBase = dataAgendamento || agendamentoAtual[0].data;
    const horarioBase = horario || agendamentoAtual[0].horario;
    const durBase = duracao_minutos ? Number(duracao_minutos) : (agendamentoAtual[0].duracao_minutos || 30);
    const { data: existentes, error: errorExistentes } = await supabase
      .from('agendamentos')
      .select('*')
      .eq('data', dataBase)
      .eq('status', 'confirmado')
      .neq('id', id);
    if (errorExistentes) {
      return res.status(500).json({ error: errorExistentes.message });
    }
    const [hh, mm] = horarioBase.split(':').map(Number);
    const inicioNovo = hh * 60 + mm;
    const fimNovo = inicioNovo + durBase;
    const conflito = (existentes || []).some(a => {
      if (!a.horario) return false;
      const aDur = a.duracao_minutos || 30;
      const [ah, am] = a.horario.split(':').map(Number);
      const inicioA = ah * 60 + am;
      const fimA = inicioA + aDur;
      return (inicioNovo < fimA) && (fimNovo > inicioA);
    });
    if (conflito) {
      return res.status(409).json({ error: 'Conflito de horário dentro da duração escolhida' });
    }
  }
  const updateObj: Partial<Agendamento> = {};
  if (dataAgendamento) updateObj.data = dataAgendamento;
  if (horario) updateObj.horario = horario;
  if (status) updateObj.status = status;
  if (duracao_minutos) updateObj.duracao_minutos = Number(duracao_minutos);
  const { data, error } = await supabase
    .from('agendamentos')
    .update(updateObj)
    .eq('id', id)
    .eq('user_id', userId)
    .select();
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data?.[0] ?? updateObj);
});


// Cancelar agendamento
router.delete('/:id', async (req: Request, res) => {
  const userId = req.user?.username;
  if (!userId) return res.status(401).json({ error: 'Não autenticado' });
  const { id } = req.params;
  // Verifica se existe agendamento
  const { data: agendamentoAtual, error: errorAtual } = await supabase
    .from('agendamentos')
    .select('*')
    .eq('id', id)
    .eq('user_id', userId);
  if (errorAtual) {
    return res.status(500).json({ error: errorAtual.message });
  }
  if (!agendamentoAtual || agendamentoAtual.length === 0) {
    return res.status(404).json({ error: 'Agendamento não encontrado' });
  }
  // Atualiza status para cancelado
  const { error } = await supabase
    .from('agendamentos')
    .update({ status: 'cancelado' })
    .eq('id', id)
    .eq('user_id', userId);
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.status(204).send();
});

export default router;
