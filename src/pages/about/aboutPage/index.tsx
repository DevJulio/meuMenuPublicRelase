import React from "react";
import * as Styled from "./styles";
import { theme } from "../../../theme/theme";
import InvertBorderPage from "../../../components/invertBorderPage";
import footerLogo from "../../../assets/logo/footerLogo.png";
import BorderPage from "../../../components/borderPage";

const AboutPage: React.FC = () => {
  const plans = <></>;
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
      </Styled.Main>
      <Styled.MainTitleContainer>
        <Styled.Title>Quer saber mais?</Styled.Title>
        <Styled.TitleAux>
          clique no botão a baixo e veja uma demonstração em tempo real!
        </Styled.TitleAux>
      </Styled.MainTitleContainer>
    </>
  );
};
export default AboutPage;
