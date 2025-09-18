import express from 'express';
import cors from 'cors';
import clientesRouter from './routes/clientes';
import agendamentosRouter from './routes/agendamentos';
import disponibilidadeRouter from './routes/disponibilidade';
import dashboardRouter from './routes/dashboard';

const app = express();
// Permitir requisições de qualquer origem (CORS)
app.use(cors());
const port = process.env.PORT || 3001;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API AppBarber funcionando!');
});

app.use('/clientes', clientesRouter);
app.use('/agendamentos', agendamentosRouter);
app.use('/disponibilidade', disponibilidadeRouter);
app.use('/dashboard', dashboardRouter);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
