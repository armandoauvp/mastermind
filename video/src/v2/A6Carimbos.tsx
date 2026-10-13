import { AbsoluteFill, Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Kinetic, words } from "../components/Kinetic";
import { C, FONT, condensed, useLayout } from "../theme";

const ESCOLAS = ["Harvard", "Wharton", "INSEAD", "Babson"];
const BATIDA = (i: number) => 66 + i * 15;

/** Carimbos: Raul sobre o véu escuro; as escolas entram como carimbos de passaporte, com tranco de câmera. */
export const A6Carimbos: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { vertical, u } = useLayout();

  // tranco a cada carimbo
  let tranco = 0;
  ESCOLAS.forEach((_, i) => {
    const d = frame - BATIDA(i);
    if (d >= 0 && d < 8) tranco += Math.sin(d * 2.6) * (8 - d) * 1.4 * u;
  });

  const img: React.CSSProperties = { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: vertical ? "50% 15%" : "60% 25%" };
  const slots = vertical
    ? [{ x: 80, y: 1020, r: -8 }, { x: 560, y: 980, r: 6 }, { x: 110, y: 1190, r: 4 }, { x: 580, y: 1170, r: -5 }]
    : [{ x: 160, y: 600, r: -7 }, { x: 560, y: 570, r: 5 }, { x: 190, y: 790, r: 4 }, { x: 590, y: 770, r: -6 }];

  return (
    <AbsoluteFill style={{ background: C.bg, overflow: "hidden", opacity: interpolate(frame, [168, 180], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
      <AbsoluteFill
        style={{
          translate: `${tranco}px ${tranco * 0.5}px`,
          filter: `brightness(${interpolate(frame, [0, 18], [0.2, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) })})`,
          scale: interpolate(frame, [0, 180], [1.06, 1]),
        }}
      >
        <Img src={staticFile(vertical ? "img/hero-fundo-m-900.webp" : "img/hero-fundo-2400.webp")} style={img} />
        <AbsoluteFill
          style={{
            background: vertical
              ? "linear-gradient(to bottom, rgb(16 16 16 / .5) 0%, rgb(16 16 16 / .2) 30%, rgb(16 16 16 / .95) 100%), rgb(16 16 16 / .25)"
              : "linear-gradient(to right, rgb(16 16 16 / .95) 0%, rgb(16 16 16 / .55) 45%, rgb(16 16 16 / 0) 72%), rgb(16 16 16 / .25)",
          }}
        />
        <Img src={staticFile(vertical ? "img/hero-recorte-m-900.webp" : "img/hero-recorte-2400.webp")} style={img} />
        <AbsoluteFill
          style={{
            background: vertical
              ? "linear-gradient(to top, #101010 0%, rgb(16 16 16 / .92) 30%, rgb(16 16 16 / .5) 50%, rgb(16 16 16 / 0) 62%)"
              : "linear-gradient(to top, #101010 0%, rgb(16 16 16 / .6) 18%, rgb(16 16 16 / 0) 42%)",
          }}
        />
      </AbsoluteFill>

      <div style={{ position: "absolute", inset: 0, translate: `${tranco}px ${tranco * 0.5}px` }}>
        {/* nome e cargo */}
        <div
          style={{
            position: "absolute",
            left: vertical ? 80 * u : 160 * u,
            bottom: vertical ? 150 * u : undefined,
            top: vertical ? undefined : 170 * u,
            color: C.paper,
            fontFamily: FONT,
          }}
        >
          <Kinetic start={8} stagger={4} words={words("Raul Sena")} style={{ ...condensed, fontSize: 200 * u }} />
          <Kinetic start={22} stagger={2} words={words("Empresário, investidor e educador financeiro")} style={{ marginTop: 18 * u, fontSize: 46 * u, fontWeight: 500, color: C.muted, maxWidth: 900 * u }} />
        </div>

        {/* rótulo dos carimbos */}
        <div
          style={{
            position: "absolute",
            left: (vertical ? 80 : 160) * u,
            top: (vertical ? 920 : 500) * u,
            fontFamily: FONT,
            fontSize: 34 * u,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.02em",
            color: C.yellow,
            opacity: interpolate(frame, [54, 62], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          Programas executivos
        </div>

        {/* carimbos */}
        {ESCOLAS.map((e, i) => {
          const p = spring({ frame: frame - BATIDA(i), fps, config: { damping: 12, mass: 0.4, stiffness: 260 } });
          const s = slots[i];
          return (
            <div
              key={e}
              style={{
                position: "absolute",
                left: s.x * u,
                top: s.y * u + (vertical ? 60 * u : 0),
                padding: `${16 * u}px ${30 * u}px`,
                border: `${6 * u}px double ${C.yellow}`,
                color: C.yellow,
                ...condensed,
                fontSize: 84 * u,
                rotate: `${s.r}deg`,
                scale: `${2.2 - p * 1.2}`,
                opacity: frame >= BATIDA(i) ? Math.min(1, p * 1.6) * 0.95 : 0,
                mixBlendMode: "screen",
              }}
            >
              {e}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
