import { Router, Request } from 'express';
import { supabase } from '../supabaseClient';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

interface Servico {
  id: string;
  nome: string;
  preco: number;
  duracao_minutos: number; // 30 ou 60 etc.
  user_id?: string; // opcional caso personalize por barbeiro
}

// LISTAR (se existir coluna user_id e quiser filtrar por usuário, tente usar eq)
router.get('/', async (req: Request, res) => {
  try {
    const userId = req.user?.username;
    // Primeiro tenta buscar com filtro user_id, se erro (coluna não existe) faz fallback global
    let { data, error } = await supabase.from('servicos').select('*').eq('user_id', userId || '');
    if (error) {
      // Fallback: sem filtro
      ({ data, error } = await supabase.from('servicos').select('*'));
      if (error) throw error;
    }
    res.json((data || []).map(s => ({
      id: s.id,
      nome: s.nome,
      preco: s.preco,
      duracao_minutos: s.duracao_minutos ?? 30
    })));
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.get('/:id', async (req: Request, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from('servicos').select('*').eq('id', id).single();
    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Serviço não encontrado' });
    res.json({ ...data, duracao_minutos: data.duracao_minutos ?? 30 });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.post('/', async (req: Request, res) => {
  try {
    const userId = req.user?.username; // opcional
    const { nome, preco, duracao_minutos } = req.body;
    if (!nome || preco == null) return res.status(400).json({ error: 'Nome e preço obrigatórios' });
    const novo: Servico = {
      id: uuidv4(),
      nome,
      preco: Number(preco),
      duracao_minutos: duracao_minutos ? Number(duracao_minutos) : 30,
      user_id: userId
    };
    const { data, error } = await supabase.from('servicos').insert([novo]).select();
    if (error) throw error;
    res.status(201).json(data?.[0] ?? novo);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.put('/:id', async (req: Request, res) => {
  try {
    const { id } = req.params;
    const { nome, preco, duracao_minutos } = req.body;
    if (!nome || preco == null) return res.status(400).json({ error: 'Nome e preço obrigatórios' });
    const updateObj: Partial<Servico> = {
      nome,
      preco: Number(preco),
      duracao_minutos: duracao_minutos ? Number(duracao_minutos) : 30
    };
    const { data, error } = await supabase.from('servicos').update(updateObj).eq('id', id).select();
    if (error) throw error;
    if (!data || data.length === 0) return res.status(404).json({ error: 'Serviço não encontrado' });
    res.json(data[0]);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.delete('/:id', async (req: Request, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from('servicos').delete().eq('id', id).select();
    if (error) throw error;
    if (!data || data.length === 0) return res.status(404).json({ error: 'Serviço não encontrado' });
    res.json(data[0]);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
