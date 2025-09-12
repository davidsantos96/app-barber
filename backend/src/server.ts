import express from 'express';
import cors from 'cors';
import agendamentosRouter from './routes/agendamentos';
import clientesRouter from './routes/clientes';
import debugRouter from './routes/debug';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Rotas da aplicação
app.use('/agendamentos', agendamentosRouter);
app.use('/clientes', clientesRouter);

// Adiciona a nova rota de debug
app.use('/debug', debugRouter);

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});