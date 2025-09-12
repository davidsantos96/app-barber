import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Define the path to the data file
const dataPath = path.join(__dirname, '..', '..', 'data');
const agendamentosFilePath = path.join(dataPath, 'agendamentos.json');

// Ensure data directory exists
if (!fs.existsSync(dataPath)) {
  fs.mkdirSync(dataPath, { recursive: true });
}
// Simulação de banco de dados em memória
interface Agendamento {
  id: string;
  clienteId: string;
  data: string; // formato ISO
  horario: string; // HH:mm
  status: 'confirmado' | 'cancelado' | 'concluido';
}

const readAgendamentos = (): Agendamento[] => {
  try {
    if (fs.existsSync(agendamentosFilePath)) {
      const fileContent = fs.readFileSync(agendamentosFilePath, 'utf-8');
      if (!fileContent) return [];
      const data = JSON.parse(fileContent);
      return Array.isArray(data) ? data : [];
    }
  } catch (error) {
    console.error('Error reading agendamentos.json:', error);
  }
  return [];
};

const writeAgendamentos = (data: Agendamento[]) => {
  try {
    fs.writeFileSync(agendamentosFilePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing agendamentos.json:', error);
  }
};

let agendamentos: Agendamento[] = readAgendamentos();

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
    id: uuidv4(),
    clienteId,
    data,
    horario,
    status: 'confirmado'
  };
  agendamentos.push(novoAgendamento);
  writeAgendamentos(agendamentos);
  res.status(201).json(novoAgendamento);
});


// Atualizar agendamento (reagendar)
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { horario, data, status } = req.body;
  const agendamentoIndex = agendamentos.findIndex(a => a.id === id);
  if (agendamentoIndex === -1) {
    return res.status(404).json({ error: 'Agendamento não encontrado' });
  }

  const agendamento = agendamentos[agendamentoIndex];
  // Não permitir sobreposição de horários
  if (data && horario) {
    const existe = agendamentos.some(a => a.data === data && a.horario === horario && a.status === 'confirmado' && a.id !== id);
    if (existe) {
      return res.status(409).json({ error: 'Horário já ocupado' });
    }
    agendamento.data = data;
    agendamento.horario = horario;
  }
  if (status) {
    agendamento.status = status;
  }

  writeAgendamentos(agendamentos);
  res.json(agendamento);
});

// Cancelar agendamento
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const agendamentoIndex = agendamentos.findIndex(a => a.id === id);
  if (agendamentoIndex === -1) {
    return res.status(404).json({ error: 'Agendamento não encontrado' });
  }
  agendamentos[agendamentoIndex].status = 'cancelado';
  writeAgendamentos(agendamentos);
  res.status(204).send();
});

export default router;
