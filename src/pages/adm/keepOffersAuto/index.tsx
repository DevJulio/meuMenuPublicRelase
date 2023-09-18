import { TimePicker, message } from "antd";
import React, { useEffect, useState } from "react";
import Checkbox from "../../../components/CheckBox";
import FoodCardOffer from "../../../components/foodCardOffer";
import Footer from "../../../components/footer";
import Header from "../../../components/header";
import { theme } from "../../../theme/theme";
import * as Styled from "./styles";
import dayjs from "dayjs";
import ButtonSecondary from "../../../components/buttons/secondary";
import { useNavigate } from "react-router-dom";
import { TAutomation, TProductsOffers } from "../../menu";
import { isAuth } from "../../../utils/security/isCrypto";
import { OffersService } from "../../../service/module/offers";

const OffersMenuAuto: React.FC = () => {
  const navigate = useNavigate();

  const format = "HH:mm";
  const [domingo, setDomingo] = useState(false);
  const [segundaFeira, setSegundaFeira] = useState(false);
  const [tercaFeira, setTercaFeira] = useState(false);
  const [quartaFeira, setQuartaFeira] = useState(false);
  const [quintaFeira, setQuintaFeira] = useState(false);
  const [sextaFeira, setSextaFeira] = useState(false);
  const [sabado, setSabado] = useState(false);

  // const offers = [
  //   {
  //     img: "https://www.comidaereceitas.com.br/wp-content/uploads/2008/09/Mimosa-freepik-780x521.jpg",
  //     isEnable: true,
  //     label: "Mimosa",
  //     qtd: 1,
  //     harmoziation:
  //       "A Mimosa, uma clássica mistura de champanhe e suco de laranja, é um excelente acompanhamento para brunches. ",
  //     description:
  //       "Feito à base de espumante gelado e suco de laranja fresco, a Mimosa vai muito bem com queijos mais delicados, como a ricota. Saladas também são muito bem-vindas",
  //     price: "30,00",
  //     category: "Bebidas",
  //     categoryIcon: "",
  //     isDrink: true,
  //     isDestaque: true,
  //     offerPrice: "12,50",
  //     isOffer: true,
  //     automation: {
  //       daysWeek: [4, 5, 6],
  //       time: {
  //         startAt: "17:00",
  //         endAt: "20:00",
  //       },
  //     },
  //   },
  //   {
  //     banner:
  //       "https://static.vecteezy.com/ti/vetor-gratis/p3/8770068-combo-refeicoes-instagram-posts-template-food-social-media-background-yellow-background-for-banner-advertising-vetor.jpg",
  //     price: "45,00",
  //     title: "Combo 1",
  //     automation: {
  //       daysWeek: [1, 2, 6],
  //       time: {
  //         startAt: "17:00",
  //         endAt: "20:00",
  //       },
  //     },
  //     descriptionText:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut iaculis blandit magna, ac commodo tortor consectetur nec. Sed nec massa sapien. Proin eget sem et velit maximus gravida ac sit amet magna. Cras libero diam, consectetur ut fringilla quis, tempus tristique elit. Maecenas sem arcu, molestie viverra quam vitae, ",
  //     comboItens: [
  //       {
  //         img: "https://www.comidaereceitas.com.br/wp-content/uploads/2008/09/Mimosa-freepik-780x521.jpg",
  //         isEnable: true,
  //         label: "Mimosa",
  //         qtd: 1,
  //         harmoziation:
  //           "A Mimosa, uma clássica mistura de champanhe e suco de laranja, é um excelente acompanhamento para brunches. ",
  //         description:
  //           "Feito à base de espumante gelado e suco de laranja fresco, a Mimosa vai muito bem com queijos mais delicados, como a ricota. Saladas também são muito bem-vindas",
  //         price: "30,00",
  //         category: "Bebidas",
  //         categoryIcon: "",
  //         isDrink: true,
  //         isDestaque: true,
  //       },
  //       {
  //         img: "https://claudia.abril.com.br/wp-content/uploads/2020/02/receita-fritada-forno-abobrinha.jpg?quality=85",
  //         isEnable: true,
  //         label: "Frittata de abobrinha ao forno",
  //         qtd: 1,
  //         harmoziation:
  //           "A Frittata de abobrinha ao forno é acompanhada por vinhos brancos com mais corpo, como um Viognier ou um Chenin Blanc.",
  //         description:
  //           "Uma omelete leve e fofa feita com abobrinhas, queijo e ervas. Perfeita para um café da manhã ou jantar saudável.",
  //         price: "25,00",
  //         category: "Prato Principal",
  //         categoryIcon: "",
  //         isOffer: true,
  //         isDrink: false,
  //         isDestaque: false,
  //       },
  //     ],
  //   },
  // ];

  const [promoItem, setPromoItem] = useState<TProductsOffers>();
  const [divChange, setDivChange] = useState("");
  const [startAt, setStartAt] = useState("00:00");
  const [endAt, setEndAt] = useState("00:00");
  const [offers, setOffers] = useState<TProductsOffers[]>();

  useEffect(() => {
    const usr = isAuth();
    if (usr && usr.userType === "admin") {
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
      const fetchData = async () => {
        try {
          const offersRes: any = await Promise.all([
            await OffersService.getMyOffers(usr.codCompany!),
          ])
            .then((results) => {
              return results;
            })
            .catch((error) => {
              console.error(error);
            });
          console.log(offersRes);

          if (offersRes[0].length) {
            const offersParsed = offersRes[0] as TProductsOffers[];
            console.log(offersParsed);

            setOffers(offersParsed);
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
  }, [divChange]);

  useEffect(() => {
    if (promoItem) {
      console.log(promoItem);

      const { time, daysWeek } = promoItem.automation!;
      console.log(daysWeek);

      if (daysWeek.find((day) => day === "0")) {
        setDomingo(true);
      }
      if (daysWeek.find((day) => day === "1")) {
        setSegundaFeira(true);
      }
      if (daysWeek.find((day) => day === "2")) {
        setTercaFeira(true);
      }
      if (daysWeek.find((day) => day === "3")) {
        setQuartaFeira(true);
      }
      if (daysWeek.find((day) => day === "4")) {
        setQuintaFeira(true);
      }
      if (daysWeek.find((day) => day === "5")) {
        setSextaFeira(true);
      }
      if (daysWeek.find((day) => day === "6")) {
        setSabado(true);
      }

      setStartAt(time.startAt);
      setEndAt(time.endAt);

      setTimeout(() => {
        setDivChange("dates");
      }, 200);
    }
  }, [promoItem]);

  const createAutomation = async () => {
    const daysWeek = [];
    if (domingo) {
      daysWeek.push("0");
    }
    if (segundaFeira) {
      daysWeek.push("1");
    }
    if (tercaFeira) {
      daysWeek.push("2");
    }
    if (quartaFeira) {
      daysWeek.push("3");
    }
    if (quintaFeira) {
      daysWeek.push("4");
    }
    if (sextaFeira) {
      daysWeek.push("5");
    }
    if (sabado) {
      daysWeek.push("6");
    }
    const automation: TAutomation = {
      daysWeek,
      time: {
        startAt,
        endAt,
      },
    };
    try {
      const res = await OffersService.updateOffers(isAuth()!.codCompany!, {
        ...promoItem,
        automation: automation,
        col: "company",
        subcol: "offers",
      });
      if (res.status) {
        message.success("Automação criada!");
      } else {
        message.error("Verifique os campos e tente novamente");
      }
    } catch (error) {
      console.log(error);
      message.error("Verifique os campos e tente novamente");
    }
  };

  const formatDateJs = (val: any) => {
    return `${dayjs(val, format).hour().toString()}:${dayjs(val, format)
      .minute()
      .toString()}`;
  };
  return (
    <>
      <Header />
      <Styled.Container id="offers">
        <Styled.TitleSpan>selecione a oferta:</Styled.TitleSpan>
        {offers && (
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
                  // overflowX: offers!.length > 5 ? "scroll" : "auto",
                }}
              >
                {offers!.map((offer) => (
                  <Styled.CardItem
                    onClick={() => {
                      setPromoItem(offer as TProductsOffers);
                    }}
                  >
                    {offer.comboItens ? (
                      <>
                        <FoodCardOffer
                          isCombo={true}
                          bgColor={"white"}
                          price={offer.price}
                          color={theme.colors.yellow.palete}
                          label={offer.title ? offer.title : ""}
                          description={
                            offer.descriptionText
                              ? offer.descriptionText
                              : offer.description!
                          }
                          img={offer.banner ? offer.banner : ""}
                          comboItens={offer.comboItens}
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
                          label={offer.title ? offer.title : ""}
                          description={
                            offer.descriptionText
                              ? offer.descriptionText
                              : offer.description!
                          }
                          img={offer.img ? offer.img : ""}
                        />
                      </>
                    )}
                  </Styled.CardItem>
                ))}
              </Styled.CardsRow>
            </Styled.Container>
            <Styled.BtnContainer style={{ marginTop: "0vh" }}>
              <ButtonSecondary
                action={() => {
                  navigate("/adm/ofertas");
                }}
                Label={"Voltar"}
                fontSize={theme.fontSize.md}
                color={theme.colors.white.normal}
                bgColor={theme.colors.red.normal}
              />
            </Styled.BtnContainer>
          </Styled.MainCardsContainer>
        )}
        {/* Lista com as ofertas, incluindo os novos cards */}
      </Styled.Container>
      <>
        <Styled.Container id="dates" style={{ display: "none" }}>
          <Styled.TitleSpan>Defina os dias e horários:</Styled.TitleSpan>
          <Styled.CheckBoxRow>
            <Styled.CheckBoxItem>
              <Checkbox
                label="Domingo"
                setValue={() => {
                  setDomingo(!domingo);
                }}
                value={domingo}
              />
            </Styled.CheckBoxItem>
            <Styled.CheckBoxItem>
              <Checkbox
                label={"Segunda Feira"}
                setValue={() => {
                  setSegundaFeira(!segundaFeira);
                }}
                value={segundaFeira}
              />
            </Styled.CheckBoxItem>
            <Styled.CheckBoxItem>
              <Checkbox
                label={"Terça Feira"}
                setValue={() => {
                  setTercaFeira(!tercaFeira);
                }}
                value={tercaFeira}
              />
            </Styled.CheckBoxItem>
            <Styled.CheckBoxItem>
              <Checkbox
                label={"Quarta Feira"}
                setValue={() => {
                  setQuartaFeira(!quartaFeira);
                }}
                value={quartaFeira}
              />
            </Styled.CheckBoxItem>
            <Styled.CheckBoxItem>
              <Checkbox
                label={"Quinta Feira"}
                setValue={() => {
                  setQuintaFeira(!quintaFeira);
                }}
                value={quintaFeira}
              />
            </Styled.CheckBoxItem>
            <Styled.CheckBoxItem>
              <Checkbox
                label={"Sexta Feira"}
                setValue={() => {
                  setSextaFeira(!sextaFeira);
                }}
                value={sextaFeira}
              />
            </Styled.CheckBoxItem>
            <Styled.CheckBoxItem>
              <Checkbox
                label={"Sábado"}
                setValue={() => {
                  setSabado(!sabado);
                }}
                value={sabado}
              />
            </Styled.CheckBoxItem>
          </Styled.CheckBoxRow>
          <Styled.TitleSpan>Horário da promoção:</Styled.TitleSpan>
          <Styled.ClockContainer>
            <Styled.ClockContainerCol>
              <Styled.ClockSpan>Começo</Styled.ClockSpan>
              <TimePicker
                value={dayjs(startAt, format)}
                onChange={(value: any) => {
                  setStartAt(formatDateJs(value));
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
                  setEndAt(formatDateJs(value));
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
                action={createAutomation}
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
