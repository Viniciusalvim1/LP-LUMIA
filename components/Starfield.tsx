import { useMemo } from "react";

// LCG determinístico — mesmos resultados no servidor e no cliente
function makeRand(seed: number) {
  let s = seed | 0;
  return () => {
    s ^= s << 13;
    s ^= s >> 17;
    s ^= s << 5;
    return (s >>> 0) / 0x100000000;
  };
}

type AnimType = "twinkle-dim" | "twinkle-mid" | "twinkle-bright" | "twinkle-flash" | "static";

// Distribuição: mais estrelas tênues, poucas muito brilhantes
const POOL: AnimType[] = [
  "twinkle-dim", "twinkle-dim", "twinkle-dim",
  "twinkle-mid", "twinkle-mid",
  "twinkle-bright",
  "twinkle-flash",
  "static", "static",
];

interface Props {
  count?: number;
  seed?: number;
}

export default function Starfield({ count = 130, seed = 1 }: Props) {
  const stars = useMemo(() => {
    const rand = makeRand(seed * 31337);
    return Array.from({ length: count }, (_, i) => {
      const anim = POOL[Math.floor(rand() * POOL.length)];
      const size = rand() < 0.60 ? 1 : rand() < 0.85 ? 1.5 : 2;
      return {
        id: i,
        x: rand() * 100,
        y: rand() * 100,
        size,
        anim,
        // estrelas estáticas têm opacidade inline fixa
        staticOpacity: rand() * 0.45 + 0.10,
        duration: 2.5 + rand() * 5.5,
        delay: rand() * 9,
      };
    });
  }, [count, seed]);

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {stars.map((s) => (
        <div
          key={s.id}
          style={{
            position: "absolute",
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            borderRadius: "50%",
            background: "white",
            // estáticas: opacity inline; animadas: keyframe controla
            opacity: s.anim === "static" ? s.staticOpacity : undefined,
            animationName: s.anim === "static" ? undefined : s.anim,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
            animationIterationCount: "infinite",
            animationTimingFunction: "ease-in-out",
          }}
        />
      ))}
    </div>
  );
}
