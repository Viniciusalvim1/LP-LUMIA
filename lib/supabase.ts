import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let _client: SupabaseClient | null = null;

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
  return { from: () => builder } as unknown as SupabaseClient;
}

export function getSupabase(): SupabaseClient {
  if (_client) return _client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    if (typeof window === "undefined") {
      console.warn(
        "[supabase] NEXT_PUBLIC_SUPABASE_URL/ANON_KEY ausentes — usando client vazio (dados não serão carregados)."
      );
    }
    _client = makeNoopClient();
    return _client;
  }

  _client = createClient(url, key);
  return _client;
}
