import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();
const filePath = path.join(__dirname, '../../data/servicos.json');

function readServicos() {
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}
function writeServicos(servicos: any[]) {
  fs.writeFileSync(filePath, JSON.stringify(servicos, null, 2));
}

// GET /servicos
router.get('/', (req, res) => {
  res.json(readServicos());
});

// GET /servicos/:id
router.get('/:id', (req, res) => {
  const servicos = readServicos();
  const servico = servicos.find((s: any) => s.id === req.params.id);
  if (!servico) return res.status(404).json({ error: 'Serviço não encontrado' });
  res.json(servico);
});

// POST /servicos
router.post('/', (req, res) => {
  const servicos = readServicos();
  const { nome, preco } = req.body;
  if (!nome || preco == null) return res.status(400).json({ error: 'Nome e preço obrigatórios' });
  const id = Date.now().toString();
  const novo = { id, nome, preco };
  servicos.push(novo);
  writeServicos(servicos);
  res.status(201).json(novo);
});

// PUT /servicos/:id
router.put('/:id', (req, res) => {
  const servicos = readServicos();
  const idx = servicos.findIndex((s: any) => s.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Serviço não encontrado' });
  const { nome, preco } = req.body;
  if (!nome || preco == null) return res.status(400).json({ error: 'Nome e preço obrigatórios' });
  servicos[idx] = { ...servicos[idx], nome, preco };
  writeServicos(servicos);
  res.json(servicos[idx]);
});

// DELETE /servicos/:id
router.delete('/:id', (req, res) => {
  let servicos = readServicos();
  const idx = servicos.findIndex((s: any) => s.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Serviço não encontrado' });
  const removido = servicos[idx];
  servicos = servicos.filter((s: any) => s.id !== req.params.id);
  writeServicos(servicos);
  res.json(removido);
});

export default router;
