import { Series } from "remotion";
import { S8Assinatura } from "../scenes/S8Assinatura";
import { A1Gancho } from "./A1Gancho";
import { A2Convergencia } from "./A2Convergencia";
import { A3Sozinho } from "./A3Sozinho";
import { A4Dominos } from "./A4Dominos";
import { A5Cartas } from "./A5Cartas";
import { A6Carimbos } from "./A6Carimbos";
import { A7Mesa } from "./A7Mesa";

type Props = {
  readonly cta: string;
};

/** Versão 2: linguagem própria de vídeo (metáforas animadas), 43s, cortes no tempo de 120 BPM. */
export const MastermindV2: React.FC<Props> = ({ cta }) => (
  <Series>
    <Series.Sequence name="1 Gancho 84%" durationInFrames={120}>
      <A1Gancho />
    </Series.Sequence>
    <Series.Sequence name="2 Convergência" durationInFrames={180}>
      <A2Convergencia />
    </Series.Sequence>
    <Series.Sequence name="3 Sozinho" durationInFrames={150}>
      <A3Sozinho />
    </Series.Sequence>
    <Series.Sequence name="4 Relógio e dominós" durationInFrames={240}>
      <A4Dominos />
    </Series.Sequence>
    <Series.Sequence name="5 Cartas" durationInFrames={180}>
      <A5Cartas />
    </Series.Sequence>
    <Series.Sequence name="6 Carimbos" durationInFrames={180}>
      <A6Carimbos />
    </Series.Sequence>
    <Series.Sequence name="7 Mesa" durationInFrames={150}>
      <A7Mesa />
    </Series.Sequence>
    <Series.Sequence name="8 Assinatura" durationInFrames={90}>
      <S8Assinatura cta={cta} />
    </Series.Sequence>
  </Series>
);
