"use client";

/**
 * Mockup notebook + celular. O notebook roda o dashboard e o celular
 * roda a gravação real do app no iPhone — a dupla comunica de uma vez
 * que a Lumia é a mesma coisa na mesa e no bolso, sem precisar de
 * uma linha de texto explicando isso.
 */
export default function LpDevices() {
  return (
    <div className="relative w-full max-w-[880px] mx-auto">
      {/* ── Notebook ── */}
      <div className="relative">
        {/* Tampa */}
        <div
          className="rounded-[14px] p-[7px] md:p-[10px]"
          style={{
            background: "linear-gradient(160deg, #2b3a4a 0%, #16222e 100%)",
            boxShadow:
              "0 34px 80px rgba(0,0,0,0.55), 0 4px 18px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.12)",
          }}
        >
          <div className="rounded-[7px] overflow-hidden bg-[#0d1a28] relative aspect-[16/10]">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover object-left-top block"
              poster="/videos/dashboard-poster.jpg"
            >
              <source src="/videos/dashboard.webm" type="video/webm" />
              <source src="/videos/dashboard.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* Base — um pouco mais larga que a tampa, é o que dá a
            silhueta de notebook sem precisar de imagem */}
        <div
          className="relative mx-auto h-[10px] md:h-[13px] w-[106%] -left-[3%] rounded-b-[10px]"
          style={{
            background: "linear-gradient(180deg, #33455a 0%, #131e29 100%)",
            boxShadow: "0 18px 30px rgba(0,0,0,0.45)",
          }}
        >
          {/* Recorte de abertura */}
          <span
            className="absolute left-1/2 top-0 -translate-x-1/2 w-[13%] h-[4px] rounded-b-full"
            style={{ background: "rgba(0,0,0,0.35)" }}
          />
        </div>
      </div>

      {/* ── Celular sobreposto ── */}
      <div
        className="absolute right-0 md:-right-2 -bottom-5 md:-bottom-8 w-[86px] sm:w-[112px] md:w-[152px] rounded-[20px] md:rounded-[26px] p-[3px] md:p-[4px]"
        style={{
          background: "linear-gradient(160deg, #33455a 0%, #101a24 100%)",
          boxShadow: "0 22px 48px rgba(0,0,0,0.60), inset 0 1px 0 rgba(255,255,255,0.14)",
        }}
      >
        <div className="relative rounded-[17px] md:rounded-[22px] overflow-hidden bg-black aspect-[540/1168]">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover block"
            poster="/videos/mobile-poster.jpg"
          >
            <source src="/videos/mobile.webm" type="video/webm" />
            <source src="/videos/mobile.mp4" type="video/mp4" />
          </video>

          {/* Ilha dinâmica */}
          <span
            className="absolute top-[5px] md:top-[7px] left-1/2 -translate-x-1/2 w-[34%] h-[7px] md:h-[10px] rounded-full"
            style={{ background: "#000" }}
          />
        </div>
      </div>
    </div>
  );
}
