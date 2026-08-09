-- ─────────────────────────────────────────────────────────────
-- Projeto Supabase do BLOG (zjjlnwyssucyloagqpqc)
--
-- Problema: o formulário da LP (components/CTAFinalSection.tsx) faz
-- insert anônimo em public.leads e recebe:
--   42501 — new row violates row-level security policy for table "leads"
-- Ou seja: existe policy de SELECT, mas nenhuma de INSERT para anon.
-- Resultado: o visitante vê "Não foi possível enviar. Tente novamente."
--
-- Esta policy libera SOMENTE o insert. O anon continua sem poder
-- alterar nem apagar lead, e a leitura segue como está hoje.
-- ─────────────────────────────────────────────────────────────

alter table public.leads enable row level security;

drop policy if exists "leads_anon_insert" on public.leads;
create policy "leads_anon_insert"
  on public.leads
  for insert
  to anon, authenticated
  with check (true);

-- Conferência rápida das policies da tabela depois de aplicar:
--   select policyname, cmd, roles
--     from pg_policies
--    where schemaname = 'public' and tablename = 'leads';
