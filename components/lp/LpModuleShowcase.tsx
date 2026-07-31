"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { lpModules } from "@/content/lp";
import { track } from "@/lib/analytics";

/** Marca-texto atrás de uma palavra-chave do título — feito só com
    CSS. boxDecorationBreak: "clone" é essencial: sem ele, quando a
    frase destacada quebra em duas linhas, o fundo só cobre a
    primeira — a segunda linha fica sem marca-texto nenhum. */
function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        background: "rgba(76,183,148,0.32)",
        padding: "0.04em 0.2em",
        borderRadius: "3px",
        boxDecorationBreak: "clone",
        WebkitBoxDecorationBreak: "clone",
      }}
    >
      {children}
    </span>
  );
}

export default function LpModuleShowcase() {
  const showcaseRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const labelRailRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const scrollAnimRef = useRef<number | null>(null);
  const scrollSyncFrameRef = useRef<number | null>(null);
  const playRetryTimersRef = useRef<Record<string, number>>({});
  const animatingRef = useRef(false);
  const activeIndexRef = useRef(0);
  const showcaseVisibleRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [isShowcaseVisible, setIsShowcaseVisible] = useState(false);

  const playActiveVideo = useCallback((moduleId: string) => {
    const activeModule = lpModules[activeIndexRef.current];
    if (!showcaseVisibleRef.current || activeModule?.id !== moduleId) return;

    const video = videoRefs.current[moduleId];
    if (!video) return;

    // Reforça as propriedades exigidas pelo autoplay do Safari/iOS antes
    // de cada tentativa. Os atributos também estão no JSX, mas algumas
    // versões do WebKit só respeitam o estado atual da propriedade.
    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;

    const playRequest = video.play();
    if (playRequest && typeof playRequest.catch === "function") {
      playRequest.catch(() => {
        // Em iPhones o primeiro play() pode acontecer exatamente durante a
        // troca do poster pelo primeiro frame. Fazemos uma única tentativa
        // curta adicional; os eventos loadeddata/canplay continuam sendo
        // a segunda rede de segurança quando o buffer terminar.
        if (
          !showcaseVisibleRef.current ||
          lpModules[activeIndexRef.current]?.id !== moduleId ||
          playRetryTimersRef.current[moduleId]
        ) {
          return;
        }

        playRetryTimersRef.current[moduleId] = window.setTimeout(() => {
          delete playRetryTimersRef.current[moduleId];
          if (
            !showcaseVisibleRef.current ||
            lpModules[activeIndexRef.current]?.id !== moduleId
          ) {
            return;
          }
          video.play().catch(() => {
            // Uma interação posterior ou canplay fará uma nova tentativa.
          });
        }, 180);
      });
    }
  }, []);

  // O IntersectionObserver com uma faixa central muito estreita podia não
  // disparar no primeiro swipe do Safari. A posição real do scroll é a
  // fonte de verdade: o card cujo centro está mais próximo do centro do
  // carrossel passa a ser ativo imediatamente.
  const syncActiveCardFromScroll = useCallback(
    (tryPlayback = false) => {
      const row = rowRef.current;
      if (!row) return activeIndexRef.current;

      const rowRect = row.getBoundingClientRect();
      const rowCenter = rowRect.left + row.clientWidth / 2;
      let closestIndex = activeIndexRef.current;
      let closestDistance = Number.POSITIVE_INFINITY;

      lpModules.forEach((module, index) => {
        const card = cardRefs.current[module.id];
        if (!card) return;
        const cardRect = card.getBoundingClientRect();
        const distance = Math.abs(
          cardRect.left + cardRect.width / 2 - rowCenter,
        );
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      if (closestIndex !== activeIndexRef.current) {
        activeIndexRef.current = closestIndex;
        setActiveIndex(closestIndex);
      }

      if (tryPlayback) {
        playActiveVideo(lpModules[closestIndex].id);
      }

      return closestIndex;
    },
    [playActiveVideo],
  );

  const handleRowScroll = useCallback(() => {
    if (animatingRef.current || scrollSyncFrameRef.current !== null) return;

    scrollSyncFrameRef.current = requestAnimationFrame(() => {
      scrollSyncFrameRef.current = null;
      syncActiveCardFromScroll();
    });
  }, [syncActiveCardFromScroll]);

  useEffect(() => {
    const showcase = showcaseRef.current;
    if (!showcase) return;

    // Começa a baixar o vídeo atual pouco antes de a seção aparecer. Um
    // segundo observer informa quando já há área suficiente na tela para
    // tocar. Isso evita disputar rede com o hero e também evita o iOS
    // suspender um play() disparado enquanto o vídeo ainda está longe.
    const preloadObserver = new IntersectionObserver(
      ([entry]) => setIsNearViewport(entry.isIntersecting),
      { rootMargin: "1100px 0px", threshold: 0 },
    );
    const playbackObserver = new IntersectionObserver(
      ([entry]) => {
        showcaseVisibleRef.current = entry.isIntersecting;
        setIsShowcaseVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          playActiveVideo(lpModules[activeIndexRef.current].id);
        }
      },
      { rootMargin: "-8% 0px -8% 0px", threshold: 0.12 },
    );

    preloadObserver.observe(showcase);
    playbackObserver.observe(showcase);

    return () => {
      preloadObserver.disconnect();
      playbackObserver.disconnect();
    };
  }, [playActiveVideo]);

  useEffect(() => {
    syncActiveCardFromScroll();

    const handleResize = () => syncActiveCardFromScroll();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (scrollSyncFrameRef.current !== null) {
        cancelAnimationFrame(scrollSyncFrameRef.current);
      }
      Object.values(playRetryTimersRef.current).forEach(window.clearTimeout);
      playRetryTimersRef.current = {};
    };
  }, [syncActiveCardFromScroll]);

  // Rola até centralizar o card `index` com uma animação PRÓPRIA (rápida e
  // fluida). O scrollIntoView "smooth" nativo tinha duração longa/fixa do
  // navegador e ainda brigava com o scroll-snap mandatory (ficava travado
  // e demorado). Aqui: desligamos o snap durante a animação, controlamos a
  // curva (easeOutCubic) e a duração (~280ms), e restauramos o snap no
  // fim. Centralizar bate com o snap-center do desktop; no mobile o card
  // quase preenche a tela, então centro ≈ início.
  const scrollToIndex = useCallback((index: number) => {
    const row = rowRef.current;
    const clamped = Math.max(0, Math.min(lpModules.length - 1, index));
    const mod = lpModules[clamped];
    const card = cardRefs.current[mod.id];
    if (!row || !card) return;
    // Atualiza os visuais (opacidade/rótulo/barra/vídeo) JÁ no início, pra
    // eles transicionarem junto com o card deslizando — e não no meio do
    // caminho (o que dava o soluço). A sincronização pelo scroll fica
    // suprimida durante a animação, então não briga com esse índice.
    activeIndexRef.current = clamped;
    setActiveIndex(clamped);
    track("feature_tab_select", { feature: mod.id, location: "lp" });

    const rowRect = row.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();
    const cardLeftInContent = cardRect.left - rowRect.left + row.scrollLeft;
    const raw = cardLeftInContent + cardRect.width / 2 - row.clientWidth / 2;
    const to = Math.max(0, Math.min(row.scrollWidth - row.clientWidth, raw));
    const from = row.scrollLeft;
    const dist = to - from;
    if (Math.abs(dist) < 1) {
      playActiveVideo(mod.id);
      return;
    }

    if (scrollAnimRef.current !== null) cancelAnimationFrame(scrollAnimRef.current);
    animatingRef.current = true;
    row.style.scrollSnapType = "none";
    const start = performance.now();
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / 280);
      row.scrollLeft = from + dist * ease(t);
      if (t < 1) {
        scrollAnimRef.current = requestAnimationFrame(step);
      } else {
        scrollAnimRef.current = null;
        animatingRef.current = false;
        row.style.scrollSnapType = ""; // volta ao snap definido no CSS
        syncActiveCardFromScroll(true);
      }
    };
    scrollAnimRef.current = requestAnimationFrame(step);
  }, [playActiveVideo, syncActiveCardFromScroll]);

  // Carregamento leve + playback. O card atual e seus vizinhos recebem
  // buffer quando a seção se aproxima; somente o card em foco toca, e só
  // quando o carrossel está visível. Entrar na viewport ou receber
  // `canplay` dispara nova tentativa — essencial no Safari/iOS.
  useEffect(() => {
    activeIndexRef.current = activeIndex;
    showcaseVisibleRef.current = isShowcaseVisible;

    lpModules.forEach((m, i) => {
      const video = videoRefs.current[m.id];
      if (!video) return;

      const near =
        isNearViewport &&
        i >= Math.max(0, activeIndex - 1) &&
        i <= Math.min(lpModules.length - 1, activeIndex + 1);

      if (near) {
        if (video.preload !== "auto") video.preload = "auto";
        if (
          video.readyState === 0 ||
          video.networkState === HTMLMediaElement.NETWORK_EMPTY
        ) {
          video.load();
        }
      } else if (video.preload !== "none") {
        video.preload = "none";
      }

      if (i === activeIndex && isShowcaseVisible) {
        playActiveVideo(m.id);
      } else {
        video.pause();
      }
    });
  }, [activeIndex, isNearViewport, isShowcaseVisible, playActiveVideo]);

  // A tira de rótulos mostra um nome por card e mantém o card ativo
  // SEMPRE centralizado: conforme o carrossel avança, a tira rola sozinha
  // pra trazer o nome ativo pro meio (os vizinhos espiam dos lados). Sem
  // isso o nome ativo escaparia pro canto e ninguém perceberia a troca.
  useEffect(() => {
    const mod = lpModules[activeIndex];
    const rail = labelRailRef.current;
    const label = mod ? labelRefs.current[mod.id] : null;
    if (!rail || !label) return;

    // scrollIntoView também movimenta o eixo vertical da janela. Como essa
    // função rodava na montagem, o navegador levava a página até esta seção
    // antes de o visitante ver o hero. Centralizamos apenas o eixo X.
    const target =
      label.offsetLeft + label.offsetWidth / 2 - rail.clientWidth / 2;
    rail.scrollTo({
      left: Math.max(0, Math.min(rail.scrollWidth - rail.clientWidth, target)),
      behavior: activeIndex === 0 ? "auto" : "smooth",
    });
  }, [activeIndex]);

  return (
    <div ref={showcaseRef}>
      {/* ── Barra de progresso única e contínua (padrão stripe.com/br/
          startups) cobrindo os 14 módulos, com uma tira de rótulos abaixo:
          UM NOME POR CARD, e o card ativo fica sempre centralizado — a
          tira rola sozinha pra manter o nome ativo no meio (os vizinhos
          espiam dos lados). O padding px-[50vw] é o que permite o 1º e o
          último rótulo também alcançarem o centro (senão o scroll travaria
          no canto antes de centralizar). A tira é full-bleed (width:100vw +
          marginLeft:calc(50% - 50vw)) como o carrossel: sem isso, o padding
          de 50vw fazia a border-box crescer pra 100vw começando na borda do
          container e vazava pra direita, gerando scroll horizontal na
          página. */}
      <div className="mb-8">
        <span
          className="block h-[3px] rounded-full overflow-hidden mb-4"
          style={{ background: "rgba(24,58,81,0.10)" }}
        >
          <span
            className="block h-full rounded-full transition-all duration-300"
            style={{
              width: `${((activeIndex + 1) / lpModules.length) * 100}%`,
              background: "linear-gradient(90deg, #4CB794, #1673A3)",
            }}
          />
        </span>
        <div
          ref={labelRailRef}
          className="flex overflow-x-auto no-scrollbar gap-6 px-[50vw]"
          style={{ width: "100vw", marginLeft: "calc(50% - 50vw)" }}
        >
          {lpModules.map((mod, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={mod.id}
                ref={(el) => { labelRefs.current[mod.id] = el; }}
                onClick={() => scrollToIndex(i)}
                className="shrink-0 cursor-pointer whitespace-nowrap text-center text-[13px] md:text-[14px] font-bold transition-colors duration-200"
                style={{ fontFamily: "var(--font-display)", color: isActive ? "#183A51" : "#B7BEC4" }}
              >
                {mod.tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Carrossel de cards com um pequeno gap entre eles.
          FULL-BLEED: a linha estoura o container de 1100px e vai de ponta
          a ponta da faixa cinza (largura total da viewport), pra não
          sobrar aquela margem cinza vazia dos lados nas telas largas. O
          truque `width:100vw` + `marginLeft:calc(50% - 50vw)` alinha a
          borda esquerda exatamente na borda da viewport, independente do
          padding do container (o body tem overflow-x:hidden, então não
          gera scroll horizontal na página).
          MOBILE/TABLET — recuo que some ao rolar (padrão stripe.com/br/
          startups, que usa um `spacer--left`): pl == scroll-pl. Como o
          scroll-padding é igual ao padding, TODOS os cards encaixam nessa
          mesma linha de recuo ao dar snap — então o 1º card mostra o vazio
          à esquerda (nada antes dele), mas assim que rola, o card anterior
          ocupa esse espaço e o vazio some. Sem casar os dois, o snap
          mandatory puxaria o 1º card pra x=0 e o recuo nunca apareceria.
          DESKTOP (lg) — modo CENTRO: snap-center + padding lateral de
          calc(50vw - metade do card) faz o card em foco ficar sempre no
          meio da tela (o 1º já começa centralizado). O card do centro é o
          "principal" (título na barra + em foco); os vizinhos ficam
          ofuscados. scroll-pl-0 no lg pra o snap centralizar de verdade.
          SWIPE tipo Instagram: o scroll é NATIVO (acompanha o dedo/trackpad
          em tempo real, sem delay) e cada card tem snap-always
          (scroll-snap-stop: always) — assim o scroll para exatamente UM
          card por gesto, sem pular vários no flick, e sem nenhuma animação
          scriptada no meio (era isso que dava a sensação de travado/delay).
          flex flex-col no card + flex-1 no painel: sem isso, cada card
          fica só tão alto quanto o próprio texto, e como headline/body
          variam de tamanho por módulo, sobrava um respiro em branco
          (cor da página) embaixo dos cards com texto mais curto. */}
      <div
        ref={rowRef}
        onScroll={handleRowScroll}
        onTouchEnd={() => syncActiveCardFromScroll(true)}
        className="flex items-stretch overflow-x-auto snap-x snap-mandatory no-scrollbar py-4 gap-3 md:gap-4 pl-5 md:pl-8 pr-5 md:pr-8 scroll-pl-5 md:scroll-pl-8 lg:pl-[calc(50vw-230px)] lg:pr-[calc(50vw-230px)] lg:scroll-pl-0"
        style={{ width: "100vw", marginLeft: "calc(50% - 50vw)" }}
      >
        {lpModules.map((mod, i) => {
          return (
            <div
              key={mod.id}
              ref={(el) => { cardRefs.current[mod.id] = el; }}
              className={`shrink-0 snap-start snap-always lg:snap-center relative transition-opacity duration-300 ease-out w-[min(88vw,420px)] lg:w-[460px] ${
                // Desktop: só o card do centro (ativo) fica em foco; os
                // demais ficam ofuscados. A opacidade é controlada só por
                // qual card está no centro — sem nenhum efeito de hover. No
                // mobile fica tudo cheio (só ~1 card aparece por vez).
                i === activeIndex ? "" : "lg:opacity-[0.45]"
              }`}
            >
              <div className="h-full flex flex-col overflow-hidden">
                {/* Vídeo — moldura fina sobre fundo gradiente */}
                <div
                  className="p-1.5 md:p-2"
                  style={{ background: "linear-gradient(135deg, #183A51 0%, #1673A3 100%)" }}
                >
                  <div className="overflow-hidden bg-[#0d1a28]" style={{ aspectRatio: "16 / 10" }}>
                    <video
                      ref={(el) => { videoRefs.current[mod.id] = el; }}
                      loop
                      muted
                      playsInline
                      autoPlay={i === activeIndex && isShowcaseVisible}
                      preload={
                        isNearViewport && Math.abs(i - activeIndex) <= 1
                          ? "auto"
                          : "none"
                      }
                      poster={`/videos/${mod.videoKey}-poster.jpg`}
                      onCanPlay={() => playActiveVideo(mod.id)}
                      onCanPlayThrough={() => playActiveVideo(mod.id)}
                      onLoadedData={() => playActiveVideo(mod.id)}
                      className="w-full h-full object-cover"
                    >
                      {/* mp4 primeiro: aqui ele é MENOR que o webm em todos
                          os módulos e roda em qualquer browser, então o
                          navegador baixa o arquivo mais leve. */}
                      <source src={`/videos/${mod.videoKey}.mp4`} type="video/mp4" />
                      <source src={`/videos/${mod.videoKey}.webm`} type="video/webm" />
                    </video>
                  </div>
                </div>

                {/* Painel escuro: numeração + título com destaque + corpo.
                    flex-1 faz esse painel crescer até igualar o card mais
                    alto da linha, mantendo o fundo escuro uniforme. */}
                <div className="p-6 md:p-7 flex-1" style={{ background: "#0f2637" }}>
                  <span
                    className="inline-flex items-center justify-center w-11 h-11 rounded-lg text-[16px] font-bold text-[#6ef5d0] mb-5"
                    style={{ fontFamily: "var(--font-display)", border: "1.5px solid rgba(110,245,208,0.45)" }}
                  >
                    {String(i + 1).padStart(2, "0")}.
                  </span>
                  <h3
                    className="text-[22px] md:text-[26px] font-bold leading-[1.25] text-white mb-3"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {(() => {
                      const parts = mod.headline.split(mod.highlight);
                      // Se o texto não bater com o headline (erro de digitação
                      // no content), cai para o headline puro em vez de sumir
                      // com o trecho — nunca falha silenciosamente.
                      if (parts.length < 2) return mod.headline;
                      return (
                        <>
                          {parts[0]}
                          <Highlight>{mod.highlight}</Highlight>
                          {parts[1]}
                        </>
                      );
                    })()}
                  </h3>
                  <p
                    className="text-[14px] md:text-[15px] leading-[1.65] text-white/55"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {mod.body}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Setas, logo abaixo do carrossel ── */}
      <div className="flex justify-center gap-3 mt-4">
        <button
          onClick={() => scrollToIndex(activeIndex - 1)}
          disabled={activeIndex === 0}
          aria-label="Módulo anterior"
          className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ background: "rgba(76,183,148,0.12)", color: "#2ea882" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => scrollToIndex(activeIndex + 1)}
          disabled={activeIndex === lpModules.length - 1}
          aria-label="Próximo módulo"
          className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          style={{ background: "rgba(76,183,148,0.12)", color: "#2ea882" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
