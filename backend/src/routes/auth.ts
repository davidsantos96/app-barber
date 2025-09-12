import { Router } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();

// ATENÇÃO: Em um ambiente de produção, esta chave deve ser muito mais complexa
// e armazenada de forma segura, como em uma variável de ambiente.
const JWT_SECRET = 'sua-chave-secreta-super-longa-e-aleatoria-aqui';

// Em um app real, isso viria de um banco de dados.
const users = [
  { user: 'admin', pass: 'admin' },
  { user: 'barbeiro', pass: 'barbeiro123' }
];

router.post('/login', (req, res) => {
  const { user, pass } = req.body;
  const foundUser = users.find(u => u.user === user && u.pass === pass);

  if (!foundUser) {
    return res.status(401).json({ error: 'Usuário ou senha inválidos' });
  }

  // Gera um token que expira em 1 dia.
  const token = jwt.sign({ username: foundUser.user }, JWT_SECRET, { expiresIn: '1d' });

  res.json({ token });
});

export default router;