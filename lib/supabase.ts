import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// ─────────────────────────────────────────────────────────────
// A LP conversa com DOIS projetos Supabase distintos:
//
//   • CRM  (NEXT_PUBLIC_SUPABASE_URL)      → RPC get_proposta_by_token,
//                                            usada por /proposta/[token]
//   • Blog (NEXT_PUBLIC_BLOG_SUPABASE_URL) → tabelas `posts` e `leads`
//
// Eles não são intercambiáveis: `posts`/`leads` não existem no CRM e a
// RPC de proposta não existe no projeto do blog. Um client só não
// atende os dois — apontar o env para um deixa o outro fora do ar.
// ─────────────────────────────────────────────────────────────

// Client "vazio" — usado quando as variáveis de ambiente não estão
// configuradas (ex.: build sem env). Qualquer query resolve [] em vez
// de derrubar o build; em runtime, com env correto, usa o client real.
function makeNoopClient(): SupabaseClient {
  const result = Promise.resolve({ data: [], error: null });
  const builder: Record<string, unknown> = {};
  const chain = () => builder;
  for (const m of ["select", "eq", "order", "limit", "insert", "update", "delete"]) {
    builder[m] = chain;
  }
  builder.maybeSingle = () => Promise.resolve({ data: null, error: null });
  builder.single = () => Promise.resolve({ data: null, error: null });
  // torna o builder "thenável" para `await query`
  (builder as { then: unknown }).then = (res: (v: unknown) => unknown) =>
    result.then(res);
  return {
    from: () => builder,
    rpc: () => Promise.resolve({ data: null, error: null }),
  } as unknown as SupabaseClient;
}

const _cache = new Map<string, SupabaseClient>();

function getClient(name: string, url?: string, key?: string): SupabaseClient {
  const cached = _cache.get(name);
  if (cached) return cached;

  let client: SupabaseClient;
  if (!url || !key) {
    if (typeof window === "undefined") {
      console.warn(
        `[supabase] variáveis do projeto "${name}" ausentes — usando client vazio (dados não serão carregados).`
      );
    }
    client = makeNoopClient();
  } else {
    client = createClient(url, key);
  }

  _cache.set(name, client);
  return client;
}

/** Projeto do CRM — RPC de proposta comercial. */
export function getSupabase(): SupabaseClient {
  return getClient(
    "crm",
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

/** Projeto do blog — tabelas `posts` e `leads`. */
export function getBlogSupabase(): SupabaseClient {
  return getClient(
    "blog",
    process.env.NEXT_PUBLIC_BLOG_SUPABASE_URL,
    process.env.NEXT_PUBLIC_BLOG_SUPABASE_ANON_KEY
  );
}
