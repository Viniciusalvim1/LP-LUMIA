"use client";

import { motion } from "framer-motion";
import type { StoryBeatData } from "@/content/story";
import { MEDIA, type MediaKey } from "@/lib/media";
import FeatureVideo from "./FeatureVideo";

interface StoryBeatProps {
  beat: StoryBeatData;
  index: number;
}

export default function StoryBeat({ beat, index }: StoryBeatProps) {
  const media = MEDIA[beat.videoKey as MediaKey];
  const flip = beat.flip;

  return (
    <div id={beat.id} className="group relative py-20 md:py-28">
      {/* Subtle row separator */}
      {index > 0 && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-white/0 to-white/10" />
      )}

      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <div
          className={`grid md:grid-cols-2 gap-12 lg:gap-20 items-center ${
            flip ? "md:[direction:rtl]" : ""
          }`}
        >
          {/* Text side */}
          <motion.div
            className={`flex flex-col gap-5 ${flip ? "md:[direction:ltr]" : ""}`}
            initial={{ opacity: 0, x: flip ? 32 : -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Eyebrow — the "dor" */}
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-red-400/70 shrink-0" />
              <span className="text-[13px] font-medium tracking-[0.08em] uppercase text-white/45">
                {beat.eyebrow}
              </span>
            </div>

            {/* Headline — the solution */}
            <h3 className="font-display font-bold text-2xl md:text-[2rem] leading-[1.2] tracking-[-0.01em] text-white">
              {beat.headline}
            </h3>

            {/* Body */}
            <p className="text-base md:text-lg text-white/55 leading-relaxed max-w-[500px]">
              {beat.body}
            </p>

            {/* Feature pill */}
            <div className="flex">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium bg-[#00C9A7]/10 border border-[#00C9A7]/20 text-[#00C9A7]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Incluído no Lumia
              </span>
            </div>
          </motion.div>

          {/* Video side */}
          <motion.div
            className={`sticky top-24 ${flip ? "md:[direction:ltr]" : ""}`}
            initial={{ opacity: 0, x: flip ? -32 : 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
          >
            <FeatureVideo
              mp4={media.mp4}
              webm={media.webm}
              poster={media.poster}
              label={`lumia / ${beat.id}`}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
