import React, { useEffect, useState } from "react";
import Footer from "../../../components/footer";
import Header from "../../../components/header";
import * as Styled from "./styles";

import { theme } from "../../../theme/theme";

import ButtonSecondary from "../../../components/buttons/secondary";
import Modal from "../../../components/modal";
import Homecard from "../../../components/homeCard";
import { TCardProps } from "../../../components/plansCards/card";
import { drinkCategories, foodCategories, mainCategories } from "./categories";

const MenuMeuMenu: React.FC = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [mainCategory, setMainCategory] = useState<string>("");
  const [secondayCategory, setSecondayCategory] = useState<string>("");

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
        case "":
          mainCategoryDiv.style.display = "flex";
          foodDiv.style.display = "none";
          drinkDiv.style.display = "none";

          break;
        default:
          break;
      }
    }
  }, [mainCategory]);

  useEffect(() => {
    console.log(secondayCategory);
  }, [secondayCategory]);

  //Criar um array de arrays contendo 3 cards em cada posição do array de arrays

  const createRows = (category: TCardProps[]) => {
    let rowsConter = 0;
    const byTree = category.length / 3;
    const byTreeFinal = Math.trunc(byTree);
    const byTreeResto = category.length % 3;

    let cardsRows: Array<Array<TCardProps>> = [];

    if (!byTreeResto) {
      for (let index = 0; index < byTreeFinal; index++) {
        cardsRows.push([]);
      }
    }
    // O array possui o tamanho certo.
    //a cada 3 itens, o 4 não é renderizado.

    if (!byTreeResto) {
      category.forEach((foodItem: TCardProps, index) => {
        if (cardsRows[rowsConter].length < 3) {
          cardsRows[rowsConter].push(foodItem);
        } else if (rowsConter <= byTreeFinal) {
          //problema era que só adicionava +1 sem adicionar o item para o array, no caso pulava certos intens.

          cardsRows[rowsConter + 1].push(foodItem);
          rowsConter++;
        }
      });
    } else {
    }
    // percorre o array criado e adiciona cards a variavel;
    const cardRowsDone = cardsRows.map((row: TCardProps[]) => {
      return (
        <Styled.CardsContainer>
          {row.map((item: TCardProps) => {
            return (
              <div
                style={{
                  width: "50%",
                }}
                onClick={() => {
                  setSecondayCategory(item.title);
                }}
              >
                <Homecard {...item} />
              </div>
            );
          })}
        </Styled.CardsContainer>
      );
    });

    return cardRowsDone;
  };

  const foodRows = createRows(foodCategories);
  const drinkRows = createRows(drinkCategories);

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
        <Styled.BackBtnContainer>
          <ButtonSecondary
            action={() => {
              setMainCategory("");
            }}
            Label={"← Escolher categoria"}
            fontSize={theme.fontSize.md}
            color={theme.colors.white.normal}
            bgColor={theme.colors.red.normal}
          />
        </Styled.BackBtnContainer>
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
          {foodRows}
        </Styled.CategoryContainer>
        <Styled.CategoryContainer style={{ display: "none" }} id="drink">
          <Styled.ItemSpan>Selecione a categoria da Bebida: </Styled.ItemSpan>
          {drinkRows}
        </Styled.CategoryContainer>
      </Styled.MainContainer>
      <Footer />
    </>
  );
};

export default MenuMeuMenu;
