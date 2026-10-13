import { AbsoluteFill, Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT, condensed, useLayout } from "../theme";

const NOTAS = [
  { t: "Adiar uma decisão grande por não ter com quem discutir antes.", x: -40, y: -150, r: -2 },
  { t: "Saber que precisa mudar algo em marketing, sem saber dizer o quê.", x: 34, y: -90, r: 1.6 },
  { t: "Perceber tarde demais que a concorrência mudou de posição.", x: -20, y: -30, r: -1 },
  { t: "Repetir a mesma estratégia há anos enquanto o mercado muda todo dia.", x: 42, y: 30, r: 2.4 },
  { t: "Ver o faturamento crescer sem saber qual foi o motivo para replicar.", x: -36, y: 90, r: -2.6 },
  { t: "Passar meses sem parar um dia para pensar bem na própria empresa.", x: 14, y: 150, r: 1.1 },
];
const POUSO = (i: number) => 12 + i * 12;

/** A pilha: as seis decisões caem sobre a mesa de nogueira; o contador sobe a cada uma. */
export const S2Pilha: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { vertical, u } = useLayout();
  const n = NOTAS.filter((_, i) => frame >= POUSO(i) + 8).length;

  return (
    <AbsoluteFill style={{ background: C.bg, overflow: "hidden" }}>
      <Img
        src={staticFile("img/mesa-nogueira-2400.webp")}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          scale: interpolate(frame, [0, 180], [1.08, 1], { extrapolateRight: "clamp" }),
        }}
      />
      {/* véu em degradê: escurece onde fica o contador */}
      <AbsoluteFill
        style={{
          background: vertical
            ? "linear-gradient(to bottom, rgb(16 16 16 / .92) 0%, rgb(16 16 16 / .55) 30%, rgb(16 16 16 / .25) 65%, rgb(16 16 16 / .6) 100%)"
            : "linear-gradient(to right, rgb(16 16 16 / .92) 0%, rgb(16 16 16 / .55) 40%, rgb(16 16 16 / .2) 70%, rgb(16 16 16 / .35) 100%)",
        }}
      />

      {/* contador */}
      <div
        style={{
          position: "absolute",
          left: vertical ? 80 * u : 140 * u,
          top: vertical ? 200 * u : undefined,
          bottom: vertical ? undefined : 0,
          height: vertical ? undefined : "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: vertical ? 920 * u : 700 * u,
          color: C.paper,
          fontFamily: FONT,
          opacity: interpolate(frame, [0, 8, 165, 180], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        <div style={{ ...condensed, fontSize: vertical ? 300 * u : 320 * u, color: C.yellow, lineHeight: 0.85 }}>
          <span style={{ display: "inline-block", scale: `${1 + Math.max(0, 1 - (frame - POUSO(Math.max(0, n - 1)) - 8) / 6) * 0.12}` }}>{n}</span>
          <span style={{ fontSize: "0.45em", color: C.paper }}> de 6</span>
        </div>
        <div style={{ fontSize: vertical ? 58 * u : 56 * u, fontWeight: 500, lineHeight: 1.15, marginTop: 16 * u }}>decisões esperando por você</div>
      </div>

      {/* pilha */}
      <div
        style={{
          position: "absolute",
          left: vertical ? "50%" : "68%",
          top: vertical ? "60%" : "50%",
          scale: interpolate(frame, [100, 180], [1, 1.1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) }),
        }}
      >
        {NOTAS.map((nota, i) => {
          const p = spring({ frame: frame - POUSO(i), fps, config: { damping: 13, mass: 0.7, stiffness: 140 } });
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: vertical ? 900 * u : 720 * u,
                padding: `${34 * u}px ${38 * u}px ${40 * u}px`,
                background: C.paper,
                color: C.ink,
                fontFamily: FONT,
                fontWeight: 500,
                fontSize: vertical ? 50 * u : 42 * u,
                lineHeight: 1.3,
                boxShadow: `0 ${2 * u}px ${4 * u}px rgb(0 0 0 / .35), 0 ${28 * u}px ${46 * u}px -${18 * u}px rgb(0 0 0 / .75)`,
                opacity: frame >= POUSO(i) ? 1 : 0,
                translate: `calc(-50% + ${nota.x * u}px) calc(-50% + ${nota.y * u * (vertical ? 2.2 : 1.3) - (1 - p) * 1400 * u}px)`,
                rotate: `${nota.r + (1 - p) * 22}deg`,
              }}
            >
              {nota.t}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
