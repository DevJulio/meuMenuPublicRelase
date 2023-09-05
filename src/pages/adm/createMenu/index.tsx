import React, { useEffect, useState } from "react";
import Footer from "../../../components/footer";
import Header from "../../../components/header";
import * as Styled from "./styles";
import categorias from "../../../assets/icons/admIcons/categorias.png";

import { theme } from "../../../theme/theme";

import ButtonSecondary from "../../../components/buttons/secondary";
import Modal from "../../../components/modal";
import Homecard from "../../../components/homeCard";
import { TCardProps } from "../../../components/plansCards/card";
import { mainCategories } from "./categories";
import { useNavigate } from "react-router-dom";
import isMobile from "is-mobile";
import Input from "../../../components/input";
import { message } from "antd";
import { isAuth } from "../../../utils/security/isCrypto";
import { TUser } from "../../../service/module/login";
import { CategoryService } from "../../../service/module/categories";

const MenuMeuMenu: React.FC = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [mainCategory, setMainCategory] = useState<string>("");
  const [modalCategory, setModalCategory] = useState<boolean>(false);
  const [categoryTitle, setCategoryTitle] = useState<string>("");
  const [categoryDesc, setCategoryDesc] = useState<string>("");

  const [foodCategories, setFoodCategories] = useState<TCardProps[]>([]);
  const [drinkCategories, setdrinkCategories] = useState<TCardProps[]>([]);
  const [user, setUser] = useState<TUser>();

  useEffect(() => {
    const usr = isAuth();
    if (usr && usr.userType === "admin") {
      setUser(usr);
      const fetchData = async () => {
        const mainCategoryDiv = document.getElementById("mainCategory");
        const foodDiv = document.getElementById("food");
        const drinkDiv = document.getElementById("drink");

        if (drinkDiv && mainCategoryDiv && foodDiv) {
          switch (mainCategory) {
            case "comer":
              if (!foodCategories.length) {
                const foodRes = await CategoryService.getCategories();
                if (foodRes) {
                  const parseFood = foodRes.data as TCardProps[];
                  const parseFoodAux = parseFood.filter(
                    (food) => food.isDrink === false && food.status === true
                  );
                  parseFoodAux.push({
                    icon: categorias,
                    title: "Nova categoria",
                    text: "Solicite uma nova categoria",
                    mainColor: theme.colors.white.normal,
                    auxColor: theme.colors.blue.palete,
                    textColor: theme.colors.blue.palete,
                    customWidth: true,
                  });
                  setFoodCategories(parseFoodAux);
                }
              }
              mainCategoryDiv.style.display = "none";
              drinkDiv.style.display = "none";
              foodDiv.style.display = "flex";
              break;
            case "beber":
              if (!drinkCategories.length) {
                const drinkRes = await CategoryService.getCategories();
                if (drinkRes) {
                  const parseDrink = drinkRes.data as TCardProps[];
                  const parseDrinkAux = parseDrink.filter(
                    (food) => food.isDrink === true && food.status === true
                  );
                  parseDrinkAux.push({
                    icon: categorias,
                    title: "Nova categoria",
                    text: "Solicite uma nova categoria",
                    mainColor: theme.colors.white.normal,
                    auxColor: theme.colors.blue.palete,
                    textColor: theme.colors.blue.palete,
                    customWidth: true,
                  });
                  setdrinkCategories(parseDrinkAux);
                }
              }
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
      };
      fetchData();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [mainCategory]);

  const navigate = useNavigate();

  const handleClose = () => {
    setModal(false);
  };
  const handleCloseCategory = () => {
    setModalCategory(false);
  };

  const dividirArray = (array: any[], tamanho: number) => {
    let arrayDividido = [];
    for (let i = 0; i < array.length; i += tamanho) {
      let subarray = array.slice(i, i + tamanho);
      arrayDividido.push(subarray);
    }

    return arrayDividido.map((row: TCardProps[], index: number) => {
      return (
        <Styled.CardsContainer>
          {row.map((item: TCardProps) => {
            return (
              <div
                style={{
                  width: isMobile() ? "80%" : "50%",
                }}
                onClick={() => {
                  console.log(item);
                  if (item.title !== "Nova categoria") {
                    localStorage.setItem("@meumenu/foodcategory", item.title);
                    localStorage.setItem(
                      "@meumenu/categoryDetails",
                      JSON.stringify(item)
                    );
                    navigate("/cadastro-item-cardapio");
                  } else {
                    setModalCategory(true);
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
  };

  const foodRows = dividirArray(foodCategories, 3);
  const drinkRows = dividirArray(drinkCategories, 3);

  const addCategory = async () => {
    const unparsedUser = user as any;
    console.log(unparsedUser);
    if (categoryTitle && categoryDesc) {
      try {
        const resCategory: any = await CategoryService.setCategory({
          status: false,
          solicitationDesc: categoryDesc,
          title: categoryTitle,
          requester: unparsedUser.data.title,
        });
        if (resCategory.status === 200) {
          handleCloseCategory();
          message.success({
            content:
              "Suceso ao solicitar de cadastro de categoria, aguarde retorno da equipe MEU MENU!",
            duration: 5,
          });
        }
      } catch (error) {
        message.error({
          content: "verifique os campos e tente novamente",
        });
      }
    } else {
      message.error({
        content: "verifique os campos e tente novamente",
      });
    }
  };

  return (
    <>
      <Header />
      {modalCategory && (
        <Modal
          bannerColor={theme.colors.red.normal} //AuxColor
          title={"Solicitar criação de categoria"}
          handleClose={handleCloseCategory}
          titleFont={theme.fonts.primary}
        >
          <Styled.ModalContainer>
            <div className="form-row">
              <Styled.FormItemContainer>
                <Input
                  setValue={setCategoryTitle}
                  labelColor={theme.colors.blue.palete}
                  label="Nome para categoria: "
                />
              </Styled.FormItemContainer>
              <Styled.FormItemContainer>
                <Input
                  setValue={setCategoryDesc}
                  labelColor={theme.colors.blue.palete}
                  label="Diga mais sobre a categoria: "
                  placeholder="quais produtos vão ficar nessa categoria?"
                  isTextArea
                />
              </Styled.FormItemContainer>
            </div>
          </Styled.ModalContainer>
          <Styled.BackBtnContainer>
            <ButtonSecondary
              action={() => {
                if (categoryTitle) {
                  addCategory();
                  handleCloseCategory();
                } else {
                  message.error("Verifique o nome e tente novamente.");
                }
              }}
              Label={"Salvar"}
              fontSize={theme.fontSize.md}
              color={theme.colors.white.normal}
              bgColor={theme.colors.green.normal}
            />
          </Styled.BackBtnContainer>
        </Modal>
      )}
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
        {mainCategory && (
          <>
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
          </>
        )}

        <Styled.CategoryContainer id="mainCategory">
          <Styled.ItemSpan>Categoria: </Styled.ItemSpan>
          <Styled.CardsContainer>
            <div
              style={{
                width: isMobile() ? "80%" : "50%",
              }}
              onClick={() => {
                localStorage.setItem("@meumenu/foodType", "comer");
                setMainCategory("comer");
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
                localStorage.setItem("@meumenu/foodType", "beber");
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
