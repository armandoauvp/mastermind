import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Kinetic, words } from "../components/Kinetic";
import { C, FONT, useLayout } from "../theme";
import { ENTRA_SAI, prog, saida } from "./motion";

/** Mais horas não resolvem (relógio sóbrio que para); decisões em ordem (linha do tempo com marcos acendendo). */
export const B4Horas: React.FC = () => {
  const frame = useCurrentFrame();
  const { vertical, u, width, height } = useLayout();

  // relógio: duas voltas suaves do ponteiro e para
  const giro = prog(frame, 0, 84, ENTRA_SAI);
  const minuto = 720 * giro;
  const hora = 60 * giro;
  const relogio = 1 - prog(frame, 92, 112);
  const R = (vertical ? 230 : 220) * u;
  const cx = vertical ? width / 2 : width * 0.72;
  const cy = vertical ? height * 0.32 : height * 0.5;

  // linha do tempo com 7 marcos
  const N = 7;
  const lw = vertical ? 860 * u : 820 * u;
  const lx = (vertical ? width / 2 : width * 0.72) - lw / 2;
  const ly = vertical ? height * 0.34 : height * 0.5;
  const linha = prog(frame, 116, 136);
  const avanco = prog(frame, 136, 196, ENTRA_SAI);

  return (
    <AbsoluteFill style={{ background: C.paper, color: C.ink, fontFamily: FONT, overflow: "hidden", opacity: saida(frame, 240) }}>
      <svg width={width} height={height} style={{ position: "absolute", inset: 0 }}>
        <g transform={`translate(${cx} ${cy})`} opacity={relogio}>
          <circle r={R} fill="none" stroke={C.ink} strokeWidth={3 * u} />
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={i} x1={0} y1={-R + 16 * u} x2={0} y2={-R + (i % 3 === 0 ? 46 : 30) * u} stroke={C.ink} strokeWidth={(i % 3 === 0 ? 4 : 2) * u} transform={`rotate(${i * 30})`} />
          ))}
          <line x1={0} y1={0} x2={0} y2={-R * 0.5} stroke={C.ink} strokeWidth={6 * u} strokeLinecap="round" transform={`rotate(${hora + 300})`} />
          <line x1={0} y1={0} x2={0} y2={-R * 0.8} stroke={C.ink} strokeWidth={3 * u} strokeLinecap="round" transform={`rotate(${minuto})`} />
          <circle r={7 * u} fill={C.ink} />
        </g>

        {/* linha do tempo: os marcos acendem em ordem */}
        <g opacity={linha}>
          <line x1={lx} y1={ly} x2={lx + lw} y2={ly} stroke={C.lineLight} strokeWidth={3 * u} />
          <line x1={lx} y1={ly} x2={lx + lw * avanco} y2={ly} stroke={C.ink} strokeWidth={3 * u} />
          {Array.from({ length: N }).map((_, i) => {
            const x = lx + (lw * i) / (N - 1);
            const aceso = prog(frame, 136 + i * 9, 146 + i * 9);
            return (
              <g key={i}>
                <circle cx={x} cy={ly} r={14 * u} fill={C.paper} stroke={C.ink} strokeWidth={3 * u} />
                <circle cx={x} cy={ly} r={14 * u * aceso} fill={C.yellow} />
                <text x={x} y={ly - 36 * u} textAnchor="middle" fontFamily={FONT} fontWeight={600} fontSize={28 * u} fill={C.ink} opacity={0.35 + aceso * 0.65}>
                  {String(i + 1).padStart(2, "0")}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      <div
        style={{
          position: "absolute",
          left: vertical ? 90 * u : 180 * u,
          right: vertical ? 90 * u : undefined,
          top: vertical ? height * 0.52 : 0,
          bottom: vertical ? undefined : 0,
          width: vertical ? undefined : 720 * u,
          display: "grid",
          alignContent: vertical ? "start" : "center",
        }}
      >
        <div style={{ gridArea: "1 / 1", opacity: relogio }}>
          <Kinetic start={8} stagger={3} strikeAt={62} words={words("Nenhum desses pontos se resolve só com mais horas de trabalho.", (_, i) => (i >= 7 ? { strike: true } : {}))} style={{ fontSize: vertical ? 74 * u : 68 * u, fontWeight: 500, lineHeight: 1.15 }} />
        </div>
        <div style={{ gridArea: "1 / 1" }}>
          <Kinetic
            start={118}
            stagger={3}
            markAt={176}
            words={words("Todos se resolvem com uma sequência de decisões certas, tomadas na ordem certa.", (_, i) => ({ bold: true, ...((i >= 5 && i <= 8) || i >= 11 ? { mark: true } : {}) }))}
            style={{ fontSize: vertical ? 74 * u : 68 * u, lineHeight: 1.15 }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
