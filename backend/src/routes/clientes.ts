import { Router } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../supabaseClient';

const router = Router();


interface Cliente {
  id: string;
  nome: string;
  apelido?: string;
  telefone: string;
}


// Listar clientes
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('clientes').select('*');
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.json(data ?? []);
});



// Criar cliente
router.post('/', async (req, res) => {
  const { nome, apelido, telefone } = req.body;
  if (!nome || !telefone) {
    return res.status(400).json({ error: 'Nome e telefone são obrigatórios' });
  }
  const telefoneRegex = /^\(\d{2}\)\d{5}-\d{4}$/;
  if (!telefoneRegex.test(telefone)) {
    return res.status(400).json({ error: 'Telefone deve estar no formato (11)91234-5678' });
  }
  const novoCliente: Cliente = { id: uuidv4(), nome, apelido, telefone };
  const { data, error } = await supabase.from('clientes').insert([novoCliente]).select();
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  res.status(201).json(data?.[0] ?? novoCliente);
});



// Buscar cliente por id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from('clientes').select('*').eq('id', id);
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  if (!data || data.length === 0) {
    return res.status(404).json({ error: 'Cliente não encontrado' });
  }
  res.json(data[0]);
});

// Editar cliente
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, apelido, telefone } = req.body;
  if (!nome || !telefone) {
    return res.status(400).json({ error: 'Nome e telefone são obrigatórios' });
  }
  const telefoneRegex = /^\(\d{2}\)\d{5}-\d{4}$/;
  if (!telefoneRegex.test(telefone)) {
    return res.status(400).json({ error: 'Telefone deve estar no formato (11)91234-5678' });
  }
  const { data, error } = await supabase
    .from('clientes')
    .update({ nome, apelido, telefone })
    .eq('id', id)
    .select();
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  if (!data || data.length === 0) {
    return res.status(404).json({ error: 'Cliente não encontrado' });
  }
  res.json(data[0]);
});

export default router;