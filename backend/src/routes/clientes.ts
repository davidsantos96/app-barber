import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

const dataPath = path.join(__dirname, '..', '..', 'data');

const getClientesFilePath = (username: string) => {
  const userDir = path.join(dataPath, username);
  if (!fs.existsSync(userDir)) {
    fs.mkdirSync(userDir, { recursive: true });
  }
  return path.join(userDir, 'clientes.json');
};

interface Cliente {
  id: string;
  nome: string;
  apelido?: string;
  telefone: string;
}

const readClientes = (username: string): Cliente[] => {
  const filePath = getClientesFilePath(username);
  try {
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      if (!fileContent) return [];
      const data = JSON.parse(fileContent);
      return Array.isArray(data) ? data : [];
    }
  } catch (error) {
    console.error(`Error reading clientes.json for user ${username}:`, error);
  }
  return [];
};

const writeClientes = (username: string, data: Cliente[]) => {
  const filePath = getClientesFilePath(username);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error(`Error writing clientes.json for user ${username}:`, error);
  }
};

export function __internal_reset_clientes(): void {
  // This is now handled in debug.ts
}

// Listar clientes
router.get('/', (req, res) => {
  const username = req.user!.username;
  const clientes = readClientes(username);
  res.json(clientes);
});

// Criar cliente
router.post('/', (req, res) => {
  const username = req.user!.username;
  const { nome, apelido, telefone } = req.body;
  if (!nome || !telefone) {
    return res.status(400).json({ error: 'Nome e telefone são obrigatórios' });
  }
  const novoCliente: Cliente = { id: uuidv4(), nome, apelido, telefone };
  const clientes = readClientes(username);
  clientes.push(novoCliente);
  writeClientes(username, clientes);
  res.status(201).json(novoCliente);
});

export default router;