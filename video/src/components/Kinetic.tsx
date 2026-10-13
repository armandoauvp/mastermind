import React from "react";
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { C } from "../theme";

export type Word = {
  t: string;
  color?: string;
  bold?: boolean;
  strike?: boolean;
  mark?: boolean;
};

type Props = {
  words: Word[];
  /** frame em que a primeira palavra começa a subir */
  start: number;
  /** frames entre uma palavra e a seguinte */
  stagger?: number;
  /** frame em que o risco começa a cortar as palavras marcadas com strike */
  strikeAt?: number;
  /** frame em que a marca-texto começa a passar nas palavras marcadas com mark */
  markAt?: number;
  style?: React.CSSProperties;
};

/** Texto cinético: cada palavra sobe de dentro de uma máscara, em sequência. */
export const Kinetic: React.FC<Props> = ({ words, start, stagger = 3, strikeAt, markAt, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  let markIndex = 0;

  return (
    <div style={{ ...style }}>
      {words.map((w, i) => {
        const p = spring({ frame: frame - start - i * stagger, fps, config: { damping: 200, mass: 0.6 } });
        const thisMark = w.mark ? markIndex++ : -1;
        const strikeP =
          strikeAt === undefined
            ? 0
            : interpolate(frame, [strikeAt, strikeAt + 14], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.65, 0, 0.35, 1),
              });
        const markP =
          markAt === undefined || thisMark < 0
            ? 0
            : interpolate(frame, [markAt + thisMark * 4, markAt + thisMark * 4 + 8], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.65, 0, 0.35, 1),
              });

        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              overflow: "hidden",
              verticalAlign: "top",
              paddingTop: "0.14em",
              marginTop: "-0.14em",
              paddingInline: w.mark ? "0.08em" : 0,
              marginInline: w.mark ? "-0.08em" : 0,
              marginRight: i < words.length - 1 ? (w.mark ? "0.18em" : "0.26em") : 0,
            }}
          >
            <span
              style={{
                position: "relative",
                display: "inline-block",
                isolation: "isolate",
                translate: `0 ${(1 - p) * 110}%`,
                color: w.strike && strikeP > 0.5 ? C.inkMuted : w.color,
                fontWeight: w.bold ? 700 : undefined,
              }}
            >
              {w.mark ? (
                <span
                  style={{
                    position: "absolute",
                    left: "-0.08em",
                    right: "-0.08em",
                    bottom: "0.04em",
                    height: "0.44em",
                    background: C.yellow,
                    zIndex: -1,
                    transformOrigin: "left center",
                    scale: `${markP} 1`,
                  }}
                />
              ) : null}
              {w.t}
              {w.strike ? (
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: "56%",
                    height: "0.07em",
                    background: C.ink,
                    transformOrigin: "left center",
                    scale: `${strikeP} 1`,
                  }}
                />
              ) : null}
            </span>
          </span>
        );
      })}
    </div>
  );
};

/** Converte uma frase em palavras simples. */
export const words = (text: string, extra?: (w: string, i: number) => Partial<Word>): Word[] =>
  text.split(/\s+/).map((t, i) => ({ t, ...(extra ? extra(t, i) : {}) }));
