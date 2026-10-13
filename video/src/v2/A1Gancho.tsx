import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Kinetic, words } from "../components/Kinetic";
import { C, FONT, condensed, useLayout } from "../theme";

/** Gancho pelo dado: "84%" bate na tela e conta rápido. */
export const A1Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { vertical, u } = useLayout();
  const batida = spring({ frame, fps, config: { damping: 11, mass: 0.6 } });
  const conta = interpolate(frame, [2, 26], [0, 84], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  // tranco de câmera quando o número chega em 84
  const tranco = frame >= 26 && frame < 34 ? Math.sin((frame - 26) * 2.4) * (34 - frame) * 1.6 * u : 0;
  const saida = interpolate(frame, [106, 120], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });

  return (
    <AbsoluteFill
      style={{
        background: C.bg,
        color: C.paper,
        fontFamily: FONT,
        justifyContent: "center",
        padding: `0 ${vertical ? 80 * u : 160 * u}px`,
        translate: `${tranco}px ${tranco * 0.6}px`,
      }}
    >
      <div style={{ opacity: 1 - saida, scale: `${1 + saida * 0.25}`, transformOrigin: "left center" }}>
        <Kinetic
          start={4}
          stagger={2}
          words={words("Onde os donos de empresa mais encontram dificuldade")}
          style={{ fontSize: vertical ? 44 * u : 44 * u, fontWeight: 600, color: C.muted, maxWidth: vertical ? 900 * u : 1200 * u, lineHeight: 1.2 }}
        />
        <div
          style={{
            ...condensed,
            color: C.yellow,
            fontSize: vertical ? 560 * u : 520 * u,
            lineHeight: 0.84,
            marginTop: 24 * u,
            fontVariantNumeric: "tabular-nums",
            scale: `${1.35 - batida * 0.35}`,
            transformOrigin: "left center",
          }}
        >
          {Math.round(conta)}%
        </div>
        <Kinetic
          start={24}
          stagger={2}
          words={words("Aumentar o faturamento e fazer a empresa crescer")}
          style={{ marginTop: 28 * u, fontSize: vertical ? 74 * u : 76 * u, fontWeight: 600, lineHeight: 1.12, maxWidth: vertical ? 900 * u : 1300 * u }}
        />
        <div style={{ marginTop: 40 * u, fontSize: 26 * u, color: C.muted, opacity: interpolate(frame, [40, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          Pesquisa Cabeça de Dono, Instituto Locomotiva para o Itaú Empresas, 2024.
        </div>
      </div>
    </AbsoluteFill>
  );
};
