import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Kinetic, words } from "../components/Kinetic";
import { C, FONT, condensed, useLayout } from "../theme";

// palavras tiradas da copy; todas convergem para o mesmo ponto
const TEMAS = ["faturamento", "concorrência", "marketing", "vendas", "estratégia", "time", "mercado", "decisões"];

/** Ponto onde tudo converge: o dono. Mesmo lugar nas cenas 2 e 3, para a passagem ser contínua. */
export const usePonto = () => {
  const { vertical, width, height } = useLayout();
  return vertical ? { x: width / 2, y: height * 0.36 } : { x: width * 0.7, y: height * 0.5 };
};

/** Convergência: linhas saem dos temas da empresa e chegam todas ao mesmo ponto. */
export const A2Convergencia: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { vertical, u, width, height } = useLayout();
  const p = usePonto();
  // elipse dos temas: estreita no 9:16 para não encostar nas bordas
  const rx = vertical ? 320 * u : 400 * u;
  const ry = vertical ? 400 * u : 370 * u;

  return (
    <AbsoluteFill style={{ background: C.bg, color: C.paper, fontFamily: FONT, overflow: "hidden" }}>
      <svg width={width} height={height} style={{ position: "absolute", inset: 0 }}>
        {TEMAS.map((_, i) => {
          const a = (i / TEMAS.length) * Math.PI * 2 - Math.PI / 2 + 0.2;
          const x = p.x + Math.cos(a) * rx;
          const y = p.y + Math.sin(a) * ry;
          const len = Math.hypot(x - p.x, y - p.y);
          const draw = interpolate(frame, [22 + i * 3, 52 + i * 3], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) });
          // pulsos que correm pela linha até o centro: tudo chega até você
          const pulso = ((frame - 50 - i * 5) % 40) / 40;
          return (
            <g key={i}>
              <line x1={x} y1={y} x2={p.x} y2={p.y} stroke={C.line} strokeWidth={3 * u} strokeDasharray={len} strokeDashoffset={len * (1 - draw)} />
              {frame > 50 + i * 5 ? (
                <circle cx={x + (p.x - x) * pulso} cy={y + (p.y - y) * pulso} r={7 * u} fill={C.yellow} opacity={1 - pulso * 0.6} />
              ) : null}
            </g>
          );
        })}
        {/* anéis que pulsam no ponto central */}
        {[0, 1, 2].map((k) => {
          const t = ((frame - 40 + k * 14) % 42) / 42;
          return frame > 40 ? <circle key={k} cx={p.x} cy={p.y} r={(26 + t * 120) * u} fill="none" stroke={C.yellow} strokeWidth={3 * u} opacity={(1 - t) * 0.6} /> : null;
        })}
        <circle cx={p.x} cy={p.y} r={26 * u * spring({ frame: frame - 6, fps, config: { damping: 10 } })} fill={C.yellow} />
      </svg>

      {/* temas */}
      {TEMAS.map((t, i) => {
        const a = (i / TEMAS.length) * Math.PI * 2 - Math.PI / 2 + 0.2;
        const x = p.x + Math.cos(a) * rx;
        const y = p.y + Math.sin(a) * ry;
        const s = spring({ frame: frame - 4 - i * 3, fps, config: { damping: 14, mass: 0.5 } });
        return (
          <div
            key={t}
            style={{
              position: "absolute",
              left: x,
              top: y,
              translate: "-50% -50%",
              padding: `${10 * u}px ${18 * u}px`,
              background: C.bg,
              border: `${2 * u}px solid ${C.line}`,
              fontSize: 36 * u,
              fontWeight: 600,
              whiteSpace: "nowrap",
              scale: `${s}`,
              opacity: s,
            }}
          >
            {t}
          </div>
        );
      })}

      <div
        style={{
          position: "absolute",
          left: vertical ? 80 * u : 160 * u,
          right: vertical ? 80 * u : undefined,
          top: vertical ? height * 0.66 : undefined,
          bottom: vertical ? undefined : 0,
          height: vertical ? undefined : "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: vertical ? undefined : 780 * u,
          pointerEvents: "none",
        }}
      >
        <Kinetic
          start={60}
          stagger={2}
          words={words("Você é a última instância de tudo que acontece na sua empresa.", (_, i) => (i === 3 || i === 4 ? { color: C.yellow } : {}))}
          style={{ ...condensed, fontSize: vertical ? 96 * u : 104 * u }}
        />
      </div>
    </AbsoluteFill>
  );
};
