import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yyczqtqsclrspzdujnme.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl5Y3pxdHFzY2xyc3B6ZHVqbm1lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2OTg4MTAsImV4cCI6MjA5MDI3NDgxMH0.1l5kBLpje4mKvx2yp84fDVbge6yb81bguNwP4Kih_l4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
