"use client";

import { useRef, useEffect } from "react";
import { useInView } from "framer-motion";

interface FeatureVideoProps {
  mp4: string;
  webm: string;
  poster: string;
  label: string;
}

export default function FeatureVideo({ mp4, webm, poster, label }: FeatureVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const isInView = useInView(ref, { amount: 0.4, once: false });

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (isInView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isInView]);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] shadow-[0_0_60px_rgba(0,201,167,0.08)] transition-all duration-500 group-hover:border-[#00C9A7]/30 group-hover:shadow-[0_0_80px_rgba(0,201,167,0.18)]">
      {/* Screen chrome */}
      <div className="bg-white/[0.04] px-4 py-3 flex items-center gap-2 border-b border-white/[0.06]">
        <span className="w-3 h-3 rounded-full bg-red-400/60" />
        <span className="w-3 h-3 rounded-full bg-yellow-400/60" />
        <span className="w-3 h-3 rounded-full bg-green-400/60" />
        <span className="ml-3 text-xs text-white/30 font-mono">{label}</span>
      </div>
      <video
        ref={ref}
        muted
        loop
        playsInline
        poster={poster}
        className="w-full h-auto block"
        preload="metadata"
      >
        <source src={webm} type="video/webm" />
        <source src={mp4} type="video/mp4" />
      </video>
    </div>
  );
}
