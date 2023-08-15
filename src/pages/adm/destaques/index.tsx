import React, { useEffect, useState } from "react";
import Footer from "../../../components/footer";
import Header from "../../../components/header";

import * as Styled from "./styles";

import { useNavigate } from "react-router-dom";
import ButtonSecondary from "../../../components/buttons/secondary";
import { theme } from "../../../theme/theme";
import foods, { renCategories } from "../../menu/foods";
import { ICategory } from "../../../components/category";
import FoodCard from "../../../components/foodCard";
import { TProducts } from "../../menu";
import Modal from "../../../components/modal";

const Destaques: React.FC = () => {
  const [foodCategory, setFoodCategory] = useState<string>("");
  const [mainCategory, setMainCategory] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);
  const [modalIten, setmodalIten] = useState<TProducts>();
  const [plus, setPlus] = useState<boolean>(false);

  useEffect(() => {
    const mainContainer = document.getElementById("mainContainer");
    const foodListContainer = document.getElementById("foodListContainer");

    if (mainContainer && foodListContainer) {
      switch (mainCategory) {
        case "listagemPratos":
          mainContainer.style.display = "none";
          foodListContainer.style.display = "flex";
          break;
        case "listagemCategorias":
          mainContainer.style.display = "flex";
          foodListContainer.style.display = "none";
          break;

        default:
          break;
      }
    }
  }, [mainCategory]);

  const navigate = useNavigate();

  const handleClose = () => {
    setModal(false);
  };
  const renIndex = renCategories.findIndex(
    (categoria) => categoria.label === "Todas" //usa o método findIndex para acessar o index de um objeto dentro de um array que possua um valor especifico
  );

  const getArraysExceptIndex = (list: ICategory[], index: number) => {
    return list.filter((_, i) => i !== index);
  };

  const parsedRenCategories = getArraysExceptIndex(renCategories, renIndex);

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
          {/* Novo preço e botão de confirmar cadastro de promoção */}
          {/* redirecionar para outro modal */}
        </Modal>
      )}
      {/* outro modal com: label: "oque deseja fazer agora?" botões de: novo cadastro nessa categoria, escolher outra categoria, voltar ao menu */}

      <Styled.MainContainer>
        <Styled.TitleSpan>Ofertas</Styled.TitleSpan>
        <Styled.MenuContainer id="mainContainer">
          <Styled.ItemSpan style={{ color: "white" }}>
            Selecione a categoria do prato:
          </Styled.ItemSpan>
          <Styled.CateRow>
            {parsedRenCategories.map((cateItem, index) => (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a
                onClick={() => {
                  localStorage.setItem("meuMenuOfferCategory", cateItem.label);
                  setFoodCategory(cateItem.label);
                  setMainCategory("listagemPratos");
                }}
              >
                <Styled.CateItem>
                  <Styled.CateIcon src={cateItem.icon} />
                  <span>{cateItem.label}</span>
                </Styled.CateItem>
              </a>
            ))}
          </Styled.CateRow>
          <Styled.BackBtnContainer
            style={{
              marginTop: "5vw",
              marginBottom: "4vh",
            }}
          >
            <ButtonSecondary
              action={() => {
                navigate("/home");
              }}
              Label={"← voltar ao menu"}
              fontSize={theme.fontSize.md}
              color={theme.colors.white.normal}
              bgColor={theme.colors.red.normal}
            />
          </Styled.BackBtnContainer>
        </Styled.MenuContainer>
        <Styled.MenuContainer
          style={{ display: "none" }}
          id="foodListContainer"
        >
          <Styled.ItemSpan style={{ color: "white" }}>
            Selecione o prato:
          </Styled.ItemSpan>

          <Styled.CategoryContainerAux style={{ width: "85%" }}>
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
                {foodCategory &&
                  foods
                    .filter((cate) =>
                      plus
                        ? cate.category === foodCategory
                        : cate.category === foodCategory &&
                          cate.isDestaque === true
                    )
                    .map((foodItem) => (
                      <Styled.FoodCategoryItem>
                        <>
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
                          <Styled.DeleteContainer
                            onClick={() => {
                              if (plus) {
                                //Tornar destaque
                                setPlus(false);
                              } else {
                                //"Remover Destaque"
                              }
                            }}
                          >
                            <Styled.DeleteSpan
                              style={{ color: theme.colors.yellow.palete }}
                            >
                              {plus ? "Tornar Destaque" : "Remover Destaque"}
                            </Styled.DeleteSpan>
                          </Styled.DeleteContainer>
                        </>
                      </Styled.FoodCategoryItem>
                    ))}
                <Styled.FoodCategoryItem
                  style={{
                    alignSelf: "center",
                    marginTop: "-8vh",
                    // margin-top: -8vh;
                  }}
                  onClick={() => {
                    setPlus(true);
                    setMainCategory("listagemCategorias");
                  }}
                >
                  <Styled.PlusContainer>
                    <Styled.PlusSpan
                      style={{ marginTop: "1vh", marginBottom: "0vh" }}
                    >
                      +
                    </Styled.PlusSpan>
                  </Styled.PlusContainer>
                </Styled.FoodCategoryItem>
              </Styled.ContainerCategories>
            </div>
          </Styled.CategoryContainerAux>
          <Styled.BackBtnContainer>
            <ButtonSecondary
              action={() => {
                setMainCategory("listagemCategorias");
              }}
              Label={"← voltar as categorias"}
              fontSize={theme.fontSize.md}
              color={theme.colors.white.normal}
              bgColor={theme.colors.red.normal}
            />
          </Styled.BackBtnContainer>
        </Styled.MenuContainer>
      </Styled.MainContainer>
      <Footer />
    </>
  );
};

export default Destaques;
