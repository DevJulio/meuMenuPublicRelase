import React, { useEffect, useState } from "react";
import Footer from "../../../components/footer";
import Header from "../../../components/header";
import all from "../../../assets/icons/categories/ios/all.png";

import * as Styled from "./styles";

import { useNavigate } from "react-router-dom";
import ButtonSecondary from "../../../components/buttons/secondary";
import { theme } from "../../../theme/theme";
import { TCategory } from "../../../components/category";
import FoodCard from "../../../components/foodCard";
import { TProducts } from "../../menu";
import { isAuth } from "../../../utils/security/isCrypto";
import { CategoryService } from "../../../service/module/categories";
import { FoodsService } from "../../../service/module/foods";
import { message } from "antd";

const Destaques: React.FC = () => {
  const [foodCategory, setFoodCategory] = useState<string>("");
  const [mainCategory, setMainCategory] = useState<string>("");
  const [plus, setPlus] = useState<boolean>(false);

  const [categories, setCategories] = useState<TCategory[]>([]);
  const [foods, setFoods] = useState<TProducts[]>([]);

  useEffect(() => {
    const usr = isAuth();
    if (usr && usr.userType === "admin") {
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
            const allCategories = {
              icon: all,
              title: "Todas",
              color: "white",
              bgColor: "",
              auxColor: "",
              fontStyle: theme.fonts.primary,
            };
            const aux = categoryAndFood[0] as TCategory[];
            aux.push(allCategories);
            setCategories(aux);
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

  const navigate = useNavigate();

  const makeDestake = async (destaque: boolean, food: TProducts) => {
    try {
      const res = await FoodsService.updateFoods(isAuth()!.codCompany!, {
        ...food,
        isDestaque: destaque,
        col: "company",
        subcol: "menu",
      });
      if (res.status) {
        if (destaque) {
          message.success("Destaque adicionado");
          return;
        }
        message.success("Destaque removido");
      } else {
        message.error("Verifique os campos e tente novamente");
      }
    } catch (error) {
      console.log(error);
      message.error("Verifique os campos e tente novamente");
    }
  };

  return (
    <>
      <Header />
      <Styled.MainContainer>
        <Styled.TitleSpan>Destaques</Styled.TitleSpan>
        <Styled.MenuContainer id="mainContainer">
          <Styled.ItemSpan style={{ color: "white" }}>
            Selecione a categoria do prato:
          </Styled.ItemSpan>
          <Styled.CateRow>
            {categories.map((cateItem, index) => (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a
                onClick={() => {
                  console.log(cateItem);
                  if (cateItem.title === "Todas") {
                    navigate("/adm/destaques/all");
                  } else {
                    setFoodCategory(cateItem.title);
                    setMainCategory("listagemPratos");
                  }
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
          <Styled.BackBtnContainer
            style={{
              marginTop: "5vw",
              marginBottom: "4vh",
            }}
          >
            <ButtonSecondary
              action={() => {
                navigate("/adm/home");
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
                                makeDestake(true, foodItem).then(() => {
                                  setPlus(false);
                                  setTimeout(() => {
                                    window.location.reload();
                                  }, 1500);
                                });
                              } else {
                                makeDestake(false, foodItem).then(() => {
                                  setPlus(true);
                                  setTimeout(() => {
                                    window.location.reload();
                                  }, 1500);
                                });
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
                {!plus && (
                  <Styled.FoodCategoryItem
                    style={{
                      alignSelf: "center",
                      marginTop: foods.filter(
                        (cate) =>
                          cate.category === foodCategory &&
                          cate.isDestaque === true
                      ).length
                        ? "-8vh"
                        : "8vh",
                    }}
                    onClick={() => {
                      setPlus(true);
                      setMainCategory("foodListContainer");
                    }}
                  >
                    <Styled.PlusContainer>
                      <Styled.PlusSpan
                        style={{ marginTop: "1vh", marginBottom: "0vh" }}
                      >
                        +
                      </Styled.PlusSpan>
                    </Styled.PlusContainer>
                    <Styled.DeleteSpan
                      style={{ color: theme.colors.yellow.palete }}
                    >
                      {"Adicionar novo"}
                    </Styled.DeleteSpan>
                  </Styled.FoodCategoryItem>
                )}
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
