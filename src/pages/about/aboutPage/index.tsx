import React from "react";
import * as Styled from "./styles";
import { theme } from "../../../theme/theme";
import InvertBorderPage from "../../../components/invertBorderPage";
import footerLogo from "../../../assets/logo/footerLogo.png";

const AboutPage: React.FC = () => {
  const plans = <></>;
  return (
    <>
      <InvertBorderPage
        outsideColor={theme.colors.white.normal}
        insideColor={theme.colors.blue.palete}
        destop={<>{plans}</>}
        mobile={<>{plans} </>}
      />
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
    </>
  );
};
export default AboutPage;
