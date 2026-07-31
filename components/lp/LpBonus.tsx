"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { lpBonus } from "@/content/lp";

const brl = (value: number) =>
  value.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

const brlWithCents = (value: number) =>
  value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// Uma etapa por serviço, uma para o resumo e outra para o total.
// Derivado dos dados: adicionar ou remover um serviço não quebra a animação.
const STEPS = lpBonus.items.length + 2;
const SUMMARY_STEP = lpBonus.items.length;
const TOTAL_STEP = SUMMARY_STEP + 1;

// Quase todo o trecho preso produz uma mudança visível. Os 8% finais
// deixam o total respirando antes de a página seguir para o preço.
const REVEAL_START = 0.04;
const REVEAL_END = 0.92;
const SLOT = (REVEAL_END - REVEAL_START) / STEPS;

// Opacidade das linhas ainda não reveladas. NÃO pode ser 0: como o
// espaço delas já está reservado no layout, uma nota com tudo a zero
// aparece como um retângulo escuro vazio e lê como bug. Em 0.18 ela
// sempre parece um documento preenchido, e o scroll acende o foco em
// vez de fazer as linhas surgirem do nada.
const DIM = 0.18;

// Cada etapa recebe pouco menos de 1/4 de viewport. Mantém tempo de leitura
// sem dar a sensação de que a página ficou parada por várias telas.
const SCROLL_VH_PER_STEP = 22;
const BONUS_REVEAL_SESSION_KEY = "lumia:bonus-reveal-complete";

/**
 * Deriva opacidade e deslocamento direto do progresso do scroll, em
 * vez de usar delay por tempo: cada linha só acende quando o leitor
 * efetivamente rolou até ela, e ele controla o ritmo da soma.
 *
 * Só opacity/transform — a altura da nota nunca muda (zero CLS).
 */
function useReveal(progress: MotionValue<number>, index: number) {
  const start = REVEAL_START + index * SLOT;
  const end = start + SLOT * 0.7;
  return {
    opacity: useTransform(progress, [start, end], [DIM, 1]),
    y: useTransform(progress, [start, end], [10, 0]),
  };
}

function ReceiptItem({
  progress,
  index,
  title,
  note,
  value,
}: {
  progress: MotionValue<number>;
  index: number;
  title: string;
  note: string;
  value: number;
}) {
  const reveal = useReveal(progress, index);

  return (
    <motion.li
      className="flex items-start justify-between gap-5 py-4 md:py-5 border-b border-white/[0.07]"
      style={reveal}
    >
      <div className="min-w-0">
        <p className="text-[15px] md:text-[17px] font-semibold text-white leading-snug">{title}</p>
        <p className="text-[12px] md:text-[13px] leading-[1.5] text-white/45 mt-1">{note}</p>
      </div>
      <span className="text-[16px] md:text-[18px] font-semibold text-white/80 tabular-nums shrink-0 pt-0.5">
        R$ {brl(value)}
      </span>
    </motion.li>
  );
}

