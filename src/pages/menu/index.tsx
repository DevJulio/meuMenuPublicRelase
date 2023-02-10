import React, { useEffect, useState } from "react";
import Footer from "../../components/footer";
import HeaderCustom from "../../components/headerCustom";
import { theme } from "../../theme/theme";
import * as Styled from "./styles";
import ren from "../../assets/icons/ren.png";
import Category, { ICategory } from "../../components/category";

import all from "../../assets/icons/categories/ios/all.png";
import sobremesa from "../../assets/icons/categories/ios/sobremesa.png";
import drinks from "../../assets/icons/categories/ios/drinks.png";
import food from "../../assets/banners/menu/food.png";
import happyhour from "../../assets/banners/happyhour.jpg";
import offers from "../../assets/banners/offers.jpeg";

// 1367x404
import { Carousel } from "react-responsive-carousel";
import Homecard from "../../components/homeCard";
import { TCardProps } from "../../components/homeCard/card";
import { useNavigate } from "react-router-dom";
import instagram from "../../assets/icons/socialMedia/ios/instagram.png";
import spotify from "../../assets/icons/socialMedia/ios/spotify.png";
import youtube from "../../assets/icons/socialMedia/ios/youtube.png";
import whatsapp from "../../assets/icons/socialMedia/ios/whatsapp.png";
import marker from "../../assets/icons/socialMedia/ios/marker.png";
import BorderPage from "../../components/borderPage";
import InvertBorderPage from "../../components/invertBorderPage";
import FoodCard from "../../components/foodCard";
import { formatData } from "../../utils/parseDate";

export type TProducts = {
  img: string;
  description: string;
  price: string;
  category: string;
  categoryIcon: string;
  harmoziation?: string;
  heat?: string;
  images?: string[];
  country?: string;
  IBU?: string;
  grape?: string;
  drinkColor?: string;
};

