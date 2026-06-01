/**
 * upload-videos.ts
 * Converte os .MOV para MP4+WebM (via ffmpeg) e faz upload para Vercel Blob.
 *
 * Uso:
 *   npx tsx scripts/upload-videos.ts
 *
 * Requer:
 *   - ffmpeg instalado (brew install ffmpeg)
 *   - BLOB_READ_WRITE_TOKEN no .env.local
 */

import { execSync } from "child_process";
import { existsSync, readFileSync, mkdirSync } from "fs";
import { join } from "path";
import { put } from "@vercel/blob";
import { config } from "dotenv";
config({ path: ".env.local" });

const SRC = "/Users/alexandresilveira/Desktop/VIDEOS LUMIA ANIMAçao";
const OUT = join(process.cwd(), "public/videos");

const VIDEOS: { key: string; file: string }[] = [
  { key: "dashboard", file: "Animação Login +Dashadmin.mov" },
  { key: "contatos",  file: "Animaçao aba contatos.mov" },
  { key: "agenda",    file: "Animação Agenda.mov" },
  { key: "ia",        file: "Animaçao lumia AI .mov" },
  { key: "vendas",    file: "animação vendas.mov" },
  { key: "financeiro",file: "Animaçao aba financeira.mov" },
  { key: "marketing", file: "Animação Marketing.mov" },
  { key: "relatorios",file: "Animação Relatorios.mov" },
];

mkdirSync(OUT, { recursive: true });

async function uploadFile(localPath: string, blobName: string, contentType: string) {
  const buffer = readFileSync(localPath);
  const blob = await put(blobName, buffer, { access: "public", contentType });
  return blob.url;
}

function convert(input: string, key: string) {
  const mp4 = join(OUT, `${key}.mp4`);
  const webm = join(OUT, `${key}.webm`);
  const poster = join(OUT, `${key}-poster.jpg`);

  if (!existsSync(mp4)) {
    console.log(`  ► MP4...`);
    execSync(
      `ffmpeg -y -i "${input}" -vcodec libx264 -crf 26 -preset slow -movflags +faststart -vf "scale='min(1280,iw)':-2" -an "${mp4}"`,
      { stdio: "pipe" }
    );
  }

  if (!existsSync(webm)) {
    console.log(`  ► WebM...`);
    execSync(
      `ffmpeg -y -i "${input}" -c:v libvpx-vp9 -crf 34 -b:v 0 -vf "scale='min(1280,iw)':-2" -an "${webm}"`,
      { stdio: "pipe" }
    );
  }

  if (!existsSync(poster)) {
    console.log(`  ► Poster...`);
    const duration = execSync(
      `ffprobe -v quiet -show_entries format=duration -of csv=p=0 "${input}"`
    ).toString().trim();
    const mid = Math.floor(Number(duration) / 2);
    execSync(
      `ffmpeg -y -i "${input}" -ss ${mid} -frames:v 1 -q:v 3 "${poster}"`,
      { stdio: "pipe" }
    );
  }

  return { mp4, webm, poster };
}

async function main() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error("❌ BLOB_READ_WRITE_TOKEN não encontrado no .env.local");
    process.exit(1);
  }

  const urls: Record<string, { mp4: string; webm: string; poster: string }> = {};

  for (const { key, file } of VIDEOS) {
    const input = `${SRC}/${file}`;
    if (!existsSync(input)) {
      console.warn(`⚠ Arquivo não encontrado: ${file} — pulando`);
      continue;
    }

    console.log(`\n▶ ${key}`);
    const { mp4, webm, poster } = convert(input, key);

    console.log(`  ↑ Upload MP4...`);
    const mp4Url = await uploadFile(mp4, `lumia-videos/${key}.mp4`, "video/mp4");

    console.log(`  ↑ Upload WebM...`);
    const webmUrl = await uploadFile(webm, `lumia-videos/${key}.webm`, "video/webm");

    console.log(`  ↑ Upload Poster...`);
    const posterUrl = await uploadFile(poster, `lumia-videos/${key}-poster.jpg`, "image/jpeg");

    urls[key] = { mp4: mp4Url, webm: webmUrl, poster: posterUrl };
    console.log(`  ✓ ${key} → ${mp4Url}`);
  }

  // Derive a common base URL from the first URL
  const firstUrl = Object.values(urls)[0]?.mp4 ?? "";
  const blobBase = firstUrl.replace(/\/lumia-videos\/.+$/, "");

  console.log("\n✅ Upload concluído!");
  console.log("\nAdicione ao .env.local:\n");
  console.log(`NEXT_PUBLIC_BLOB_BASE_URL=${blobBase}/lumia-videos`);
  console.log("\nURLs individuais:");
  console.log(JSON.stringify(urls, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
