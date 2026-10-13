import { Easing, interpolate } from "remotion";

// Curvas suaves, sem quique: tom institucional
export const SUAVE = Easing.bezier(0.22, 1, 0.36, 1);
export const ENTRA_SAI = Easing.bezier(0.65, 0, 0.35, 1);

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** 0 → 1 entre dois frames, com curva suave. */
export const prog = (frame: number, de: number, ate: number, easing = SUAVE) =>
  interpolate(frame, [de, ate], [0, 1], { ...clamp, easing });

/** Entrada discreta: opacidade e um leve deslocamento vertical. */
export const sobe = (frame: number, de: number, u: number, dist = 28, dur = 22): React.CSSProperties => {
  const p = prog(frame, de, de + dur);
  return { opacity: p, translate: `0 ${(1 - p) * dist * u}px` };
};

/** Saída da cena: fade nos últimos frames. */
export const saida = (frame: number, total: number, dur = 14) =>
  interpolate(frame, [total - dur, total], [1, 0], clamp);
