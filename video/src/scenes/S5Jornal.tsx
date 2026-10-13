import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT, condensed, useLayout } from "../theme";

const papel: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  background: C.newsprint,
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
};

/** Foto do jornal em preto e branco, com retícula de impressão. */
const Foto: React.FC<{ src: string; pw: number }> = ({ src, pw }) => (
  <div style={{ position: "relative", flex: 1, minHeight: 0, marginTop: pw * 0.03 }}>
    <Img src={staticFile(src)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(1) contrast(1.1)" }} />
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "radial-gradient(circle, rgb(0 0 0 / .3) 0.6px, transparent 1px)",
        backgroundSize: "3px 3px",
        mixBlendMode: "multiply",
      }}
    />
  </div>
);

const Mast: React.FC<{ pw: number; capa?: boolean; folio: string }> = ({ pw, capa, folio }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: capa ? "1fr auto 1fr" : "auto 1fr",
      alignItems: "center",
      gap: pw * 0.03,
      paddingBottom: pw * 0.022,
      borderBottom: `${Math.max(4, pw * 0.009)}px double ${C.ink}`,
      fontFamily: FONT,
      fontWeight: 600,
      fontSize: pw * 0.022,
      textTransform: "uppercase",
      lineHeight: 1.25,
    }}
  >
    {capa ? <span>Goiânia,<br />Goiás</span> : null}
    <Img src={staticFile("brand/auvp-negocios-horizontal-preto.svg")} style={{ width: pw * (capa ? 0.44 : 0.3) }} />
    <span style={{ textAlign: "right" }}>{capa ? <>Outubro<br />de 2026</> : folio}</span>
  </div>
);

const Materia: React.FC<{ pw: number; nome: string; texto: string; foto: string; folio: string }> = ({ pw, nome, texto, foto, folio }) => (
  <div style={{ ...papel, padding: `${pw * 0.05}px ${pw * 0.055}px ${pw * 0.045}px` }}>
    <Mast pw={pw} folio={folio} />
    <div style={{ ...condensed, fontSize: pw * 0.17, lineHeight: 0.86, marginTop: pw * 0.035, color: C.ink }}>{nome}</div>
    <div style={{ fontFamily: FONT, fontSize: pw * 0.031, lineHeight: 1.4, marginTop: pw * 0.03, paddingBottom: pw * 0.026, borderBottom: `1px solid ${C.ink}`, color: C.ink }}>{texto}</div>
    <Foto src={foto} pw={pw} />
  </div>
);

/** O jornal: cai na faixa amarela e as páginas viram (capa, Lloyds, TAG Heuer, Nissan). */
export const S5Jornal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { vertical, u } = useLayout();
  const pw = vertical ? 900 * u : 700 * u;
  const ph = vertical ? 1380 * u : 960 * u;
  const pouso = spring({ frame, fps, config: { damping: 14, mass: 0.8 } });
  const virada = (start: number) =>
    interpolate(frame, [start, start + 14], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.45, 0, 0.25, 1) });

  // cada página vira num tempo; a capa fica mais tempo para a manchete ser lida
  const paginas: { start: number; el: React.ReactNode }[] = [
    {
      start: 78,
      el: (
        <div style={{ ...papel, padding: `${pw * 0.05}px ${pw * 0.055}px ${pw * 0.045}px` }}>
          <Mast pw={pw} capa folio="" />
          <div style={{ ...condensed, fontSize: pw * 0.115, lineHeight: 0.9, textAlign: "center", marginTop: pw * 0.04, color: C.ink }}>
            Até as maiores empresas do mundo passaram por isso.
          </div>
          <Foto src="img/jornal-capa-1400.webp" pw={pw} />
        </div>
      ),
    },
    {
      start: 106,
      el: (
        <Materia
          pw={pw}
          folio="2"
          nome="Lloyds Bank"
          foto="img/caso-lloyds-1400.webp"
          texto="À beira de uma crise, o banco passou a investir apenas em negócios com retorno acima do custo do capital. Vendeu todo o resto e se tornou o banco mais valioso da Europa."
        />
      ),
    },
    {
      start: 134,
      el: (
        <Materia
          pw={pw}
          folio="3"
          nome="TAG Heuer"
          foto="img/caso-tagheuer-800.webp"
          texto="Com a entrada da Apple no mercado de relógios, a marca precisou escolher entre reforçar a tradição do relógio mecânico ou lançar o próprio modelo conectado."
        />
      ),
    },
    {
      start: 9999,
      el: (
        <Materia
          pw={pw}
          folio="4"
          nome="Nissan"
          foto="img/caso-nissan-1000.webp"
          texto="Em situação crítica, a montadora foi reestruturada a partir da escuta das equipes internas e voltou a ser uma das mais valiosas do setor."
        />
      ),
    },
  ];

  return (
    <AbsoluteFill style={{ background: C.yellow, justifyContent: "center", alignItems: "center", perspective: 3200 * u }}>
      <div
        style={{
          position: "relative",
          width: pw,
          height: ph,
          translate: `${interpolate(frame, [78, 92], [0, vertical ? 0 : pw / 2], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.45, 0, 0.25, 1) })}px ${(1 - pouso) * 900 * u}px`,
          rotate: `${-1.5 - (1 - pouso) * 9}deg`,
          transformStyle: "preserve-3d",
          opacity: interpolate(frame, [168, 180], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        {paginas.map((pg, i) => {
          const p = virada(pg.start);
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                inset: 0,
                transformOrigin: "left center",
                transformStyle: "preserve-3d",
                transform: `translateZ(${p < 0.5 ? -i * 2 : (i - 4) * 2}px) rotateY(${-178 * p}deg)`,
                zIndex: p < 0.5 ? 10 - i : 10 + i,
                boxShadow: `0 ${30 * u}px ${60 * u}px -${24 * u}px rgb(0 0 0 / .45)`,
              }}
            >
              {pg.el}
              {/* verso da folha */}
              <div style={{ ...papel, transform: "rotateY(180deg)", background: C.newsprint, boxShadow: `inset -${30 * u}px 0 ${36 * u}px -${30 * u}px rgb(0 0 0 / .35)` }} />
              {/* luz da virada */}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to left, rgb(0 0 0 / .45), transparent 70%)", opacity: Math.sin(p * Math.PI), pointerEvents: "none" }} />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
