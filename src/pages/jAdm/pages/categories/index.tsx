import React, { useEffect, useState } from "react";

import * as Styled from "./styles";

import { mainCategories } from "./categories";
import { useNavigate } from "react-router-dom";
import isMobile from "is-mobile";
import { ColorPicker, message } from "antd";
import { TCardProps } from "../../../../components/plansCards/card";
import Homecard from "../../../../components/homeCard";
import Header from "../../../../components/header";
import Modal from "../../../../components/modal";
import { theme } from "../../../../theme/theme";
import Input from "../../../../components/input";
import ButtonSecondary from "../../../../components/buttons/secondary";
import Footer from "../../../../components/footer";
import { fileUpload } from "../../../../service/module/fileUpload";
import { Color } from "antd/es/color-picker";
import { CategoryService } from "../../../../service/module/categories";
import { isAuth } from "../../../../utils/security/isCrypto";
import categorias from "../../../../assets/icons/admIcons/categorias.png";

const JCategories: React.FC = () => {
  const [mainCategory, setMainCategory] = useState<string>("");
  const [modalCategory, setModalCategory] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [iconFile, setIconFile] = useState<File>();
  const [iconUrl, setIconUrl] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [mainColor, setMainColor] = useState<string>("");
  const [textColor, setTextColor] = useState<string>("");
  const [auxColor, setAuxColor] = useState<string>("");
  const [docID, setDocID] = useState<string>("");

  const [foodCategories, setFoodCategories] = useState<TCardProps[]>([]);
  const [drinkCategories, setdrinkCategories] = useState<TCardProps[]>([]);

  useEffect(() => {
    const usr = isAuth(true);
    if (usr && usr.userType === "admin-j") {
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
                    (food) => food.isDrink === false
                  );
                  parseFoodAux.push({
                    icon: categorias,
                    title: "Nova categoria",
                    text: "Crie uma nova categoria",
                    mainColor: theme.colors.white.normal,
                    auxColor: theme.colors.blue.palete,
                    textColor: theme.colors.blue.palete,
                    customWidth: true,
                  });
                  setFoodCategories(parseFoodAux);
                  setIconFile(undefined);
                  setTitle("");
                  setText("");
                  setMainColor("");
                  setTextColor("");
                  setAuxColor("");
                  setIconUrl("");
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
                    (food) => food.isDrink === true
                  );
                  parseDrinkAux.push({
                    icon: categorias,
                    title: "Nova categoria",
                    text: "Crie uma nova categoria",
                    mainColor: theme.colors.white.normal,
                    auxColor: theme.colors.blue.palete,
                    textColor: theme.colors.blue.palete,
                    customWidth: true,
                  });
                  setdrinkCategories(parseDrinkAux);
                  setIconFile(undefined);
                  setTitle("");
                  setText("");
                  setMainColor("");
                  setTextColor("");
                  setAuxColor("");
                  setIconUrl("");
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
                  if (item.title !== "Nova categoria") {
                    setIsEdit(true);
                    setDocID(item.docId!);
                    setTitle(item.title);
                    setText(item.text);
                    setMainColor(item.mainColor);
                    setTextColor(item.textColor!);
                    setAuxColor(item.auxColor);
                    setIconUrl(item.icon);
                    setModalCategory(true);
                  } else {
                    setIsEdit(false);
                    setTitle("");
                    setText("");
                    setMainColor("");
                    setTextColor("");
                    setAuxColor("");
                    setIconUrl("");
                    setIconFile(undefined);
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
    let bannerUrl: any;

    if (iconFile) {
      const path = "/companies/imgs/categories/";
      bannerUrl = await fileUpload(iconFile, path + "icon" + iconFile.name);
      const bannerRelease = bannerUrl && bannerUrl.data;
      try {
        const category: TCardProps = {
          icon: bannerRelease,
          title,
          text,
          mainColor,
          auxColor,
          textColor,
          customWidth: true,
          isDrink: mainCategory === "beber" ? true : false,
        };
        const resCategory: any = await CategoryService.setCategory(category);
        if (resCategory.status === 200) {
          handleCloseCategory();
          message.success({
            content: "Suceso ao cadastrar categoria!",
            duration: 5,
          });
        }
      } catch (error) {
        console.log(error);
        message.error("verique o log");
        handleCloseCategory();
      }
    } else {
      message.error("Ícone deve ser enviado");
    }
  };

  const updateCategory = async () => {
    let bannerUrl: any;
    if (iconFile) {
      const path = "/companies/imgs/categories/";
      bannerUrl = await fileUpload(iconFile, path + "icon" + iconFile.name);
    }
    const bannerRelease = bannerUrl && bannerUrl.data;
    try {
      const category: TCardProps = {
        icon: bannerRelease,
        title,
        text,
        mainColor,
        auxColor,
        textColor,
        customWidth: true,
        isDrink: mainCategory === "beber" ? true : false,
      };

      const res = await CategoryService.updateCategory(docID, {
        ...category,
      });
      if (res.status) {
        message.success("Categoria atualizada com sucesso!");
        handleCloseCategory();
      } else {
        message.error("Verifique os campos e tente novamente");
      }
    } catch (error) {
      console.log(error);
      message.error("verique o log");
      handleCloseCategory();
    }
  };

  const setIconModal = (e: any) => {
    const localFile = e.target.files[0];
    setIconFile(localFile);
  };
  return (
    <>
      <Header />
      {modalCategory && (
        <Modal
          bannerColor={theme.colors.red.normal} //AuxColor
          title={isEdit ? "Editar categoria" : "Criar categoria"}
          handleClose={handleCloseCategory}
          titleFont={theme.fonts.primary}
        >
          <Styled.ModalContainer>
            <Styled.FormContainer>
              <div className="form-row">
                <Styled.FormItemContainer>
                  <Input
                    setValue={setTitle}
                    labelColor={theme.colors.blue.palete}
                    label="Novo nome: "
                    value={title}
                  />
                </Styled.FormItemContainer>
                <Styled.FormItemContainer>
                  <Styled.ItemSpan
                    style={{
                      color: theme.colors.blue.palete,
                      paddingBottom: "0px",
                      marginTop: "5px",
                    }}
                  >
                    Selecione o icone:
                  </Styled.ItemSpan>
                  <Styled.Centralize>
                    <Styled.FileInput
                      style={{
                        color: theme.colors.blue.palete,
                      }}
                      type="file"
                      id="mainBanner"
                      onChange={(e: any) => {
                        setIconModal(e);
                      }}
                    />
                  </Styled.Centralize>
                </Styled.FormItemContainer>
              </div>
              <div className="form-row">
                <Styled.FormItemContainer>
                  <Styled.ItemSpan
                    style={{
                      paddingBottom: "0px",
                      marginTop: "5px",
                    }}
                  >
                    Cor de fundo
                  </Styled.ItemSpan>
                  <ColorPicker
                    showText
                    onChange={(value: Color, hex: string) => {
                      setMainColor(hex);
                    }}
                    value={mainColor}
                  />
                </Styled.FormItemContainer>
                <Styled.FormItemContainer>
                  <Styled.ItemSpan
                    style={{
                      paddingBottom: "0px",
                      marginTop: "5px",
                    }}
                  >
                    Cor do texto
                  </Styled.ItemSpan>
                  <ColorPicker
                    showText
                    onChange={(value: Color, hex: string) => {
                      setTextColor(hex);
                    }}
                    value={textColor}
                  />
                </Styled.FormItemContainer>
              </div>
              <div className="form-row">
                <Styled.FormItemContainer>
                  <Styled.ItemSpan
                    style={{
                      paddingBottom: "0px",
                      marginTop: "5px",
                    }}
                  >
                    Cor do título
                  </Styled.ItemSpan>
                  <ColorPicker
                    showText
                    onChange={(value: Color, hex: string) => {
                      setAuxColor(hex);
                    }}
                    value={auxColor}
                  />
                </Styled.FormItemContainer>
                <Styled.FormItemContainer>
                  <Input
                    setValue={setText}
                    labelColor={theme.colors.blue.palete}
                    label="Sub-titulo: "
                    value={text}
                  />
                </Styled.FormItemContainer>
              </div>
              <div className="form-row">
                <span> Vermelho D62828 </span>
                <span> Amarelo FCBF49 </span>
                <span> Azul 003049 </span>
              </div>
              {iconUrl && (
                <div
                  className="form-row"
                  style={{
                    alignSelf: "center",
                  }}
                >
                  <Styled.ItemSpan
                    style={{
                      color: theme.colors.blue.palete,
                      paddingBottom: "0px",
                      marginTop: "5px",
                    }}
                  >
                    Icone atual:
                  </Styled.ItemSpan>
                  <Styled.LogoImg src={iconUrl} alt="icone" />
                </div>
              )}
            </Styled.FormContainer>

            <Styled.BackBtnContainer>
              <ButtonSecondary
                action={() => {
                  if (title && text && mainColor && textColor && auxColor) {
                    if (isEdit) {
                      updateCategory();
                    } else {
                      addCategory();
                    }
                  } else {
                    message.error("Verifique os campos e tente novamente.");
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
        <Styled.TitleSpan>Cardápio geral.</Styled.TitleSpan>
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

export default JCategories;
