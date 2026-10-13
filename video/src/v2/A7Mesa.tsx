import { AbsoluteFill, Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Kinetic, words } from "../components/Kinetic";
import { C, FONT, condensed, useLayout } from "../theme";

/** A mesa: vista de cima, as cadeiras aparecem uma a uma e "sua empresa" vai para o centro. */
export const A7Mesa: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { vertical, u, width, height } = useLayout();
  const R = (vertical ? 330 : 300) * u;
  const cx = vertical ? width / 2 : width * 0.7;
  const cy = vertical ? height * 0.34 : height * 0.5;
  const mesa = spring({ frame, fps, config: { damping: 16 } });
  const centro = spring({ frame: frame - 44, fps, config: { damping: 11, mass: 0.6 } });
  const N = 8;

  return (
    <AbsoluteFill style={{ background: C.bg, color: C.paper, fontFamily: FONT, overflow: "hidden", opacity: interpolate(frame, [140, 150], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
      <div
        style={{
          position: "absolute",
          left: cx,
          top: cy,
          rotate: `${interpolate(frame, [0, 150], [-8, 6], { easing: Easing.inOut(Easing.sin) })}deg`,
        }}
      >
        {/* cadeiras */}
        {Array.from({ length: N }).map((_, i) => {
          const a = (i / N) * 360;
          const p = spring({ frame: frame - 10 - i * 4, fps, config: { damping: 12, mass: 0.5 } });
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: 110 * u,
                height: 90 * u,
                background: i === 0 ? C.yellow : "#2A2A2A",
                border: i === 0 ? "none" : `${3 * u}px solid #3A3A3A`,
                rotate: `${a}deg`,
                translate: `-50% -50%`,
                transformOrigin: "50% 50%",
                transform: `rotate(0deg) translateY(${-(R + 80 * u) - (1 - p) * 220 * u}px)`,
                opacity: Math.min(1, p * 1.5),
              }}
            />
          );
        })}
        {/* tampo em nogueira */}
        <div style={{ position: "absolute", left: 0, top: 0, width: R * 2, height: R * 2, translate: "-50% -50%", borderRadius: "50%", overflow: "hidden", scale: `${mesa}`, boxShadow: `0 ${30 * u}px ${60 * u}px rgb(0 0 0 / .6)` }}>
          <Img src={staticFile("img/mesa-nogueira-2400.webp")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        {/* "sua empresa" no centro da mesa */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            translate: "-50% -50%",
            padding: `${22 * u}px ${30 * u}px`,
            background: C.paper,
            color: C.ink,
            ...condensed,
            fontSize: 64 * u,
            whiteSpace: "nowrap",
            rotate: `${interpolate(frame, [0, 150], [8, -6], { easing: Easing.inOut(Easing.sin) }) - 3}deg`,
            scale: `${centro}`,
            boxShadow: `0 ${10 * u}px ${24 * u}px rgb(0 0 0 / .5)`,
          }}
        >
          Sua empresa
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: vertical ? 80 * u : 160 * u,
          right: vertical ? 80 * u : undefined,
          top: vertical ? height * 0.64 : 0,
          bottom: vertical ? undefined : 0,
          width: vertical ? undefined : 760 * u,
          display: "grid",
          alignContent: vertical ? "start" : "center",
        }}
      >
        <Kinetic start={50} stagger={3} words={words("Um dia inteiro com a sua empresa na pauta.")} style={{ ...condensed, fontSize: vertical ? 104 * u : 100 * u }} />
        <div
          style={{
            marginTop: 36 * u,
            ...condensed,
            fontSize: vertical ? 60 * u : 58 * u,
            color: C.yellow,
            opacity: interpolate(frame, [76, 86], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
            translate: `0 ${interpolate(frame, [76, 90], [20 * u, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) })}px`,
          }}
        >
          21 de outubro, Rio de Janeiro
        </div>
      </div>
    </AbsoluteFill>
  );
};
