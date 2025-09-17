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

const backupsPath = path.join(dataPath, 'backups');
if (!fs.existsSync(backupsPath)) {
  fs.mkdirSync(backupsPath, { recursive: true });
}

const writeClientes = (data: Cliente[]) => {
  try {
    fs.writeFileSync(clientesFilePath, JSON.stringify(data, null, 2), 'utf-8');
    // Backup automático
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFile = path.join(backupsPath, `clientes-backup-${timestamp}.json`);
    fs.copyFileSync(clientesFilePath, backupFile);
  } catch (error) {
    console.error('Error writing clientes.json or backup:', error);
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
  // Validação do formato: (11)91234-5678
  const telefoneRegex = /^\(\d{2}\)\d{5}-\d{4}$/;
  if (!telefoneRegex.test(telefone)) {
    return res.status(400).json({ error: 'Telefone deve estar no formato (11)91234-5678' });
  }
  const novoCliente: Cliente = { id: uuidv4(), nome, apelido, telefone };
  clientes.push(novoCliente);
  writeClientes(clientes);
  res.status(201).json(novoCliente);
});

// Editar cliente
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nome, apelido, telefone } = req.body;
  if (!nome || !telefone) {
    return res.status(400).json({ error: 'Nome e telefone são obrigatórios' });
  }
  const telefoneRegex = /^\(\d{2}\)\d{5}-\d{4}$/;
  if (!telefoneRegex.test(telefone)) {
    return res.status(400).json({ error: 'Telefone deve estar no formato (11)91234-5678' });
  }
  const idx = clientes.findIndex(c => c.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Cliente não encontrado' });
  }
  clientes[idx] = { ...clientes[idx], nome, apelido, telefone };
  writeClientes(clientes);
  res.json(clientes[idx]);
});

export default router;