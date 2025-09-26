import { Router } from 'express';
import fs from 'fs';
import path from 'path';
// Removed internal reset imports (no longer exported). If needed, implement explicit reset helpers.

const router = Router();

const dataPath = path.join(__dirname, '..', '..', 'data');
const agendamentosFilePath = path.join(dataPath, 'agendamentos.json');
const clientesFilePath = path.join(dataPath, 'clientes.json');

// Endpoint para limpar o "banco de dados" (arquivos JSON)
router.post('/reset-database', (req, res) => {
  try {
    const emptyData = JSON.stringify([], null, 2);

    // Limpa o arquivo de agendamentos e clientes
    fs.writeFileSync(agendamentosFilePath, emptyData, 'utf-8');
    fs.writeFileSync(clientesFilePath, emptyData, 'utf-8');

    // Limpa os arrays em memória para evitar a necessidade de reiniciar o servidor
  // In-memory arrays no longer used; data cleared only on disk.

    res.status(200).json({ message: 'Banco de dados limpo com sucesso.' });
  } catch (error) {
    console.error('Erro ao limpar o banco de dados:', error);
    res.status(500).json({ error: 'Falha ao limpar o banco de dados.' });
  }
});

export default router;