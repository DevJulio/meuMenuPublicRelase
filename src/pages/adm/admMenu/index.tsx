import React, { useEffect, useState } from "react";
import Footer from "../../../components/footer";
import Header from "../../../components/header";
import * as Styled from "./styles";
import Switch from "react-switch";

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
import { ICategory } from "../../../components/category";

type TSwitch = {
  id: string;
  checked: boolean;
  label: string;
};

const AdmMenu: React.FC = () => {
  const [mainCategory, setMainCategory] = useState<string>("");
  const [foodCategory, setFoodCategory] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);
  const [switchStates, setSwitchStates] = useState<TSwitch[]>([]);
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

  const navigate = useNavigate();

  const renIndex = renCategories.findIndex(
    (categoria) => categoria.label === "Todas" //usa o método findIndex para acessar o index de um objeto dentro de um array que possua um valor especifico
  );

  const getArraysExceptIndex = (list: ICategory[], index: number) => {
    return list.filter((_, i) => i !== index);
  };

  const parsedRenCategories = getArraysExceptIndex(renCategories, renIndex);

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
    const switches: TSwitch[] = [];
    foods
      .filter((food) => food.category === foodCategory)
      .map((foodItem, index) =>
        switches.push({
          id: index.toString(),
          checked: foodItem.isEnable,
          label: foodItem.label,
        })
      );
    // console.log(switches);
    setSwitchStates(switches);
  }, [foodCategory]);

  // useEffect(() => {
  //   console.log(switchStates);
  // }, [switchStates]);

  const handleSwitchChange = async (id: string) => {
    const currentFoodItem = foods.filter(
      (cate) => cate.category === foodCategory
    );

    console.log(currentFoodItem[Number(id)]);

    setSwitchStates((prevSwitchStates) =>
      prevSwitchStates.map((switchState) =>
        switchState.id === id
          ? { ...switchState, checked: !switchState.checked }
          : switchState
      )
    );
    //Chamar Api.
    //Alterar o elemento currentFoodItem[Number(id)] no banco de dados.
  };

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
            {parsedRenCategories.map((cateItem, index) => (
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
              {switchStates.length &&
                foodCategory &&
                foods
                  .filter((cate) => cate.category === foodCategory)
                  .map((foodItem, index) => (
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
                      <Styled.SwitchContainerRow>
                        <Styled.SwitchContainer>
                          <Styled.SwitchSpan
                            style={{ color: theme.colors.yellow.palete }}
                          >
                            Disponibilidade:
                          </Styled.SwitchSpan>
                          <Switch
                            id={index.toString()}
                            height={35}
                            width={90}
                            offColor={theme.colors.red.normal}
                            onColor={theme.colors.green.normal}
                            onChange={() => {
                              handleSwitchChange(index.toString());
                            }}
                            checked={switchStates[index].checked}
                          />
                          {switchStates[index].checked ? (
                            <Styled.SwitchSpan>Ativo</Styled.SwitchSpan>
                          ) : (
                            <Styled.SwitchSpan>Desativado </Styled.SwitchSpan>
                          )}
                        </Styled.SwitchContainer>
                        <Styled.SwitchBtnContainer>
                          <Styled.SwitchSpan
                            style={{
                              color: theme.colors.red.normal,
                              fontSize: theme.fontSize.md2,
                            }}
                            onClick={() => {
                              const currentFoodItem = foods.filter(
                                (cate) => cate.category === foodCategory
                              );
                              localStorage.setItem(
                                "meuMenuFoodDetail",
                                JSON.stringify(currentFoodItem[Number(index)])
                              );
                              navigate("/adm/update/cardapio");
                            }}
                          >
                            Editar
                          </Styled.SwitchSpan>
                        </Styled.SwitchBtnContainer>
                      </Styled.SwitchContainerRow>
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
