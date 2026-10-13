import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Kinetic, words } from "../components/Kinetic";
import { C, FONT, condensed, useLayout } from "../theme";

/** Relógio que acelera (mais horas não resolvem) e dominós numerados que caem em ordem (decisões na ordem certa). */
export const A4Dominos: React.FC = () => {
  const frame = useCurrentFrame();
  const { vertical, u, width, height } = useLayout();

  // relógio: os ponteiros aceleram até travar no frame 80
  const t = Math.min(frame, 80) / 80;
  const minuto = 360 * 9 * t * t;
  const hora = minuto / 12;
  const relogioSai = interpolate(frame, [86, 104], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) });
  const tremor = frame > 70 && frame < 86 ? Math.sin(frame * 3.1) * 6 * u : 0;
  const R = vertical ? 260 * u : 240 * u;
  const cx = vertical ? width / 2 : width * 0.72;
  const cy = vertical ? height * 0.34 : height * 0.5;

  // dominós
  const N = 7;
  const dw = (vertical ? 70 : 64) * u;
  const dh = (vertical ? 230 : 210) * u;
  const gap = (vertical ? 120 : 112) * u;
  const linhaW = (N - 1) * gap + dw;
  const x0 = (vertical ? width / 2 : width * 0.66) - linhaW / 2;
  const base = vertical ? height * 0.44 : height * 0.62;

  return (
    <AbsoluteFill style={{ background: C.paper, color: C.ink, fontFamily: FONT, overflow: "hidden" }}>
      {/* relógio */}
      <svg width={width} height={height} style={{ position: "absolute", inset: 0, opacity: 1 - relogioSai }}>
        <g transform={`translate(${cx + tremor} ${cy}) scale(${1 - relogioSai * 0.3})`}>
          <circle r={R} fill="none" stroke={C.ink} strokeWidth={8 * u} />
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={i} x1={0} y1={-R + 20 * u} x2={0} y2={-R + (i % 3 === 0 ? 60 : 40) * u} stroke={C.ink} strokeWidth={(i % 3 === 0 ? 8 : 4) * u} transform={`rotate(${i * 30})`} />
          ))}
          <line x1={0} y1={0} x2={0} y2={-R * 0.5} stroke={C.ink} strokeWidth={12 * u} strokeLinecap="round" transform={`rotate(${hora})`} />
          <line x1={0} y1={0} x2={0} y2={-R * 0.78} stroke={C.yellow} strokeWidth={8 * u} strokeLinecap="round" transform={`rotate(${minuto})`} />
          <circle r={14 * u} fill={C.ink} />
        </g>
      </svg>

      {/* dominós numerados: cada um derruba o próximo */}
      {Array.from({ length: N }).map((_, i) => {
        const entra = interpolate(frame, [96 + i * 2, 108 + i * 2], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.back(1.4)) });
        const cai = interpolate(frame, [124 + i * 7, 134 + i * 7], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.quad) });
        const ang = i === N - 1 ? cai * 82 : cai * 62;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x0 + i * gap,
              top: base - dh,
              width: dw,
              height: dh,
              background: C.ink,
              color: C.paper,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              paddingTop: 14 * u,
              ...condensed,
              fontSize: 48 * u,
              transformOrigin: "100% 100%",
              rotate: `${ang}deg`,
              translate: `0 ${(1 - entra) * -300 * u}px`,
              opacity: entra,
            }}
          >
            {i + 1}
          </div>
        );
      })}
      <div style={{ position: "absolute", left: x0 - 40 * u, width: linhaW + 220 * u, top: base, height: 4 * u, background: C.ink, opacity: interpolate(frame, [96, 104], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }} />

      {/* textos no mesmo lugar: a primeira frase sai quando o relógio para; a segunda entra com os dominós */}
      <div
        style={{
          position: "absolute",
          left: vertical ? 80 * u : 160 * u,
          right: vertical ? 80 * u : undefined,
          top: vertical ? height * 0.56 : 0,
          bottom: vertical ? undefined : 0,
          width: vertical ? undefined : 760 * u,
          display: "grid",
          alignContent: vertical ? "start" : "center",
        }}
      >
        <div style={{ gridArea: "1 / 1", opacity: 1 - relogioSai }}>
          <Kinetic start={6} stagger={2} strikeAt={54} words={words("Nenhum desses pontos se resolve só com mais horas de trabalho.", (_, i) => (i >= 7 ? { strike: true } : {}))} style={{ fontSize: vertical ? 78 * u : 72 * u, fontWeight: 500, lineHeight: 1.12 }} />
        </div>
        <div style={{ gridArea: "1 / 1" }}>
          <Kinetic
            start={108}
            stagger={2}
            markAt={150}
            words={words("Todos se resolvem com uma sequência de decisões certas, tomadas na ordem certa.", (_, i) => ({ bold: true, ...((i >= 5 && i <= 8) || i >= 11 ? { mark: true } : {}) }))}
            style={{ fontSize: vertical ? 78 * u : 72 * u, lineHeight: 1.12 }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
