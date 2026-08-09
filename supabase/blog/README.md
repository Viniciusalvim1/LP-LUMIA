# SQL do projeto Supabase do blog

Projeto: `zjjlnwyssucyloagqpqc` (tabelas `posts` e `leads`).
Não confundir com o projeto do CRM, que atende `/proposta/[token]`.

## Arquivos

- `002_seed_post_5_melhores_sistemas.sql` — **já aplicado em 09/08/2026.**
  Publica o artigo "5 melhores sistemas para clínica de estética em 2026".
  É idempotente (`on conflict (slug) do update`), então reexecutar apenas
  ressincroniza o post com `content/posts/5-melhores-sistemas-para-clinica-de-estetica.html`.

## Fonte da verdade do conteúdo

O HTML dos posts vive em `content/posts/`. O banco é destino, não origem:
ao editar um artigo, altere o arquivo e rode o seed correspondente de novo.
