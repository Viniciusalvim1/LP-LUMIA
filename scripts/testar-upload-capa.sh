#!/usr/bin/env bash
# Exercita a Edge Function upload-post-cover de ponta a ponta.
#
# Rode como script (./scripts/testar-upload-capa.sh), nunca colando as
# linhas no terminal: `read` colado consome a linha seguinte do próprio
# texto em vez de esperar a digitação.
set -uo pipefail

U="https://zjjlnwyssucyloagqpqc.supabase.co/functions/v1/upload-post-cover"
RAIZ="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SLUG="5-melhores-sistemas-para-clinica-de-estetica"
IMG="$RAIZ/public/images/blog/$SLUG.png"

[ -f "$IMG" ] || { echo "imagem não encontrada: $IMG"; exit 1; }

read -rs -p "Cole o BLOG_UPLOAD_TOKEN: " TOKEN
echo
[ -n "$TOKEN" ] || { echo "token vazio"; exit 1; }

chamar() { # $1 = corpo JSON (string ou @arquivo)
  local dados="$1"
  curl -s -w '\n  [HTTP %{http_code}]\n' -X POST "$U" \
    -H "x-blog-upload-token: $TOKEN" \
    -H "Content-Type: application/json" \
    --data "$dados"
}

PAYLOAD="$(mktemp -t capa)"
trap 'rm -f "$PAYLOAD"' EXIT
python3 - "$IMG" "$SLUG" > "$PAYLOAD" <<'PY'
import base64, json, sys
img, slug = sys.argv[1], sys.argv[2]
print(json.dumps({
    "slug": slug,
    "image_base64": base64.b64encode(open(img, "rb").read()).decode(),
    "mime_type": "image/png",
    "alt_text": "Comparativo dos 5 melhores sistemas de gestão para clínica de estética em 2026",
}))
PY

echo
echo "══ A1 · caminho feliz — espera success:true, reused:false"
chamar "@$PAYLOAD"

echo
echo "══ A2 · idempotência — mesma imagem, espera reused:true"
chamar "@$PAYLOAD"

echo
echo "══ B · SSRF — host fora da allowlist, espera 'host não autorizado'"
chamar "{\"slug\":\"$SLUG\",\"image_url\":\"https://www.lumiaclin.com.br/images/blog/$SLUG.png\"}"

echo
echo "══ C · COVER_ALLOWED_HOSTS carregou? host permitido mas inexistente."
echo "     'origem respondeu ...' = variável carregada"
echo "     'host não autorizado'  = variável NÃO carregada"
chamar "{\"slug\":\"$SLUG\",\"image_url\":\"https://files.oaiusercontent.com/nao-existe-mesmo.png\"}"

echo
echo "══ estado final do post em produção"
curl -s "https://www.lumiaclin.com.br/blog/$SLUG" \
  | grep -oE 'zjjlnwyssucyloagqpqc\.supabase\.co[^"&]*cover[^"&]*' | head -1 \
  || echo "  (capa ainda não aponta para o Storage — pode ser o cache de 5 min)"
