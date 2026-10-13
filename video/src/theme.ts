import { loadFont } from "@remotion/fonts";
import { staticFile, useVideoConfig } from "remotion";

// Mesma fonte da página: Archivo variável (peso e largura)
loadFont({
  family: "Archivo",
  url: staticFile("fonts/archivo-latin.woff2"),
  weight: "400 800",
  stretch: "62% 125%",
});

export const FONT = '"Archivo", "Helvetica Neue", Arial, sans-serif';

// Paleta da marca AUVP: preto, papel e amarelo
export const C = {
  bg: "#101010",
  paper: "#F5F4F1",
  newsprint: "#F1EDE4",
  ink: "#101010",
  inkMuted: "#4A4A4A",
  muted: "#B0B0B0",
  line: "#303030",
  lineLight: "#E3E1DB",
  yellow: "#F2C230",
};

// Ritmo: 120 BPM a 30 fps = 15 frames por batida
export const BEAT = 15;

/** Unidade relativa ao lado menor (1080px nos dois formatos) e o formato atual. */
export const useLayout = () => {
  const { width, height } = useVideoConfig();
  const vertical = height > width;
  const u = Math.min(width, height) / 1080;
  return { vertical, u, width, height };
};

export const condensed: React.CSSProperties = {
  fontFamily: FONT,
  fontStretch: "68%",
  fontWeight: 800,
  textTransform: "uppercase",
  lineHeight: 0.9,
};
