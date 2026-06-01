"use client";

import { motion } from "framer-motion";
import { turnHeadline, turnBody } from "@/content/story";

export default function TurnSection() {
  return (
    <section className="relative py-32 flex items-center justify-center overflow-hidden">
      {/* Teal glow — marks the "turn" / solution moment */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,201,167,0.15)_0%,transparent_70%)]" />

      {/* Horizontal separator lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 max-w-[800px] mx-auto px-6 lg:px-12 text-center">
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00C9A7]/10 border border-[#00C9A7]/30 mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-[#00C9A7] text-sm font-semibold">A virada</span>
        </motion.div>

        <motion.h2
          className="font-display font-black text-4xl md:text-6xl leading-[1.08] tracking-[-0.02em] mb-6"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.7 }}
        >
          {turnHeadline.split(" ").slice(0, -3).join(" ")}{" "}
          <span className="gradient-text">
            {turnHeadline.split(" ").slice(-3).join(" ")}
          </span>
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl text-white/55 leading-relaxed max-w-[600px] mx-auto"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {turnBody}
        </motion.p>

        {/* Decorative arrows hinting at scroll */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="text-[#00C9A7]/50"
          >
            <svg width="24" height="32" viewBox="0 0 24 32" fill="none">
              <path d="M12 0v24M5 17l7 8 7-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
