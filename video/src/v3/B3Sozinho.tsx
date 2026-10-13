import { AbsoluteFill, random, useCurrentFrame } from "remotion";
import { Kinetic, words } from "../components/Kinetic";
import { C, FONT, condensed, useLayout } from "../theme";
import { usePonto } from "../v2/A2Convergencia";
import { ENTRA_SAI, prog, saida } from "./motion";

/** Sozinho: foco de luz lento sobre o ponto; as outras pessoas se apagam devagar. */
export const B3Sozinho: React.FC = () => {
  const frame = useCurrentFrame();
  const { vertical, u, width, height } = useLayout();
  const p = usePonto();
  const luz = prog(frame, 0, 40);

  return (
    <AbsoluteFill style={{ background: C.bg, color: C.paper, fontFamily: FONT, overflow: "hidden", opacity: saida(frame, 150) }}>
      <svg width={width} height={height} style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="cone3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#F5F4F1" stopOpacity="0" />
            <stop offset="1" stopColor="#F5F4F1" stopOpacity="0.12" />
          </linearGradient>
          <radialGradient id="chao3">
            <stop offset="0" stopColor="#F2C230" stopOpacity="0.28" />
            <stop offset="1" stopColor="#F2C230" stopOpacity="0" />
          </radialGradient>
        </defs>
        <polygon points={`${p.x - 30 * u},0 ${p.x + 30 * u},0 ${p.x + 170 * u},${p.y + 40 * u} ${p.x - 170 * u},${p.y + 40 * u}`} fill="url(#cone3)" opacity={luz} />
        <ellipse cx={p.x} cy={p.y + 34 * u} rx={170 * u} ry={46 * u} fill="url(#chao3)" opacity={luz} />
        {Array.from({ length: 24 }).map((_, i) => {
          const a = random(`b${i}`) * Math.PI * 2;
          const d0 = (170 + random(`e${i}`) * 380) * u;
          const f = prog(frame, 10 + i * 2, 90 + i * 2, ENTRA_SAI);
          return <circle key={i} cx={p.x + Math.cos(a) * (d0 + f * 220 * u) * (vertical ? 0.8 : 1.3)} cy={p.y + Math.sin(a) * (d0 + f * 220 * u) * 0.8} r={10 * u} fill="#3A3A3A" opacity={1 - f} />;
        })}
        <circle cx={p.x} cy={p.y} r={16 * u} fill={C.yellow} />
      </svg>

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
        <Kinetic start={30} stagger={4} words={words("Ninguém por perto carrega o mesmo risco.")} style={{ ...condensed, fontSize: vertical ? 104 * u : 108 * u, lineHeight: 0.95 }} />
      </div>
    </AbsoluteFill>
  );
};
