import React, { useEffect, useState } from "react";
import Footer from "../../components/footer";
import HeaderCustom from "../../components/headerCustom";
import { theme } from "../../theme/theme";
import * as Styled from "./styles";
import ren from "../../assets/icons/ren.png";
import Category, { ICategory } from "../../components/category";

import all from "../../assets/icons/categories/ios/all.png";
import allAux from "../../assets/icons/categories/ios/allAux.png";
import renEntradas from "../../assets/icons/categories/ios/renEntradas.png";
import renPrincipal from "../../assets/icons/categories/ios/renPrincipal.png";
import renPrimeiro from "../../assets/icons/categories/ios/renPrimeiro.png";
import menu from "../../assets/icons/categories/ios/menu.png";

import sobremesa from "../../assets/icons/categories/ios/sobremesa.png";
import drinks from "../../assets/icons/categories/ios/drinks.png";
import food from "../../assets/banners/menu/food.png";
import happyhour from "../../assets/banners/happyhour.jpg";
import offers from "../../assets/banners/offers.jpeg";
import reservation from "../../assets/banners/reservation.jpeg";
import renMarker from "../../assets/icons/renMarker.png";
import renOffers from "../../assets/icons/renOffers.png";
import renReservation from "../../assets/icons/renReservation.png";

import { Carousel } from "react-responsive-carousel";
import instagram from "../../assets/icons/socialMedia/ios/instagram.png";
import spotify from "../../assets/icons/socialMedia/ios/spotify.png";
import youtube from "../../assets/icons/socialMedia/ios/youtube.png";
import whatsapp from "../../assets/icons/socialMedia/ios/whatsapp.png";
import marker from "../../assets/icons/socialMedia/ios/marker.png";
import BorderPage from "../../components/borderPage";
import FoodCard from "../../components/foodCard";
import HomeBanner from "../../components/homeBanner";
import foods, { offers as offersData } from "./foods";
import ButtonSecondary from "../../components/buttons/secondary";
import Modal from "../../components/modal";
import FoodModalDetail from "../../components/foodModalDetail";
import isMobile from "is-mobile";
import FoodCardOffer from "../../components/foodCardOffer";
import { useNavigate, useParams } from "react-router-dom";
import { CompanyService } from "../../service/module/company";
import { message } from "antd";
import { TCompany } from "../../service/module/login";
import { getFontStyle } from "../../utils/getFontStyle";

export type TAutomation = {
  daysWeek: [];
  time: {
    startAt: string;
    endAt: string;
  };
};

export type TProducts = {
  automation?: TAutomation;
  isEnable: boolean;
  img: string;
  description: string;
  category: string;
  categoryIcon: string;
  label: string;
  isDestaque: boolean;
  qtd: number;
  price: string;
  offerPrice?: string;
  isMainDestaque?: boolean;
  isDrink?: boolean;
  isOffer?: boolean;
  harmoziation?: string;
  images?: string[];
  country?: string;
  IBU?: string;
  grape?: string;
};
export type TProductsOffers = {
  img?: string;
  isEnable?: boolean;
  label?: string;
  qtd?: number;
  harmoziation?: string;
  description?: string;
  price: string;
  category?: string;
  categoryIcon?: string;
  isDrink?: boolean;
  isDestaque?: boolean;
  isOffer?: boolean;
  offerPrice?: string;
  banner?: string;
  title?: string;
  descriptionText?: string;
  comboItens?: TProducts[];
};

