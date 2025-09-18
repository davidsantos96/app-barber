import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://efpzrjtgfzurnxzanaog.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmcHpyanRnZnp1cm54emFuYW9nIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1ODE1MzI3NSwiZXhwIjoyMDczNzI5Mjc1fQ.LtP_8lkAljpxBfX1o90D6FIShzu9e803TpqM0nhhNFI';

export const supabase = createClient(supabaseUrl, supabaseServiceKey);
