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
import { useNavigate } from "react-router-dom";
import isMobile from "is-mobile";
import Input from "../../../components/input";
import { message } from "antd";

const MenuMeuMenu: React.FC = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [mainCategory, setMainCategory] = useState<string>("");
  const [modalCategory, setModalCategory] = useState<boolean>(false);
  const [newCategory, setNewCategory] = useState<string>("");

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
                  if (item.title !== "Outra..") {
                    localStorage.setItem("meuMenuFoodCategory", item.title);
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
    console.log(newCategory);
    message.success({
      content:
        "Suceso ao solicitar de cadastro de categoria, aguarde retorno da equipe MEU MENU!",
      duration: 10,
    });

    //chamar api para uma tabela com solicitaçoes de criação de categorias.
  };

  return (
    <>
      <Header />
      {modalCategory && (
        <Modal
          bannerColor={"#BC4749"} //AuxColor
          title={"Criar categoria"}
          handleClose={handleCloseCategory}
          titleFont={theme.fonts.primary}
        >
          <Styled.ModalContainer>
            <Styled.FormItemContainer>
              <Input
                setValue={setNewCategory}
                labelColor={theme.colors.blue.palete}
                label="Novo nome: "
              />
            </Styled.FormItemContainer>
            <Styled.BackBtnContainer>
              <ButtonSecondary
                action={() => {
                  if (newCategory) {
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
          </Styled.ModalContainer>
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
                localStorage.setItem("meuMenuFoodType", "comer");
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
                localStorage.setItem("meuMenuFoodType", "beber");
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
