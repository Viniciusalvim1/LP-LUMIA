"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface StarProps {
  id: number;
  startY: number;   // y inicial (px do topo da seção)
  arcUp: number;    // sobe X px antes de cair (arco inicial)
  endDrop: number;  // cai X px no total
  width: number;    // comprimento da cauda (px)
  duration: number; // segundos para atravessar
  angle: number;    // rotação da cauda (deg)
}

function generateStar(id: number): StarProps {
  const startY   = 60  + Math.random() * 360;  // 60–420 px do topo
  const arcUp    = 25  + Math.random() * 55;   // sobe 25–80 px
  const endDrop  = 260 + Math.random() * 220;  // cai 260–480 px
  const width    = 130 + Math.floor(Math.random() * 120); // 130–250 px
  const duration = 2.0 + Math.random() * 1.4;  // 2.0–3.4 s
  // ângulo médio da trajetória (horizontal leve inclinação para baixo)
  const angle    = Math.atan2(endDrop, 1930) * (180 / Math.PI);
  return { id, startY, arcUp, endDrop, width, duration, angle };
}

// ── visual de uma estrela ──────────────────────────────────────────
function Star({
  startY, arcUp, endDrop, width, duration, angle, onComplete,
}: StarProps & { onComplete: () => void }) {
  return (
    /*
     * Camada externa: move X linearmente (esquerda → direita)
     * + controla opacidade (fade-in rápido, fade-out suave no fim)
     */
    <motion.div
      className="absolute pointer-events-none"
      style={{ top: 0, left: 0 }}
      initial={{ x: -280, opacity: 0 }}
      animate={{
        x: 1680,
        opacity: [0, 1, 0.9, 0],
      }}
      transition={{
        x:       { duration, ease: "linear" },
        opacity: { duration, ease: "linear", times: [0, 0.05, 0.88, 1] },
      }}
      onAnimationComplete={onComplete}
    >
      {/*
       * Camada interna: move Y ao longo da parábola
       * sobe levemente → cai com gravidade (easeIn na descida)
       */}
      <motion.div
        style={{ position: "absolute", top: startY, left: 0 }}
        initial={{ y: 0 }}
        animate={{ y: [0, -arcUp, endDrop] }}
        transition={{
          duration,
          times: [0, 0.25, 1],
          ease: ["easeOut", "easeIn"],
        }}
      >
        {/* Cauda + cabeça — rotacionadas pelo ângulo médio da trajetória */}
        <div style={{ transform: `rotate(${angle}deg)`, transformOrigin: "right center" }}>
          {/* Cauda: gradiente transparente → branco */}
          <div
            style={{
              width,
              height: 1.5,
              borderRadius: 999,
              background:
                "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.10) 25%, rgba(255,255,255,0.80) 75%, white 100%)",
            }}
          />
          {/* Cabeça brilhante */}
          <div
            style={{
              position: "absolute",
              right: -2,
              top: "50%",
              transform: "translateY(-50%)",
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: "white",
              boxShadow:
                "0 0 5px 2px rgba(255,255,255,0.95), 0 0 18px 6px rgba(180,235,255,0.55)",
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── máquina de estado: 1 estrela por vez ─────────────────────────
export default function ShootingStars() {
  const [star, setStar] = useState<StarProps | null>(null);
  const idRef  = useRef(0);
  const timer  = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleNext = useCallback(() => {
    const gap = 2200 + Math.random() * 3800; // 2.2–6 s de intervalo
    timer.current = setTimeout(() => {
      idRef.current += 1;
      setStar(generateStar(idRef.current));
    }, gap);
  }, []);

  useEffect(() => {
    scheduleNext();
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [scheduleNext]);

  function done() {
    setStar(null);
    scheduleNext();
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {star && <Star key={star.id} {...star} onComplete={done} />}
    </div>
  );
}
