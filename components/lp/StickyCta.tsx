"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LpCta from "./LpCta";

/**
 * Barra fixa de conversão no mobile. Aparece depois que o visitante
 * passa do hero — antes disso o CTA do hero já está na tela e a barra
 * só roubaria área útil.
 */
export default function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(window.scrollY > window.innerHeight * 0.9);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden px-4 pt-3"
          style={{
            paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))",
            background: "rgba(24,58,81,0.88)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            borderTop: "1px solid rgba(255,255,255,0.12)",
          }}
          initial={{ y: 90 }}
          animate={{ y: 0 }}
          exit={{ y: 90 }}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          <LpCta location="sticky-mobile" full />
          <p
            className="text-center text-[11px] text-white/40 mt-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Sem cartão de crédito · Cancele quando quiser
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
