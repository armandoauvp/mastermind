import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { C, FONT, useLayout } from "../theme";
import { prog, sobe } from "./motion";

type Props = {
  /** chamada abaixo do botão, conforme a rede ("Link na bio", "Link na descrição") */
  readonly cta: string;
};

/** Assinatura sóbria: fundo preto, logo branco, botão amarelo. */
export const B8Assinatura: React.FC<Props> = ({ cta }) => {
  const frame = useCurrentFrame();
  const { vertical, u } = useLayout();

  return (
    <AbsoluteFill style={{ background: C.bg, color: C.paper, fontFamily: FONT, justifyContent: "center", alignItems: "center", gap: 64 * u }}>
      <Img src={staticFile("brand/auvp-negocios-horizontal-branco.svg")} style={{ width: vertical ? 720 * u : 780 * u, opacity: prog(frame, 0, 24), translate: `0 ${(1 - prog(frame, 0, 30)) * 20 * u}px` }} />
      <div style={{ width: 120 * u, height: 2 * u, background: C.line, scale: `${prog(frame, 10, 34)} 1` }} />
      <div
        style={{
          ...sobe(frame, 18, u, 20),
          background: C.yellow,
          color: C.ink,
          borderRadius: 999,
          padding: `${30 * u}px ${64 * u}px`,
          fontSize: 46 * u,
          fontWeight: 700,
        }}
      >
        Quero participar
      </div>
      <div style={{ ...sobe(frame, 30, u, 12), fontSize: 36 * u, fontWeight: 500, color: C.muted }}>{cta}</div>
    </AbsoluteFill>
  );
};
