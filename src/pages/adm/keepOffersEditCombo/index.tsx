import React, { useEffect, useState } from "react";
import Footer from "../../../components/footer";
import Header from "../../../components/header";

import * as Styled from "./styles";

import { TProducts } from "../../menu";

import FoodCard from "../../../components/foodCard";
import { theme } from "../../../theme/theme";
import ButtonSecondary from "../../../components/buttons/secondary";
import Input from "../../../components/input";
import isMobile from "is-mobile";
import { message } from "antd";
import foods, { renCategories } from "../../menu/foods";
import { TCategory } from "../../../components/category";
import { TCounter } from "../keepOffersCombo";
import Modal from "../../../components/modal";

export type TCombo = {
  banner: string;
  price: string;
  title: string;
  descriptionText: string;
  comboItens: TProducts[];
};

const OffersEditCombo: React.FC = () => {
  const comboItens = localStorage.getItem("meuMenuEditOfferCombo");
  const [comboItensState, setComboItensState] = useState<any>();
  const [price, setPrice] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [banner, setBanner] = useState<any>();
  const [screen, setScreen] = useState<string>("");
  const [conterStates, setCounterStates] = useState<TCounter[]>([]);
  const [foodCategory, setFoodCategory] = useState<string>("");

  const [modalPrimary, setModalPrimay] = useState<boolean>(false);
  const [modalIten, setmodalIten] = useState<TProducts>();
  const [modal, setModal] = useState<boolean>(false);

  const [descriptionText, setDescriptionText] = useState<string>("");

  const renIndex = renCategories.findIndex(
    (categoria) => categoria.title === "Todas" //usa o método findIndex para acessar o index de um objeto dentro de um array que possua um valor especifico
  );

  const getArraysExceptIndex = (list: TCategory[], index: number) => {
    return list.filter((_, i) => i !== index);
  };

  const parsedRenCategories = getArraysExceptIndex(renCategories, renIndex);

  useEffect(() => {
    if (comboItens) {
      const parsedComboItems: TCombo = JSON.parse(comboItens);
      console.log(parsedComboItems);
      setComboItensState(parsedComboItems);
      setPrice(parsedComboItems.price);
      setTitle(parsedComboItems.title);
      setDescriptionText(parsedComboItems.descriptionText);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const counter: TCounter[] = [];
    foods
      .filter((food) => food.category === foodCategory)
      .map((foodItem, index) =>
        counter.push({
          id: index.toString(),
          counter: 1,
          label: foodItem.label,
        })
      );
    setCounterStates(counter);
  }, [foodCategory]);

  useEffect(() => {
    const mainContainer = document.getElementById("mainContainer");
    const comboDetailForm = document.getElementById("comboDetailForm");
    const foodListContainer = document.getElementById("foodListContainer");

    if (mainContainer && comboDetailForm && foodListContainer) {
      switch (screen) {
        case "listagemPratos":
          foodListContainer.style.display = "flex";
          mainContainer.style.display = "none";
          comboDetailForm.style.display = "none";
          break;
        case "listagemCategorias":
          mainContainer.style.display = "flex";
          foodListContainer.style.display = "none";
          comboDetailForm.style.display = "none";
          break;
        case "comboDetailForm":
          comboDetailForm.style.display = "flex";
          mainContainer.style.display = "none";
          foodListContainer.style.display = "none";
          break;

        default:
          break;
      }
    }
  }, [screen]);

  const getPrice = () => {
    if (comboItensState?.comboItens) {
      let formatedPrice = 0;

      comboItensState.comboItens.forEach((comboItem: any) => {
        if (comboItem.qtd && comboItem.price) {
          formatedPrice +=
            Number(comboItem.price.replace(",", ".")) * comboItem.qtd;
        }
      });

      return Number(formatedPrice).toFixed(2);
    }
  };

  const changeInput = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setBanner(e.target.files[0]);
    }
  };
  const createCombo = () => {
    if (banner && price && title && descriptionText) {
      // && comboState?.length
      // console.log({ banner, price, title, descriptionText, comboState });
    } else {
      message.error("Verifique os campos e tente novamente.");
    }
  };

  const handleConterChange = async (id: string, add: boolean) => {
    setCounterStates((prevConterStates) =>
      prevConterStates.map((counterState) =>
        counterState.counter > 0 && counterState.id === id
          ? {
              ...counterState,
              counter: add
                ? counterState.counter + 1
                : counterState.counter - 1,
            }
          : counterState
      )
    );
    //Chamar Api.
    //Alterar o elemento currentFoodItem[Number(id)] no banco de dados.
  };
  const handleCloseAux = () => {
    setModalPrimay(false);
  };
  const handleClose = () => {
    setModal(false);
  };
  return (
    <>
      {modal && (
        <Modal
          bannerColor={"#BC4749"} //AuxColor
          title={"modalIten.label"}
          handleClose={handleClose}
          titleFont={theme.fonts.hand}
          customWidth={70}
        >
          <Styled.FormItemContainer>
            <p
              style={{
                textAlignLast: "center",
                fontSize: theme.fontSize.md2,
              }}
            >
              {comboItensState ? comboItensState.comboItens.length + 1 : 0}º
              produto adicionado ao combo com sucesso! Oque deseja fazer?
            </p>
          </Styled.FormItemContainer>
          <Styled.BackBtnContainer
            style={{ marginTop: "0vw", marginBottom: "3vh" }}
          >
            <ButtonSecondary
              action={() => {
                handleClose();
              }}
              Label={"adicionar novo item da mesma categoria"}
              fontSize={theme.fontSize.md}
              color={theme.colors.black.normal}
              bgColor={theme.colors.yellow.palete}
            />
            <ButtonSecondary
              action={() => {
                handleClose();
                setScreen("listagemCategorias");
              }}
              Label={"adicionar novo item de outra categoria"}
              fontSize={theme.fontSize.md}
              color={theme.colors.white.normal}
              bgColor={theme.colors.blue.palete}
            />
            <ButtonSecondary
              action={() => {
                handleClose();
                setScreen("comboDetailForm");
              }}
              Label={"Finalizar e seguir p/ detalhes"}
              fontSize={theme.fontSize.md}
              color={theme.colors.white.normal}
              bgColor={theme.colors.green.normal}
            />
            <ButtonSecondary
              action={() => {
                handleClose();
                localStorage.setItem("meuMenuComboCounter", "0");
                // navigate("/adm/ofertas");
              }}
              Label={"descartar"}
              fontSize={theme.fontSize.md}
              color={theme.colors.white.normal}
              bgColor={theme.colors.red.normal}
            />
          </Styled.BackBtnContainer>
        </Modal>
      )}
      {modalPrimary && modalIten && (
        <Modal
          bannerColor={"#BC4749"} //AuxColor
          title={modalIten.label}
          handleClose={handleCloseAux}
          titleFont={theme.fonts.hand}
        >
          <Styled.FormItemContainer>
            <p
              style={{
                textAlignLast: "center",
                fontSize: theme.fontSize.md2,
              }}
            >
              deseja adicionar o item {modalIten.label} ao combo?
            </p>
          </Styled.FormItemContainer>
          <Styled.BackBtnContainer
            style={{ marginTop: "0vw", marginBottom: "3vh" }}
          >
            <ButtonSecondary
              action={() => {
                handleCloseAux();
                if (comboItensState) {
                  const currentComboItens: any[] =
                    comboItensState.comboItens as any; //Itens atuais da lista de combos.
                  console.log({ comboItensState });
                  const duplicated = comboItensState.comboItens.findIndex(
                    //Busca o index do item duplicado
                    (combo: any) => combo.label === modalIten.label
                  );

                  if (duplicated >= 0) {
                    const sumItens =
                      comboItensState.comboItens[duplicated].qtd +
                      modalIten.qtd; //soma a qtd

                    const parsedComboItem: TProducts = {
                      isEnable: modalIten.isEnable,
                      img: modalIten.img,
                      description: modalIten.description,
                      price: modalIten.price,
                      category: modalIten.category,
                      categoryIcon: modalIten.categoryIcon,
                      label: modalIten.label,
                      isDestaque: modalIten.isDestaque,
                      harmoziation: modalIten.harmoziation,
                      isDrink: modalIten.isDrink,
                      qtd: sumItens, //cria um novo objeto para ser adicionado a lista
                    };

                    currentComboItens.push(parsedComboItem); //Adiciona a lista
                    const finalFormatedComboItens = [...currentComboItens];
                    finalFormatedComboItens.splice(duplicated, 1); //remove o item original com a qtd antiga.
                    console.log({ finalFormatedComboItens });
                    // setComboItensState(finalFormatedComboItens); //Atualiza a lista.
                  } else {
                    currentComboItens.push(modalIten);
                    // setComboItensState(currentComboItens);
                  }
                } else {
                  const itensList: TProducts[] = comboItensState
                    ? comboItensState
                    : [];
                  itensList.push(modalIten);
                  setComboItensState(itensList);
                }
                setModal(true);
              }}
              Label={"Adicionar"}
              fontSize={theme.fontSize.md}
              color={theme.colors.white.normal}
              bgColor={theme.colors.green.normal}
            />
            <ButtonSecondary
              action={() => {
                handleCloseAux();
                // navigate("/adm/ofertas");
              }}
              Label={"cancelar"}
              fontSize={theme.fontSize.md}
              color={theme.colors.white.normal}
              bgColor={theme.colors.red.normal}
            />
          </Styled.BackBtnContainer>
          {/* setMainCategory("listagemCategorias"); */}
        </Modal>
      )}
      <Header />
      {comboItensState && (
        <>
          <Styled.MenuContainer id="comboDetailForm">
            <Styled.ItemSpan style={{ color: "white" }}>
              Informe os dados para finalizar a edição do combo:
            </Styled.ItemSpan>
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
                    comboItensState.comboItens.length > 5 ? "scroll" : "auto",
                }}
              >
                {comboItensState &&
                  comboItensState.comboItens.map(
                    (foodItem: any, index: number) => (
                      <Styled.FoodCategoryItem
                        style={{ justifyContent: "center" }}
                        onClick={() => {}}
                      >
                        <Styled.ItemRow>
                          <Styled.PlusContainer>
                            <Styled.PlusSpan
                              style={{
                                fontSize: theme.fontSize.lg,
                                paddingTop: "2vh",
                                marginInline: "1.5vw",
                                width: "max-content",
                              }}
                            >
                              {foodItem.qtd ? foodItem.qtd : 1} X
                            </Styled.PlusSpan>
                          </Styled.PlusContainer>
                          <Styled.ItemCol>
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
                                const newItems = [
                                  ...comboItensState.comboItens,
                                ];
                                const details = {
                                  banner: comboItensState.banner,
                                  price: comboItensState.price,
                                  title: comboItensState.title,
                                  descriptionText:
                                    comboItensState.descriptionText,
                                };
                                newItems.splice(index, 1);
                                setComboItensState({
                                  ...details,
                                  comboItens: newItems,
                                });
                              }}
                            >
                              <Styled.DeleteSpan
                                style={{ color: theme.colors.yellow.palete }}
                              >
                                Remover
                              </Styled.DeleteSpan>
                            </Styled.DeleteContainer>
                          </Styled.ItemCol>
                        </Styled.ItemRow>
                      </Styled.FoodCategoryItem>
                    )
                  )}
                <Styled.FoodCategoryItem
                  style={{
                    alignSelf: "center",
                    marginTop: "-8vh",
                  }}
                  onClick={() => {
                    setScreen("listagemCategorias");
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
            {comboItensState && (
              <Styled.LblPriceDetail>
                <Styled.PageSpan>
                  Valor total dos produtos R$ {getPrice()}
                </Styled.PageSpan>
              </Styled.LblPriceDetail>
            )}

            <Styled.TitleSpan>Detalhes do combo:</Styled.TitleSpan>
            <Styled.MenusRow>
              <Styled.FormItemContainer>
                <Styled.ItemSpan>Foto atual: </Styled.ItemSpan>
                <Styled.Centralize>
                  <Styled.MenuBanner src={comboItensState.banner} alt="" />
                </Styled.Centralize>
              </Styled.FormItemContainer>
            </Styled.MenusRow>
            <Styled.Menus>
              <Styled.MenusRow>
                <Styled.FormItemContainer>
                  <Input setValue={setTitle} value={title} label="Título" />
                </Styled.FormItemContainer>

                <Styled.FormItemContainer>
                  <Input setValue={setPrice} value={price} label="Preço" />
                </Styled.FormItemContainer>
                <Styled.FormItemContainer>
                  <Styled.ItemSpan
                    style={{ color: "white", marginBottom: "-5vh" }}
                  >
                    Selecione a foto para o cardápio.
                  </Styled.ItemSpan>
                  <Styled.Centralize>
                    <Styled.FileInput
                      type="file"
                      id="mainBanner"
                      accept="image/*"
                      onChange={(e: any) => {
                        changeInput(e);
                      }}
                    />
                  </Styled.Centralize>
                </Styled.FormItemContainer>
              </Styled.MenusRow>

              <Styled.MenusRow>
                <Styled.IconCentralize>
                  <Input
                    labelColor={theme.colors.red.normal}
                    setValue={setDescriptionText}
                    value={descriptionText}
                    label="Descrição e detalhes"
                    isTextArea
                    customWidth={isMobile() ? "250px" : "650px"}
                  />
                </Styled.IconCentralize>
              </Styled.MenusRow>
              {banner && (
                <Styled.MenusRow>
                  <Styled.MenuBanner
                    src={URL.createObjectURL(banner)}
                  ></Styled.MenuBanner>
                </Styled.MenusRow>
              )}
            </Styled.Menus>
            <Styled.BackBtnContainer>
              <ButtonSecondary
                action={createCombo}
                Label={"Salvar alterações"}
                fontSize={theme.fontSize.md}
                color={theme.colors.white.normal}
                bgColor={theme.colors.red.normal}
              />
            </Styled.BackBtnContainer>
          </Styled.MenuContainer>

          <Styled.MenuContainer id="mainContainer" style={{ display: "none" }}>
            <Styled.ItemSpan style={{ color: "white" }}>
              Selecione a categoria do{" "}
              {comboItensState ? comboItensState.comboItens.length + 1 : 1}º
              prato:
            </Styled.ItemSpan>
            <Styled.CateRow>
              {parsedRenCategories.map((cateItem, index) => (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a
                  onClick={() => {
                    localStorage.setItem(
                      "meuMenuOfferCategory",
                      cateItem.title
                    );
                    setFoodCategory(cateItem.title);
                    setScreen("listagemPratos");
                  }}
                >
                  <Styled.CateItem>
                    <Styled.CateIcon src={cateItem.icon} />
                    <span>{cateItem.title}</span>
                  </Styled.CateItem>
                </a>
              ))}
            </Styled.CateRow>
            <Styled.BackBtnContainer>
              <ButtonSecondary
                action={() => {
                  setScreen("comboDetailForm");
                }}
                Label={"← voltar aos detalhes do combo"}
                fontSize={theme.fontSize.md}
                color={theme.colors.white.normal}
                bgColor={theme.colors.red.normal}
              />
            </Styled.BackBtnContainer>
          </Styled.MenuContainer>

          <Styled.MenuContainer
            id="foodListContainer"
            style={{ display: "none" }}
          >
            <Styled.ItemSpan style={{ color: "white" }}>
              Selecione o{" "}
              {comboItensState ? comboItensState.comboItens.length + 1 : 1}º
              prato:
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
                      comboItensState.comboItens.length > 5 ? "scroll" : "auto",
                  }}
                >
                  {foodCategory &&
                    conterStates &&
                    foods
                      .filter((cate) => cate.category === foodCategory)
                      .map((foodItem, index) => (
                        <Styled.FoodCategoryItem>
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
                          <Styled.CounterRow>
                            <Styled.CounterBtn
                              onClick={() => {
                                handleConterChange(index.toString(), false);
                              }}
                            >
                              -
                            </Styled.CounterBtn>
                            <Styled.CounterSpan>
                              {conterStates &&
                              conterStates[index] &&
                              conterStates[index].counter
                                ? conterStates[index].counter
                                : 1}
                            </Styled.CounterSpan>
                            <Styled.CounterBtn
                              onClick={() => {
                                handleConterChange(index.toString(), true);
                              }}
                            >
                              +
                            </Styled.CounterBtn>
                          </Styled.CounterRow>
                          <Styled.BackBtnContainer>
                            <ButtonSecondary
                              action={() => {
                                setModalPrimay(true);
                                setmodalIten({
                                  ...foodItem,
                                  qtd: conterStates[index].counter,
                                });
                              }}
                              Label={"Adicionar"}
                              fontSize={theme.fontSize.md}
                              color={theme.colors.red.normal}
                              bgColor={theme.colors.white.normal}
                            />
                          </Styled.BackBtnContainer>
                        </Styled.FoodCategoryItem>
                      ))}
                </Styled.ContainerCategories>
              </div>
            </Styled.CategoryContainerAux>
            <Styled.BackBtnContainer>
              <ButtonSecondary
                action={() => {
                  setScreen("listagemCategorias");
                }}
                Label={"← voltar as categorias"}
                fontSize={theme.fontSize.md}
                color={theme.colors.white.normal}
                bgColor={theme.colors.red.normal}
              />
            </Styled.BackBtnContainer>
          </Styled.MenuContainer>
        </>
      )}

      <Footer />
    </>
  );
};

export default OffersEditCombo;
