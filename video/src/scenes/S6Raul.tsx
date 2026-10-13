import { AbsoluteFill, Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Kinetic, words } from "../components/Kinetic";
import { C, FONT, condensed, useLayout } from "../theme";

const ESCOLAS = ["Harvard", "Wharton", "INSEAD", "Babson"];

/** Raul: a luz acende sobre o recorte (foto original, véu e recorte por cima) e as escolas passam em flashes. */
export const S6Raul: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { vertical, u } = useLayout();
  const pos = vertical ? "64% 18%" : "60% 25%";
  const img: React.CSSProperties = { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: pos };

  const escolaAtual = Math.min(ESCOLAS.length - 1, Math.max(0, Math.floor((frame - 92) / 17)));
  const inicioEscola = 92 + escolaAtual * 17;
  const pe = spring({ frame: frame - inicioEscola, fps, config: { damping: 18, mass: 0.5 } });

  return (
    <AbsoluteFill style={{ background: C.bg, overflow: "hidden", opacity: interpolate(frame, [153, 165], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
      <AbsoluteFill
        style={{
          filter: `brightness(${interpolate(frame, [0, 22], [0.15, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) })})`,
          scale: interpolate(frame, [0, 165], [1, 1.07]),
        }}
      >
        <Img src={staticFile("img/hero-fundo-2400.webp")} style={img} />
        {/* véus entre a foto e o recorte */}
        <AbsoluteFill
          style={{
            background: vertical
              ? "linear-gradient(to bottom, rgb(16 16 16 / .55) 0%, rgb(16 16 16 / .2) 35%, rgb(16 16 16 / .95) 100%), rgb(16 16 16 / .25)"
              : "linear-gradient(to right, rgb(16 16 16 / .92) 0%, rgb(16 16 16 / .5) 42%, rgb(16 16 16 / 0) 72%), rgb(16 16 16 / .25)",
          }}
        />
        <Img src={staticFile("img/hero-recorte-2400.webp")} style={img} />
        {/* degradê final por cima de tudo */}
        <AbsoluteFill
          style={{
            background: vertical
              ? "linear-gradient(to top, #101010 0%, rgb(16 16 16 / .9) 34%, rgb(16 16 16 / .4) 52%, rgb(16 16 16 / 0) 66%)"
              : "linear-gradient(to top, #101010 0%, rgb(16 16 16 / .7) 18%, rgb(16 16 16 / 0) 45%)",
          }}
        />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          justifyContent: vertical ? "flex-end" : "center",
          padding: vertical ? `0 ${80 * u}px ${170 * u}px` : `0 ${160 * u}px`,
          color: C.paper,
          fontFamily: FONT,
        }}
      >
        <Kinetic start={10} stagger={4} words={words("Raul Sena")} style={{ ...condensed, fontSize: vertical ? 220 * u : 220 * u, maxWidth: vertical ? undefined : 900 * u }} />
        <Kinetic
          start={26}
          stagger={2}
          words={words("Empresário, investidor e educador financeiro")}
          style={{ marginTop: 24 * u, fontSize: vertical ? 50 * u : 50 * u, fontWeight: 500, color: C.muted, maxWidth: vertical ? 920 * u : 760 * u, lineHeight: 1.2 }}
        />

        {/* programas executivos: uma escola de cada vez, em flashes */}
        <div style={{ marginTop: 64 * u, height: 190 * u, opacity: interpolate(frame, [86, 92], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          <div style={{ fontSize: 38 * u, fontWeight: 600, color: C.yellow, textTransform: "uppercase", letterSpacing: "0.02em" }}>Programas executivos</div>
          <div
            style={{
              ...condensed,
              fontSize: 140 * u,
              marginTop: 12 * u,
              scale: `${1.25 - pe * 0.25}`,
              transformOrigin: "left center",
              opacity: pe,
            }}
          >
            {ESCOLAS[escolaAtual]}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
