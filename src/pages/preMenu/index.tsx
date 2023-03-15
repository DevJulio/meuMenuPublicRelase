import React from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import * as Styled from "./styles";

const PreMenu: React.FC = () => {
  return (
    <>
      <Header />
      <Styled.MainContainer>
        <Styled.TitleSpan>Conheça cardápios diferentes!</Styled.TitleSpan>
        <Styled.Menus>
          <Styled.MenusRow>
            <Styled.MenusItem>{/* theme.fonts.hand */}</Styled.MenusItem>
            <Styled.MenusItem></Styled.MenusItem>
          </Styled.MenusRow>
        </Styled.Menus>
      </Styled.MainContainer>
      <Footer />
    </>
  );
};

export default PreMenu;
