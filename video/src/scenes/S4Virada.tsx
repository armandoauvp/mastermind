import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Kinetic, words } from "../components/Kinetic";
import { C, FONT, useLayout } from "../theme";

/** A virada: "mais horas de trabalho" é riscado; a marca-texto passa em "decisões certas" e "ordem certa". */
export const S4Virada: React.FC = () => {
  const frame = useCurrentFrame();
  const { vertical, u } = useLayout();

  const f1 = words("Nenhum desses pontos se resolve só com mais horas de trabalho.", (_, i) => (i >= 7 ? { strike: true } : {}));
  const f2 = words("Todos se resolvem com uma sequência de decisões certas, tomadas na ordem certa.", (_, i) =>
    (i >= 5 && i <= 8) || i >= 11 ? { mark: true } : {},
  );

  return (
    <AbsoluteFill
      style={{
        background: C.paper,
        color: C.ink,
        fontFamily: FONT,
        justifyContent: "center",
        padding: `0 ${vertical ? 80 * u : 160 * u}px`,
        opacity: interpolate(frame, [168, 180], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: vertical ? "1fr" : "1fr 1fr",
          columnGap: 96 * u,
          rowGap: 80 * u,
          alignItems: "start",
        }}
      >
        <div
          style={{
            translate: `0 ${interpolate(frame, [70, 84], [0, vertical ? -20 * u : 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) })}px`,
          }}
        >
          <Kinetic start={6} stagger={2} strikeAt={40} words={f1} style={{ fontSize: vertical ? 88 * u : 84 * u, fontWeight: 500, lineHeight: 1.12 }} />
        </div>
        <Kinetic start={74} stagger={2} markAt={104} words={f2.map((w) => ({ ...w, bold: true }))} style={{ fontSize: vertical ? 88 * u : 84 * u, lineHeight: 1.12 }} />
      </div>
    </AbsoluteFill>
  );
};
