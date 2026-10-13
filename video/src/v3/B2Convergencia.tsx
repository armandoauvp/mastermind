import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Kinetic, words } from "../components/Kinetic";
import { C, FONT, condensed, useLayout } from "../theme";
import { usePonto } from "../v2/A2Convergencia";
import { ENTRA_SAI, prog, saida } from "./motion";

const TEMAS = ["faturamento", "concorrência", "marketing", "vendas", "estratégia", "time", "mercado", "decisões"];

/** Convergência sóbria: temas em texto fino, linhas finas desenhadas devagar até um único ponto. */
export const B2Convergencia: React.FC = () => {
  const frame = useCurrentFrame();
  const { vertical, u, width, height } = useLayout();
  const p = usePonto();
  const rx = vertical ? 330 * u : 420 * u;
  const ry = vertical ? 400 * u : 360 * u;
  const pos = (i: number) => {
    const a = (i / TEMAS.length) * Math.PI * 2 - Math.PI / 2 + 0.2;
    return { x: p.x + Math.cos(a) * rx, y: p.y + Math.sin(a) * ry };
  };

  return (
    <AbsoluteFill style={{ background: C.bg, color: C.paper, fontFamily: FONT, overflow: "hidden", opacity: saida(frame, 180) }}>
      <svg width={width} height={height} style={{ position: "absolute", inset: 0 }}>
        {TEMAS.map((_, i) => {
          const { x, y } = pos(i);
          const len = Math.hypot(x - p.x, y - p.y);
          const d = prog(frame, 20 + i * 4, 70 + i * 4, ENTRA_SAI);
          return <line key={i} x1={x} y1={y} x2={p.x} y2={p.y} stroke="#4A4A4A" strokeWidth={1.6 * u} strokeDasharray={len} strokeDashoffset={len * (1 - d)} />;
        })}
        <circle cx={p.x} cy={p.y} r={16 * u * prog(frame, 60, 90)} fill={C.yellow} />
        <circle cx={p.x} cy={p.y} r={(16 + 30 * prog(frame, 70, 110)) * u} fill="none" stroke={C.yellow} strokeWidth={1.4 * u} opacity={0.5 * prog(frame, 70, 90)} />
      </svg>

      {TEMAS.map((t, i) => {
        const { x, y } = pos(i);
        const o = prog(frame, 4 + i * 3, 24 + i * 3);
        return (
          <div
            key={t}
            style={{
              position: "absolute",
              left: x,
              top: y,
              translate: "-50% -50%",
              padding: `${6 * u}px ${12 * u}px`,
              background: C.bg,
              fontSize: 30 * u,
              fontWeight: 500,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              color: C.muted,
              whiteSpace: "nowrap",
              opacity: o,
            }}
          >
            {t}
          </div>
        );
      })}

      <div
        style={{
          position: "absolute",
          left: vertical ? 90 * u : 180 * u,
          right: vertical ? 90 * u : undefined,
          top: vertical ? height * 0.66 : 0,
          bottom: vertical ? undefined : 0,
          width: vertical ? undefined : 720 * u,
          display: "grid",
          alignContent: vertical ? "start" : "center",
        }}
      >
        <Kinetic
          start={78}
          stagger={3}
          words={words("Você é a última instância de tudo que acontece na sua empresa.", (_, i) => (i === 3 || i === 4 ? { color: C.yellow } : {}))}
          style={{ ...condensed, fontSize: vertical ? 92 * u : 96 * u, lineHeight: 0.95 }}
        />
      </div>
    </AbsoluteFill>
  );
};
