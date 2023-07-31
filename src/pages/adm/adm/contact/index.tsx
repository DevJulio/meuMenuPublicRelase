import React from "react";
import * as Styled from "./styles";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import whatsapp from "../../../../assets/icons/whatsapp.png";
import call from "../../../../assets/icons/call.png";
import BorderPage from "../../../../components/borderPage";
import { theme } from "../../../../theme/theme";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";

//import ButtonSecondary from "../../../components/buttons/secondary";

const ContactAdm: React.FC = () => {
  const plans = (
    <>
      <Styled.MainSpanContainer>
        <Styled.Span>Contatos</Styled.Span>
        <Styled.SpanAux>
          Para maiores informações, entre em contato clicando em um dos números.
        </Styled.SpanAux>
      </Styled.MainSpanContainer>
      <Styled.CardContainer>
        <Styled.Card>
          <Styled.Icon src={whatsapp} />
          <Styled.CardAnchor href="https://api.whatsapp.com/send?phone=5564996140938&text=Meu menu!">
            64996140938
          </Styled.CardAnchor>
        </Styled.Card>
        <Styled.Card>
          <Styled.Icon src={call} />
          <Styled.CardAnchor href="tel:+5562984923730">
            62984923730
          </Styled.CardAnchor>
        </Styled.Card>
      </Styled.CardContainer>
      <Styled.Span
        style={{
          fontSize: theme.fontSize.md2,
          paddingBottom: "5vh",
          paddingTop: "1vw",
        }}
      >
        Júlio Rodrigues, Iporá-Go
      </Styled.Span>
    </>
  );
  return (
    <>
      <Header />
      <BorderPage
        outsideColor={theme.colors.blue.palete}
        insideColor={theme.colors.yellow.palete}
        destop={<>{plans}</>}
        mobile={<>{plans} </>}
      />
      <Footer />
    </>
  );
};
export default ContactAdm;
