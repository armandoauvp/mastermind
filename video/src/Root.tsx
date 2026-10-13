import { Composition, Folder } from "remotion";
import { MastermindVideo } from "./Video";
import { MastermindV2 } from "./v2/VideoV2";
import { MastermindV3 } from "./v3/VideoV3";
import { A1Gancho } from "./v2/A1Gancho";
import { A2Convergencia } from "./v2/A2Convergencia";
import { A3Sozinho } from "./v2/A3Sozinho";
import { A4Dominos } from "./v2/A4Dominos";
import { A5Cartas } from "./v2/A5Cartas";
import { A6Carimbos } from "./v2/A6Carimbos";
import { A7Mesa } from "./v2/A7Mesa";
import { S1Gancho } from "./scenes/S1Gancho";
import { S2Pilha } from "./scenes/S2Pilha";
import { S3Dados } from "./scenes/S3Dados";
import { S4Virada } from "./scenes/S4Virada";
import { S5Jornal } from "./scenes/S5Jornal";
import { S6Raul } from "./scenes/S6Raul";
import { S7Oferta } from "./scenes/S7Oferta";
import { S8Assinatura } from "./scenes/S8Assinatura";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* versão 3: tom institucional e cinematográfico */}
      <Composition
        id="Mastermind-V3-9x16"
        component={MastermindV3}
        durationInFrames={1425}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ cta: "Link na bio" }}
      />
      <Composition
        id="Mastermind-V3-16x9"
        component={MastermindV3}
        durationInFrames={1425}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ cta: "Link na descrição" }}
      />

      {/* versão 2: linguagem própria de vídeo */}
      <Composition
        id="Mastermind-V2-9x16"
        component={MastermindV2}
        durationInFrames={1290}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ cta: "Link na bio" }}
      />
      <Composition
        id="Mastermind-V2-16x9"
        component={MastermindV2}
        durationInFrames={1290}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ cta: "Link na descrição" }}
      />
      <Folder name="Cenas-V2">
        <Composition id="A1-Gancho" component={A1Gancho} durationInFrames={120} fps={30} width={1080} height={1920} />
        <Composition id="A2-Convergencia" component={A2Convergencia} durationInFrames={180} fps={30} width={1080} height={1920} />
        <Composition id="A3-Sozinho" component={A3Sozinho} durationInFrames={150} fps={30} width={1080} height={1920} />
        <Composition id="A4-Dominos" component={A4Dominos} durationInFrames={240} fps={30} width={1080} height={1920} />
        <Composition id="A5-Cartas" component={A5Cartas} durationInFrames={180} fps={30} width={1080} height={1920} />
        <Composition id="A6-Carimbos" component={A6Carimbos} durationInFrames={180} fps={30} width={1080} height={1920} />
        <Composition id="A7-Mesa" component={A7Mesa} durationInFrames={150} fps={30} width={1080} height={1920} />
      </Folder>

      {/* versão 1: a página animada, mantida para comparação */}
      <Composition
        id="Mastermind-9x16"
        component={MastermindVideo}
        durationInFrames={1320}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ cta: "Link na bio" }}
      />
      <Composition
        id="Mastermind-16x9"
        component={MastermindVideo}
        durationInFrames={1320}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ cta: "Link na descrição" }}
      />

      {/* cenas avulsas (9:16) para editar uma a uma */}
      <Folder name="Cenas-V1">
        <Composition id="S1-Gancho" component={S1Gancho} durationInFrames={135} fps={30} width={1080} height={1920} />
        <Composition id="S2-Pilha" component={S2Pilha} durationInFrames={180} fps={30} width={1080} height={1920} />
        <Composition id="S3-Dados" component={S3Dados} durationInFrames={210} fps={30} width={1080} height={1920} />
        <Composition id="S4-Virada" component={S4Virada} durationInFrames={180} fps={30} width={1080} height={1920} />
        <Composition id="S5-Jornal" component={S5Jornal} durationInFrames={180} fps={30} width={1080} height={1920} />
        <Composition id="S6-Raul" component={S6Raul} durationInFrames={165} fps={30} width={1080} height={1920} />
        <Composition id="S7-Oferta" component={S7Oferta} durationInFrames={165} fps={30} width={1080} height={1920} />
        <Composition
          id="S8-Assinatura"
          component={S8Assinatura}
          durationInFrames={105}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{ cta: "Link na bio" }}
        />
      </Folder>
    </>
  );
};
