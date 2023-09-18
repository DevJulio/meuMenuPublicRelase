import React, { useEffect, useState } from "react";
import Footer from "../../../components/footer";
import Header from "../../../components/header";

import * as Styled from "./styles";

import { useNavigate } from "react-router-dom";
import ButtonSecondary from "../../../components/buttons/secondary";
import { theme } from "../../../theme/theme";
import { TCategory } from "../../../components/category";
import FoodCard from "../../../components/foodCard";
import { TProducts, TProductsOffers } from "../../menu";
import Modal from "../../../components/modal";
import Input from "../../../components/input";
import isMobile from "is-mobile";
import { message } from "antd";
import { isAuth } from "../../../utils/security/isCrypto";
import { CategoryService } from "../../../service/module/categories";
import { FoodsService } from "../../../service/module/foods";
import { fileUpload } from "../../../service/module/fileUpload";
import { CompanyService } from "../../../service/module/company";
import loadingGif from "../../../assets/icons/loading.gif";

export type TCounter = {
  id: string;
  counter: number;
  label?: string;
};

export type TCombo = {
  banner: string;
  price: string;
  title: string;
  descriptionText: string;
  comboItens: TProducts[];
};

const OffersMenuCombo: React.FC = () => {
  const [foodCategory, setFoodCategory] = useState<string>("");
  const [mainCategory, setMainCategory] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);
  const [modalPrimary, setModalPrimay] = useState<boolean>(false);
  const [modalIten, setmodalIten] = useState<TProducts>();
  const [comboState, setComboState] = useState<TProducts[]>();
  const [conterStates, setCounterStates] = useState<TCounter[]>([]);
  const [banner, setBanner] = useState<File>();
  const [price, setPrice] = useState<string>("");
  const [label, setLabel] = useState<string>("");
  const [descriptionText, setDescriptionText] = useState<string>("");

  const [categories, setCategories] = useState<TCategory[]>([]);
  const [foods, setFoods] = useState<TProducts[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const usr = isAuth();
    if (usr && usr.userType === "admin") {
      const mainContainer = document.getElementById("mainContainer");
      const foodListContainer = document.getElementById("foodListContainer");
      const comboDetailForm = document.getElementById("comboDetailForm");

      if (mainContainer && foodListContainer && comboDetailForm) {
        switch (mainCategory) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foodCategory]);

  useEffect(() => {}, [comboState]);

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
  };

  const navigate = useNavigate();

  const handleClose = () => {
    setModal(false);
  };
  const handleCloseAux = () => {
    setModalPrimay(false);
  };

  const getPrice = () => {
    if (comboState) {
      let formatedPrice = 0;

      comboState.forEach((comboItem) => {
        if (comboItem.qtd && comboItem.price) {
          formatedPrice +=
            Number(comboItem.price.replace(",", ".")) * comboItem.qtd;
        }
      });

      return Number(formatedPrice).toFixed(2);
    }
  };

  const changeInput = (e: any) => {
    const localFile = e.target.files[0];
    if (localFile) {
      if (localFile.size > 5 * 1024 * 1024) {
        message.error(
          "A imagem é muito grande. Por favor, escolha uma imagem menor que 5 mb."
        );
      } else {
        setBanner(localFile);
      }
    }
  };
  const handleCloseLoading = () => {
    setLoading(false);
  };
  const createCombo = async () => {
    console.log(comboState);

    if (banner && price && label && descriptionText && comboState?.length) {
      setLoading(true);

      const path = "/companies/imgs/offers/";
      const bannerRes = await fileUpload(banner, path + "banner" + banner.name);

      if (bannerRes?.status === 200) {
        try {
          const combo: TProductsOffers = {
            isEnable: true,
            isOffer: true,
            banner: bannerRes.data,
            price,
            label,
            description: descriptionText,
            comboItens: comboState,
            automation: {
              daysWeek: [],
              time: {
                startAt: "00:00",
                endAt: "00:00",
              },
            },
          };

          const offerRes = await CompanyService.setCompanySubCol({
            docId: isAuth()!.codCompany!,
            mainColection: "company",
            subColection: "offers",
            subdata: combo,
          });
          if (offerRes && offerRes.status === 200) {
            setLoading(false);
            message.success("Cadastro realizado com sucesso!");
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          } else {
            setLoading(false);
            message.error("Verifique os campos e tente novamente.");
          }
        } catch (error) {
          console.log(error);
          message.error("Verifique todos os campos e tente novamente");
        }
      }
    } else {
      message.error("Verifique os campos e tente novamente.");
    }
  };

  return (
    <>
      <Header />
      {modal && modalIten && (
        <Modal
          bannerColor={theme.colors.green.normal} //AuxColor
          title={modalIten.label}
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
              {comboState ? comboState.length : 0}º produto adicionado ao combo
              com sucesso! Oque deseja fazer?
            </p>
          </Styled.FormItemContainer>
          <Styled.BackBtnContainer style={{ marginTop: "0vw" }}>
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
                setMainCategory("listagemCategorias");
              }}
              Label={"adicionar novo item de outra categoria"}
              fontSize={theme.fontSize.md}
              color={theme.colors.white.normal}
              bgColor={theme.colors.blue.palete}
            />
            <ButtonSecondary
              action={() => {
                handleClose();
                setMainCategory("comboDetailForm");
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
                navigate("/adm/ofertas");
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
          <Styled.BackBtnContainer style={{ marginTop: "0vw" }}>
            <ButtonSecondary
              action={() => {
                handleCloseAux();
                if (comboState) {
                  const currentComboItens: TProducts[] = comboState; //Itens atuais da lista de combos.
                  const duplicated = comboState.findIndex(
                    //Busca o index do item duplicado
                    (combo) => combo.label === modalIten.label
                  );

                  if (duplicated >= 0) {
                    const sumItens = comboState[duplicated].qtd + modalIten.qtd; //soma a qtd

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

                    setComboState(finalFormatedComboItens); //Atualiza a lista.
                  } else {
                    currentComboItens.push(modalIten);
                    setComboState(currentComboItens);
                  }
                } else {
                  const itensList: TProducts[] = comboState ? comboState : [];
                  itensList.push(modalIten);
                  setComboState(itensList);
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
      {loading && (
        <Modal
          bannerColor={theme.colors.yellow.palete}
          title={"Carregando..."}
          handleClose={handleCloseLoading}
          titleFont={theme.fonts.primary}
        >
          <div
            style={{
              display: "flex",
              placeItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={loadingGif}
              alt=""
              style={{
                width: "4vw",
                padding: "3vh",
              }}
            />
          </div>
        </Modal>
      )}
      <Styled.MainContainer>
        <Styled.TitleSpan>Ofertas</Styled.TitleSpan>
        <Styled.MenuContainer id="mainContainer">
          <Styled.ItemSpan style={{ color: "white" }}>
            Selecione a categoria do {comboState ? comboState.length : 1}º
            prato:
          </Styled.ItemSpan>
          <Styled.CateRow>
            {categories.map((cateItem, index) => (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <a
                onClick={() => {
                  localStorage.setItem("meuMenuOfferCategory", cateItem.title);
                  setFoodCategory(cateItem.title);
                  setMainCategory("listagemPratos");
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
          <Styled.BackBtnContainer>
            <ButtonSecondary
              action={() => {
                navigate("/adm/ofertas");
              }}
              Label={"← voltar ao menu de ofertas"}
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
            Selecione o {comboState ? comboState.length + 1 : 1}º prato:
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
                  conterStates &&
                  foods
                    .filter((cate) => cate.category === foodCategory)
                    .map((foodItem, index) => (
                      <Styled.FoodCategoryItem
                        onClick={() => {
                          // setModalPrimay(true);
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
                setMainCategory("listagemCategorias");
              }}
              Label={"← voltar as categorias"}
              fontSize={theme.fontSize.md}
              color={theme.colors.white.normal}
              bgColor={theme.colors.red.normal}
            />
          </Styled.BackBtnContainer>
        </Styled.MenuContainer>

        <Styled.MenuContainer style={{ display: "none" }} id="comboDetailForm">
          <Styled.ItemSpan style={{ color: "white" }}>
            Informe os dados para finalizar a criação do combo:
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
                  foods.filter((cate) => cate.category === foodCategory)
                    .length > 5
                    ? "scroll"
                    : "auto",
              }}
            >
              {comboState &&
                comboState.map((foodItem, index) => (
                  <Styled.FoodCategoryItem
                    style={{ justifyContent: "center" }}
                    onClick={() => {
                      //
                      //
                    }}
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
                            const newItems = [...comboState];
                            newItems.splice(index, 1);
                            setComboState(newItems);
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
                ))}
              <Styled.FoodCategoryItem
                style={{
                  alignSelf: "center",
                  marginTop: "-8vh",
                  // margin-top: -8vh;
                }}
                onClick={() => {
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
          {comboState && (
            <Styled.LblPriceDetail>
              <Styled.PageSpan>
                Valor total dos produtos R$ {getPrice()}
              </Styled.PageSpan>
            </Styled.LblPriceDetail>
          )}

          <Styled.TitleSpan>Preencha todos os campos</Styled.TitleSpan>
          <Styled.Menus>
            <Styled.MenusRow>
              <Styled.FormItemContainer>
                <Input setValue={setLabel} value={label} label="Título" />
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
      </Styled.MainContainer>
      <Footer />
    </>
  );
};

export default OffersMenuCombo;
