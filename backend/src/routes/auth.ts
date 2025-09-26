import { Router } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const router = Router();

// ATENÇÃO: Em um ambiente de produção, esta chave deve ser muito mais complexa
// e armazenada de forma segura, como em uma variável de ambiente.
const JWT_SECRET = process.env.JWT_SECRET || '';

// Usuários estáticos (alinhar com frontend). Ideal: mover para banco posteriormente.
// Senhas aqui estão em texto puro apenas para desenvolvimento.
// Em produção: usar hash (bcrypt) e persistência real.
const users: Array<{ user: string; pass: string; role: string }> = [
  { user: 'admin',    pass: 'admin',        role: 'admin' },
  { user: 'alvaro',   pass: 'barbeiro@10',  role: 'barbeiro' },
  { user: 'barber2',  pass: '123',          role: 'barbeiro' },
  { user: 'demo',     pass: 'demo',         role: 'demo' }, // opcional: pode bloquear emissão de token
];

router.post('/login', (req, res) => {
  if (!JWT_SECRET) {
    return res.status(500).json({ error: 'JWT_SECRET não configurado no servidor' });
  }
  const { user, pass } = req.body;
  console.log('[AUTH] Tentativa de login:', user);
  const foundUser = users.find(u => u.user === user && u.pass === pass);

  if (!foundUser) {
    console.log('[AUTH] Falha login - credenciais inválidas');
    return res.status(401).json({ error: 'Usuário ou senha inválidos' });
  }

  // Opcional: bloquear token para demo
  if (foundUser.role === 'demo') {
    return res.status(200).json({ token: null, message: 'Conta demo não gera token' });
  }

  const payload = { username: foundUser.user, role: foundUser.role };
  console.log('[AUTH] Gerando token para', payload);
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
  console.log('[AUTH] Token gerado tamanho:', token.length);
  res.json({ token, user: { username: foundUser.user, role: foundUser.role } });
});

// Rota protegida simples para validar token rapidamente
router.get('/me', (req, res) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Sem token' });
  }
  const token = auth.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ ok: true, decoded });
  } catch (e: any) {
    res.status(401).json({ ok: false, error: e.message });
  }
});

export default router;