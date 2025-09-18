import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// ATENÇÃO: Esta chave deve ser a mesma usada em `auth.ts` e mantida em segurança.
const JWT_SECRET = process.env.JWT_SECRET || '';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Arquivo movido para middlewares/authMiddleware.ts
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Acesso negado. Nenhum token fornecido.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { username: string };
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido ou expirado.' });
  }
};