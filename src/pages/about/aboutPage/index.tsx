import React from "react";
import * as Styled from "./styles";
import { theme } from "../../../theme/theme";
import footerLogo from "../../../assets/logo/footerLogo.png";
import BorderPage from "../../../components/borderPage";

const AboutPage: React.FC = () => {
  const aboutUs = (
    <>
      <Styled.MainContainer>
        <Styled.MainContainerLeft>
          <Styled.TitleContainer>
            <Styled.TitleSpan>
              É a solução digital para seu restaurante!{" "}
            </Styled.TitleSpan>
          </Styled.TitleContainer>
          <Styled.Spacer style={{ backgroundColor: theme.colors.red.normal }} />
          <Styled.SpanAux>dinamicidade & personalização.</Styled.SpanAux>
          <Styled.TextSpan>
            Economize tempo, ofereça serviço de reserva, atualize todas
            informações das criações vindas da cozinha, crie promoções, reuna todas suas redes sociais,
            adicione sua localização.
          </Styled.TextSpan>
          <Styled.TextSpan>
            Muito mais que um cardápio por QR code, é a extensão digital do seu
            estabelecimento. Chega de enviar dezenas de imagens via WhatsApp,
            envie seu cardápio digital.
          </Styled.TextSpan>
          <Styled.TextSpan>
            Meu menu, para seus clientes, cardápio digital. Para você, sua empresa online.
          </Styled.TextSpan>
        </Styled.MainContainerLeft>
        <Styled.MainContainerRight>
          <Styled.BgContainer>teste</Styled.BgContainer>
        </Styled.MainContainerRight>
      </Styled.MainContainer>
    </>
  );

  return (
    <>
      <Styled.Main>
        {/* <Styled.MainSpanContainer></Styled.MainSpanContainer> */}
        <Styled.MainImgContainer>
          <Styled.SpanAndIcon>
            <Styled.AuxMainSpanContainer>
              <Styled.Span>Mas afinal de contas...</Styled.Span>
              <Styled.SpanAux>O que é o meu menu?</Styled.SpanAux>
            </Styled.AuxMainSpanContainer>
            <Styled.AuxMainSpanContainer>
              <Styled.LogoImg src={footerLogo} alt="" />
            </Styled.AuxMainSpanContainer>
          </Styled.SpanAndIcon>
        </Styled.MainImgContainer>

        <BorderPage
          outsideColor={theme.colors.white.normal}
          insideColor={theme.colors.yellow.palete}
          destop={<>{aboutUs}</>}
          mobile={<>{aboutUs} </>}
        />
      </Styled.Main>
    </>
  );
};
export default AboutPage;
