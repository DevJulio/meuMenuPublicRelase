import React, { useEffect, useState } from "react";
import Footer from "../../../components/footer";
import Header from "../../../components/header";

import * as Styled from "./styles";
import Homecard from "../../../components/homeCard";
import { TCardProps } from "../../../components/plansCards/card";

import { mainAdmCategories, offerCategories } from "./categories";
import { useNavigate } from "react-router-dom";
import ButtonSecondary from "../../../components/buttons/secondary";
import { theme } from "../../../theme/theme";

const OffersMenu: React.FC = () => {
  const navigate = useNavigate();

  const [mainCategory, setMainCategory] = useState<string>("");
  const [backOfferMenu, setBackOfferMenu] = useState<boolean>(false);

  useEffect(() => {
    const mainDiv = document.getElementById("mainDiv");
    const offerType = document.getElementById("offerType");
    const myOffers = document.getElementById("myOffers");
    if (mainDiv && myOffers && offerType) {
      switch (mainCategory) {
        case "Criar nova Oferta":
          setBackOfferMenu(true);
          offerType.style.display = "flex";
          myOffers.style.display = "none";
          mainDiv.style.display = "none";
          break;
        case "Minhas Ofertas":
          setBackOfferMenu(true);
          myOffers.style.display = "flex";
          offerType.style.display = "none";
          mainDiv.style.display = "none";
          navigate("/adm/ofertas/minhas-ofertas")
          break;
        case "menu":
          mainDiv.style.display = "flex";
          myOffers.style.display = "none";
          offerType.style.display = "none";
          break;
        default:
          break;
      }
    }
  }, [mainCategory]);

  const createRows = (category: TCardProps[], qtd: number) => {
    let rowsConter = 0;
    const byTree = category.length / qtd;
    const byTreeFinal = Math.trunc(byTree);
    const byTreeResto = category.length % qtd;

    let cardsRows: Array<Array<TCardProps>> = [];

    //Evitar que quebre o layout, precisa ter a quantidade correta de itens.
    if (!byTreeResto) {
      for (let index = 0; index < byTreeFinal; index++) {
        cardsRows.push([]);
      }
    }
    // O array possui o tamanho certo.
    //a cada qtd itens, o 4 não é renderizado.

    if (!byTreeResto) {
      category.forEach((foodItem: TCardProps, index) => {
        if (cardsRows[rowsConter].length < qtd) {
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
                  localStorage.setItem("meuMenuComboCounter", "0");
                  if (item.url) {
                    navigate(item.url);
                  } else {
                    setMainCategory(item.title);
                  }
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

  const optionsRows = createRows(mainAdmCategories, 2);
  const offerRows = createRows(offerCategories, 3);

  return (
    <>
      <Header />
      <Styled.MainContainer>
        <Styled.TitleSpan>Ofertas</Styled.TitleSpan>
        <Styled.CategoryContainer id="mainDiv">
          <Styled.ItemSpan>Menu de Ofertas</Styled.ItemSpan>
          {optionsRows}
        </Styled.CategoryContainer>
        {!backOfferMenu && (
          <>
            <Styled.BackBtnContainer>
              <ButtonSecondary
                action={() => {
                  setBackOfferMenu(false);
                  navigate("/home");
                }}
                Label={"← voltar ao menu principal"}
                fontSize={theme.fontSize.md}
                color={theme.colors.white.normal}
                bgColor={theme.colors.red.normal}
              />
            </Styled.BackBtnContainer>
          </>
        )}
        <Styled.CategoryContainer style={{ display: "none" }} id="myOffers">
          {/* Listagem das ofertas */}
        </Styled.CategoryContainer>
        <Styled.CategoryContainer style={{ display: "none" }} id="offerType">
          <Styled.ItemSpan>Qual é o tipo da oferta?</Styled.ItemSpan>
          {offerRows}
          {/* Para a automação: selecionar a oferta, depois definir para quais dias da semana, quais horários */}
        </Styled.CategoryContainer>
        {backOfferMenu && (
          <>
            <Styled.BackBtnContainer>
              <ButtonSecondary
                action={() => {
                  setBackOfferMenu(false);
                  setMainCategory("menu");
                }}
                Label={"← voltar ao menu de ofertas"}
                fontSize={theme.fontSize.md}
                color={theme.colors.white.normal}
                bgColor={theme.colors.red.normal}
              />
            </Styled.BackBtnContainer>
          </>
        )}
      </Styled.MainContainer>
      <Footer />
    </>
  );
};

export default OffersMenu;
