"use client";

import { useLayoutEffect } from "react";

/**
 * Mantém entradas novas e recarregamentos no hero. Âncoras explícitas e
 * navegação voltar/avançar continuam respeitando a posição esperada.
 */
export default function LpEntryReset() {
  useLayoutEffect(() => {
    if (window.location.hash) return;

    const navigation = performance.getEntriesByType(
      "navigation",
    )[0] as PerformanceNavigationTiming | undefined;
    if (navigation?.type === "back_forward") return;

    const previousRestoration = window.history.scrollRestoration;
    const root = document.documentElement;
    const previousInlineScrollBehavior = root.style.scrollBehavior;
    window.history.scrollRestoration = "manual";
    root.style.scrollBehavior = "auto";
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    // Alguns navegadores restauram a posição depois do primeiro layout.
    // Repetir no frame seguinte mantém o reset antes de o usuário interagir.
    const frame = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      root.style.scrollBehavior = previousInlineScrollBehavior;
    });

    return () => {
      cancelAnimationFrame(frame);
      root.style.scrollBehavior = previousInlineScrollBehavior;
      window.history.scrollRestoration = previousRestoration;
    };
  }, []);

  return null;
}
