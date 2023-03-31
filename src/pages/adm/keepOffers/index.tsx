import React, { useEffect, useState } from "react";
import Footer from "../../../components/footer";
import Header from "../../../components/header";

import * as Styled from "./styles";
import Homecard from "../../../components/homeCard";
import { TCardProps } from "../../../components/plansCards/card";

import { mainAdmCategories, offerCategories } from "./categories";
import { useNavigate } from "react-router-dom";
import { renCategories } from "../../menu/foods";
import { ICategory } from "../../../components/category";

const OffersMenu: React.FC = () => {
  const navigate = useNavigate();

  const [mainCategory, setMainCategory] = useState<string>("");

  //////////////////////////////////////////////////////////////////////////////////////////////////

  const renIndex = renCategories.findIndex(
    (categoria) => categoria.label === "Todas" //usa o método findIndex para acessar o index de um objeto dentro de um array que possua um valor especifico
  );

  const getArraysExceptIndex = (list: ICategory[], index: number) => {
    return list.filter((_, i) => i !== index);
  };

  const parsedRenCategories = getArraysExceptIndex(renCategories, renIndex);

  //////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    // const mainDiv = document.getElementById("mainDiv");
    // const list = document.getElementById("list");

    // if (mainDiv && list) {
    //   if (mainCategory === "listagem") {
    //     mainDiv.style.display = "none";
    //     list.style.display = "flex";
    //   }
    // }

    const mainDiv = document.getElementById("mainDiv");
    const list = document.getElementById("list");
    const offerCate = document.getElementById("offerCate");

    if (mainDiv && list && offerCate) {
      switch (mainCategory) {
        case "listagem":
          mainDiv.style.display = "none";
          list.style.display = "flex";
          // offerCate.style.display = "flex";

          break;
        case "offerCategories":
          mainDiv.style.display = "none";
          list.style.display = "none";
          offerCate.style.display = "flex";
          break;

        default:
          break;
      }
    }
  }, [mainCategory]);

  //Divide em linhas de 3 itens cada
  const createRows = (category: TCardProps[], qtd: number) => {
    let rowsConter = 0;
    const byTree = category.length / qtd;
    const byTreeFinal = Math.trunc(byTree);
    const byTreeResto = category.length % qtd;

    let cardsRows: Array<Array<TCardProps>> = [];

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
                  if (item.url) {
                    navigate(item.url);
                  } else {
                    console.log("kkkkklistagem");

                    setMainCategory("listagem");
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
        <Styled.CategoryContainer id="mainDiv">
          <Styled.ItemSpan> Ofertas</Styled.ItemSpan>
          {optionsRows}
        </Styled.CategoryContainer>

        <Styled.CategoryContainer style={{ display: "none" }} id="list">
          <Styled.ItemSpan>Selecione a categoria da oferta:</Styled.ItemSpan>
          {offerRows}
        </Styled.CategoryContainer>
        <Styled.CategoryContainer style={{ display: "none" }} id="offerCate">
          <Styled.ItemSpan>Selecione a categoria da oferta: </Styled.ItemSpan>
          {offerRows}
        </Styled.CategoryContainer>
      </Styled.MainContainer>
      <Footer />
    </>
  );
};

export default OffersMenu;
