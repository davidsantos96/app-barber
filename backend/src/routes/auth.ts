import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

const router = Router();

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