
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
	console.warn('[SUPABASE] Variáveis ausentes. URL definida?', !!supabaseUrl, 'KEY definida?', !!supabaseServiceKey);
}

export const supabase = createClient(supabaseUrl, supabaseServiceKey);
