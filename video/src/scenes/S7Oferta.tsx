import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Kinetic, words } from "../components/Kinetic";
import { C, FONT, condensed, useLayout } from "../theme";

/** Oferta: o nome do evento, data e local, e a promessa do dia. */
export const S7Oferta: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { vertical, u } = useLayout();
  const linha = interpolate(frame, [18, 36], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) });
  const cel = (d: number) => spring({ frame: frame - d, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill
      style={{
        background: C.bg,
        color: C.paper,
        fontFamily: FONT,
        justifyContent: "center",
        padding: `0 ${vertical ? 80 * u : 160 * u}px`,
        opacity: interpolate(frame, [153, 165], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
      }}
    >
      <Kinetic start={2} words={words("Mastermind")} style={{ ...condensed, color: C.yellow, fontSize: vertical ? 172 * u : 260 * u }} />
      <Kinetic start={10} stagger={3} words={words("com Raul Sena")} style={{ ...condensed, fontSize: vertical ? 84 * u : 96 * u, marginTop: 10 * u }} />

      <div style={{ marginTop: 56 * u, height: 3 * u, background: C.paper, transformOrigin: "left center", scale: `${linha} 1` }} />
      <div style={{ display: "flex", gap: 0 }}>
        {["21 de outubro", "Rio de Janeiro"].map((t, i) => (
          <div
            key={t}
            style={{
              ...condensed,
              fontSize: vertical ? 66 * u : 92 * u,
              whiteSpace: "nowrap",
              padding: `${28 * u}px ${i === 0 ? 0 : 36 * u}px ${28 * u}px ${i === 0 ? 0 : 36 * u}px`,
              paddingRight: i === 0 ? 36 * u : 0,
              borderLeft: i === 0 ? "none" : `${3 * u}px solid ${C.paper}`,
              overflow: "hidden",
            }}
          >
            <div style={{ translate: `0 ${(1 - cel(24 + i * 6)) * 110}%` }}>{t}</div>
          </div>
        ))}
      </div>
      <div style={{ height: 3 * u, background: C.paper, transformOrigin: "left center", scale: `${linha} 1` }} />

      <Kinetic
        start={52}
        stagger={3}
        words={words("Um dia inteiro com a sua empresa na pauta.")}
        style={{ marginTop: 64 * u, fontSize: vertical ? 72 * u : 72 * u, fontWeight: 600, lineHeight: 1.15, maxWidth: vertical ? 920 * u : 1300 * u }}
      />
    </AbsoluteFill>
  );
};
