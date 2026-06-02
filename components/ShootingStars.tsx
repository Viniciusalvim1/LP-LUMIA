"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

interface StarProps {
  id: number;
  fromX: number;   // x de partida (off-screen)
  dx: number;      // deslocamento horizontal total (sinalizado)
  startY: number;  // y inicial
  vy0: number;     // velocidade vertical inicial (negativa = lançada pra cima)
  g: number;       // "gravidade" — aceleração vertical
  width: number;   // comprimento da cauda
  duration: number;
}

function generateStar(id: number): StarProps {
  const W = typeof window !== "undefined" ? window.innerWidth : 1440;

  // Direção aleatória
  const dir = Math.random() < 0.5 ? 1 : -1;
  const fromX = dir === 1 ? -340 : W + 340;
  const dx = (dir === 1 ? 1 : -1) * (W + 680);

  const startY = 20 + Math.random() * 420;

  // Física vertical (em px por unidade de tempo normalizado):
  //  vy0 < 0  → arremessada pra cima, sobe e cai (parábola côncava)
  //  vy0 > 0  → já descendo e acelerando (queda de gravidade)
  const vy0 = -300 + Math.random() * 460; // -300 .. +160
  const g = 280 + Math.random() * 700; //  280 .. 980

  const width = 110 + Math.floor(Math.random() * 180); // 110–290 px
  const duration = 1.8 + Math.random() * 2.0; // 1.8–3.8 s

  return { id, fromX, dx, startY, vy0, g, width, duration };
}

// ── visual de uma estrela ──────────────────────────────────────────
function Star({
  fromX, dx, startY, vy0, g, width, duration, onComplete,
}: StarProps & { onComplete: () => void }) {
  // t: progresso normalizado 0→1, em velocidade constante (linear)
  const t = useMotionValue(0);

  useEffect(() => {
    const controls = animate(t, 1, { duration, ease: "linear" });
    const timer = setTimeout(onComplete, duration * 1000 + 40);
    return () => {
      controls.stop();
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Posição: X linear (velocidade horizontal constante = física real),
  // Y quadrático (aceleração vertical = parábola de gravidade)
  const x = useTransform(t, (v) => fromX + dx * v);
  const y = useTransform(t, (v) => startY + vy0 * v + 0.5 * g * v * v);

  // Rotação acompanha a TANGENTE da curva a cada instante:
  // velocidade = (dx, vy0 + g·t). É isso que dá a sensação fluida.
  const rotate = useTransform(
    t,
    (v) => (Math.atan2(vy0 + g * v, dx) * 180) / Math.PI
  );

  const opacity = useTransform(t, [0, 0.06, 0.85, 1], [0, 1, 0.92, 0]);

  return (
    <motion.div
      className="absolute top-0 left-0 pointer-events-none"
      style={{ x, y, rotate, opacity, transformOrigin: "right center" }}
    >
      {/* Cauda: gradiente transparente → branco (cabeça na direita) */}
      <div
        style={{
          width,
          height: 1.6,
          borderRadius: 999,
          background:
            "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.08) 25%, rgba(255,255,255,0.78) 78%, white 100%)",
        }}
      />
      {/* Cabeça brilhante */}
      <div
        style={{
          position: "absolute",
          right: -2,
          top: "50%",
          transform: "translateY(-50%)",
          width: 4.5,
          height: 4.5,
          borderRadius: "50%",
          background: "white",
          boxShadow:
            "0 0 6px 2px rgba(255,255,255,0.95), 0 0 20px 7px rgba(180,235,255,0.55)",
        }}
      />
    </motion.div>
  );
}

// ── máquina de estado: 1 estrela por vez ─────────────────────────
export default function ShootingStars() {
  const [star, setStar] = useState<StarProps | null>(null);
  const idRef = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
