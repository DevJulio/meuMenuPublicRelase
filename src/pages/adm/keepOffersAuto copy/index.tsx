import { TimePicker } from "antd";
import React, { useEffect, useState } from "react";
import Checkbox from "../../../components/CheckBox";
import FoodCardOffer from "../../../components/foodCardOffer";
import Footer from "../../../components/footer";
import Header from "../../../components/header";
import { theme } from "../../../theme/theme";
import * as Styled from "./styles";
import dayjs from "dayjs";
import ButtonSecondary from "../../../components/buttons/secondary";

const OffersMenuAuto: React.FC = () => {
  const format = "HH:mm";
  const defaultDaysOfWeek = [
    { label: "Domingo", checked: false },
    { label: "Segunda-feira", checked: false },
    { label: "Terça-feira", checked: false },
    { label: "Quarta-feira", checked: false },
    { label: "Quinta-feira", checked: false },
    { label: "Sexta-feira", checked: false },
    { label: "Sábado", checked: false },
  ];
  const [daysOfWeekState, setDaysOfWeekState] = useState(defaultDaysOfWeek);

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
      offerPrice: "12,50",
      isOffer: true,
      automation: {
        daysWeek: [4, 5, 6],
        time: {
          startAt: "17:00",
          endAt: "20:00",
        },
      },
    },
    {
      banner:
        "https://static.vecteezy.com/ti/vetor-gratis/p3/8770068-combo-refeicoes-instagram-posts-template-food-social-media-background-yellow-background-for-banner-advertising-vetor.jpg",
      price: "45,00",
      title: "Combo 1",
      automation: {
        daysWeek: [1, 2, 6],
        time: {
          startAt: "17:00",
          endAt: "20:00",
        },
      },
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

  const [promoItem, setPromoItem] = useState();
  const [divChange, setDivChange] = useState("");
  const [startAt, setStartAt] = useState("00:00");
  const [endAt, setEndAt] = useState("00:00");

  useEffect(() => {
    const dates = document.getElementById("dates");
    const offers = document.getElementById("offers");

    if (dates && offers) {
      switch (divChange) {
        case "dates":
          dates.style.display = "flex";
          offers.style.display = "none";
          break;
        case "offers":
          dates.style.display = "none";
          offers.style.display = "flex";
          break;

        default:
          break;
      }
    }
  }, [divChange]);

  useEffect(() => {
    if (promoItem) {
      const promoItemAux = promoItem as any;
      const days = promoItemAux.automation.daysWeek;
      const time = promoItemAux.automation.time;
      let daysAux = daysOfWeekState;

      days.map((day: number) => {
        daysAux[day].checked = true;
      });

      setDaysOfWeekState(defaultDaysOfWeek);
      // setDaysOfWeekState(daysAux);
      setStartAt(time.startAt);
      setEndAt(time.endAt);

      setTimeout(() => {
        setDivChange("dates");
      }, 200);
    }
  }, [promoItem, daysOfWeekState]);

  const updateCheckValue = () => {};

  return (
    <>
      <Header />
      <Styled.Container id="offers">
        <Styled.TitleSpan>selecione a oferta:</Styled.TitleSpan>
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
              {offers.map((offer) => (
                <Styled.CardItem
                  onClick={() => {
                    setPromoItem(offer as any);
                  }}
                >
                  {offer.comboItens ? (
                    <>
                      <FoodCardOffer
                        isCombo={true}
                        bgColor={"white"}
                        price={offer.price}
                        color={theme.colors.yellow.palete}
                        label={offer.title}
                        description={offer.descriptionText}
                        img={offer.banner}
                        comboItens={offer.comboItens}
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
                    </>
                  )}
                </Styled.CardItem>
              ))}
            </Styled.CardsRow>
          </Styled.Container>
        </Styled.MainCardsContainer>

        {/* Lista com as ofertas, incluindo os novos cards */}
      </Styled.Container>
      <>
        <Styled.Container id="dates" style={{ display: "none" }}>
          <Styled.TitleSpan>Defina os dias e horários:</Styled.TitleSpan>
          <Styled.CheckBoxRow>
            {daysOfWeekState.map((day) => {
              return (
                <Styled.CheckBoxItem>
                  <Checkbox
                    label={day.label}
                    setValue={() => {
                      // setDaysOfWeekState()
                    }}
                    value={day.checked}
                  />
                </Styled.CheckBoxItem>
              );
            })}
          </Styled.CheckBoxRow>
          <Styled.TitleSpan>Horário da promoção:</Styled.TitleSpan>
          <Styled.ClockContainer>
            <Styled.ClockContainerCol>
              <Styled.ClockSpan>Começo</Styled.ClockSpan>
              <TimePicker
                value={dayjs(startAt, format)}
                onChange={(value: any) => {
                  setStartAt(value);
                }}
                format={format}
              />
            </Styled.ClockContainerCol>
            <Styled.ClockContainerCol>
              <Styled.ClockSpan>Final</Styled.ClockSpan>
              <TimePicker
                value={dayjs(endAt, format)}
                format={format}
                onChange={(value: any) => {
                  setEndAt(value);
                }}
              />
            </Styled.ClockContainerCol>
          </Styled.ClockContainer>
          <Styled.BtnContainer>
            <ButtonSecondary
              action={() => {
                setDivChange("offers");
              }}
              Label={"Voltar"}
              fontSize={theme.fontSize.md}
              color={theme.colors.white.normal}
              bgColor={theme.colors.red.normal}
            />
            <div style={{ marginLeft: "5vw" }}>
              <ButtonSecondary
                action={() => {}}
                Label={"Salvar"}
                fontSize={theme.fontSize.md}
                color={theme.colors.white.normal}
                bgColor={theme.colors.green.normal}
              />
            </div>
          </Styled.BtnContainer>
        </Styled.Container>
      </>
      <Footer />
    </>
  );
};
export default OffersMenuAuto;
