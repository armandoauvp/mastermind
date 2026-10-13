import { AbsoluteFill, Easing, interpolate, random, useCurrentFrame } from "remotion";
import { Kinetic, words } from "../components/Kinetic";
import { C, FONT, condensed, useLayout } from "../theme";
import { usePonto } from "./A2Convergencia";

/** Sozinho: o ponto fica num foco de luz; as outras pessoas ao redor se apagam e se afastam. */
export const A3Sozinho: React.FC = () => {
  const frame = useCurrentFrame();
  const { vertical, u, width, height } = useLayout();
  const p = usePonto();
  const luz = interpolate(frame, [0, 24], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  return (
    <AbsoluteFill style={{ background: C.bg, color: C.paper, fontFamily: FONT, overflow: "hidden", opacity: interpolate(frame, [138, 150], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
      {/* cone de luz de cima até o ponto */}
      <AbsoluteFill
        style={{
          opacity: luz * 0.9,
          background: `radial-gradient(ellipse ${170 * u}px ${70 * u}px at ${p.x}px ${p.y + 40 * u}px, rgb(242 194 48 / .35), transparent 70%)`,
        }}
      />
      <svg width={width} height={height} style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="cone" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#F5F4F1" stopOpacity="0" />
            <stop offset="1" stopColor="#F5F4F1" stopOpacity="0.16" />
          </linearGradient>
        </defs>
        <polygon
          points={`${p.x - 40 * u},0 ${p.x + 40 * u},0 ${p.x + 190 * u},${p.y + 50 * u} ${p.x - 190 * u},${p.y + 50 * u}`}
          fill="url(#cone)"
          opacity={luz}
        />
        {/* as outras pessoas: pontos cinza que se apagam e se afastam */}
        {Array.from({ length: 26 }).map((_, i) => {
          const a = random(`a${i}`) * Math.PI * 2;
          const d0 = (160 + random(`d${i}`) * 420) * u;
          const fuga = interpolate(frame, [8 + i, 70 + i], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
          const d = d0 + fuga * 500 * u;
          return <circle key={i} cx={p.x + Math.cos(a) * d * (vertical ? 0.8 : 1.3)} cy={p.y + Math.sin(a) * d * 0.8} r={14 * u} fill={C.line} opacity={1 - fuga} />;
        })}
        <circle cx={p.x} cy={p.y} r={26 * u} fill={C.yellow} />
      </svg>

      <div
        style={{
          position: "absolute",
          left: vertical ? 80 * u : 160 * u,
          right: vertical ? 80 * u : undefined,
          top: vertical ? height * 0.66 : undefined,
          height: vertical ? undefined : "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: vertical ? undefined : 760 * u,
        }}
      >
        <Kinetic start={26} stagger={3} words={words("Ninguém por perto carrega o mesmo risco.")} style={{ ...condensed, fontSize: vertical ? 112 * u : 116 * u }} />
      </div>
    </AbsoluteFill>
  );
};
