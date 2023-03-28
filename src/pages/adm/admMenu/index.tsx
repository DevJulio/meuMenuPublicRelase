import React, { useEffect, useState } from "react";
import Footer from "../../../components/footer";
import Header from "../../../components/header";
import * as Styled from "./styles";

import { theme } from "../../../theme/theme";

import ButtonSecondary from "../../../components/buttons/secondary";
import Homecard from "../../../components/homeCard";
import { TCardProps } from "../../../components/plansCards/card";
import { useNavigate } from "react-router-dom";
import atualizar from "../../../assets/icons/admIcons/atualizar.png";
import create from "../../../assets/icons/admIcons/create.png";
import foods, { renCategories } from "../../menu/foods";
import FoodCard from "../../../components/foodCard";
import Modal from "../../../components/modal";
import FoodModalDetail from "../../../components/foodModalDetail";
import { TProducts } from "../../menu";

const AdmMenu: React.FC = () => {
  const [mainCategory, setMainCategory] = useState<string>("");
  const [foodCategory, setFoodCategory] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);
  const [modalIten, setmodalIten] = useState<TProducts>();

  const mainCategories: TCardProps[] = [
    {
      icon: create,
      title: "Cadastrar",
      text: "Criar novos pratos, drinks e rótulos.",
      mainColor: theme.colors.white.normal,
      auxColor: theme.colors.blue.palete,
      textColor: theme.colors.blue.palete,
      customWidth: true,
      url: "/cadastro-cardapio",
    },
    {
      icon: atualizar,
      title: "Listar & atualizar",
      text: "Atualize nome, preço, fotos e disponibilidade",
      mainColor: theme.colors.blue.palete,
      auxColor: "white",
      textColor: "white",
      customWidth: true,
    },
  ];

  useEffect(() => {
    const mainCategoryDiv = document.getElementById("mainCategory");
    const list = document.getElementById("list");
    const listFoods = document.getElementById("listFoods");

    if (mainCategoryDiv && list && listFoods) {
      switch (mainCategory) {
        case "listagem":
          mainCategoryDiv.style.display = "none";
          listFoods.style.display = "none";
          list.style.display = "flex";

          break;
        case "listagemCategorias":
          mainCategoryDiv.style.display = "none";
          list.style.display = "none";
          listFoods.style.display = "flex";
          break;

        default:
          break;
      }
    }
  }, [mainCategory]);

  useEffect(() => {
    foods
      .filter((food) => food.category === foodCategory)
      .map((foodItem) => console.log(foodItem));
  }, [foodCategory]);

  const navigate = useNavigate();

  const handleClose = () => {
    setModal(false);
  };
  return (
    <>
      <Header />
      {modal && modalIten && (
        <Modal
          bannerColor={"#BC4749"} //AuxColor
          title={modalIten.label}
          handleClose={handleClose}
          titleFont={theme.fonts.hand}
        >
          <FoodModalDetail modalIten={modalIten} />
        </Modal>
      )}
      <Styled.MainContainer>
        <Styled.TitleSpan>Cardápio.</Styled.TitleSpan>

        <Styled.CategoryContainer id="mainCategory">
          <Styled.ItemSpan>O que faremos? </Styled.ItemSpan>
          <Styled.CardsContainer>
            <div
              style={{
                width: "50%",
              }}
              onClick={() => {
                mainCategories[0].url && navigate(mainCategories[0].url);
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
                setMainCategory("listagem");
              }}
            >
              <Homecard {...mainCategories[1]} />
            </div>
          </Styled.CardsContainer>
        </Styled.CategoryContainer>

        {foodCategory && (
          <>
            <Styled.BackBtnContainer>
              <ButtonSecondary
                action={() => {
                  setMainCategory("listagem");
                  setFoodCategory("");
                }}
                Label={"← Escolher categoria"}
                fontSize={theme.fontSize.md}
                color={theme.colors.white.normal}
                bgColor={theme.colors.red.normal}
              />
            </Styled.BackBtnContainer>
          </>
        )}
        <Styled.CategoryContainerAux style={{ display: "none" }} id="list">
          <Styled.ItemSpan style={{ color: "white" }}>
            Selecione a categoria do prato:
          </Styled.ItemSpan>
          <Styled.CateRow>
            {renCategories.map((cateItem, index) => (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a
                onClick={() => {
                  setMainCategory("listagemCategorias");
                  setFoodCategory(cateItem.label); //Filter por esse valor.
                }}
              >
                <Styled.CateItem>
                  <Styled.CateIcon src={cateItem.icon} />
                  <span>{cateItem.label}</span>
                </Styled.CateItem>
              </a>
            ))}
          </Styled.CateRow>
        </Styled.CategoryContainerAux>

        <Styled.CategoryContainerAux
          style={{ display: "none", width: "85%" }}
          id="listFoods"
        >
          {/* {foods &&
            foodCategory &&
            foods
              .filter((food) => food.category === foodCategory)
              .map((foodItem) => <>{foodItem.label}</>)} */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Styled.ContainerCategories
              style={{
                height: "fit-content",
                overflowX:
                  foods.filter((cate) => cate.category === foodCategory)
                    .length > 5
                    ? "scroll"
                    : "auto",
              }}
            >
              {foodCategory === "Todas"
                ? foods
                    .filter((cate) => cate.isMainDestaque)
                    .map((foodItem) => (
                      <Styled.FoodCategoryItem
                        onClick={() => {
                          // setModal(true);
                          // setmodalIten(foodItem);
                        }}
                      >
                        <FoodCard
                          category=""
                          categoryIcon=""
                          bgColor={"#BC4749"}
                          price={foodItem.price}
                          color={"#386641"}
                          label={foodItem.label}
                          description={foodItem.description}
                          img={foodItem.img}
                        />
                      </Styled.FoodCategoryItem>
                    ))
                : foods
                    .filter((cate) => cate.category === foodCategory)
                    .map((foodItem) => (
                      <Styled.FoodCategoryItem
                        onClick={() => {
                          // setModal(true);
                          // setmodalIten(foodItem);
                        }}
                      >
                        <FoodCard
                          category=""
                          categoryIcon=""
                          bgColor={"#BC4749"}
                          price={foodItem.price}
                          color={"#386641"}
                          label={foodItem.label}
                          description={foodItem.description}
                          img={foodItem.img}
                        />
                      </Styled.FoodCategoryItem>
                    ))}
            </Styled.ContainerCategories>
          </div>
        </Styled.CategoryContainerAux>
      </Styled.MainContainer>
      <Footer />
    </>
  );
};

export default AdmMenu;