const Menu: React.FC = () => {
  const { empresa } = useParams();
  const [modal, setModal] = useState<boolean>(false);
  const [defaultCategory, setDefaultCategory] = useState<string>("Todas");
  const [modalIten, setmodalIten] = useState<TProducts | TProductsOffers>();
  const [modalHappy, setModalHappy] = useState<boolean>(false);
  const [modalReservation, setModalReservation] = useState<boolean>(false);
  const [company, setCompany] = useState<TCompany>();

  const header = {
    icon: ren,
    title: "Ren.",
    mainColor: "#F2E8CF",
    auxColor: "#BC4749",
    textColor: "#386641",
    fontStyle: theme.fonts.hand,
    fontStyleAux: theme.fonts.primary,
    welcome: "Bem-vindo(a) ao Ren.",
    banner: food,
    offers: true,
    hasHappyHour: true,
    reservation: true,
    reservationTextDetail:
      "Evite filas de espera, faça sua reserva no Ren, entre em contato com o número a baixo e verifique a disponibilidade!",
    reservationContactNumber: "64996140938",
    offersText: "Confira as nossas promoções!",
    happyHourText: "É dia de happy hour no Ren!",
    happyHourTextDetail:
      "O happy hour é oferecido de segunda a sexta-feira, das 17h às 20h, Durante o happy hour, nossos clientes podem desfrutar de bebidas com descontos especiais, como cervejas, vinhos e coquetéis.",
    reservationText: "Reserve sua mesa!",
    socialMedia: {
      instagram: "//",
      spotify:
        "https://open.spotify.com/playlist/4ZlE96y3xaHLbycBFe4pWW?si=f759da23f8f84108",
      youtube: "",
      whatsapp: "//",
      address:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d0!2d0!3d0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM4wNTInNTcuNyJOIDDCsDI3JzE0LjUiVw!5e0!3m2!1spt-BR!2sbr!4v1628942353270!5m2!1spt-BR!2sbr",
      //"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30571.286431759458!2d-49.280785039213846!3d-16.70634218493767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935ef12544136db3%3A0x1b20c322bbad1d83!2sGoi%C3%A2nia%20Shopping!5e0!3m2!1spt-BR!2sbr!4v1677269482432!5m2!1spt-BR!2sbr",
    },
  };
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (empresa === "ren") {
        const REN: TCompany = {
          URL: "ren",
          address: "",
          categories: [],
          details: {
            icon: ren,
            title: "Ren.",
            mainColor: "#F2E8CF",
            auxColor: "#BC4749",
            textColor: "#386641",
            fontStyle: "hand",
            fontStyleAux: "primary",
            welcome: "Bem-vindo(a) ao Ren.",
            banner: food,
            offers: {
              status: true,
              bannerText: "",
              bannerTitle: "Confira as nossas promoções!",
              bannerURL: offers,
              daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
              startAt: "00:00",
              endAt: "23:59",
              reservationNumber: "",
            },
            reservation: {
              status: true,
              bannerText:
                "Evite filas de espera, faça sua reserva no Ren, entre em contato com o número a baixo e verifique a disponibilidade!",
              bannerTitle: "Reserve sua mesa!",
              bannerURL: reservation,
              daysOfWeek: [],
              startAt: "",
              endAt: "",
              reservationNumber: "64940028922",
            },
            happyHour: {
              status: true,
              bannerText:
                "O happy hour é oferecido de segunda a sexta-feira, das 17h às 20h, Durante o happy hour, nossos clientes podem desfrutar de bebidas com descontos especiais, como cervejas, vinhos e coquetéis.",
              bannerTitle: "É dia de happy hour no Ren!",
              bannerURL: happyhour,
              daysOfWeek: [],
              startAt: "",
              endAt: "",
              reservationNumber: "",
            },
            contactEmail: "kkkkk",
            contactNumber: "64996140938",
            contactName: "64996140938",
            city: "Goiânia",
            socialMedia: {
              localization: {
                lat: 0,
                lng: 0,
              },
              instagram: "",
              youtube: "",
              whatsapp: "64996140938",
              address: "Goiânia Shopping, segundo piso.",
              spotify:
                "https://open.spotify.com/playlist/4ZlE96y3xaHLbycBFe4pWW?si=f759da23f8f84108",
            },
            hideLogo: false,
            hideTitle: false,
            hideWelcome: false,
            centerIcon: false,
          },
          icon: ren,
          isAproved: true,
          menu: [],
          offers: [],
          plan: "Ultimate",
          staff: [],
          statusCadastro: true,
          tables: [],
          title: "Ren",
        };
        setCompany(REN);
      } else {
        const urlRes = await CompanyService.GetCompanyByURL(empresa!);
        if (urlRes) {
          setCompany(urlRes);
        } else {
          message.error("erro ao acessar o cardápio, tente novamente");
        }
      }
    };
    if (empresa) {
      fetchData();
    } else {
      navigate("/home");
    }

    //os dois em estados TCompany;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setModal(false);
  };
  const handleCloseHappy = () => {
    setModalHappy(false);
  };
  const handleCloseReservation = () => {
    setModalReservation(false);
  };

  const categories: ICategory[] = [
    {
      icon: allAux,
      label: "Todas",
      color: "white",
      bgColor: "#386641",
      auxColor: "white",
      fontStyle: theme.fonts.hand, // getFontStyle(company!.details.fontStyle),
    },

    {
      icon: drinks,
      label: "Bebidas",
      color: "white",
      bgColor: "#386641",
      auxColor: "white",
      fontStyle: theme.fonts.hand, // getFontStyle(company!.details.fontStyle),
    },
    {
      icon: renEntradas,
      label: "Entradas",
      color: "white",
      bgColor: "#386641",
      auxColor: "white",
      fontStyle: theme.fonts.hand, // getFontStyle(company!.details.fontStyle),
    },

    {
      icon: renPrimeiro,
      label: "Primeiro Prato",
      color: "white",
      bgColor: "#386641",
      auxColor: "white",
      fontStyle: theme.fonts.hand, // getFontStyle(company!.details.fontStyle),
    },

    {
      icon: renPrincipal,
      label: "Prato Principal",
      color: "white",
      bgColor: "#386641",
      auxColor: "white",
      fontStyle: theme.fonts.hand, // getFontStyle(company!.details.fontStyle),
    },

    {
      icon: sobremesa,
      label: "Sobremesas",
      color: "white",
      bgColor: "#386641",
      auxColor: "white",
      fontStyle: theme.fonts.hand, // getFontStyle(company!.details.fontStyle),
    },
  ];

  const width = window.screen.width;

  const redirect = (id: number) => {
    if (id === 0) {
      setModalHappy(true);
    }
    if (id === 1) {
      const offersrDiv = document.getElementById("offers");
      if (offersrDiv) {
        offersrDiv.scrollIntoView({ behavior: "smooth" });
      }
    }
    if (id === 2) {
      setModalReservation(true);
    }
  };

  const checkFlexSize = () => {
    let count = 0;
    if (company?.details.socialMedia.address) {
      count = count++;
    }
    if (company?.details.socialMedia.instagram) {
      count = count++;
    }
    if (company?.details.socialMedia.spotify) {
      count = count++;
    }
    if (company?.details.socialMedia.whatsapp) {
      count = count++;
    }
    if (company?.details.socialMedia.youtube) {
      count = count++;
    }
    return count;
  };

  const socialFlexCount = checkFlexSize();

  const generateSpotify = (url: string) => {
    const playlistSrc =
      "https://open.spotify.com/embed/playlist/" +
      url.split("/playlist/")[1].split("?")[0];
    return (
      <iframe
        title="Spotify"
        style={{ borderRadius: "12px" }}
        src={playlistSrc}
        width={width - 25}
        height="352"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    );
  };

  const generateGoogleMaps = (link: string) => {
    //Exibir mapa baseado na lat lon
    return link;
    // return (
    //   <iframe
    //     title="Map"
    //     src={link}
    //     width={width - 25}
    //     height="400"
    //     style={{ border: "0", borderRadius: "25px" }}
    //     loading="lazy"
    //     referrerPolicy="no-referrer-when-downgrade"
    //   ></iframe>
    // );
  };
  const parseColorTitle = (color: string) => {
    if (color === "#ffffff") {
      return "#000";
    } else {
      return color;
    }
  };
  return (
    <>
      {modal && modalIten && (
        <Modal
          customWidth={isMobile() ? 90 : 60}
          bannerColor={company!.details.auxColor}
          title={modalIten.label ? modalIten.label : ""}
          handleClose={handleClose}
          titleFont={getFontStyle(company!.details.fontStyle)}
        >
          <FoodModalDetail modalIten={modalIten} />
        </Modal>
      )}

      {modalHappy && (
        <Modal
          bannerColor={company!.details.auxColor}
          title={company!.details.happyHour!.bannerTitle}
          handleClose={handleCloseHappy}
          titleFont={getFontStyle(company!.details.fontStyle)}
          customWidth={isMobile() ? 90 : 60}
        >
          <Styled.HappyContainer
            style={{
              backgroundColor: company!.details.mainColor,
              color: company!.details.textColor,
            }}
          >
            <p>{company!.details.happyHour!.bannerText}</p>
            <Styled.ModalBannerImg
              src={happyhour}
              style={{ maxHeight: "13vh" }}
            />
          </Styled.HappyContainer>
        </Modal>
      )}
      {modalReservation && (
        <Modal
          bannerColor={company!.details.auxColor}
          title={"Reserva no " + company?.title}
          handleClose={handleCloseReservation}
          titleFont={getFontStyle(company!.details.fontStyle)}
          customWidth={isMobile() ? 90 : 60}
        >
          <Styled.HappyContainer
            style={{
              backgroundColor: company!.details.mainColor,
              color: company!.details.textColor,
            }}
          >
            <p>{company!.details.reservation?.bannerText}</p>
            <ButtonSecondary
              action={() => {
                window.location.href = `https://api.whatsapp.com/send?phone=55${company?.details.reservation?.reservationNumber}&text=Olá, desejo fazer uma reserva no ${company?.title}!`;
              }}
              Label="clique e saiba mais."
              color={company!.details.mainColor}
              bgColor={company!.details.textColor}
            />
            <Styled.ModalBannerImg
              src={reservation}
              style={{ marginTop: "2vh" }}
            />
          </Styled.HappyContainer>
        </Modal>
      )}
      {company ? (
        <>
          <HeaderCustom
            icon={company.icon}
            title={company.title}
            mainColor={company.details.mainColor}
            textColor={company.details.textColor}
            fontStyle={getFontStyle(company.details.fontStyle)}
            auxColor={company.details.auxColor}
            fontStyleAux={getFontStyle(company.details.fontStyleAux)}
            hideLogo={company.details.hideLogo}
            hideTitle={company.details.hideTitle}
            centerIcon={company.details.centerIcon}
          />
          <Styled.MainContainer
            style={{
              backgroundColor: company.details.mainColor,
              paddingTop: company.details.hideWelcome ? "0vh" : "3vh",
            }}
          >
            {company.details.hideWelcome ? (
              <></>
            ) : (
              <Styled.Span
                style={{
                  color: company.details.textColor,
                  fontFamily: getFontStyle(company.details.fontStyle),
                }}
              >
                {company.details.welcome}
              </Styled.Span>
            )}
            <Styled.BannerContainer>
              <Styled.Banner src={company.details.banner} />
            </Styled.BannerContainer>
            <>
              <Styled.MainContainer
                style={{
                  backgroundColor: company.details.mainColor,
                  maxHeight: "16vh",
                  marginTop: "-1vh",
                  marginBottom: "4vh",
                  paddingTop: "0",
                }}
              >
                <Styled.CarouselContainer
                  style={{
                    alignItems: "center",
                  }}
                >
                  <Carousel
                    width={width - 25}
                    autoPlay={true}
                    infiniteLoop={true}
                    interval={3000}
                    showArrows={true}
                    onClickItem={(id) => {
                      redirect(id);
                    }}
                  >
                    {company.details.happyHour!.status ? (
                      <HomeBanner
                        bannerDateColor={company.details.auxColor}
                        bannerImg={company.details.happyHour!.bannerURL}
                        infoSpan={company.details.happyHour!.bannerTitle}
                        infoSpanColor={company.details.auxColor}
                      />
                    ) : (
                      <></>
                    )}
                    {company.details.offers!.status ? (
                      <HomeBanner
                        bannerDateColor={company.details.mainColor}
                        bannerImg={company.details.offers!.bannerURL}
                        infoSpan={company.details.offers!.bannerTitle}
                        infoSpanColor={company.details.mainColor}
                      />
                    ) : (
                      <></>
                    )}
                    {company.details.reservation!.status ? (
                      <HomeBanner
                        bannerDateColor={company.details.auxColor}
                        bannerImg={company.details.reservation!.bannerURL}
                        infoSpan={company.details.reservation!.bannerTitle}
                        infoSpanColor={company.details.mainColor}
                      />
                    ) : (
                      <></>
                    )}
                  </Carousel>
                </Styled.CarouselContainer>
              </Styled.MainContainer>
            </>

            <Styled.ContainerCategories>
              {categories.map((cateItem, index) => (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a
                  onClick={() => {
                    setDefaultCategory(cateItem.label);
                  }}
                >
                  <Category
                    fontColor={company.details.mainColor}
                    id={index + 1}
                    icon={cateItem.icon}
                    label={cateItem.label}
                    color={company.details.mainColor}
                    bgColor={company.details.textColor}
                    auxColor={company.details.auxColor}
                    fontStyle={getFontStyle(company.details.fontStyle)}
                  />
                </a>
              ))}
            </Styled.ContainerCategories>
            {categories.length >= 3 && (
              <>
                <Styled.Arrow
                  style={{
                    color: company.details.auxColor,
                    fontFamily: getFontStyle(company.details.fontStyle),
                  }}
                >
                  Confira todo nosso menu! ➜
                </Styled.Arrow>
              </>
            )}
            <Styled.CarouselContainer>
              <Styled.Title
                style={{
                  color: company.details.textColor,

                  fontFamily: getFontStyle(company.details.fontStyleAux),
                  placeSelf: "baseline",
                }}
              >
                Recomendações:
              </Styled.Title>
              <Styled.ContainerCategories
                style={{
                  height: "fit-content",
                }}
              >
                {defaultCategory === "Todas"
                  ? foods
                      .filter((cate) => cate.isMainDestaque)
                      .map((foodItem, index) => (
                        <div
                          style={{ textDecoration: "none" }}
                          onClick={() => {
                            setModal(true);
                            setmodalIten(foodItem);
                          }}
                        >
                          <FoodCard
                            category=""
                            categoryIcon=""
                            bgColor={company.details.auxColor}
                            price={foodItem.price}
                            color={company.details.textColor}
                            label={foodItem.label}
                            description={foodItem.description}
                            img={foodItem.img}
                          />
                        </div>
                      ))
                  : foods
                      .filter(
                        (cate) =>
                          cate.category === defaultCategory && cate.isDestaque
                      )
                      .map((foodItem, index) => (
                        <div
                          style={{ textDecoration: "none" }}
                          onClick={() => {
                            setModal(true);
                            setmodalIten(foodItem);
                          }}
                        >
                          <FoodCard
                            category=""
                            categoryIcon=""
                            bgColor={company.details.auxColor}
                            price={foodItem.price}
                            color={company.details.textColor}
                            label={foodItem.label}
                            description={foodItem.description}
                            img={foodItem.img}
                          />
                        </div>
                      ))}
              </Styled.ContainerCategories>
            </Styled.CarouselContainer>
            <Styled.SocialMediaContainer
              style={{
                backgroundColor: company.details.textColor,
                flex: socialFlexCount,
              }}
            >
              {company.details.socialMedia.address && (
                <>
                  <Styled.Icon
                    src={marker}
                    onClick={() => {
                      const whereWeAre = document.getElementById("offers");
                      if (whereWeAre) {
                        whereWeAre.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    style={{
                      filter: `brightness(1000%) grayscale(100%) 
                      opacity(0.1)
                      contrast(1)
                      drop-shadow(0 0 0 ${company.details.mainColor}) 
                      drop-shadow(0 0 0 ${company.details.mainColor})
                      drop-shadow(0 0 0 ${company.details.mainColor})
                      drop-shadow(0 0 0 ${company.details.mainColor})
                      drop-shadow(0 0 0 ${company.details.mainColor})`,
                    }}
                  />
                </>
              )}
              {company.details.socialMedia.instagram && (
                <>
                  <Styled.Icon
                    src={instagram}
                    onClick={() => {
                      window.location.href =
                        company.details.socialMedia.instagram;
                    }}
                    style={{
                      filter: `brightness(1000%) grayscale(100%) 
                      opacity(0.1)
                      contrast(1)
                      drop-shadow(0 0 0 ${company.details.mainColor}) 
                      drop-shadow(0 0 0 ${company.details.mainColor})
                      drop-shadow(0 0 0 ${company.details.mainColor})
                      drop-shadow(0 0 0 ${company.details.mainColor})
                      drop-shadow(0 0 0 ${company.details.mainColor})`,
                    }}
                  />
                </>
              )}
              {company.details.socialMedia.spotify && (
                <>
                  <Styled.Icon
                    src={spotify}
                    onClick={() => {
                      const sound = document.getElementById("sound");
                      if (sound) {
                        sound.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    style={{
                      filter: `brightness(1000%) grayscale(100%) 
                      opacity(0.1)
                      contrast(1)
                      drop-shadow(0 0 0 ${company.details.mainColor}) 
                      drop-shadow(0 0 0 ${company.details.mainColor})
                      drop-shadow(0 0 0 ${company.details.mainColor})
                      drop-shadow(0 0 0 ${company.details.mainColor})
                      drop-shadow(0 0 0 ${company.details.mainColor})`,
                    }}
                  />
                </>
              )}
              {company.details.socialMedia.whatsapp && (
                <>
                  <Styled.Icon
                    src={whatsapp}
                    onClick={() => {
                      window.location.href = `https://api.whatsapp.com/send?phone=55${header.reservationContactNumber}&text=Olá, quero conhecer melhor o ${company.title}!`;
                    }}
                    style={{
                      filter: `brightness(1000%) grayscale(100%) 
                      opacity(0.1)
                      contrast(1)
                      drop-shadow(0 0 0 ${company.details.mainColor}) 
                      drop-shadow(0 0 0 ${company.details.mainColor})
                      drop-shadow(0 0 0 ${company.details.mainColor})
                      drop-shadow(0 0 0 ${company.details.mainColor})
                      drop-shadow(0 0 0 ${company.details.mainColor})`,
                    }}
                  />
                </>
              )}
              {company.details.socialMedia.youtube && (
                <>
                  <Styled.Icon
                    src={youtube}
                    onClick={() => {
                      window.location.href =
                        company.details.socialMedia.youtube;
                    }}
                    style={{
                      filter: `brightness(1000%) grayscale(100%) 
                      opacity(0.1)
                      contrast(1)
                      drop-shadow(0 0 0 ${company.details.mainColor}) 
                      drop-shadow(0 0 0 ${company.details.mainColor})
                      drop-shadow(0 0 0 ${company.details.mainColor})
                      drop-shadow(0 0 0 ${company.details.mainColor})
                      drop-shadow(0 0 0 ${company.details.mainColor})`,
                    }}
                  />
                </>
              )}
            </Styled.SocialMediaContainer>
            <Styled.Arrow
              style={{
                color: company.details.auxColor,
                fontFamily: getFontStyle(company.details.fontStyle),
                marginBottom: "-10px",
                marginTop: "1vh",
              }}
            >
              Confira todos nossos pratos! 🠫
            </Styled.Arrow>
          </Styled.MainContainer>
          <div
            style={{
              marginTop: "-3vh",
            }}
          >
            <BorderPage
              destop={undefined}
              mobile={
                <>
                  <Styled.TitleAndLogo
                    style={{
                      marginTop: "4vh",
                    }}
                  >
                    <Styled.LogoImg
                      src={menu}
                      alt="icone"
                      style={{
                        filter: `brightness(1000%) grayscale(100%) 
                      opacity(0.1)
                      contrast(1)
                      drop-shadow(0 0 0 ${company.details.mainColor}) 
                      drop-shadow(0 0 0 ${company.details.mainColor})
                      drop-shadow(0 0 0 ${company.details.mainColor})
                      drop-shadow(0 0 0 ${company.details.mainColor})
                      drop-shadow(0 0 0 ${company.details.mainColor})`,
                      }}
                    />
                    <Styled.Title
                      style={{
                        color: company.details.mainColor,
                        fontFamily: getFontStyle(company.details.fontStyle),
                        marginLeft: "0vw",
                        fontSize: theme.fontSize.xxlg,
                      }}
                    >
                      Nosso cardápio:
                    </Styled.Title>
                  </Styled.TitleAndLogo>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                    }}
                  >
                    <Styled.ContainerCategories
                      style={{
                        height: "fit-content",
                      }}
                    >
                      {defaultCategory === "Todas"
                        ? foods
                            .filter((cate) => cate.isMainDestaque)
                            .map((foodItem, index) => (
                              <div
                                style={{ textDecoration: "none" }}
                                onClick={() => {
                                  setModal(true);
                                  setmodalIten(foodItem);
                                }}
                              >
                                <FoodCard
                                  category=""
                                  categoryIcon=""
                                  bgColor={company.details.auxColor}
                                  price={foodItem.price}
                                  color={company.details.textColor}
                                  label={foodItem.label}
                                  description={foodItem.description}
                                  img={foodItem.img}
                                />
                              </div>
                            ))
                        : foods
                            .filter((cate) => cate.category === defaultCategory)
                            .map((foodItem, index) => (
                              <div
                                style={{ textDecoration: "none" }}
                                onClick={() => {
                                  setModal(true);
                                  setmodalIten(foodItem);
                                }}
                              >
                                <FoodCard
                                  category=""
                                  categoryIcon=""
                                  bgColor={company!.details.auxColor}
                                  price={foodItem.price}
                                  color={company!.details.textColor}
                                  label={foodItem.label}
                                  description={foodItem.description}
                                  img={foodItem.img}
                                />
                              </div>
                            ))}
                    </Styled.ContainerCategories>
                  </div>
                </>
              }
              outsideColor={company.details.mainColor}
              insideColor={company.details.textColor}
            ></BorderPage>

            {company.details.offers?.status && (
              <BorderPage
                destop={undefined}
                mobile={
                  <>
                    <Styled.TitleAndLogo
                      id="offers"
                      style={{
                        marginTop: "4vh",
                      }}
                    >
                      <Styled.LogoImg
                        src={renOffers}
                        alt="icone"
                        style={{
                          filter: `brightness(1000%) grayscale(100%) 
                      opacity(0.1)
                      contrast(1)
                      drop-shadow(0 0 0 ${company.details.mainColor}) 
                      drop-shadow(0 0 0 ${company.details.mainColor})
                      drop-shadow(0 0 0 ${company.details.mainColor})
                      drop-shadow(0 0 0 ${company.details.mainColor})
                      drop-shadow(0 0 0 ${company.details.mainColor})`,
                        }}
                      />
                      <Styled.Title
                        style={{
                          color: company.details.mainColor,
                          fontFamily: getFontStyle(company.details.fontStyle),
                          marginLeft: "0vw",
                          fontSize: theme.fontSize.xxlg,
                        }}
                      >
                        Ofertas e Combos
                      </Styled.Title>
                    </Styled.TitleAndLogo>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                      }}
                    >
                      <Styled.ContainerCategories
                        style={{
                          height: "fit-content",
                        }}
                      >
                        {offersData
                          .filter((cate) => cate.isOffer)
                          .map((offerItem, index) => (
                            <div
                              onClick={() => {
                                setModal(true);
                                setmodalIten(offerItem);
                              }}
                            >
                              {offerItem && (
                                <>
                                  {offerItem.comboItens ? (
                                    <>
                                      <FoodCardOffer
                                        isCombo={true}
                                        bgColor={"white"}
                                        price={offerItem.price}
                                        color={theme.colors.yellow.palete}
                                        label={
                                          offerItem.title ? offerItem.title : ""
                                        }
                                        description={
                                          offerItem.descriptionText
                                            ? offerItem.descriptionText
                                            : ""
                                        }
                                        img={
                                          offerItem.banner
                                            ? offerItem.banner
                                            : ""
                                        }
                                        comboItens={offerItem.comboItens}
                                      />
                                    </>
                                  ) : (
                                    <>
                                      <FoodCardOffer
                                        isCombo={false}
                                        bgColor={theme.colors.blue.palete}
                                        oldPrice={offerItem.price}
                                        price={
                                          offerItem.offerPrice
                                            ? offerItem.offerPrice
                                            : ""
                                        }
                                        color={"#386641"}
                                        label={
                                          offerItem.label ? offerItem.label : ""
                                        }
                                        description={
                                          offerItem.description
                                            ? offerItem.description
                                            : ""
                                        }
                                        img={offerItem.img ? offerItem.img : ""}
                                      />
                                    </>
                                  )}
                                </>
                              )}
                            </div>
                          ))}
                      </Styled.ContainerCategories>
                    </div>
                  </>
                }
                outsideColor={company!.details.textColor}
                insideColor={company!.details.textColor}
                hasZeroPadding
              ></BorderPage>
            )}

            {company.details.socialMedia.address !== "" && (
              <BorderPage
                outsideColor={company!.details.textColor}
                insideColor={company.details.mainColor}
                destop={<></>}
                mobile={
                  <>
                    <Styled.TitleAndLogo
                      id="whereWeAre"
                      style={{
                        marginTop: "2vh",
                      }}
                    >
                      <Styled.LogoImg
                        src={renMarker}
                        alt="icone"
                        style={{
                          filter: `brightness(1000%) grayscale(100%) 
                        opacity(0.1)
                        contrast(1)
                        drop-shadow(0 0 0 ${company.details.textColor}) 
                        drop-shadow(0 0 0 ${company.details.textColor})
                        drop-shadow(0 0 0 ${company.details.textColor})
                        drop-shadow(0 0 0 ${company.details.textColor})
                        drop-shadow(0 0 0 ${company.details.textColor})`,
                        }}
                      />
                      <Styled.Title
                        style={{
                          color: company!.details.textColor,
                          fontFamily: getFontStyle(company.details.fontStyle),
                          marginLeft: "0vw",
                          fontSize: theme.fontSize.xxlg,
                        }}
                      >
                        Onde estamos:
                      </Styled.Title>
                    </Styled.TitleAndLogo>
                    <Styled.MapContainer>
                      {/*generateGoogleMaps(company.details.socialMedia.address)*/}
                      <iframe
                        title="Map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30571.286431759458!2d-49.280785039213846!3d-16.70634218493767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935ef12544136db3%3A0x1b20c322bbad1d83!2sGoi%C3%A2nia%20Shopping!5e0!3m2!1spt-BR!2sbr!4v1677269482432!5m2!1spt-BR!2sbr"
                        width={width - 25}
                        height="400"
                        style={{ border: "0", borderRadius: "25px" }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </Styled.MapContainer>
                  </>
                }
              ></BorderPage>
            )}

            {company.details.socialMedia.spotify && (
              <BorderPage
                outsideColor={company.details.mainColor}
                insideColor={company!.details.auxColor}
                destop={<></>}
                mobile={
                  <>
                    <Styled.TitleAndLogo
                      id="sound"
                      style={{
                        marginTop: "2vh",
                      }}
                    >
                      <Styled.LogoImg src={spotify} alt="icone" />
                      <Styled.Title
                        style={{
                          color: company.details.mainColor,
                          fontFamily: getFontStyle(company.details.fontStyle),
                          marginLeft: "0vw",
                          fontSize: theme.fontSize.xlg,
                        }}
                      >
                        Esse é o som do {company.title}
                      </Styled.Title>
                    </Styled.TitleAndLogo>
                    <Styled.MapContainer>
                      {generateSpotify(company.details.socialMedia.spotify)}
                    </Styled.MapContainer>
                  </>
                }
              ></BorderPage>
            )}

            {header.reservation && (
              <BorderPage
                outsideColor={company!.details.auxColor}
                insideColor={company!.details.textColor}
                destop={<></>}
                mobile={
                  <>
                    <Styled.TitleAndLogo
                      style={{
                        marginTop: "2vh",
                      }}
                    >
                      <Styled.LogoImg src={renReservation} alt="icone" />
                      <Styled.Title
                        style={{
                          color: company.details.mainColor,
                          fontFamily: getFontStyle(company.details.fontStyle),
                          marginLeft: "0vw",
                          fontSize: theme.fontSize.xlg,
                        }}
                      >
                        Faça sua reserva no {company.title}
                      </Styled.Title>
                    </Styled.TitleAndLogo>
                    <Styled.MapContainer>
                      <ButtonSecondary
                        action={() => {
                          setModalReservation(true);
                        }}
                        Label="clique e saiba mais."
                        color={company!.details.textColor}
                        bgColor={company.details.mainColor}
                      />
                    </Styled.MapContainer>
                  </>
                }
              ></BorderPage>
            )}
          </div>
          <Footer />
        </>
      ) : (
        <>
          <Styled.MainContainer
            style={{ backgroundColor: theme.colors.blue.palete }}
          >
            <Styled.Span
              style={{
                color: theme.colors.yellow.palete,
                fontFamily: theme.fonts.primary,
              }}
            >
              Carregando...
            </Styled.Span>
          </Styled.MainContainer>
        </>
      )}
    </>
  );
};

export default Menu;
