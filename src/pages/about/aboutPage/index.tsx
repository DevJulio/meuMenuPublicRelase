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

          <Styled.TextContainer>
            <p>
              <Styled.TextSpan>
                Meu Menu oferece uma solução para cardápio digital via QR Code,
                facilidade para alterar preços, descrições e fotos do cardápio.
                Caso um produto tenha acabado em estoque, desabilite do
                cardápio, crie promoções, deixe tudo com a sua identidade
                visual.
              </Styled.TextSpan>
            </p>
            <p>
              <Styled.TextSpan>
                Economize tempo, ofereça serviço de reserva, atualize todas
                informações das criações vindas da cozinha, crie promoções de
                maneira dinâmica e automatizadas, reúna todas suas redes
                sociais, adicione sua localização, escolha as melhores fotos
                para seu cardápio.
              </Styled.TextSpan>
            </p>
            <p>
              <Styled.TextSpan>
                Muito mais que um cardápio por QR code, é a extensão digital do
                seu estabelecimento. Meu menu é o seu cartão de visitas online.
                Agregue todas as informações de contato e de redes sociais. (até
                a playlist do spotify!). Meu Menu não é para ser usado apenas
                dentro das 4 paredes. Expanda seus horizontes com essa solução
                digital. Chega de enviar dezenas de imagens via WhatsApp, envie
                seu cardápio digital.
              </Styled.TextSpan>
            </p>

            <p>
              <Styled.TextSpan>
                Meu Menu não é para ser usado apenas dentro das 4 paredes.
                Expanda seus horizontes com essa solução digital. Chega de
                enviar dezenas de imagens via WhatsApp, envie apenas o seu link
                do Meu Menu!.
              </Styled.TextSpan>
            </p>

            <p>
              <Styled.TextSpan
                style={{
                  fontFamily: theme.fonts.primary,
                  fontSize: theme.fontSize.md2,
                }}
              >
                Meu menu, para seus clientes, cardápio digital. Para você, sua
                empresa online.
              </Styled.TextSpan>
            </p>
          </Styled.TextContainer>
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
