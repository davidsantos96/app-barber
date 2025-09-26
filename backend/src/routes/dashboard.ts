import { Router, Request } from 'express';
import { supabase } from '../supabaseClient';

const router = Router();

// Exemplo de estrutura para dashboard: total de clientes, total de agendamentos, próximos agendamentos
router.get('/', async (req: Request, res) => {
  try {
    const userId = req.user?.username;
    if (!userId) return res.status(401).json({ error: 'Não autenticado' });
    // Total de clientes
    const { count: clientesCount, error: clientesError } = await supabase
      .from('clientes')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);
    if (clientesError) throw clientesError;

    // Total de agendamentos
    const { count: agendamentosCount, error: agendamentosError } = await supabase
      .from('agendamentos')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);
    if (agendamentosError) throw agendamentosError;

    // Próximos agendamentos (exemplo: próximos 5)
    const { data: proximosAgendamentos, error: proximosError } = await supabase
      .from('agendamentos')
      .select('*')
      .eq('status', 'confirmado')
      .eq('user_id', userId)
      .order('data', { ascending: true })
      .order('horario', { ascending: true })
      .limit(5);
    if (proximosError) throw proximosError;

    res.json({
      totalClientes: clientesCount ?? 0,
      totalAgendamentos: agendamentosCount ?? 0,
      proximosAgendamentos: proximosAgendamentos ?? []
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
