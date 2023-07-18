import React from "react";
import * as Styled from "./styles";
import burgerMenuStyles from "./burgerMenuStyles";
import { stack as Menu } from "react-burger-menu";
import logo from "../../assets/logo/logo.png";
import { theme } from "../../theme/theme";
import { redirect } from "react-router-dom";

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
          <Styled.LogoContainer
            onClick={() => {
              redirect("/");
            }}
          >
            <Styled.LogoImg src={logo} alt="" />
          </Styled.LogoContainer>
          <Styled.MainSpanContainer>
            <Styled.NameSpan>Meu</Styled.NameSpan>
            <Styled.NameSpanAux>Menu</Styled.NameSpanAux>
          </Styled.MainSpanContainer>
          <Styled.MenuContainer>
            <Menu styles={burgerMenuStyles}>
              <Styled.MenuItem
                id="home"
                onClick={() => {
                  return () => {
                    redirect("/");
                  };
                }}
                href="/"
              >
                Home
              </Styled.MenuItem>
              <Styled.MenuItem id="about" href="/sobre">
                Sobre
              </Styled.MenuItem>
              <Styled.MenuItem id="contact" href="/contato">
                Contato
              </Styled.MenuItem>
              <Styled.MenuItem id="plans" href="/planos">
                Preços e planos
              </Styled.MenuItem>
              <Styled.MenuItem
                id="login"
                style={{ color: theme.colors.red.normal }}
                href="/login"
              >
                Acessar Meu Menu
              </Styled.MenuItem>
            </Menu>
          </Styled.MenuContainer>
          <Styled.MenuDesktopContainer>
            <Styled.MenuDesktopAnchor href="/">Home</Styled.MenuDesktopAnchor>
            <Styled.MenuDesktopAnchor href="/sobre">
              Sobre
            </Styled.MenuDesktopAnchor>
            <Styled.MenuDesktopAnchor href="/contato">
              Contato
            </Styled.MenuDesktopAnchor>
            <Styled.MenuDesktopAnchor href="/planos">
              Preços e planos
            </Styled.MenuDesktopAnchor>
            <Styled.MenuDesktopAnchor
              href="/login"
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
