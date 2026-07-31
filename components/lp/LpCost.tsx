"use client";

import { motion } from "framer-motion";
import Starfield from "../Starfield";
import LpCta from "./LpCta";
import { lpCost } from "@/content/lp";

export default function LpCost() {
  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: "#183A51" }}>
      <Starfield count={140} seed={7} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_15%,rgba(76,183,148,0.09)_0%,transparent_58%)] pointer-events-none" />

      <div className="relative z-10 max-w-[1000px] mx-auto px-5 lg:px-12 py-20 md:py-24">
        {/* Cabeçalho */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <span
            className="inline-block bg-[#4CB794]/20 text-[#4CB794] text-[14px] font-medium px-4 py-1.5 rounded-full mb-5"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {lpCost.badge}
          </span>
          <h2
            className="text-[30px] md:text-[42px] font-bold leading-[1.15] text-white max-w-[680px] mx-auto"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {lpCost.headline}
          </h2>
          <p
            className="text-[16px] md:text-[18px] text-white/55 mt-5"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {lpCost.lead}
          </p>

          {/* Dinheiro + Tempo — o resumo visual das duas contas */}
          <div
            className="flex items-center justify-center gap-4 md:gap-6 mt-7"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span className="text-[20px] md:text-[26px] font-bold text-white">
              {lpCost.money.label}
            </span>
            <span className="text-[22px] md:text-[28px] font-light text-[#4CB794]">+</span>
            <span className="text-[20px] md:text-[26px] font-bold text-white">
              {lpCost.time.label}
            </span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mt-12">
          {/* ── Dinheiro ── */}
          <motion.div
            className="relative rounded-2xl border border-white/12 p-8 flex flex-col"
            style={{ background: "rgba(255,255,255,0.04)" }}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#4CB794] mb-5"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {lpCost.money.label}
            </span>

            <p
              className="text-[17px] md:text-[18px] leading-[1.6] text-white/85"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {lpCost.money.intro}
            </p>
            <p
              className="text-[16px] leading-[1.65] text-white/55 mt-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {lpCost.money.math}
            </p>

            <div className="mt-auto pt-8">
              <p
                className="text-[42px] md:text-[54px] font-bold leading-none tabular-nums"
                style={{
                  fontFamily: "var(--font-display)",
                  background: "linear-gradient(90deg, #4CB794, #6ef5d0)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {lpCost.money.amount}
              </p>
              <p
                className="text-[16px] md:text-[17px] text-white/70 mt-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {lpCost.money.after}
              </p>
            </div>
          </motion.div>

          {/* ── Tempo ── */}
          <motion.div
            className="relative rounded-2xl border border-white/12 p-8"
            style={{ background: "rgba(255,255,255,0.04)" }}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span
              className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#4CB794] mb-5 block"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {lpCost.time.label}
            </span>

            <p
              className="text-[17px] md:text-[18px] leading-[1.6] text-white/85 mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {lpCost.time.intro}
            </p>

            <ul className="flex flex-col gap-4">
              {lpCost.time.items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    className="mt-[9px] w-1.5 h-1.5 rounded-full bg-[#4CB794] shrink-0"
                    aria-hidden="true"
                  />
                  <span
                    className="text-[15px] md:text-[16px] leading-[1.6] text-white/65"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Fecho */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <p
            className="text-[19px] md:text-[24px] leading-[1.45] font-semibold text-white max-w-[720px] mx-auto"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {lpCost.closing}
          </p>

          <div className="mt-9">
            <LpCta location="conta" size="lg" />
          </div>

          <p
            className="text-[12px] text-white/30 mt-7 max-w-[520px] mx-auto"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {lpCost.footnote}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