const Menu: React.FC = () => {
  const header = {
    icon: ren,
    title: "Ren.",
    mainColor: "#F2E8CF",
    auxColor: "#BC4749",
    textColor: "#386641",
    fontStyle: theme.fonts.hand,
    fontStyleAux: theme.fonts.primary,
    wellcome: "Bem-vindo(a) ao Ren.",
    banner: food,
    offers: true,
    hasHappyHour: true,
    offersText: "Confira as promoções do Ren!",
    happyHourText: "É dia de happy hour no Ren!",
    socialMedia: {
      instagram: { icon: instagram, link: "//" },
      spotify: { icon: spotify, link: "//" },
      youtube: { icon: youtube, link: "" },
      whatsapp: { icon: whatsapp, link: "//" },
      address: { icon: marker, link: "//" },
    },
  };

  const categories: ICategory[] = [
    {
      icon: all,
      label: "Todas",
      color: "white",
      bgColor: "#386641",
      auxColor: header.auxColor,
      fontStyle: header.fontStyle,
    },

    {
      icon: sobremesa,
      label: "Sobremesas",
      color: "white",
      bgColor: "#386641",
      auxColor: header.auxColor,
      fontStyle: header.fontStyle,
    },

    {
      icon: drinks,
      label: "Drinks",
      color: "white",
      bgColor: "#386641",
      auxColor: header.auxColor,
      fontStyle: header.fontStyle,
    },

    {
      icon: sobremesa,
      label: "Prato principal",
      color: "white",
      bgColor: "#386641",
      auxColor: header.auxColor,
      fontStyle: header.fontStyle,
    },

    {
      icon: sobremesa,
      label: "Sobremesas",
      color: "white",
      bgColor: "#386641",
      auxColor: header.auxColor,
      fontStyle: header.fontStyle,
    },

    {
      icon: sobremesa,
      label: "Bebidas",
      color: "white",
      bgColor: "#386641",
      auxColor: header.auxColor,
      fontStyle: header.fontStyle,
    },
  ];

  const recomendationsRes: TProducts[] = [];

  const [defaultCategory, setDefaultCategory] = useState<number>(0);
  const [recomendations, setRecomendations] = useState<TProducts>();

  const width = window.screen.width;
  const navigate = useNavigate();

  const redirect = (id: number) => {
    if (id === 0) {
      navigate("/contato");
    }
    if (id === 1) {
      navigate("/contato");
    }
  };
  // const cardProps: TCardProps[] = [
  //   {
  //     icon: ideia,
  //     title: "Vá além do obvio",
  //     text: "Muito mais que um cardápio digital, traduza sua cozinha, ingredientes e serviços em cores, textos e imagens!",
  //     mainColor: theme.colors.white.normal,
  //     auxColor: theme.colors.red.normal,
  //     textColor: theme.colors.black.normal,
  //     customWidth: "10vw",
  //     fontFamily: header.fontStyle,
  //   },
  //   {
  //     icon: central,
  //     title: "Centralize suas informações",
  //     text: "Muito mais que um cardápio digital. Todas suas redes socias e contatos (até a playlist do spotify!) em um único lugar",
  //     mainColor: theme.colors.blue.palete,
  //     auxColor: theme.colors.white.normal,
  //     customWidth: "10vw",
  //     fontFamily: header.fontStyle,
  //   },
  //   {
  //     icon: visita,
  //     title: "Use fora das 4 paredes",
  //     text: "Muito mais que um cardápio digital! é o cartão de visitas online, é o site com todas as formas de ser encontrado.",
  //     mainColor: theme.colors.yellow.palete,
  //     auxColor: "",
  //     textColor: theme.colors.black.normal,
  //     customWidth: "10vw",
  //     fontFamily: header.fontStyle,
  //   },
  //   {
  //     icon: personalizar,
  //     title: "Personalização e Facilidade",
  //     text: "Muito mais que um cardápio digital! Traduza a cozinha, seus ingredientes, seus serviços em cores, textos e imagens!",
  //     mainColor: theme.colors.blue.palete,
  //     auxColor: theme.colors.red.normal,
  //     customWidth: "10vw",
  //     fontFamily: header.fontStyle,
  //   },
  //   {
  //     icon: easy,
  //     title: "Leve e fácil de usar",
  //     text: "Muito mais que um cardápio digital! Funciona na maioria dos dispositivos sem problemas e é extremamente leve e modular.",
  //     mainColor: theme.colors.white.normal,
  //     auxColor: theme.colors.red.normal,
  //     textColor: theme.colors.black.normal,
  //     customWidth: "10vw",
  //     fontFamily: header.fontStyle,
  //   },
  //   {
  //     icon: sail,
  //     title: "E muito mais do que isso!",
  //     text: "Muito mais que um cardápio digital! Faça parte da rede Meu menu e expanda cada vez mais seus horizontes!",
  //     mainColor: theme.colors.yellow.palete,
  //     auxColor: theme.colors.blue.palete,
  //     textColor: theme.colors.blue.palete,
  //     customWidth: "10vw",
  //     fontFamily: header.fontStyle,
  //   },
  // ];

  const checkFlexSize = () => {
    let count = 0;
    if (header.socialMedia.address.link) {
      count = count++;
    }
    if (header.socialMedia.instagram.link) {
      count = count++;
    }
    if (header.socialMedia.spotify.link) {
      count = count++;
    }
    if (header.socialMedia.whatsapp.link) {
      count = count++;
    }
    if (header.socialMedia.youtube.link) {
      count = count++;
    }
    return count;
  };

  const socialFlexCount = checkFlexSize();

  useEffect(() => {
    // setRecomendations(recomendationsRes[defaultCategory]);
    console.log(defaultCategory);
  }, [defaultCategory]);

  return (
    <>
      <HeaderCustom
        icon={header.icon}
        title={header.title}
        mainColor={header.mainColor}
        textColor={header.textColor}
        fontStyle={header.fontStyle}
        auxColor={header.auxColor}
        fontStyleAux={header.fontStyleAux}
      />
      <Styled.MainContainer style={{ backgroundColor: header.mainColor }}>
        <Styled.Span
          style={{ color: header.textColor, fontFamily: header.fontStyle }}
        >
          {header.wellcome}
        </Styled.Span>
        <Styled.BannerContainer>
          <Styled.Banner src={header.banner} />
        </Styled.BannerContainer>
        {header.offers && header.hasHappyHour && (
          <>
            <Styled.MainContainer
              style={{
                backgroundColor: header.mainColor,
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
                  <Styled.BannerCarousel>
                    <Styled.BannerDate
                      style={{
                        color: header.auxColor,
                      }}
                    >
                      <Styled.DateSpan>
                        {new Date().getDate()}/{new Date().getMonth() + 1}
                      </Styled.DateSpan>
                      <Styled.DateSpan>{formatData()}</Styled.DateSpan>
                      <Styled.DateSpan
                        style={{
                          fontSize: "12px",
                          color: "black",
                        }}
                      >
                        clique e saiba mais
                      </Styled.DateSpan>
                    </Styled.BannerDate>
                    <Styled.BannerInfo>
                      <Styled.BannerImg src={happyhour} />
                      <Styled.InfoSpan
                        style={{
                          color: header.textColor,
                        }}
                      >
                        {header.happyHourText}
                      </Styled.InfoSpan>
                    </Styled.BannerInfo>
                  </Styled.BannerCarousel>

                  <Styled.BannerCarousel>
                    <Styled.BannerDate
                      style={{
                        color: header.textColor,
                      }}
                    >
                      <Styled.DateSpan>
                        {new Date().getDate()}/{new Date().getMonth() + 1}
                      </Styled.DateSpan>
                      <Styled.DateSpan>{formatData()}</Styled.DateSpan>
                      <Styled.DateSpan
                        style={{
                          fontSize: "12px",
                          color: "black",
                        }}
                      >
                        clique e saiba mais
                      </Styled.DateSpan>
                    </Styled.BannerDate>
                    <Styled.BannerInfo>
                      <Styled.BannerImg src={offers} />
                      <Styled.InfoSpan
                        style={{
                          color: header.auxColor,
                        }}
                      >
                        {header.offersText}
                      </Styled.InfoSpan>
                    </Styled.BannerInfo>
                  </Styled.BannerCarousel>
                </Carousel>
              </Styled.CarouselContainer>
            </Styled.MainContainer>
          </>
        )}
        {header.hasHappyHour && !header.offers && (
          <>
            <Styled.SingleBanner>
              <Styled.BannerCarousel>
                <Styled.BannerDate
                  style={{
                    color: header.auxColor,
                  }}
                >
                  <Styled.DateSpan>
                    {new Date().getDate()}/{new Date().getMonth() + 1}
                  </Styled.DateSpan>
                  <Styled.DateSpan
                    style={{
                      fontSize: "12px",
                      color: "black",
                    }}
                  >
                    clique e saiba mais
                  </Styled.DateSpan>
                  <Styled.DateSpan>{formatData()}</Styled.DateSpan>
                </Styled.BannerDate>
                <Styled.BannerInfo>
                  <Styled.BannerImg src={happyhour} />
                  <Styled.InfoSpan
                    style={{
                      color: header.textColor,
                    }}
                  >
                    {header.happyHourText}
                  </Styled.InfoSpan>
                </Styled.BannerInfo>
              </Styled.BannerCarousel>
            </Styled.SingleBanner>
          </>
        )}
        {header.offers && !header.hasHappyHour && (
          <>
            <Styled.SingleBanner>
              <Styled.BannerCarousel>
                <Styled.BannerDate
                  style={{
                    color: header.textColor,
                  }}
                >
                  <Styled.DateSpan>
                    {new Date().getDate()}/{new Date().getMonth() + 1}
                  </Styled.DateSpan>
                  <Styled.DateSpan>{formatData()}</Styled.DateSpan>
                  <Styled.DateSpan
                    style={{
                      fontSize: "12px",
                      color: "black",
                    }}
                  >
                    clique e saiba mais
                  </Styled.DateSpan>
                </Styled.BannerDate>
                <Styled.BannerInfo>
                  <Styled.BannerImg src={offers} />
                  <Styled.InfoSpan
                    style={{
                      color: header.auxColor,
                    }}
                  >
                    {header.offersText}
                  </Styled.InfoSpan>
                </Styled.BannerInfo>
              </Styled.BannerCarousel>
            </Styled.SingleBanner>
          </>
        )}
        <Styled.ContainerCategories>
          {categories.map((cateItem, index) => (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a
              onClick={() => {
                setDefaultCategory(index);
              }}
            >
              <Category
                id={index + 1}
                icon={cateItem.icon}
                label={cateItem.label}
                color={cateItem.color}
                bgColor={cateItem.bgColor}
                auxColor={cateItem.auxColor}
                fontStyle={cateItem.fontStyle}
              />
            </a>
          ))}
        </Styled.ContainerCategories>
        {categories.length >= 3 && (
          <>
            <Styled.Arrow
              style={{ color: header.auxColor, fontFamily: header.fontStyle }}
            >
              Confira todo nosso menu! ➜
            </Styled.Arrow>
          </>
        )}
        <Styled.CarouselContainer>
          <Styled.Title
            style={{
              color: header.textColor,

              fontFamily: header.fontStyleAux,
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
            <FoodCard
              category=""
              categoryIcon=""
              bgColor={header.auxColor}
              price={25.0}
              color={header.textColor}
              label={"Antepasto de tomate"}
              description={
                "Esse prato é uma salada de entrada típica da culinária italiana, feita com tomates frescos cortados em cubos e temperados com azeite, vinagre balsâmico, sal, pimenta e ervas frescas como manjericão e orégano. É servido com azeitonas, queijo búfala mozzarella."
              }
              img={
                "https://melepimenta.com/wp-content/uploads/2013/02/Antepasto-a-espanhola-Baixa-2.jpg"
              }
            />
            <FoodCard
              category=""
              categoryIcon=""
              bgColor={header.auxColor}
              price={25.0}
              color={header.textColor}
              label={"Antepasto de tomate"}
              description={
                "Esse prato é uma salada de entrada típica da culinária italiana, feita com tomates frescos cortados em cubos e temperados com azeite, vinagre balsâmico, sal, pimenta e ervas frescas como manjericão e orégano. É servido com azeitonas, queijo búfala mozzarella."
              }
              img={
                "https://melepimenta.com/wp-content/uploads/2013/02/Antepasto-a-espanhola-Baixa-2.jpg"
              }
            />
            <FoodCard
              category=""
              categoryIcon=""
              bgColor={header.auxColor}
              price={25.0}
              color={header.textColor}
              label={"Antepasto de tomate"}
              description={
                "Esse prato é uma salada de entrada típica da culinária italiana, feita com tomates frescos cortados em cubos e temperados com azeite, vinagre balsâmico, sal, pimenta e ervas frescas como manjericão e orégano. É servido com azeitonas, queijo búfala mozzarella."
              }
              img={
                "https://melepimenta.com/wp-content/uploads/2013/02/Antepasto-a-espanhola-Baixa-2.jpg"
              }
            />
            <FoodCard
              category=""
              categoryIcon=""
              bgColor={header.auxColor}
              price={25.0}
              color={header.textColor}
              label={"Antepasto de tomate"}
              description={
                "Esse prato é uma salada de entrada típica da culinária italiana, feita com tomates frescos cortados em cubos e temperados com azeite, vinagre balsâmico, sal, pimenta e ervas frescas como manjericão e orégano. É servido com azeitonas, queijo búfala mozzarella."
              }
              img={
                "https://melepimenta.com/wp-content/uploads/2013/02/Antepasto-a-espanhola-Baixa-2.jpg"
              }
            />

            {/* {categories.map((cateItem, index) => (
              <Category
                id={index + 1}
                icon={cateItem.icon}
                label={cateItem.label}
                color={cateItem.color}
                bgColor={cateItem.bgColor}
                auxColor={cateItem.auxColor}
                fontStyle={cateItem.fontStyle}
              />
            ))} */}
          </Styled.ContainerCategories>
        </Styled.CarouselContainer>
        <Styled.SocialMediaContainer
          style={{ backgroundColor: header.textColor, flex: socialFlexCount }}
        >
          {header.socialMedia.address.link && (
            <>
              <Styled.Icon src={header.socialMedia.address.icon} />
            </>
          )}
          {header.socialMedia.instagram.link && (
            <>
              <Styled.Icon src={header.socialMedia.instagram.icon} />
            </>
          )}
          {header.socialMedia.spotify.link && (
            <>
              <Styled.Icon src={header.socialMedia.spotify.icon} />
            </>
          )}
          {header.socialMedia.whatsapp.link && (
            <>
              <Styled.Icon src={header.socialMedia.whatsapp.icon} />
            </>
          )}
          {header.socialMedia.youtube.link && (
            <>
              <Styled.Icon src={header.socialMedia.youtube.icon} />
            </>
          )}
        </Styled.SocialMediaContainer>
        {/* BORDER PAGE NA COR SECUNDÁRIA: */}
      </Styled.MainContainer>
      {/* <Styled.MainRoundDiv style={{ backgroundColor: header.textColor }}>
        <Styled.AuxRoundDiv
          style={{ backgroundColor: header.mainColor }}
        ></Styled.AuxRoundDiv>
      </Styled.MainRoundDiv> */}
      {/* <BorderPage
        destop={undefined}
        mobile={undefined}
        outsideColor={header.mainColor}
        insideColor={header.textColor}
      ></BorderPage> */}
      {/* <Footer /> */}
      {/* <Carousel
        width={width - 50}
        autoPlay={true}
        infiniteLoop={true}
        showArrows={true}
        onClickItem={(id) => {
          redirect(id);
        }}
      >
        <Styled.CardsContainerMobile>
           <Homecard {...cardProps[0]} />
        </Styled.CardsContainerMobile>
        <Styled.CardsContainerMobile>
          <Homecard {...cardProps[2]} />
        </Styled.CardsContainerMobile>
        <Styled.CardsContainerMobile>
          <Homecard {...cardProps[1]} />
        </Styled.CardsContainerMobile>
        <Styled.CardsContainerMobile>
          <Homecard {...cardProps[4]} />
        </Styled.CardsContainerMobile>
        <Styled.CardsContainerMobile>
          <Homecard {...cardProps[3]} />
        </Styled.CardsContainerMobile>
      </Carousel> */}
    </>
  );
};

export default Menu;
