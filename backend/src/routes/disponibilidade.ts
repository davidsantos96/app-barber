import { Router } from 'express';

const router = Router();

// Simulação de banco de dados em memória
interface Disponibilidade {
  diaSemana: number; // 0=Domingo, 6=Sábado
  horarios: string[];
}

const disponibilidades: Disponibilidade[] = [];

// CRUD de disponibilidade
// Listar disponibilidade
router.get('/', (req, res) => {
  res.json(disponibilidades);
});

// Definir ou atualizar disponibilidade de um dia da semana
router.post('/', (req, res) => {
  const { diaSemana, horarios } = req.body;
  if (typeof diaSemana !== 'number' || !Array.isArray(horarios)) {
    return res.status(400).json({ error: 'Dados inválidos' });
  }
  const idx = disponibilidades.findIndex(d => d.diaSemana === diaSemana);
  if (idx >= 0) {
    disponibilidades[idx].horarios = horarios;
  } else {
    disponibilidades.push({ diaSemana, horarios });
  }
  res.status(201).json({ diaSemana, horarios });
});

export default router;
