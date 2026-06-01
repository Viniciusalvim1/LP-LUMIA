import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Client público (anon) — só lê dados liberados por RLS (posts publicados)
export const supabase = createClient(url, anonKey);