function RevealBlock({
  progress,
  index,
  className,
  style,
  children,
}: {
  progress: MotionValue<number>;
  index: number;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  const reveal = useReveal(progress, index);
  return (
    <motion.div className={className} style={{ ...style, ...reveal }}>
      {children}
    </motion.div>
  );
}

export default function LpBonus() {
  const receiptRef = useRef<HTMLDivElement>(null);
  const receiptCardRef = useRef<HTMLDivElement>(null);
  const afterTrackRef = useRef<HTMLDivElement>(null);
  const revealStartedRef = useRef(false);
  const revealFinishedRef = useRef(false);
  const collapsedRef = useRef(false);
  const collapseAnchorElementRef = useRef<HTMLElement | null>(null);
  const collapseAnchorTopRef = useRef<number | null>(null);
  const highestScrollYRef = useRef(0);
  const [activeStep, setActiveStep] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);
  const subtotal = lpBonus.items.reduce((sum, item) => sum + item.value, 0);
  const includedDiscount = subtotal;
  const total = subtotal - includedDiscount;

  // O container é mais alto que a tela e a nota fica presa dentro dele.
  // Todo o scroll desse trecho vira progresso de revelação — o leitor
  // não passa da seção sem que as cinco linhas tenham acendido.
  const { scrollYProgress } = useScroll({
    target: receiptRef,
    offset: ["start start", "end end"],
  });

  // Progresso em catraca: só sobe, nunca desce. Uma nota fiscal não
  // "desemite" — depois que uma linha acende ela fica acesa, mesmo que
  // o usuário role de volta ou que a medição do scroll oscile no fim
  // do percurso (era isso que deixava o extrato vazio ao terminar).
  const progress = useMotionValue(0);
  const smoothProgress = useSpring(progress, {
    stiffness: 170,
    damping: 30,
    mass: 0.32,
    restDelta: 0.001,
  });

  const persistCompletion = useCallback(() => {
    revealFinishedRef.current = true;
    try {
      sessionStorage.setItem(BONUS_REVEAL_SESSION_KEY, "1");
    } catch {
      // A experiência continua funcionando quando o storage está bloqueado.
    }
  }, []);

  const collapseScrollTrack = useCallback((anchor?: HTMLElement | null) => {
    if (collapsedRef.current) return;
    collapsedRef.current = true;

    const resolvedAnchor = anchor ?? receiptCardRef.current;
    if (resolvedAnchor) {
      collapseAnchorElementRef.current = resolvedAnchor;
      collapseAnchorTopRef.current = resolvedAnchor.getBoundingClientRect().top;
    }

    persistCompletion();
    progress.set(1);
    setActiveStep(STEPS - 1);
    setAnimationComplete(true);
  }, [persistCompletion, progress]);

  // Se já foi visto nesta aba/sessão, o extrato nasce completo e não
  // cria novamente o trecho alto de scroll.
  useEffect(() => {
    highestScrollYRef.current = window.scrollY;
    let frame = 0;

    try {
      if (sessionStorage.getItem(BONUS_REVEAL_SESSION_KEY) === "1") {
        frame = requestAnimationFrame(() => {
          const receiptBounds = receiptRef.current?.getBoundingClientRect();
          if (
            receiptBounds &&
            receiptBounds.top < window.innerHeight &&
            receiptCardRef.current
          ) {
            collapseAnchorElementRef.current = receiptCardRef.current;
            collapseAnchorTopRef.current =
              receiptCardRef.current.getBoundingClientRect().top;
          }

          revealStartedRef.current = true;
          revealFinishedRef.current = true;
          collapsedRef.current = true;
          progress.set(1);
          setActiveStep(STEPS - 1);
          setAnimationComplete(true);
        });
      }
    } catch {
      // Sem storage, mantém a experiência normal nesta visita.
    }

    return () => {
      if (frame) cancelAnimationFrame(frame);
    };
  }, [progress]);

  // Ao remover o trilho alto, preserva a posição visual do conteúdo que
  // vem depois. Isso evita o salto de página quando a seção é liberada.
  useLayoutEffect(() => {
    const previousTop = collapseAnchorTopRef.current;
    const anchor = collapseAnchorElementRef.current;
    if (!animationComplete || previousTop === null || !anchor) return;

    const nextTop = anchor.getBoundingClientRect().top;
    collapseAnchorElementRef.current = null;
    collapseAnchorTopRef.current = null;

    const root = document.documentElement;
    const previousInlineScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollBy({ top: nextTop - previousTop, behavior: "auto" });
    root.style.scrollBehavior = previousInlineScrollBehavior;
  }, [animationComplete]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (animationComplete) return;

    const nextProgress = Math.max(progress.get(), p);
    if (nextProgress > progress.get()) progress.set(nextProgress);
    if (nextProgress > REVEAL_START) revealStartedRef.current = true;

    const normalized = Math.max(
      0,
      Math.min(0.999, (nextProgress - REVEAL_START) / (REVEAL_END - REVEAL_START)),
    );
    const nextStep = Math.min(STEPS - 1, Math.floor(normalized * STEPS));
    setActiveStep((current) => (current === nextStep ? current : nextStep));

    if (nextProgress >= REVEAL_END) persistCompletion();
  });

  // Subir nunca prende o usuário: depois que a leitura começou, inverter
  // a direção encerra a experiência, mostra tudo e remove o trilho.
  // Descendo, o trilho só é removido quando já ficou acima da viewport.
  useEffect(() => {
    if (animationComplete) return;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      highestScrollYRef.current = Math.max(
        highestScrollYRef.current,
        currentScrollY,
      );
      const goingUp =
        currentScrollY < highestScrollYRef.current - 20;

      if (goingUp && revealStartedRef.current) {
        collapseScrollTrack(receiptCardRef.current);
        return;
      }

      const receipt = receiptRef.current;
      if (
        revealFinishedRef.current &&
        receipt &&
        receipt.getBoundingClientRect().bottom <= 0
      ) {
        collapseScrollTrack(afterTrackRef.current);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [animationComplete, collapseScrollTrack]);

  const readingProgress = useTransform(
    smoothProgress,
    [REVEAL_START, REVEAL_END],
    [0, 1],
  );

  return (
    <section className="bg-[#F7F7F7] pt-20 md:pt-28 pb-20 md:pb-28">
      {/* Cabeçalho — fora do trecho travado, senão o conjunto passa da
          altura da tela em celular */}
      <div className="max-w-[1000px] mx-auto px-5 lg:px-12">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-badge mb-4">{lpBonus.badge}</span>
          <h2
            className="text-[30px] md:text-[40px] font-bold leading-[1.16] text-[#183A51] mt-4 max-w-[640px] mx-auto"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {lpBonus.headline}
          </h2>
          <p
            className="text-[16px] md:text-[17px] leading-[1.7] text-[#69727D] mt-4 max-w-[600px] mx-auto"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {lpBonus.sub}
          </p>
        </motion.div>
      </div>

      {/* ── Trecho travado ──
          A nota gruda no centro e cada fatia do percurso acende uma linha.
          A duração cresce automaticamente com o número de serviços. */}
      <div
        ref={receiptRef}
        className="relative mt-10"
        style={{
          height: animationComplete
            ? "auto"
            : `${100 + STEPS * SCROLL_VH_PER_STEP}svh`,
        }}
      >
        <div
          className={
            animationComplete
              ? "relative flex items-center justify-center px-5 lg:px-12"
              : "sticky top-0 h-[100svh] flex items-center justify-center px-5 lg:px-12"
          }
        >
          {/* Escura numa seção clara: é o único bloco desse peso na
              página, então lê como documento, não como mais um card. */}
          <div ref={receiptCardRef} className="relative w-full max-w-[620px]">
            <div className="absolute -inset-4 bg-[radial-gradient(ellipse_at_center,rgba(24,58,81,0.18)_0%,transparent_70%)] blur-xl pointer-events-none" />

            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(165deg, #1d4661 0%, #143044 55%, #102636 100%)",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow:
                  "0 30px 70px rgba(16,38,54,0.38), 0 6px 18px rgba(16,38,54,0.22), inset 0 1px 0 rgba(255,255,255,0.14)",
              }}
            >
              <div className="p-6 md:p-9" style={{ fontFamily: "var(--font-display)" }}>
                {/* Cabeçalho da nota — sempre visível, é a moldura que
                    diz "isto é um documento" antes das linhas chegarem */}
                <div className="pb-5 md:pb-6 border-b border-white/12">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#4CB794]">
                      {lpBonus.receiptLabel}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-semibold tabular-nums tracking-[0.12em] text-white/35">
                        {String(activeStep + 1).padStart(2, "0")}/
                        {String(STEPS).padStart(2, "0")}
                      </span>
                      <span className="text-[13px] lowercase font-semibold text-white/45">
                        lumia
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/[0.07]">
                    <motion.div
                      className="h-full origin-left rounded-full bg-[#4CB794]"
                      style={{ scaleX: readingProgress }}
                    />
                  </div>
                </div>

                {/* Itens */}
                <ul className="flex flex-col">
                  {lpBonus.items.map((item, i) => (
                    <ReceiptItem
                      key={item.title}
                      progress={smoothProgress}
                      index={i}
                      title={item.title}
                      note={item.note}
                      value={item.value}
                    />
                  ))}
                </ul>

                {/* Subtotal e desconto */}
                <RevealBlock progress={smoothProgress} index={SUMMARY_STEP}>
                  <div className="flex items-center justify-between gap-4 pt-4 md:pt-5">
                    <span className="text-[15px] text-white/60">{lpBonus.subtotalLabel}</span>
                    <span className="text-[16px] md:text-[17px] font-semibold text-white/70 tabular-nums">
                      R$ {brl(subtotal)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4 mt-2.5 pb-4 md:pb-5">
                    <span className="text-[15px] text-[#4CB794]">{lpBonus.discountLabel}</span>
                    <span className="text-[16px] md:text-[17px] font-semibold text-[#4CB794] tabular-nums">
                      −R$ {brl(includedDiscount)}
                    </span>
                  </div>
                </RevealBlock>

                {/* Total */}
                <RevealBlock
                  progress={smoothProgress}
                  index={TOTAL_STEP}
                  className="flex items-end justify-between gap-4 pt-5 md:pt-6"
                  style={{ borderTop: "1px dashed rgba(255,255,255,0.22)" }}
                >
                  <span className="text-[12px] font-bold uppercase tracking-[0.16em] text-white/55 pb-2">
                    {lpBonus.totalLabel}
                  </span>
                  <span
                    className="text-[38px] md:text-[48px] font-bold leading-none tabular-nums"
                    style={{
                      background: "linear-gradient(90deg, #4CB794, #6ef5d0)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    R$ {brlWithCents(total)}
                  </span>
                </RevealBlock>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div ref={afterTrackRef} className="h-px" aria-hidden="true" />

      {/* Conversão para a moeda que ele já entende: a mensalidade */}
      <div className="max-w-[1000px] mx-auto px-5 lg:px-12">
        <motion.p
          className="text-center text-[18px] md:text-[22px] leading-[1.45] mt-4 max-w-[620px] mx-auto"
          style={{ fontFamily: "var(--font-display)" }}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="font-bold text-[#183A51]">{lpBonus.closingStrong}</span>{" "}
          <span className="text-[#69727D]">{lpBonus.closingRest}</span>
        </motion.p>
      </div>
    </section>
  );
}
