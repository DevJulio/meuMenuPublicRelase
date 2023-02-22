import React from "react";
import * as Styled from "./styles";
import BorderPage from "../../../components/borderPage";
import { theme } from "../../../theme/theme";
import ButtonSecondary from "../../../components/buttons/secondary";
import { useNavigate } from "react-router-dom";

const Curious: React.FC = () => {
  const navigate = useNavigate();

  const plans = (
    <>
      <Styled.MainSpanContainer>
        <Styled.Span>Quer saber mais?</Styled.Span>
        <Styled.SpanAux>
          clique no botão a baixo e veja uma demonstração em tempo real!
        </Styled.SpanAux>
      </Styled.MainSpanContainer>
      <Styled.BtnContainer>
        <ButtonSecondary
          Action={() => {
            navigate("/cardapio");
          }}
          Label="Seu cardápio será assim!"
          color={theme.colors.red.normal}
          bgColor={theme.colors.white.normal}
        />
      </Styled.BtnContainer>
      <Styled.MainSpanContainer>
        <Styled.SpanAux style={{ paddingBottom: "4vh" }}>
          Com suas cores, sua cozinha e seus temperos!
        </Styled.SpanAux>
      </Styled.MainSpanContainer>
    </>
  );
  return (
    <>
      <BorderPage
        outsideColor={theme.colors.white.normal}
        insideColor={theme.colors.red.normal}
        destop={<>{plans}</>}
        mobile={<>{plans} </>}
      />
    </>
  );
};
export default Curious;
