import { Series } from "remotion";
import { S1Gancho } from "./scenes/S1Gancho";
import { S2Pilha } from "./scenes/S2Pilha";
import { S3Dados } from "./scenes/S3Dados";
import { S4Virada } from "./scenes/S4Virada";
import { S5Jornal } from "./scenes/S5Jornal";
import { S6Raul } from "./scenes/S6Raul";
import { S7Oferta } from "./scenes/S7Oferta";
import { S8Assinatura } from "./scenes/S8Assinatura";

type Props = {
  readonly cta: string;
};

/** Mastermind AUVP Negócios: 44s, 8 cenas em corte seco no tempo de 120 BPM (15 frames por batida). */
export const MastermindVideo: React.FC<Props> = ({ cta }) => (
  <Series>
    <Series.Sequence name="1 Gancho" durationInFrames={135}>
      <S1Gancho />
    </Series.Sequence>
    <Series.Sequence name="2 Pilha" durationInFrames={180}>
      <S2Pilha />
    </Series.Sequence>
    <Series.Sequence name="3 Dados" durationInFrames={210}>
      <S3Dados />
    </Series.Sequence>
    <Series.Sequence name="4 Virada" durationInFrames={180}>
      <S4Virada />
    </Series.Sequence>
    <Series.Sequence name="5 Jornal" durationInFrames={180}>
      <S5Jornal />
    </Series.Sequence>
    <Series.Sequence name="6 Raul" durationInFrames={165}>
      <S6Raul />
    </Series.Sequence>
    <Series.Sequence name="7 Oferta" durationInFrames={165}>
      <S7Oferta />
    </Series.Sequence>
    <Series.Sequence name="8 Assinatura" durationInFrames={105}>
      <S8Assinatura cta={cta} />
    </Series.Sequence>
  </Series>
);
