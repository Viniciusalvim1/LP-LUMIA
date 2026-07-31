"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { lpDifferentiators as d } from "@/content/lp";

function FeatureGlyph({ index }: { index: number }) {
  return (
    <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#EAF7F3] text-[#4CB794] md:size-14">
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {index === 0 && (
          <>
            <path d="m12 3 1.3 4.2L17.5 8.5l-4.2 1.3L12 14l-1.3-4.2-4.2-1.3 4.2-1.3L12 3Z" />
            <path d="m19 14 .7 2.3L22 17l-2.3.7L19 20l-.7-2.3L16 17l2.3-.7L19 14Z" />
          </>
        )}
        {index === 1 && (
          <>
            <path d="M5 7h9" />
            <path d="m11 4 3 3-3 3" />
            <path d="M19 17h-9" />
            <path d="m13 14-3 3 3 3" />
          </>
        )}
        {index === 2 && (
          <>
            <path d="M9 12.5 11.5 15a3.5 3.5 0 0 0 5-5L15 8.5" />
            <path d="M15 11.5 12.5 9a3.5 3.5 0 0 0-5 5L9 15.5" />
          </>
        )}
        {index === 3 && (
          <>
            <circle cx="9" cy="8" r="3" />
            <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
            <path d="M16 7h5" />
            <path d="M18.5 4.5v5" />
            <path d="m17 16 1.5 1.5L22 14" />
          </>
        )}
        {index === 4 && (
          <>
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <circle cx="9" cy="11" r="2.5" />
            <path d="M5.5 17a3.5 3.5 0 0 1 7 0" />
            <path d="M15 10h3.5" />
            <path d="M15 14h3.5" />
          </>
        )}
        {index === 5 && (
          <>
            <path d="M4 19V9" />
            <path d="M10 19V5" />
            <path d="M16 19v-7" />
            <path d="M22 19H2" />
            <path d="m4 7 5-4 6 6 6-5" />
          </>
        )}
      </svg>
    </span>
  );
}

export default function LpDifferentiators() {
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveCard = (row: HTMLDivElement) => {
    const rowCenter = row.scrollLeft + row.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(cardCenter - rowCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  };

  return (
    <section className="relative bg-[#F1F8F6] py-16 md:py-24 lg:py-28">
      <div className="px-4 md:px-6">
        <div className="relative mx-auto w-full max-w-[1280px] overflow-clip rounded-[28px] bg-[#183A51] md:rounded-[40px]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(76,183,148,0.16),transparent_34%),radial-gradient(circle_at_15%_90%,rgba(22,115,163,0.18),transparent_36%)]" />

          <div className="relative grid gap-9 px-6 py-10 md:px-10 md:py-14 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:items-start lg:gap-14 lg:px-16 lg:py-20 xl:gap-20 xl:px-20">
            <motion.div
              className="lg:sticky lg:top-28 lg:py-8"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55 }}
            >
              <p
                className="mb-3 text-[15px] font-semibold italic tracking-[0.03em] text-[#4CB794] md:mb-5 md:text-[20px]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {d.badge}
              </p>

              <h2
                className="max-w-[560px] text-[28px] font-extrabold uppercase leading-[1.02] tracking-[-0.035em] text-white sm:text-[34px] md:text-[44px] lg:text-[52px]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {d.headline}
              </h2>

              <p
                className="mt-4 max-w-[500px] text-[14px] leading-[1.6] text-white/70 md:mt-6 md:text-[17px] md:leading-[1.7]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {d.sub}
              </p>

              <div className="mt-7 hidden max-w-[500px] border-l-2 border-[#4CB794] pl-5 md:block">
                <p
                  className="text-[15px] font-medium leading-[1.65] text-white/85 md:text-[16px]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {d.punch}
                </p>
              </div>
            </motion.div>

            <div className="min-w-0">
              <div
                className="-mr-6 flex items-stretch snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pr-12 no-scrollbar md:-mr-10 md:pr-16 lg:mr-0 lg:grid lg:auto-rows-fr lg:gap-6 lg:overflow-visible lg:pr-0"
                aria-label="Diferenciais da Lumia"
                onScroll={(event) => updateActiveCard(event.currentTarget)}
              >
                {d.items.map((item, i) => (
                  <article
                    key={item.title}
                    ref={(element) => {
                      cardRefs.current[i] = element;
                    }}
                    className="flex w-[82%] max-w-[350px] shrink-0 snap-start flex-col rounded-[22px] bg-white p-6 shadow-[0_18px_55px_rgba(5,24,37,0.16)] sm:w-[78%] md:w-[440px] md:max-w-none md:p-8 lg:w-auto"
                  >
                    <div className="flex items-center gap-4">
                      <FeatureGlyph index={i} />
                      <h3
                        className="text-[18px] font-bold leading-[1.25] text-[#183A51] md:text-[20px]"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        <span className="mr-2 text-[#4CB794] tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {item.title}
                      </h3>
                    </div>

                    <p
                      className="mt-5 text-[15px] leading-[1.68] text-[#56636D] md:text-[16px] md:leading-[1.72]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {item.body}
                    </p>
                  </article>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between gap-4 lg:hidden">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  {d.items.map((item, index) => (
                    <span
                      key={item.title}
                      className="h-1.5 rounded-full transition-all duration-300"
                      style={{
                        width: index === activeIndex ? 22 : 6,
                        background:
                          index === activeIndex
                            ? "#4CB794"
                            : "rgba(255,255,255,0.24)",
                      }}
                    />
                  ))}
                </div>

                <p
                  className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#4CB794]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  <span>
                    {String(activeIndex + 1).padStart(2, "0")}/
                    {String(d.items.length).padStart(2, "0")}
                  </span>
                  <span>Deslize para ver mais</span>
                  <motion.span
                    aria-hidden="true"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    →
                  </motion.span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
