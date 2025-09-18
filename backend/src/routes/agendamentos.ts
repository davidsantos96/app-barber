import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../supabaseClient';

const router = Router();

// Define the path to the data file

interface Agendamento {
  id: string;
  clienteId: string;
  data: string; // formato ISO
  horario: string; // HH:mm
  status: 'confirmado' | 'cancelado' | 'concluido';
}

// CRUD de agendamentos

// Listar agendamentos
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('agendamentos').select('*');
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data ?? []);
});


// Criar agendamento
router.post('/', async (req, res) => {
  const { clienteId, data: dataAgendamento, horario } = req.body;
  if (!clienteId || !dataAgendamento || !horario) {
    return res.status(400).json({ error: 'Dados obrigatórios ausentes' });
  }
  // Verifica sobreposição de horários
  const { data: existentes, error: errorExistentes } = await supabase
    .from('agendamentos')
    .select('*')
    .eq('data', dataAgendamento)
    .eq('horario', horario)
    .eq('status', 'confirmado');
  if (errorExistentes) {
    return res.status(500).json({ error: errorExistentes.message });
  }
  if (existentes && existentes.length > 0) {
    return res.status(409).json({ error: 'Horário já ocupado' });
  }
  const novoAgendamento: Agendamento = {
    id: uuidv4(),
    clienteId,
    data: dataAgendamento,
    horario,
    status: 'confirmado'
  };
  const { data, error } = await supabase.from('agendamentos').insert([novoAgendamento]).select();
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.status(201).json(data?.[0] ?? novoAgendamento);
});



// Atualizar agendamento (reagendar)
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { horario, data: dataAgendamento, status } = req.body;
  // Verifica se existe agendamento
  const { data: agendamentoAtual, error: errorAtual } = await supabase
    .from('agendamentos')
    .select('*')
    .eq('id', id);
  if (errorAtual) {
    return res.status(500).json({ error: errorAtual.message });
  }
  if (!agendamentoAtual || agendamentoAtual.length === 0) {
    return res.status(404).json({ error: 'Agendamento não encontrado' });
  }
  // Verifica sobreposição de horários
  if (dataAgendamento && horario) {
    const { data: existentes, error: errorExistentes } = await supabase
      .from('agendamentos')
      .select('*')
      .eq('data', dataAgendamento)
      .eq('horario', horario)
      .eq('status', 'confirmado')
      .neq('id', id);
    if (errorExistentes) {
      return res.status(500).json({ error: errorExistentes.message });
    }
    if (existentes && existentes.length > 0) {
      return res.status(409).json({ error: 'Horário já ocupado' });
    }
  }
  const updateObj: Partial<Agendamento> = {};
  if (dataAgendamento) updateObj.data = dataAgendamento;
  if (horario) updateObj.horario = horario;
  if (status) updateObj.status = status;
  const { data, error } = await supabase
    .from('agendamentos')
    .update(updateObj)
    .eq('id', id)
    .select();
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data?.[0] ?? updateObj);
});


// Cancelar agendamento
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  // Verifica se existe agendamento
  const { data: agendamentoAtual, error: errorAtual } = await supabase
    .from('agendamentos')
    .select('*')
    .eq('id', id);
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
    .eq('id', id);
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.status(204).send();
});

export default router;
