import { Router } from 'express';

const router = Router();

// Simulação de banco de dados em memória
interface Agendamento {
  id: string;
  clienteId: string;
  data: string; // formato ISO
  horario: string; // HH:mm
  status: 'confirmado' | 'cancelado';
}

const agendamentos: Agendamento[] = [];

// CRUD de agendamentos
// Listar agendamentos
router.get('/', (req, res) => {
  res.json(agendamentos);
});

// Criar agendamento
router.post('/', (req, res) => {
  const { clienteId, data, horario } = req.body;
  if (!clienteId || !data || !horario) {
    return res.status(400).json({ error: 'Dados obrigatórios ausentes' });
  }
  // Não permitir sobreposição de horários
  const existe = agendamentos.some(a => a.data === data && a.horario === horario && a.status === 'confirmado');
  if (existe) {
    return res.status(409).json({ error: 'Horário já ocupado' });
  }
  const novoAgendamento: Agendamento = {
    id: (agendamentos.length + 1).toString(),
    clienteId,
    data,
    horario,
    status: 'confirmado'
  };
  agendamentos.push(novoAgendamento);
  res.status(201).json(novoAgendamento);
});

// Cancelar agendamento
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const agendamento = agendamentos.find(a => a.id === id);
  if (!agendamento) {
    return res.status(404).json({ error: 'Agendamento não encontrado' });
  }
  agendamento.status = 'cancelado';
  res.status(204).send();
});

export default router;
