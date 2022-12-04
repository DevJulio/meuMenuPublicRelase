import React from "react";
import * as Styled from "./styles";
import burgerMenuStyles from "./burgerMenuStyles";
import { stack as Menu } from "react-burger-menu";
import logo from "../../assets/logo/logo.png";
import { theme } from "../../theme/theme";

const Header: React.FC = () => {
  setTimeout(() => {
    const element = document.querySelector(
      "#root > div.sc-bcXHqe.kmAiWi > div > div.sc-iBYQkv.kzEVHx > div"
    );
    const teste = element as any;
    if (teste) {
      teste["style"].display = "flex";
      teste["style"].marginLeft = "auto";
    }
  }, 150);

  return (
    <>
      <Styled.Container>
        <Styled.MainContainer onClick={() => {}}>
          <Styled.LogoContainer>
            <Styled.LogoImg src={logo} alt="" />
          </Styled.LogoContainer>
          <Styled.MainSpanContainer>
            <Styled.NameSpan>Meu</Styled.NameSpan>
            <Styled.NameSpanAux>Menu</Styled.NameSpanAux>
          </Styled.MainSpanContainer>
          <Styled.MenuContainer>
            <Menu styles={burgerMenuStyles}>
              <Styled.MenuItem id="home" href="/">
                Home
              </Styled.MenuItem>
              <Styled.MenuItem id="about" href="/sobre">
                Sobre
              </Styled.MenuItem>
              <Styled.MenuItem id="contact" href="/contact">
                Contato
              </Styled.MenuItem>
              <Styled.MenuItem id="contact" href="/contact">
                Preços e planos
              </Styled.MenuItem>
              <Styled.MenuItem
                id="contact"
                style={{ color: theme.colors.red.normal }}
                href="/contact"
              >
                Acessar Meu Menu
              </Styled.MenuItem>
            </Menu>
          </Styled.MenuContainer>
          <Styled.MenuDesktopContainer>
            <Styled.MenuDesktopAnchor>Home</Styled.MenuDesktopAnchor>
            <Styled.MenuDesktopAnchor href="/sobre">Sobre</Styled.MenuDesktopAnchor>
            <Styled.MenuDesktopAnchor>Contato</Styled.MenuDesktopAnchor>
            <Styled.MenuDesktopAnchor>Preços e planos</Styled.MenuDesktopAnchor>
            <Styled.MenuDesktopAnchor
              style={{
                color: theme.colors.red.normal,
              }}
            >
              Acessar Meu Menu
            </Styled.MenuDesktopAnchor>
          </Styled.MenuDesktopContainer>
        </Styled.MainContainer>
      </Styled.Container>
    </>
  );
};

export default Header;
