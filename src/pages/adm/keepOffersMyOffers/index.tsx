import React, { useEffect, useState } from "react";
import FoodCardOffer from "../../../components/foodCardOffer";
import Footer from "../../../components/footer";
import Header from "../../../components/header";
import { theme } from "../../../theme/theme";

import * as Styled from "./styles";
import ButtonSecondary from "../../../components/buttons/secondary";
import { useNavigate } from "react-router-dom";
import SwitchCard from "../../../components/SwitchCard";
import Modal from "../../../components/modal";
import Input from "../../../components/input";
import { TSwitch } from "../admMenu";
import { message } from "antd";
import { isAuth } from "../../../utils/security/isCrypto";
import { OffersService } from "../../../service/module/offers";
import { TProductsOffers } from "../../menu";
import { encryptToAuth } from "../../../utils/security/isAuth";

const OffersMyOffers: React.FC = () => {
  const [modalUpdate, setModalUpdate] = useState<boolean>(false);
  const [switchStates, setSwitchStates] = useState<TSwitch[]>([]);
  const [newPrice, setNewPrice] = useState<string>("");
  const [offers, setOffers] = useState<TProductsOffers[]>();

  const [modalItem, setModalItem] = useState<any>();

  const navigate = useNavigate();

  useEffect(() => {
    const usr = isAuth();
    if (usr && usr.userType === "admin") {
      //const res = await CategoryService.getMyCategories(isAuth()!.codCompany!);

      const fetchData = async () => {
        try {
          const offersAndFoods: any = await Promise.all([
            await OffersService.getMyOffers(usr.codCompany!),
          ])
            .then((results) => {
              return results;
            })
            .catch((error) => {
              console.error(error);
            });
          if (offersAndFoods[0].length) {
            const offersRes = offersAndFoods[0] as TProductsOffers[];
            setOffers(offersRes);
            const switches: any[] = [];
            offersRes.map((foodItem, index) =>
              switches.push({
                id: index.toString(),
                checked: foodItem.isEnable,
                label: foodItem.label,
              })
            );
            setSwitchStates(switches);
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
  }, []);

  const handleSwitchChange = async (id: any) => {
    const changedItem = offers![id];
    console.log(changedItem);

    if (switchStates[Number(id)].checked) {
      try {
        const res = await OffersService.updateOffers(isAuth()!.codCompany!, {
          ...changedItem,
          isEnable: false,
          col: "company",
          subcol: "offers",
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
        const res = await OffersService.updateOffers(isAuth()!.codCompany!, {
          ...changedItem,
          isEnable: true,
          col: "company",
          subcol: "offers",
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
    setSwitchStates((prevSwitchStates) =>
      prevSwitchStates.map((switchState) =>
        switchState.id === id
          ? { ...switchState, checked: !switchState.checked }
          : switchState
      )
    );
  };

  const handleClose = () => {
    setModalUpdate(false);
  };

  const updatePrice = async () => {
    try {
      const res = await OffersService.updateOffers(isAuth()!.codCompany!, {
        ...modalItem,
        offerPrice: newPrice,
        col: "company",
        subcol: "offers",
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
  };

  return (
    <>
      <Header />
      {modalUpdate && (
        <Modal
          bannerColor={"#BC4749"} //AuxColor
          title={"Edição de promoção"}
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
            </Styled.FormItemContainer>
            <Styled.BackBtnContainer>
              <ButtonSecondary
                action={() => {
                  if (newPrice) {
                    updatePrice();
                    handleClose();
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

      <Styled.Container id="offers">
        <Styled.TitleSpan>selecione a oferta:</Styled.TitleSpan>
        <>
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
        </>
        <Styled.MainCardsContainer>
          <Styled.Container
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <Styled.CardsRow
              style={{
                height: "fit-content",
                overflowX: offers && offers.length > 5 ? "scroll" : "auto",
              }}
            >
              {switchStates.length &&
                offers &&
                offers.map((offer, index) => (
                  <Styled.CardItem onClick={() => {}}>
                    {offer && offer?.comboItens && offer?.comboItens.length ? (
                      <>
                        <FoodCardOffer
                          isCombo={true}
                          bgColor={"white"}
                          price={offer.price}
                          color={theme.colors.yellow.palete}
                          label={offer.label!}
                          description={offer.description!}
                          img={offer.banner!}
                          comboItens={offer.comboItens ? offer.comboItens : []}
                        />
                        <SwitchCard
                          handleSwitchChange={() => {
                            handleSwitchChange(index.toString());
                          }}
                          id={index.toString()}
                          value={switchStates[index].checked}
                          updateFunc={() => {
                            console.log(offer);
                            localStorage.setItem(
                              "@meumenu/editOfferCombo",
                              encryptToAuth(JSON.stringify(offer))
                            );
                            navigate("/adm/ofertas/minhas-ofertas/edicao");
                          }}
                        />
                      </>
                    ) : (
                      <>
                        <FoodCardOffer
                          isCombo={false}
                          bgColor={theme.colors.blue.palete}
                          oldPrice={offer.price}
                          price={offer.offerPrice!}
                          color={"#386641"}
                          label={offer.label!}
                          description={offer.description!}
                          img={offer.img!}
                        />
                        <SwitchCard
                          handleSwitchChange={() => {
                            handleSwitchChange(index.toString());
                          }}
                          id={index.toString()}
                          value={switchStates[index].checked}
                          updateFunc={() => {
                            setModalItem(offer);
                            setModalUpdate(true);
                          }}
                        />
                      </>
                    )}
                  </Styled.CardItem>
                ))}
            </Styled.CardsRow>
          </Styled.Container>
        </Styled.MainCardsContainer>
      </Styled.Container>
      <Footer />
    </>
  );
};
export default OffersMyOffers;
