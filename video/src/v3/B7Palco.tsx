import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Kinetic, words } from "../components/Kinetic";
import { C, FONT, condensed, useLayout } from "../theme";
import { prog, saida, sobe } from "./motion";

/** O formato: foto real do Raul conversando à mesa no palco, com empurrão lento, e a promessa do dia. */
export const B7Palco: React.FC = () => {
  const frame = useCurrentFrame();
  const { vertical, u } = useLayout();

  return (
    <AbsoluteFill style={{ background: C.bg, color: C.paper, fontFamily: FONT, overflow: "hidden", opacity: saida(frame, 165) }}>
      <AbsoluteFill style={{ opacity: prog(frame, 0, 24) }}>
        <Img
          src={staticFile(vertical ? "img/palco-916.webp" : "img/palco-169.webp")}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: vertical ? "40% 70%" : "50% 60%",
            scale: interpolate(frame, [0, 165], [1.0, 1.1]),
            transformOrigin: vertical ? "30% 70%" : "42% 64%",
          }}
        />
        <AbsoluteFill
          style={{
            background: vertical
              ? "linear-gradient(to bottom, rgb(16 16 16 / .9) 0%, rgb(16 16 16 / .55) 28%, rgb(16 16 16 / .1) 55%, rgb(16 16 16 / .6) 100%)"
              : "linear-gradient(to bottom, rgb(16 16 16 / .92) 0%, rgb(16 16 16 / .6) 38%, rgb(16 16 16 / .05) 62%)",
          }}
        />
      </AbsoluteFill>

      <div
        style={{
          position: "absolute",
          left: vertical ? 90 * u : 180 * u,
          right: vertical ? 90 * u : undefined,
          top: vertical ? 200 * u : 110 * u,
          width: vertical ? undefined : 1300 * u,
        }}
      >
        <div style={{ ...sobe(frame, 10, u, 16), ...condensed, fontSize: vertical ? 64 * u : 60 * u, color: C.yellow }}>Mastermind com Raul Sena</div>
        <Kinetic start={22} stagger={4} words={words("Um dia inteiro com a sua empresa na pauta.")} style={{ ...condensed, marginTop: 24 * u, fontSize: vertical ? 112 * u : 110 * u, lineHeight: 0.95 }} />
        <div style={{ ...sobe(frame, 62, u, 16), marginTop: 40 * u, paddingTop: 24 * u, borderTop: `${1.5 * u}px solid ${C.paper}`, fontSize: vertical ? 46 * u : 44 * u, fontWeight: 500 }}>
          21 de outubro, Rio de Janeiro
        </div>
      </div>
    </AbsoluteFill>
  );
};
