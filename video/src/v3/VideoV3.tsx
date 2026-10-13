import { Series } from "remotion";
import { B1Dado } from "./B1Dado";
import { B2Convergencia } from "./B2Convergencia";
import { B3Sozinho } from "./B3Sozinho";
import { B4Horas } from "./B4Horas";
import { B5Casos } from "./B5Casos";
import { B6Raul } from "./B6Raul";
import { B7Palco } from "./B7Palco";
import { B8Assinatura } from "./B8Assinatura";

type Props = {
  readonly cta: string;
};

/** Versão 3: tom institucional e cinematográfico. 47,5s, movimentos suaves, fotografia real. */
export const MastermindV3: React.FC<Props> = ({ cta }) => (
  <Series>
    <Series.Sequence name="1 Dado" durationInFrames={135}>
      <B1Dado />
    </Series.Sequence>
    <Series.Sequence name="2 Convergência" durationInFrames={180}>
      <B2Convergencia />
    </Series.Sequence>
    <Series.Sequence name="3 Sozinho" durationInFrames={150}>
      <B3Sozinho />
    </Series.Sequence>
    <Series.Sequence name="4 Horas e ordem" durationInFrames={240}>
      <B4Horas />
    </Series.Sequence>
    <Series.Sequence name="5 Casos" durationInFrames={270}>
      <B5Casos />
    </Series.Sequence>
    <Series.Sequence name="6 Raul" durationInFrames={180}>
      <B6Raul />
    </Series.Sequence>
    <Series.Sequence name="7 Palco" durationInFrames={165}>
      <B7Palco />
    </Series.Sequence>
    <Series.Sequence name="8 Assinatura" durationInFrames={105}>
      <B8Assinatura cta={cta} />
    </Series.Sequence>
  </Series>
);
