import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Kinetic, words } from "../components/Kinetic";
import { C, FONT, condensed, useLayout } from "../theme";

const BARRAS = [
  { v: 84, t: "Aumentar o faturamento e fazer a empresa crescer" },
  { v: 78, t: "Enfrentar a concorrência do mercado em que atua" },
  { v: 73, t: "Desenvolver estratégias eficazes de marketing e vendas" },
];

const Pessoa: React.FC<{ on: number; size: number }> = ({ on, size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ overflow: "visible" }}>
    <g fill={on > 0 ? C.ink : "transparent"} fillOpacity={on} stroke={C.ink} strokeWidth={1.3}>
      <circle cx="12" cy="7.5" r="4" />
      <path d="M3.5 21.5c0-4.9 3.8-8 8.5-8s8.5 3.1 8.5 8z" />
    </g>
  </svg>
);

/** Dados: seis em cada dez (bonequinhos) e os três percentuais contando com as barras. */
export const S3Dados: React.FC = () => {
  const frame = useCurrentFrame();
  const { vertical, u } = useLayout();
  const pad = vertical ? 80 * u : 160 * u;
  const saidaA = interpolate(frame, [100, 114], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });

  return (
    <AbsoluteFill style={{ background: C.paper, color: C.ink, fontFamily: FONT, overflow: "hidden" }}>
      {/* parte A: 6 em cada 10 */}
      <AbsoluteFill
        style={{
          padding: `0 ${pad}px`,
          justifyContent: "center",
          opacity: 1 - saidaA,
          translate: `0 ${-saidaA * 160 * u}px`,
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: `repeat(5, ${vertical ? 130 * u : 120 * u}px)`, gap: `${18 * u}px ${26 * u}px` }}>
          {Array.from({ length: 10 }).map((_, i) => (
            <Pessoa
              key={i}
              size={vertical ? 130 * u : 120 * u}
              on={i < 6 ? interpolate(frame, [8 + i * 6, 14 + i * 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) : 0}
            />
          ))}
        </div>
        <Kinetic
          start={22}
          stagger={2}
          words={words("Seis em cada dez donos de empresa estão se estruturando para o negócio crescer.", (_, i) => (i < 4 ? { bold: true } : {}))}
          style={{ marginTop: 56 * u, fontSize: vertical ? 70 * u : 72 * u, fontWeight: 500, lineHeight: 1.18, maxWidth: vertical ? 920 * u : 1400 * u }}
        />
      </AbsoluteFill>

      {/* parte B: os três percentuais */}
      <AbsoluteFill style={{ padding: `0 ${pad}px`, justifyContent: "center", opacity: interpolate(frame, [108, 116], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
        {BARRAS.map((b, i) => {
          const s = 114 + i * 10;
          const q = interpolate(frame, [s, s + 34], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) });
          return (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: vertical ? "1fr" : `${400 * u}px 1fr`,
                columnGap: 48 * u,
                rowGap: 14 * u,
                alignItems: "center",
                padding: `${(vertical ? 30 : 26) * u}px 0`,
                borderTop: `${2 * u}px solid ${C.lineLight}`,
                translate: `0 ${(1 - q) * 60 * u}px`,
                opacity: Math.min(1, q * 2),
              }}
            >
              <div style={{ ...condensed, fontSize: vertical ? 190 * u : 200 * u, lineHeight: 0.85, fontVariantNumeric: "tabular-nums", gridRow: vertical ? undefined : "span 2" }}>
                {Math.round(b.v * q)}%
              </div>
              <div style={{ fontSize: vertical ? 46 * u : 46 * u, fontWeight: 500, lineHeight: 1.2 }}>{b.t}</div>
              <div style={{ height: 16 * u, background: C.lineLight }}>
                <div style={{ height: "100%", width: `${b.v * q}%`, background: C.ink }} />
              </div>
            </div>
          );
        })}
        <div style={{ marginTop: 28 * u, fontSize: 28 * u, color: C.inkMuted, lineHeight: 1.4, opacity: interpolate(frame, [150, 160], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
          Pesquisa Cabeça de Dono, Instituto Locomotiva para o Itaú Empresas, 2024.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
