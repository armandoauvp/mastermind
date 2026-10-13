import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, FONT, useLayout } from "../theme";

type Props = {
  /** texto de chamada abaixo do botão, conforme a rede ("Link na bio", "Link na descrição") */
  readonly cta: string;
};

/** Assinatura: logo AUVP Negócios, botão e chamada para o link. */
export const S8Assinatura: React.FC<Props> = ({ cta }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { vertical, u } = useLayout();
  const logo = spring({ frame, fps, config: { damping: 12, mass: 0.6 } });
  const botao = spring({ frame: frame - 12, fps, config: { damping: 14, mass: 0.6 } });

  return (
    <AbsoluteFill style={{ background: C.yellow, color: C.ink, fontFamily: FONT, justifyContent: "center", alignItems: "center", gap: 72 * u }}>
      <Img src={staticFile("brand/auvp-negocios-horizontal-preto.svg")} style={{ width: vertical ? 780 * u : 860 * u, scale: `${0.7 + logo * 0.3}`, opacity: Math.min(1, logo * 1.5) }} />
      <div
        style={{
          background: C.ink,
          color: C.paper,
          borderRadius: 999,
          padding: `${34 * u}px ${70 * u}px`,
          fontSize: 52 * u,
          fontWeight: 700,
          scale: `${0.8 + botao * 0.2}`,
          opacity: Math.min(1, botao * 1.5),
        }}
      >
        Quero participar
      </div>
      <div style={{ fontSize: 44 * u, fontWeight: 600, opacity: interpolate(frame, [26, 36], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>{cta}</div>
    </AbsoluteFill>
  );
};
