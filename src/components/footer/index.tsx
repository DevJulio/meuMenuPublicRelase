import React from "react";
import * as Styled from "./styles";
import footerLogo from "../../assets/logo/footerLogo.png";
import instagram from "../../assets/icons/instagram.png";
import whatsapp from "../../assets/icons/whatsapp.png";
import facebook from "../../assets/icons/facebook.png";
import { theme } from "../../theme/theme";

interface IBgColor {
  color?: string;
}

const Footer: React.FC<IBgColor> = ({ color }) => {
  return (
    <Styled.Container
      style={{ backgroundColor: color ? color : theme.colors.white.normal }}
    >
      <Styled.Shadow>
        <Styled.MainContainer>
          <Styled.LogoContainer>
            <Styled.LogoImg src={footerLogo} alt="" />
          </Styled.LogoContainer>
          <Styled.IconsContainer>
            <Styled.Icons src={instagram} />
            <Styled.Icons src={whatsapp} />
            <Styled.Icons src={facebook} />
          </Styled.IconsContainer>
        </Styled.MainContainer>
        <Styled.FooterContact>
          <Styled.FooterSpan>
            Feito por:{" "}
            <a href="https://api.whatsapp.com/send?phone=5564996140938&text=Meu menu!">
              Júlio Rodrigues
            </a>
          </Styled.FooterSpan>
        </Styled.FooterContact>
        <Styled.CopyDiv>
          Copyright {new Date().getFullYear()} © Julius Soft House
        </Styled.CopyDiv>
      </Styled.Shadow>
    </Styled.Container>
  );
};

export default Footer;
