import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

const dataPath = path.join(__dirname, '..', '..', 'data');
const clientesFilePath = path.join(dataPath, 'clientes.json');

if (!fs.existsSync(dataPath)) {
  fs.mkdirSync(dataPath, { recursive: true });
}

interface Cliente {
  id: string;
  nome: string;
  apelido?: string;
  telefone: string;
}

const readClientes = (): Cliente[] => {
  try {
    if (fs.existsSync(clientesFilePath)) {
      const fileContent = fs.readFileSync(clientesFilePath, 'utf-8');
      if (!fileContent) return [];
      const data = JSON.parse(fileContent);
      return Array.isArray(data) ? data : [];
    }
  } catch (error) {
    console.error('Error reading clientes.json:', error);
  }
  return [];
};

const writeClientes = (data: Cliente[]) => {
  try {
    fs.writeFileSync(clientesFilePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing clientes.json:', error);
  }
};

let clientes: Cliente[] = readClientes();

export function __internal_reset_clientes(): void {
  clientes.length = 0;
}

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
  const novoCliente: Cliente = { id: uuidv4(), nome, apelido, telefone };
  clientes.push(novoCliente);
  writeClientes(clientes);
  res.status(201).json(novoCliente);
});

export default router;