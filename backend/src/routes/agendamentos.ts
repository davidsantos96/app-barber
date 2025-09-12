import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Define the path to the data file
const dataPath = path.join(__dirname, '..', '..', 'data');

const getAgendamentosFilePath = (username: string) => {
  const userDir = path.join(dataPath, username);
  if (!fs.existsSync(userDir)) {
    fs.mkdirSync(userDir, { recursive: true });
  }
  return path.join(userDir, 'agendamentos.json');
};

// Simulação de banco de dados em memória
interface Agendamento {
  id: string;
  clienteId: string;
  data: string; // formato ISO
  horario: string; // HH:mm
  status: 'confirmado' | 'cancelado' | 'concluido';
}

const readAgendamentos = (username: string): Agendamento[] => {
  const filePath = getAgendamentosFilePath(username);
  try {
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      if (!fileContent) return [];
      const data = JSON.parse(fileContent);
      return Array.isArray(data) ? data : [];
    }
  } catch (error) {
    console.error(`Error reading agendamentos.json for user ${username}:`, error);
  }
  return [];
};

const writeAgendamentos = (username: string, data: Agendamento[]) => {
  const filePath = getAgendamentosFilePath(username);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error(`Error writing agendamentos.json for user ${username}:`, error);
  }
};

export function __internal_reset_agendamentos(): void {
  // This is now handled in debug.ts
}

// CRUD de agendamentos
// Listar agendamentos
router.get('/', (req, res) => {
  const username = req.user!.username;
  const agendamentos = readAgendamentos(username);
  res.json(agendamentos);
});

// Criar agendamento
router.post('/', (req, res) => {
  const username = req.user!.username;
  const { clienteId, data, horario } = req.body;
  if (!clienteId || !data || !horario) {
    return res.status(400).json({ error: 'Dados obrigatórios ausentes' });
  }
  const agendamentos = readAgendamentos(username);
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
  writeAgendamentos(username, agendamentos);
  res.status(201).json(novoAgendamento);
});


// Atualizar agendamento (reagendar)
router.put('/:id', (req, res) => {
  const username = req.user!.username;
  const { id } = req.params;
  const { horario, data, status } = req.body;
  const agendamentos = readAgendamentos(username);
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

  writeAgendamentos(username, agendamentos);
  res.json(agendamento);
});

// Cancelar agendamento
router.delete('/:id', (req, res) => {
  const username = req.user!.username;
  const { id } = req.params;
  const agendamentos = readAgendamentos(username);
  const agendamentoIndex = agendamentos.findIndex(a => a.id === id);
  if (agendamentoIndex === -1) {
    return res.status(404).json({ error: 'Agendamento não encontrado' });
  }
  agendamentos[agendamentoIndex].status = 'cancelado';
  writeAgendamentos(username, agendamentos);
  res.status(204).send();
});

export default router;
