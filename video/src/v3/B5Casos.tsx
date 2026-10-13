import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Kinetic, words } from "../components/Kinetic";
import { C, FONT, condensed, useLayout } from "../theme";
import { prog, saida, sobe } from "./motion";

const CASOS = [
  { nome: "Lloyds Bank", foto: "img/caso-lloyds-1400.webp", pos: "50% 50%" },
  { nome: "TAG Heuer", foto: "img/caso-tagheuer-800.webp", pos: "50% 40%" },
  { nome: "Nissan", foto: "img/caso-nissan-1000.webp", pos: "50% 50%" },
];
const INICIO = 66;
const DUR = 68;

/** Casos em estilo documentário: a frase abre a cena; depois cada empresa em tela cheia, com empurrão lento. */
export const B5Casos: React.FC = () => {
  const frame = useCurrentFrame();
  const { vertical, u } = useLayout();

  return (
    <AbsoluteFill style={{ background: C.bg, color: C.paper, fontFamily: FONT, overflow: "hidden", opacity: saida(frame, 270) }}>
      {/* abertura: a frase */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          padding: `0 ${vertical ? 90 * u : 180 * u}px`,
          opacity: 1 - prog(frame, INICIO - 6, INICIO + 6),
        }}
      >
        <Kinetic start={4} stagger={3} words={words("Até as maiores empresas do mundo passaram por isso.")} style={{ ...condensed, fontSize: vertical ? 112 * u : 120 * u, lineHeight: 0.95, maxWidth: vertical ? 900 * u : 1300 * u }} />
      </AbsoluteFill>

      {CASOS.map((c, i) => {
        const de = INICIO + i * DUR;
        const visivel = interpolate(frame, [de - 8, de + 8, de + DUR, de + DUR + 10], [0, 1, 1, i === CASOS.length - 1 ? 1 : 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        if (visivel <= 0) return null;
        return (
          <AbsoluteFill key={c.nome} style={{ opacity: visivel }}>
            <Img
              src={staticFile(c.foto)}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: c.pos,
                scale: interpolate(frame, [de - 8, de + DUR + 10], [1.02, 1.12]),
              }}
            />
            {/* véu em degradê para o nome */}
            <AbsoluteFill
              style={{
                background: vertical
                  ? "linear-gradient(to top, rgb(16 16 16 / .95) 0%, rgb(16 16 16 / .6) 30%, rgb(16 16 16 / 0) 60%)"
                  : "linear-gradient(to right, rgb(16 16 16 / .9) 0%, rgb(16 16 16 / .5) 40%, rgb(16 16 16 / 0) 70%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: vertical ? 90 * u : 180 * u,
                bottom: vertical ? 220 * u : undefined,
                top: vertical ? undefined : "50%",
                translate: vertical ? undefined : "0 -50%",
              }}
            >
              <div style={{ ...sobe(frame, de + 4, u), width: 120 * u, height: 3 * u, background: C.yellow, marginBottom: 28 * u }} />
              <div style={{ ...sobe(frame, de + 8, u, 36, 26), ...condensed, fontSize: vertical ? 150 * u : 170 * u }}>{c.nome}</div>
            </div>
          </AbsoluteFill>
        );
      })}
    </AbsoluteFill>
  );
};
