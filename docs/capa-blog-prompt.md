# Prompt das capas do blog

Sistema visual fechado das 25 capas em `public/images/blog/`. Paleta
extraída dos arquivos reais, não de memória: fundo navy `#14273E`
(as capas variam de `#0C1B31` a `#15293A`), acento teal `#25BAA5`,
texto branco.

O agente que gera a capa deve **preencher os quatro campos entre chaves
e não alterar mais nada** — o resto é o que mantém as capas coerentes
lado a lado na listagem do blog.

## O prompt

```
Wide horizontal blog cover banner, 1.9:1 landscape aspect ratio, flat vector
editorial illustration, solid dark navy background #14273E.

LEFT HALF: flat vector illustration of {ILUSTRACAO}, drawn in bright teal
#25BAA5 and white on the navy background, with two or three small minimal
skincare-bottle icons as thin teal outlines floating around it.

RIGHT HALF: bold uppercase condensed sans-serif text, stacked and
left-aligned, in three blocks:
  line 1, large white letters: "{LINHA1}"
  line 2, large bright teal #25BAA5 letters: "{LINHA2}"
  smaller white uppercase subtitle below, at most two lines: "{SUBTITULO}"

Thin teal rounded-rectangle outline accents bleeding off the top-right and
bottom-left corners. A thin slightly darker horizontal bar along the bottom
edge, spanning the full width.

Clean corporate flat design, editorial SaaS / healthtech aesthetic. No
gradients, no photographs, no stock imagery, no drop shadows, no purple.
High contrast, generous negative space, illustration never overlapping the
text half.
```

## Como preencher

| Campo | Regra |
|---|---|
| `{ILUSTRACAO}` | Uma cena concreta ligada ao tema, em uma frase. Objeto, não conceito: "a podium ranking chart with the tallest bar topped by a star" funciona; "success and growth" não. |
| `{LINHA1}` | 1–2 palavras, o sujeito. Ex.: `REDUZIR` |
| `{LINHA2}` | 1–2 palavras, a palavra de impacto — é a que sai em teal. Ex.: `NO-SHOW` |
| `{SUBTITULO}` | Até 6 palavras, complemento. Ex.: `PARA CLINICAS DE ESTETICA` |

**Escreva o texto em CAIXA ALTA e sem acento.** Geradores de imagem
costumam quebrar acentos em glifos estranhos, e as capas existentes já
saíram assim — "CLINICA DE ESTETICA" é o padrão da casa, não um erro.

Some as três linhas e mantenha abaixo de ~8 palavras no total. Texto
demais na capa é o jeito mais rápido de destoar das outras.

## Exemplo real — capa dos 5 sistemas

```
{ILUSTRACAO} = a podium ranking chart with three bars, the tallest
               first-place bar topped with a glowing star, plus a floating
               white checklist card
{LINHA1}     = 5 MELHORES
{LINHA2}     = SISTEMAS
{SUBTITULO}  = PARA CLINICA DE ESTETICA / COMPARATIVO 2026
```

## Depois de gerar

Confira três coisas antes de subir:

1. **Proporção** — as capas existentes são 1424×752. Fora de ~1.9:1 a
   imagem corta no card da listagem.
2. **Texto legível e escrito certo** — modelo de imagem erra letra. Leia
   o que saiu, não o que você pediu.
3. **Ilustração fora da metade do texto** — sobreposição é o defeito mais
   comum e some se você regerar.

O upload é pela Edge Function `upload-post-cover`
(`supabase/functions/upload-post-cover/`), que grava a URL em
`posts.cover_url`.
