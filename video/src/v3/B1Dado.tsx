import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, FONT, condensed, useLayout } from "../theme";
import { prog, saida, sobe } from "./motion";

/** Abertura pelo dado: o 84% conta com calma e um fio cresce até 84% da largura. */
export const B1Dado: React.FC = () => {
  const frame = useCurrentFrame();
  const { vertical, u } = useLayout();
  const conta = prog(frame, 10, 62);
  const fio = prog(frame, 40, 90);

  return (
    <AbsoluteFill
      style={{
        background: C.bg,
        color: C.paper,
        fontFamily: FONT,
        justifyContent: "center",
        padding: `0 ${vertical ? 90 * u : 180 * u}px`,
        opacity: saida(frame, 135),
      }}
    >
      <div style={{ ...sobe(frame, 2, u), fontSize: 40 * u, fontWeight: 500, color: C.muted, maxWidth: 880 * u, lineHeight: 1.25 }}>
        Onde os donos de empresa mais encontram dificuldade
      </div>
      <div style={{ ...condensed, fontSize: vertical ? 460 * u : 420 * u, lineHeight: 0.84, marginTop: 30 * u, fontVariantNumeric: "tabular-nums", ...sobe(frame, 6, u, 40, 30) }}>
        {Math.round(84 * conta)}%
      </div>
      {/* fio de 84% da largura disponível */}
      <div style={{ marginTop: 36 * u, height: 2 * u, background: C.line, width: "100%", maxWidth: vertical ? undefined : 1300 * u }}>
        <div style={{ height: 6 * u, marginTop: -2 * u, width: `${84 * fio}%`, background: C.yellow }} />
      </div>
      <div style={{ ...sobe(frame, 54, u), marginTop: 36 * u, fontSize: vertical ? 64 * u : 62 * u, fontWeight: 500, lineHeight: 1.18, maxWidth: vertical ? 900 * u : 1200 * u }}>
        Aumentar o faturamento e fazer a empresa crescer
      </div>
      <div style={{ ...sobe(frame, 70, u, 12), marginTop: 28 * u, fontSize: 24 * u, color: C.muted }}>
        Pesquisa Cabeça de Dono, Instituto Locomotiva para o Itaú Empresas, 2024.
      </div>
    </AbsoluteFill>
  );
};
