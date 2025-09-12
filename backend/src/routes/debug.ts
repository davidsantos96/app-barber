import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();

const dataPath = path.join(__dirname, '..', '..', 'data');

// Endpoint para limpar o "banco de dados" (arquivos JSON)
router.post('/reset-database', (req, res) => {
  try {
    // Remove e recria o diretório de dados para limpar tudo.
    fs.rmSync(dataPath, { recursive: true, force: true });
    fs.mkdirSync(dataPath, { recursive: true });
    res.status(200).json({ message: 'Todos os dados de todos os usuários foram limpos com sucesso.' });
  } catch (error) {
    console.error('Erro ao limpar o banco de dados:', error);
    res.status(500).json({ error: 'Falha ao limpar o banco de dados.' });
  }
});

export default router;