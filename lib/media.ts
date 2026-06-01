/**
 * Media map — update mp4/webm URLs after uploading to Vercel Blob.
 * Run scripts/convert-videos.sh first, then paste the returned Blob URLs here.
 *
 * Local dev fallback: place converted files in /public/videos/<key>.mp4
 * and set BASE_URL = "" (empty string).
 */

const BASE_URL = process.env.NEXT_PUBLIC_BLOB_BASE_URL ?? "";

function video(key: string) {
  if (BASE_URL) {
    return {
      mp4: `${BASE_URL}/${key}.mp4`,
      webm: `${BASE_URL}/${key}.webm`,
      poster: `${BASE_URL}/${key}-poster.jpg`,
    };
  }
  return {
    mp4: `/videos/${key}.mp4`,
    webm: `/videos/${key}.webm`,
    poster: `/videos/${key}-poster.jpg`,
  };
}

export const MEDIA = {
  dashboard: video("dashboard"),
  contatos:  video("contatos"),
  agenda:    video("agenda"),
  ia:        video("ia"),
  vendas:    video("vendas"),
  financeiro: video("financeiro"),
  marketing: video("marketing"),
  relatorios: video("relatorios"),
} as const;

export type MediaKey = keyof typeof MEDIA;
