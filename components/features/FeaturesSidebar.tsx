"use client";

import { useEffect, useRef, useState } from "react";
import { featureCategories } from "@/content/features";
import { featureIcons } from "./featureIcons";

export default function FeaturesSidebar() {
  const [active, setActive] = useState(featureCategories[0].features[0].id);
  const mobileRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Scroll-spy: observa qual seção de feature está visível
  useEffect(() => {
    const ids = featureCategories.flatMap((c) => c.features.map((f) => f.id));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Mantém o chip ativo visível na barra mobile
  useEffect(() => {
    mobileRefs.current[active]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [active]);

  function jump(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top, behavior: "smooth" });
  }

  return (
    <>
      {/* ── Desktop: sidebar sticky ── */}
      <nav className="hidden lg:block w-[240px] shrink-0">
        <div className="sticky top-[110px] flex flex-col gap-6">
          {featureCategories.map((cat) => (
            <div key={cat.id}>
              <p
                className="text-[12px] font-semibold uppercase tracking-widest text-[#69727D] mb-3 px-3"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {cat.label}
              </p>
              <ul className="flex flex-col gap-0.5">
                {cat.features.map((f) => {
                  const isActive = active === f.id;
                  return (
                    <li key={f.id}>
                      <button
                        onClick={() => jump(f.id)}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all duration-200 cursor-pointer"
                        style={{
                          fontFamily: "var(--font-display)",
                          background: isActive ? "rgba(76,183,148,0.12)" : "transparent",
                          color: isActive ? "#183A51" : "#69727D",
                        }}
                      >
                        <span
                          className="w-4 h-4 shrink-0"
                          style={{ color: isActive ? "#4CB794" : "#A0A8B0" }}
                        >
                          {featureIcons[f.id]}
                        </span>
                        <span
                          className="text-[14px]"
                          style={{ fontWeight: isActive ? 600 : 400 }}
                        >
                          {f.name}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </nav>

      {/* ── Mobile: barra de chips sticky ── */}
      <div className="lg:hidden sticky top-[88px] z-30 -mx-5 px-5 py-3 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {featureCategories.flatMap((c) => c.features).map((f) => {
            const isActive = active === f.id;
            return (
              <button
                key={f.id}
                ref={(el) => { mobileRefs.current[f.id] = el; }}
                onClick={() => jump(f.id)}
                className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[13px] transition-all duration-200 cursor-pointer whitespace-nowrap"
                style={{
                  fontFamily: "var(--font-display)",
                  borderColor: isActive ? "#4CB794" : "#E0E4E8",
                  background: isActive ? "#4CB794" : "transparent",
                  color: isActive ? "#fff" : "#69727D",
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                <span className="w-3.5 h-3.5">{featureIcons[f.id]}</span>
                {f.name}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
