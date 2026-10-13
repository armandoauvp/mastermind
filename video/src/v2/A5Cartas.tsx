import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Kinetic, words } from "../components/Kinetic";
import { C, FONT, condensed, useLayout } from "../theme";

const CARTAS = [
  { nome: "Lloyds Bank", foto: "img/caso-lloyds-1400.webp" },
  { nome: "TAG Heuer", foto: "img/caso-tagheuer-800.webp" },
  { nome: "Nissan", foto: "img/caso-nissan-1000.webp" },
];

/** As cartas: três casos distribuídos na mesa, como num jogo. */
export const A5Cartas: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { vertical, u, width, height } = useLayout();
  const cw = (vertical ? 360 : 380) * u;
  const ch = cw * 1.36;
  const centroX = vertical ? width / 2 : width * 0.64;
  const centroY = vertical ? height * 0.6 : height * 0.54;
  const leque = vertical
    ? [{ x: -200, y: -270, r: -6 }, { x: 200, y: -255, r: 5 }, { x: 0, y: 255, r: -2 }] // 9:16: duas em cima, uma embaixo, sem cobrir os nomes
    : [{ x: -410, y: 20, r: -6 }, { x: 0, y: -10, r: 0 }, { x: 410, y: 20, r: 6 }];

  return (
    <AbsoluteFill style={{ background: C.yellow, color: C.ink, fontFamily: FONT, overflow: "hidden", opacity: interpolate(frame, [168, 180], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
      <div
        style={{
          position: "absolute",
          left: vertical ? 80 * u : 120 * u,
          right: vertical ? 80 * u : undefined,
          top: vertical ? 150 * u : 0,
          bottom: vertical ? undefined : 0,
          width: vertical ? undefined : 480 * u,
          display: "grid",
          alignContent: "center",
        }}
      >
        <Kinetic start={2} stagger={3} words={words("Até as maiores empresas do mundo passaram por isso.")} style={{ ...condensed, fontSize: vertical ? 112 * u : 104 * u }} />
      </div>

      {CARTAS.map((c, i) => {
        const p = spring({ frame: frame - 36 - i * 14, fps, config: { damping: 15, mass: 0.7 } });
        const alvo = leque[i];
        return (
          <div
            key={c.nome}
            style={{
              position: "absolute",
              left: centroX,
              top: centroY,
              width: cw,
              height: ch,
              background: C.paper,
              padding: 18 * u,
              display: "flex",
              flexDirection: "column",
              boxShadow: `0 ${4 * u}px ${8 * u}px rgb(0 0 0 / .18), 0 ${40 * u}px ${70 * u}px -${30 * u}px rgb(0 0 0 / .5)`,
              translate: `calc(-50% + ${alvo.x * u + (1 - p) * 900 * u}px) calc(-50% + ${alvo.y * u + (1 - p) * 900 * u}px)`,
              rotate: `${alvo.r + (1 - p) * 40}deg`,
              opacity: frame >= 36 + i * 14 ? 1 : 0,
            }}
          >
            <div style={{ position: "relative", flex: 1, overflow: "hidden" }}>
              <Img src={staticFile(c.foto)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(1) contrast(1.1)" }} />
            </div>
            <div style={{ ...condensed, fontSize: (vertical ? 54 : 64) * u, paddingTop: 16 * u, borderTop: `${3 * u}px solid ${C.ink}`, marginTop: 16 * u, whiteSpace: "nowrap" }}>{c.nome}</div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
