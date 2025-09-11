import { Router } from 'express';

const router = Router();

// Simulação de banco de dados em memória
interface Cliente {
  id: string;
  nome: string;
  apelido?: string;
  telefone: string;
}

const clientes: Cliente[] = [];

// CRUD de clientes
// Listar clientes
router.get('/', (req, res) => {
  res.json(clientes);
});

// Criar cliente
router.post('/', (req, res) => {
  const { nome, apelido, telefone } = req.body;
  if (!nome || !telefone) {
    return res.status(400).json({ error: 'Nome e telefone são obrigatórios' });
  }
  if (clientes.some(c => c.telefone === telefone)) {
    return res.status(409).json({ error: 'Telefone já cadastrado' });
  }
  const novoCliente: Cliente = {
    id: (clientes.length + 1).toString(),
    nome,
    apelido,
    telefone
  };
  clientes.push(novoCliente);
  res.status(201).json(novoCliente);
});

export default router;
