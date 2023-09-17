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
import { message } from "antd";
import { isAuth } from "../../../utils/security/isCrypto";
import { CategoryService } from "../../../service/module/categories";
import { FoodsService } from "../../../service/module/foods";
import { CompanyService } from "../../../service/module/company";

const OffersMenuPrice: React.FC = () => {
  const [foodCategory, setFoodCategory] = useState<string>("");
  const [mainCategory, setMainCategory] = useState<string>("");
  const [modal, setModal] = useState<boolean>(false);
  const [modalAux, setModalAux] = useState<boolean>(false);
  const [modalIten, setmodalIten] = useState<TProducts>();
  const [modalFail, setModalFail] = useState<boolean>(false);
  const [newPrice, setNewPrice] = useState<string>("");

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

  const navigate = useNavigate();

  const handleClose = () => {
    setModal(false);
  };
  const handleCloseAux = () => {
    setModalAux(false);
  };
  const handleCloseFail = () => {
    setModalFail(false);
  };

  const setNewPriceToIten = async () => {
    if (modalIten) {
      const updatedValue: TProductsOffers = {
        img: modalIten.img,
        isEnable: modalIten.isEnable,
        label: modalIten.label,
        qtd: modalIten.qtd,
        harmoziation: modalIten.harmoziation,
        description: modalIten.description,
        price: modalIten.price,
        category: modalIten.category,
        categoryIcon: modalIten.categoryIcon,
        isDrink: modalIten.isDrink,
        isDestaque: modalIten.isDestaque,
        isOffer: true,
        offerPrice: newPrice,
      };

      try {
        console.log(updatedValue);
        const offerRes = await CompanyService.setCompanySubCol({
          docId: isAuth()!.codCompany!,
          mainColection: "company",
          subColection: "offers",
          subdata: updatedValue,
        });
        if (offerRes && offerRes.status === 200) {
          message.success("Cadastro realizado com sucesso!");
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else {
          message.error("Verifique os campos e tente novamente.");
        }
      } catch (error) {
        console.log(error);
        message.error("Verifique todos os campos e tente novamente");
      }
    }
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
          <Styled.ModalContainer>
            <Styled.FormItemContainer>
              <Input
                setValue={setNewPrice}
                labelColor={theme.colors.blue.palete}
                label="Novo preço: "
              />
            </Styled.FormItemContainer>{" "}
            <Styled.BackBtnContainer>
              <ButtonSecondary
                action={() => {
                  if (newPrice) {
                    setNewPriceToIten();
                    handleClose();
                    setModalAux(true);
                  } else {
                    message.error("Verifique o valor e tente novamente.");
                  }
                }}
                Label={"Salvar"}
                fontSize={theme.fontSize.md}
                color={theme.colors.white.normal}
                bgColor={theme.colors.green.normal}
              />
            </Styled.BackBtnContainer>
          </Styled.ModalContainer>
          {/* Novo preço e botão de confirmar cadastro de promoção */}
          {/* redirecionar para outro modal */}
        </Modal>
      )}
      {modalAux && (
        <Modal
          bannerColor={theme.colors.green.normal} //AuxColor
          title={"Sucesso"}
          handleClose={handleCloseAux}
          titleFont={theme.fonts.primary}
        >
          <Styled.ModalContainer>
            <Styled.FormItemContainer>
              <p
                style={{
                  textAlignLast: "center",
                  fontSize: theme.fontSize.md2,
                }}
              >
                Oferta adicionada com sucesso! Oque deseja fazer?
              </p>
            </Styled.FormItemContainer>
            <Styled.BackBtnContainer>
              <ButtonSecondary
                action={() => {
                  handleCloseAux();
                }}
                Label={"Novo cadastro na mesma categoria"}
                fontSize={theme.fontSize.md}
                color={theme.colors.white.normal}
                bgColor={theme.colors.green.normal}
              />
              <ButtonSecondary
                action={() => {
                  handleCloseAux();
                  setMainCategory("listagemCategorias");
                }}
                Label={"novo Cadastro em outra categoria"}
                fontSize={theme.fontSize.md}
                color={theme.colors.white.normal}
                bgColor={theme.colors.blue.palete}
              />
              <ButtonSecondary
                action={() => {
                  handleCloseAux();
                  navigate("/adm/ofertas");
                }}
                Label={"voltar ao menu"}
                fontSize={theme.fontSize.md}
                color={theme.colors.black.normal}
                bgColor={theme.colors.yellow.palete}
              />
            </Styled.BackBtnContainer>
          </Styled.ModalContainer>
        </Modal>
      )}
      {modalFail && (
        <Modal
          bannerColor={theme.colors.red.normal}
          title={"Verifique e tente novamente!"}
          handleClose={handleCloseFail}
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
                <p
                  style={{
                    textAlignLast: "center",
                  }}
                >
                  informe um valor válido e tente novamente!
                </p>
              </div>
            </Styled.PlansDetailModal>

            <Styled.BackBtnContainer>
              <ButtonSecondary
                action={handleCloseFail}
                Label={"Entendi"}
                fontSize={theme.fontSize.md}
                color={theme.colors.white.normal}
                bgColor={theme.colors.red.normal}
              />
            </Styled.BackBtnContainer>
          </>
        </Modal>
      )}
      <Styled.MainContainer>
        <Styled.TitleSpan>Ofertas</Styled.TitleSpan>
        <Styled.MenuContainer id="mainContainer">
          <Styled.ItemSpan style={{ color: "white" }}>
            Selecione a categoria do prato:
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
                    .filter((cate) => cate.category === foodCategory)
                    .map((foodItem, index) => (
                      <Styled.FoodCategoryItem
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
      </Styled.MainContainer>
      <Footer />
    </>
  );
};

export default OffersMenuPrice;
