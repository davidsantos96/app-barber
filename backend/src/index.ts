import express from 'express';
import cors from 'cors';
import clientesRouter from './routes/clientes';
import agendamentosRouter from './routes/agendamentos';
import disponibilidadeRouter from './routes/disponibilidade';
import dashboardRouter from './routes/dashboard';
import servicosRouter from './routes/servicos';
import authRouter from './routes/auth';
import healthRouter from './routes/health';
import { authMiddleware } from './middlewares/authMiddleware';

const app = express();
// Permitir requisições de qualquer origem (CORS)
app.use(cors());
const port = process.env.PORT || 3001;

// Debug leve: comprimento do segredo (não imprime o segredo)
if (process.env.JWT_SECRET) {
  console.log('[BOOT] JWT_SECRET length:', process.env.JWT_SECRET.length);
} else {
  console.warn('[BOOT] JWT_SECRET NÃO definido! Logins JWT falharão.');
}

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API AppBarber funcionando!');
});

app.use('/health', healthRouter);

// Rota pública para autenticação
app.use('/auth', authRouter);

// Demais rotas protegidas por JWT
app.use('/clientes', authMiddleware, clientesRouter);
app.use('/agendamentos', authMiddleware, agendamentosRouter);
app.use('/disponibilidade', authMiddleware, disponibilidadeRouter);
app.use('/dashboard', authMiddleware, dashboardRouter);
app.use('/servicos', authMiddleware, servicosRouter);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
