import React from "react";
import * as Styled from "./styles";
import burgerMenuStyles from "./burgerMenuStyles";
import { stack as Menu } from "react-burger-menu";
import { theme } from "../../theme/theme";
import { redirect } from "react-router-dom";

interface IHeaderProps {
  icon: string;
  title: string;
  mainColor: string;
  auxColor: string;
  textColor: string;
  fontStyle: string;
  fontStyleAux: string;
}

const HeaderCustom: React.FC<IHeaderProps> = ({
  icon,
  title,
  mainColor,
  auxColor,
  textColor,
  fontStyle,
  fontStyleAux,
}) => {
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

  let localBurgerStyle = {
    ...burgerMenuStyles,
  };

  localBurgerStyle.bmBurgerBars.background = auxColor;
  localBurgerStyle.bmMenu.background = mainColor;
  // localBurgerStyle.bmMorphShape.background = mainColor;
  // localBurgerStyle.bmCross.background = auxColor;

  return (
    <>
      <Styled.Container>
        <Styled.MainContainer style={{ backgroundColor: mainColor }}>
          <Styled.LogoContainer
            onClick={() => {
              redirect("/");
            }}
          >
            <Styled.LogoImg src={icon} alt="" />
          </Styled.LogoContainer>
          <Styled.MainSpanContainer>
            <Styled.NameSpan
              style={{ color: textColor, fontFamily: fontStyle }}
            >
              {title}
            </Styled.NameSpan>
          </Styled.MainSpanContainer>
          <Styled.MenuContainer>
            <Menu styles={burgerMenuStyles}>
              <Styled.MenuItem
                style={{ color: textColor }}
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
              <Styled.MenuItem
                style={{ color: textColor }}
                id="about"
                href="/sobre"
              >
                Sobre
              </Styled.MenuItem>
              <Styled.MenuItem
                style={{ color: textColor }}
                id="contact"
                href="/contato"
              >
                Contato
              </Styled.MenuItem>
              <Styled.MenuItem
                style={{ color: textColor }}
                id="plans"
                href="/planos"
              >
                Onde Estamos
              </Styled.MenuItem>
            </Menu>
          </Styled.MenuContainer>
          <Styled.MenuDesktopContainer>
            <Styled.MenuDesktopAnchor style={{ color: textColor }} href="/">
              Home
            </Styled.MenuDesktopAnchor>
            <Styled.MenuDesktopAnchor
              style={{ color: textColor }}
              href="/sobre"
            >
              Sobre
            </Styled.MenuDesktopAnchor>
            <Styled.MenuDesktopAnchor
              style={{ color: textColor }}
              href="/contato"
            >
              Contato
            </Styled.MenuDesktopAnchor>
            <Styled.MenuDesktopAnchor
              style={{ color: textColor }}
              href="/planos"
            >
              Onde Estamos
            </Styled.MenuDesktopAnchor>
          </Styled.MenuDesktopContainer>
        </Styled.MainContainer>
      </Styled.Container>
    </>
  );
};

export default HeaderCustom;
