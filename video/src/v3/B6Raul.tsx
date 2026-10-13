import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Kinetic, words } from "../components/Kinetic";
import { C, FONT, condensed, useLayout } from "../theme";
import { prog, saida, sobe } from "./motion";

const ESCOLAS = ["Harvard", "Wharton", "INSEAD", "Babson"];

/** Raul: foto original, véus e recorte; as escolas entram em coluna, com fios finos. */
export const B6Raul: React.FC = () => {
  const frame = useCurrentFrame();
  const { vertical, u } = useLayout();
  const img: React.CSSProperties = { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: vertical ? "50% 12%" : "62% 25%" };

  return (
    <AbsoluteFill style={{ background: C.bg, overflow: "hidden", opacity: saida(frame, 180) }}>
      <AbsoluteFill style={{ opacity: prog(frame, 0, 24), scale: interpolate(frame, [0, 180], [1.0, 1.05]) }}>
        <Img src={staticFile(vertical ? "img/hero-fundo-m-900.webp" : "img/hero-fundo-2400.webp")} style={img} />
        <AbsoluteFill
          style={{
            background: vertical
              ? "linear-gradient(to bottom, rgb(16 16 16 / .5) 0%, rgb(16 16 16 / .2) 30%, rgb(16 16 16 / .95) 100%), rgb(16 16 16 / .25)"
              : "linear-gradient(to right, rgb(16 16 16 / .96) 0%, rgb(16 16 16 / .6) 45%, rgb(16 16 16 / 0) 72%), rgb(16 16 16 / .25)",
          }}
        />
        <Img src={staticFile(vertical ? "img/hero-recorte-m-900.webp" : "img/hero-recorte-2400.webp")} style={img} />
        <AbsoluteFill
          style={{
            background: vertical
              ? "linear-gradient(to top, #101010 0%, rgb(16 16 16 / .94) 36%, rgb(16 16 16 / .5) 52%, rgb(16 16 16 / 0) 64%)"
              : "linear-gradient(to top, #101010 0%, rgb(16 16 16 / .6) 16%, rgb(16 16 16 / 0) 40%)",
          }}
        />
      </AbsoluteFill>

      <div
        style={{
          position: "absolute",
          left: vertical ? 90 * u : 180 * u,
          right: vertical ? 90 * u : undefined,
          bottom: vertical ? 130 * u : undefined,
          top: vertical ? undefined : "50%",
          translate: vertical ? undefined : "0 -50%",
          width: vertical ? undefined : 760 * u,
          color: C.paper,
          fontFamily: FONT,
        }}
      >
        <Kinetic start={14} stagger={5} words={words("Raul Sena")} style={{ ...condensed, fontSize: vertical ? 170 * u : 180 * u }} />
        <div style={{ ...sobe(frame, 30, u), marginTop: 16 * u, fontSize: 42 * u, fontWeight: 500, color: C.muted }}>Empresário, investidor e educador financeiro</div>

        <div style={{ ...sobe(frame, 62, u, 16), marginTop: 56 * u, fontSize: 28 * u, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: C.yellow }}>
          Programas executivos
        </div>
        <div style={{ marginTop: 14 * u, borderTop: `${1.5 * u}px solid #3A3A3A`, display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          {ESCOLAS.map((e, i) => (
            <div
              key={e}
              style={{
                ...sobe(frame, 74 + i * 12, u, 18),
                ...condensed,
                fontSize: vertical ? 64 * u : 60 * u,
                padding: `${18 * u}px 0`,
                borderBottom: `${1.5 * u}px solid #3A3A3A`,
              }}
            >
              {e}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
