import React from "react";
import Footer from "../../../../components/footer";
import Header from "../../../../components/header";

import * as Styled from "./styles";
import Homecard from "../../../../components/homeCard";
import { TCardProps } from "../../../../components/plansCards/card";

import { mainAdmCategories } from "./categories";
import { useNavigate } from "react-router-dom";

const RestaurantHome: React.FC = () => {
  const navigate = useNavigate();

  //Divide em linhas de 3 itens cada
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
                  item.url && navigate(item.url);
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

  const optionsRows = createRows(mainAdmCategories);
  const title = "Ren";
  return (
    <>
      <Header />
      <Styled.MainContainer>
        <Styled.CategoryContainer>
          <Styled.ItemSpan> Bem vindo, {title}.</Styled.ItemSpan>
          {optionsRows}
        </Styled.CategoryContainer>
      </Styled.MainContainer>
      <Footer />
    </>
  );
};

export default RestaurantHome;
