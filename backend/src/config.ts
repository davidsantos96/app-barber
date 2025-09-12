import dotenv from 'dotenv';

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET || 'sua-chave-secreta-super-longa-e-aleatoria-aqui';