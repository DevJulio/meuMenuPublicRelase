import React, { useState } from "react";
import FoodCardOffer from "../../../components/foodCardOffer";
import Footer from "../../../components/footer";
import Header from "../../../components/header";
import { theme } from "../../../theme/theme";
import { TProducts } from "../../menu";
import { TCombo } from "../keepOffersCombo";
import * as Styled from "./styles";

const OffersMenuAuto: React.FC = () => {
  const daysOfWeek = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];
  const [daysOfWeekState, setDaysOfWeekState] = useState([]);

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
      banner:
        "https://static.vecteezy.com/ti/vetor-gratis/p3/8770068-combo-refeicoes-instagram-posts-template-food-social-media-background-yellow-background-for-banner-advertising-vetor.jpg",
      price: "45,00",
      title: "Combo 1",
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

  //criar 2 cards diferentes, card com preço e card de combo.

  //   Todo: selecionar oferta, mostrar div com os detalhes, criar mais uma interface com os detalhes: dias da semana e horários
  return (
    <>
      <Header />
      <Styled.Container id="offers">
        <h1>selecione a oferta:</h1>
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
              {offers.map((offer, index) => (
                <Styled.CardItem onClick={() => {}}>
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
      <Styled.Container id="dates"></Styled.Container>
      <Footer />
    </>
  );
};
export default OffersMenuAuto;
