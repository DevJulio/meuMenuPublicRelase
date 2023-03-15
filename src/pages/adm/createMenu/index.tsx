import React, { useEffect, useState } from "react";
import Footer from "../../../components/footer";
import Header from "../../../components/header";
import Input from "../../../components/input";
import * as Styled from "./styles";

import { theme } from "../../../theme/theme";
import isMobile from "is-mobile";

import ButtonSecondary from "../../../components/buttons/secondary";
import Modal from "../../../components/modal";
import Homecard from "../../../components/homeCard";

import food from "../../../assets/icons/food.png";
import drink from "../../../assets/icons/drink.png";

const MenuMeuMenu: React.FC = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [mainCategory, setMainCategory] = useState<string>("");

  const handleClose = () => {
    setModal(false);
  };

  useEffect(() => {
    const mainCategoryDiv = document.getElementById("mainCategory");
    const foodDiv = document.getElementById("food");
    const drinkDiv = document.getElementById("drink");

    if (drinkDiv && mainCategoryDiv && foodDiv) {
      switch (mainCategory) {
        case "comer":
          mainCategoryDiv.style.display = "none";
          drinkDiv.style.display = "none";
          foodDiv.style.display = "flex";
          break;
        case "beber":
          mainCategoryDiv.style.display = "none";
          foodDiv.style.display = "none";
          drinkDiv.style.display = "flex";

          break;

        default:
          break;
      }
    }
  }, [mainCategory]);

  const mainCategories = [
    {
      icon: food,
      title: "Para comer",
      text: "O Melhor da sua cozinha",
      mainColor: theme.colors.red.normal,
      auxColor: "white",
      textColor: "white",
      customWidth: true,
    },
    {
      icon: drink,
      title: "para beber",
      text: "O melhor da sua adega",
      mainColor: theme.colors.yellow.palete,
      auxColor: "",
      textColor: "black",
      customWidth: true,
    },
  ];

  return (
    <>
      <Header />
      <Styled.MainContainer>
        {modal && (
          <Modal
            bannerColor={theme.colors.green.normal}
            title={"Sucesso!"}
            handleClose={handleClose}
            titleFont={theme.fonts.primary}
          >
            <>
              <Styled.PlansDetailModal>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  O seu cadastro foi realizado, em breve a equipe do Meu Menu
                  entrará em contato para finalizar o processo de adesão e para
                  começar o cadastro do seu cardápio!
                  <p>
                    Use as credenciais de login e senha para acessar o Meu Menu
                    e acompanhar o andamento do cardápio.
                  </p>
                  <p>
                    Entraremos em contato apresentando uma prévia do seu novo
                    cardápio em breve!
                  </p>
                  <p
                    style={{
                      textAlignLast: "center",
                    }}
                  >
                    Caso tenha dúvidas, entre em contato com o Meu Menu!
                  </p>
                </div>
              </Styled.PlansDetailModal>
              <Styled.BtnContainer
                style={{
                  marginTop: "0px",
                  justifyContent: "center",
                  marginBottom: "2vh",
                }}
              >
                <ButtonSecondary
                  //TODO: COLOCAR NUMERO DO ZAP
                  action={() => {}}
                  Label={"Entrar em contato com o Meu Menu!"}
                  fontSize={theme.fontSize.md}
                  color={theme.colors.white.normal}
                  bgColor={theme.colors.green.normal}
                />
              </Styled.BtnContainer>
            </>
          </Modal>
        )}

        <Styled.TitleSpan>Cadastro de cardápio.</Styled.TitleSpan>
        <Styled.CategoryContainer id="mainCategory">
          <Styled.ItemSpan>Categoria: </Styled.ItemSpan>
          <Styled.CardsContainer>
            <div
              style={{
                width: "50%",
              }}
              onClick={() => {
                setMainCategory("comer");
              }}
            >
              <Homecard {...mainCategories[0]} />
            </div>
            <div
              style={{
                width: "50%",
                marginRight: "1vw",
              }}
              onClick={() => {
                setMainCategory("beber");
              }}
            >
              <Homecard {...mainCategories[1]} />
            </div>
          </Styled.CardsContainer>
        </Styled.CategoryContainer>
        <Styled.CategoryContainer style={{ display: "none" }} id="food">
          <Styled.ItemSpan>Selecione a categoria da comida: </Styled.ItemSpan>
          <Styled.CardsContainer>
            <div
              style={{
                width: "50%",
              }}
              onClick={() => {
                setMainCategory("comer");
              }}
            >
              <Homecard {...mainCategories[0]} />
            </div>
            <div
              style={{
                width: "50%",
                marginRight: "1vw",
              }}
              onClick={() => {
                setMainCategory("beber");
              }}
            >
              <Homecard {...mainCategories[1]} />
            </div>
          </Styled.CardsContainer>
        </Styled.CategoryContainer>
        <Styled.CategoryContainer style={{ display: "none" }} id="drink">
          <Styled.ItemSpan>Selecione a categoria da Bebida: </Styled.ItemSpan>
          <Styled.CardsContainer>
            <div
              style={{
                width: "50%",
              }}
              onClick={() => {
                setMainCategory("comer");
              }}
            >
              <Homecard {...mainCategories[0]} />
            </div>
            <div
              style={{
                width: "50%",
                marginRight: "1vw",
              }}
              onClick={() => {
                setMainCategory("beber");
              }}
            >
              <Homecard {...mainCategories[1]} />
            </div>
          </Styled.CardsContainer>
        </Styled.CategoryContainer>
      </Styled.MainContainer>
      <Footer />
    </>
  );
};

export default MenuMeuMenu;
