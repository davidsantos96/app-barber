import express from 'express';
import cors from 'cors';
import clientesRouter from '../src/routes/clientes';
import agendamentosRouter from '../src/routes/agendamentos';
import disponibilidadeRouter from '../src/routes/disponibilidade';
import dashboardRouter from '../src/routes/dashboard';
import servicosRouter from '../src/routes/servicos';
import authRouter from '../src/routes/auth';
import { authMiddleware } from '../src/middlewares/authMiddleware';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('API AppBarber funcionando (Vercel)!');
});

app.use('/auth', authRouter);
app.use('/clientes', authMiddleware, clientesRouter);
app.use('/agendamentos', authMiddleware, agendamentosRouter);
app.use('/disponibilidade', authMiddleware, disponibilidadeRouter);
app.use('/dashboard', authMiddleware, dashboardRouter);
app.use('/servicos', authMiddleware, servicosRouter);

export default app;