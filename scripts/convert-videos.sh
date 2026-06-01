#!/usr/bin/env bash
# convert-videos.sh — Converte os .MOV do Desktop para MP4+WebM web-friendly
# Requer: ffmpeg  (brew install ffmpeg)
# Uso: bash scripts/convert-videos.sh
#
# Após converter, faça upload para Vercel Blob e atualize NEXT_PUBLIC_BLOB_BASE_URL em .env.local

set -e

SRC="/Users/alexandresilveira/Desktop/VIDEOS LUMIA ANIMAçao"
OUT="public/videos"

mkdir -p "$OUT"

convert() {
  local input="$1"
  local key="$2"

  echo "▶ Convertendo: $key"

  # MP4 H.264 — compatível universal, autoplay mudo
  ffmpeg -y -i "$input" \
    -vcodec libx264 -crf 26 -preset slow \
    -movflags +faststart \
    -vf "scale='min(1280,iw)':-2" \
    -an \
    "$OUT/${key}.mp4"

  # WebM VP9 — menor, preferido em Chrome/Firefox
  ffmpeg -y -i "$input" \
    -c:v libvpx-vp9 -crf 34 -b:v 0 \
    -vf "scale='min(1280,iw)':-2" \
    -an \
    "$OUT/${key}.webm"

  # Poster JPEG — frame do meio para placeholder
  local duration
  duration=$(ffprobe -v quiet -show_entries format=duration -of csv=p=0 "$input")
  local midpoint
  midpoint=$(echo "$duration / 2" | bc)
  ffmpeg -y -i "$input" -ss "$midpoint" -frames:v 1 -q:v 3 "$OUT/${key}-poster.jpg"

  echo "✓ $key concluído → $OUT/"
}

convert "$SRC/Animação Login +Dashadmin.mov"   "dashboard"
convert "$SRC/Animaçao aba contatos.mov"        "contatos"
convert "$SRC/Animação Agenda.mov"              "agenda"
convert "$SRC/Animaçao lumia AI .mov"           "ia"
convert "$SRC/animação vendas.mov"              "vendas"
convert "$SRC/Animaçao aba financeira.mov"      "financeiro"
convert "$SRC/Animação Marketing.mov"           "marketing"
convert "$SRC/Animação Relatorios.mov"          "relatorios"

echo ""
echo "🎉 Todos os vídeos convertidos em $OUT/"
echo ""
echo "Próximo passo: fazer upload para Vercel Blob e adicionar ao .env.local:"
echo "  NEXT_PUBLIC_BLOB_BASE_URL=https://<seu-blob>.vercel-storage.com"
