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
import FoodCard from "../../../components/foodCard";
import Modal from "../../../components/modal";
import FoodModalDetail from "../../../components/foodModalDetail";
import { TProducts } from "../../menu";
import { TCategory } from "../../../components/category";
import { message } from "antd";
import isMobile from "is-mobile";
import { isAuth } from "../../../utils/security/isCrypto";
import { CategoryService } from "../../../service/module/categories";
import { FoodsService } from "../../../service/module/foods";

export type TSwitch = {
  id: string;
  checked: boolean;
  label: string;
};

const AdmMenu: React.FC = () => {
  const [mainCategory, setMainCategory] = useState<string>("");
  const [foodCategory, setFoodCategory] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);
  const [modalIten, setmodalIten] = useState<TProducts>();
  const [switchStates, setSwitchStates] = useState<TSwitch[]>([]);
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [foods, setFoods] = useState<TProducts[]>([]);

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

  useEffect(() => {
    const usr = isAuth();
    if (usr && usr.userType === "admin") {
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
      const fetchData = async () => {
        try {
          const categoryAndFood: any = await Promise.all([
            await CategoryService.getMyCategories(usr.codCompany!),
            await FoodsService.getMyFoods(usr.codCompany!),
          ])
            .then((results) => {
              return results;
            })
            .catch((error) => {
              console.error(error);
            });
          if (categoryAndFood[0].length) {
            setCategories(categoryAndFood[0] as TCategory[]);
          }
          if (categoryAndFood[1].length) {
            setFoods(categoryAndFood[1] as TProducts[]);
          }
        } catch (error) {
          console.log(error);
          message.error("Erro ao recuperar categorias, verifique o log");
        }
      };
      fetchData();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setSwitchStates(switches);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foodCategory]);

  const handleSwitchChange = async (id: string) => {
    const changedItem = foods.filter((cate) => cate.category === foodCategory);
    if (switchStates[Number(id)].checked) {
      try {
        const res = await FoodsService.updateFoods(isAuth()!.codCompany!, {
          ...changedItem[Number(id)],
          isEnable: false,
          col: "company",
          subcol: "menu",
        });
        if (res.status) {
          message.error("Item desativado.");
        } else {
          message.error("Verifique os campos e tente novamente");
        }
      } catch (error) {
        console.log(error);
        message.error("Verifique os campos e tente novamente");
      }
    } else {
      try {
        console.log(changedItem[Number(id)]);

        const res = await FoodsService.updateFoods(isAuth()!.codCompany!, {
          ...changedItem[Number(id)],
          isEnable: true,
          col: "company",
          subcol: "menu",
        });
        if (res.status) {
          message.success("Item ativado.");
        } else {
          message.error("Verifique os campos e tente novamente");
        }
      } catch (error) {
        console.log(error);
        message.error("Verifique os campos e tente novamente");
      }
    }
    //genial
    setSwitchStates((prevSwitchStates) =>
      prevSwitchStates.map((switchState) =>
        switchState.id === id
          ? { ...switchState, checked: !switchState.checked }
          : switchState
      )
    );
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
          customWidth={isMobile() ? 90 : 60}
          title={modalIten.label}
          handleClose={handleClose}
          titleFont={theme.fonts.primary}
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
                width: isMobile() ? "80%" : "50%",
              }}
              onClick={() => {
                mainCategories[0].url && navigate(mainCategories[0].url);
              }}
            >
              <Homecard {...mainCategories[0]} />
            </div>
            <div
              style={{
                width: isMobile() ? "80%" : "50%",
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
            {categories.map((cateItem, index) => (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a
                onClick={() => {
                  setMainCategory("listagemCategorias");
                  setFoodCategory(cateItem.title); //Filter por esse valor.
                }}
              >
                <Styled.CateItem>
                  <Styled.CateIcon
                    src={cateItem.icon}
                    style={{
                      filter: `brightness(1000%) grayscale(100%) 
                        opacity(0.1)
                        drop-shadow(0 0 0 white) 
                        drop-shadow(0 0 0 white)
                        drop-shadow(0 0 0 white)
                        drop-shadow(0 0 0 white)
                        drop-shadow(0 0 0 white)`,
                    }}
                  />
                  <span>{cateItem.title}</span>
                </Styled.CateItem>
              </a>
            ))}
          </Styled.CateRow>
          <Styled.BackBtnContainer style={{ marginTop: "3vh" }}>
            <ButtonSecondary
              action={() => {
                navigate("/adm/home");
              }}
              Label={"← voltar ao menu principal"}
              fontSize={theme.fontSize.md}
              color={theme.colors.white.normal}
              bgColor={theme.colors.red.normal}
            />
          </Styled.BackBtnContainer>
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
                    <Styled.FoodCategoryItem>
                      <div
                        onClick={() => {
                          setModal(true);
                          setmodalIten(foodItem);
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
                      </div>
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
                                "@meumenu/foodDetail",
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
