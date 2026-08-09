import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Capas de post vindas do Supabase Storage (subidas pela Edge Function
    // upload-post-cover). Sem isto o next/image lança erro de hostname em
    // runtime — e, mais importante, é o que mantém o egress do Supabase
    // baixo: a Vercel busca a original uma vez e serve as versões
    // otimizadas do CDN dela, em vez de cada visitante puxar do Storage.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zjjlnwyssucyloagqpqc.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
