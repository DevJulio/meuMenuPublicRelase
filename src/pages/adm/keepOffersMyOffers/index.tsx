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

const OffersMyOffers: React.FC = () => {
  const [modalUpdate, setModalUpdate] = useState<boolean>(false);
  const [switchStates, setSwitchStates] = useState<TSwitch[]>([]);
  const [newPrice, setNewPrice] = useState<string>("");

  const [modalItem, setModalItem] = useState<any>();

  const navigate = useNavigate();

  const offers = [
    {
      img: "https://www.comidaereceitas.com.br/wp-content/uploads/2008/09/Mimosa-freepik-780x521.jpg",
      isEnable: true,
      label: "Mimosa",
      qtd: 1,
      harmoziation:
        "A Mimosa, uma clássica mistura de champanhe e suco de laranja, é um excelente acompanhamento para brunches. ",
      description:
        "Feito à base de espumante gelado e suco de laranja fresco, a Mimosa vai muito bem com queijos mais delicados, como a ricota. Saladas também são muito bem-vindas",
      price: "30,00",
      category: "Bebidas",
      categoryIcon: "",
      isDrink: true,
      isDestaque: true,
      isOffer: true,
      offerPrice: "12,50",
    },
    {
      isEnable: true,
      banner:
        "https://static.vecteezy.com/ti/vetor-gratis/p3/8770068-combo-refeicoes-instagram-posts-template-food-social-media-background-yellow-background-for-banner-advertising-vetor.jpg",
      price: "45,00",
      label: "Combo 1",
      descriptionText:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut iaculis blandit magna, ac commodo tortor consectetur nec. Sed nec massa sapien. Proin eget sem et velit maximus gravida ac sit amet magna. Cras libero diam, consectetur ut fringilla quis, tempus tristique elit. Maecenas sem arcu, molestie viverra quam vitae, ",
      comboItens: [
        {
          img: "https://www.comidaereceitas.com.br/wp-content/uploads/2008/09/Mimosa-freepik-780x521.jpg",
          isEnable: true,
          label: "Mimosa",
          qtd: 1,
          harmoziation:
            "A Mimosa, uma clássica mistura de champanhe e suco de laranja, é um excelente acompanhamento para brunches. ",
          description:
            "Feito à base de espumante gelado e suco de laranja fresco, a Mimosa vai muito bem com queijos mais delicados, como a ricota. Saladas também são muito bem-vindas",
          price: "30,00",
          category: "Bebidas",
          categoryIcon: "",
          isDrink: true,
          isDestaque: true,
        },
        {
          img: "https://claudia.abril.com.br/wp-content/uploads/2020/02/receita-fritada-forno-abobrinha.jpg?quality=85",
          isEnable: true,
          label: "Frittata de abobrinha ao forno",
          qtd: 1,
          harmoziation:
            "A Frittata de abobrinha ao forno é acompanhada por vinhos brancos com mais corpo, como um Viognier ou um Chenin Blanc.",
          description:
            "Uma omelete leve e fofa feita com abobrinhas, queijo e ervas. Perfeita para um café da manhã ou jantar saudável.",
          price: "25,00",
          category: "Prato Principal",
          categoryIcon: "",
          isOffer: true,
          isDrink: false,
          isDestaque: false,
        },
      ],
    },
  ];

  useEffect(() => {
    const switches: any[] = [];
    offers.map((foodItem, index) =>
      switches.push({
        id: index.toString(),
        checked: foodItem.isEnable,
        label: foodItem.label,
      })
    );
    setSwitchStates(switches);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSwitchChange = async (id: string) => {
    if (switchStates[Number(id)].checked) {
      message.error("Item desativado.");
    } else {
      message.success("Item ativado.");
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

  const updatePrice = () => {
    console.log("atualizar o " + modalItem + " com o preço " + newPrice);
    //chamar api
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
                overflowX: offers.length > 5 ? "scroll" : "auto",
              }}
            >
              {switchStates.length &&
                offers.map((offer, index) => (
                  <Styled.CardItem onClick={() => {}}>
                    {offer.comboItens ? (
                      <>
                        <FoodCardOffer
                          isCombo={true}
                          bgColor={"white"}
                          price={offer.price}
                          color={theme.colors.yellow.palete}
                          label={offer.label}
                          description={offer.descriptionText}
                          img={offer.banner}
                          comboItens={offer.comboItens}
                        />
                        <SwitchCard
                          handleSwitchChange={() => {
                            handleSwitchChange(index.toString());
                          }}
                          id={index.toString()}
                          value={switchStates[index].checked}
                          updateFunc={() => {
                            localStorage.setItem(
                              "meuMenuEditOfferCombo",
                              JSON.stringify(offer)
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
                          price={offer.offerPrice}
                          color={"#386641"}
                          label={offer.label}
                          description={offer.description}
                          img={offer.img}
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

        {/* Lista com as ofertas, incluindo os novos cards */}
      </Styled.Container>
      <Styled.Container id="dates"></Styled.Container>
      <Footer />
    </>
  );
};
export default OffersMyOffers;
