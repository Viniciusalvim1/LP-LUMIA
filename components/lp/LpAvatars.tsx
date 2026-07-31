"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// ⚠️ PLACEHOLDER: estes rostos são gerados por IA, não são clientes
// reais da Lumia. Ficam ao lado de "+100 clínicas já usam a Lumia",
// então o leitor vai entendê-los como clientes. Substitua por fotos
// de clínicas reais (com autorização de uso de imagem) assim que
// houver — é só trocar os arquivos em /public/images/avatares/.
const AVATARS = [1, 2, 3, 4, 5, 6, 7].map((n) => `/images/avatares/avatar-${n}.jpg`);

const STEP_MS = 1300;

export default function LpAvatars({ label }: { label: string }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setActive((i) => (i + 1) % AVATARS.length),
      STEP_MS
    );
    return () => clearInterval(id);
  }, []);

  // "+100 clínicas" ganha destaque; o resto da frase fica em peso
  // normal — mesma quebra da referência ("+100 profissionais já...").
  const words = label.split(" ");
  const strong = words.slice(0, 2).join(" ");
  const rest = words.slice(2).join(" ");

  return (
    // Mobile empilha (avatares acima da frase); no desktop os dois
    // ficam lado a lado, como na referência.
    <div className="flex flex-col items-center gap-2.5 lg:flex-row lg:gap-4">
      <div className="flex items-center pl-2" aria-hidden="true">
        {AVATARS.map((src, i) => {
          const isActive = i === active;
          return (
            <span
              key={src}
              className="relative -ml-2 rounded-full overflow-hidden transition-all duration-500 ease-out"
              style={{
                width: 30,
                height: 30,
                // A escala e o z-index sobem juntos: sem o z-index o
                // avatar cresce por baixo do vizinho e o efeito some.
                transform: isActive ? "scale(1.18)" : "scale(1)",
                zIndex: isActive ? 10 : AVATARS.length - i,
                boxShadow: isActive
                  ? "0 0 0 1.5px rgba(76,183,148,0.75), 0 3px 9px rgba(0,0,0,0.32)"
                  : "0 0 0 1.5px #183A51",
                filter: isActive
                  ? "none"
                  : "saturate(0.7) brightness(0.8)",
              }}
            >
              <Image
                src={src}
                alt=""
                width={30}
                height={30}
                className="w-full h-full object-cover"
                // Aparecem acima da dobra: sem lazy, senão piscam
                priority={i < 4}
              />
            </span>
          );
        })}
      </div>

      <p
        className="text-[13px] md:text-[14px] text-white/50"
        style={{ fontFamily: "var(--font-display)" }}
      >
        <span className="font-bold text-white/90">{strong}</span> {rest}
      </p>
    </div>
  );
}
