import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Kinetic, words } from "../components/Kinetic";
import { C, condensed, useLayout } from "../theme";

/** Gancho: flash amarelo e a frase de identificação entrando palavra por palavra. */
export const S1Gancho: React.FC = () => {
  const frame = useCurrentFrame();
  const { vertical, u } = useLayout();

  return (
    <AbsoluteFill style={{ background: C.bg, justifyContent: "center", padding: `0 ${vertical ? 80 * u : 160 * u}px` }}>
      <div
        style={{
          translate: `0 ${interpolate(frame, [118, 135], [0, -60 * u], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.in(Easing.cubic) })}px`,
          opacity: interpolate(frame, [118, 135], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          scale: interpolate(frame, [10, 118], [1.04, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        <Kinetic
          start={14}
          stagger={3}
          words={words("Você é a última instância de tudo que acontece na sua empresa.", (_, i) =>
            i === 3 || i === 4 ? { color: C.yellow } : {},
          )}
          style={{
            ...condensed,
            color: C.paper,
            fontSize: vertical ? 132 * u : 150 * u,
            maxWidth: vertical ? 920 * u : 1500 * u,
          }}
        />
        <div
          style={{
            marginTop: 48 * u,
            height: 8 * u,
            width: vertical ? 420 * u : 520 * u,
            background: C.yellow,
            transformOrigin: "left center",
            scale: `${interpolate(frame, [44, 62], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) })} 1`,
          }}
        />
      </div>

      {/* flash amarelo que abre o vídeo e sai pela direita */}
      <AbsoluteFill
        style={{
          background: C.yellow,
          translate: `${interpolate(frame, [3, 15], [0, 105], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.7, 0, 0.3, 1) })}% 0`,
        }}
      />
    </AbsoluteFill>
  );
};
