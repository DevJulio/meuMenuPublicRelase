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
import reservation from "../../assets/banners/reservation.jpeg";

// 1367x404
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router-dom";
import instagram from "../../assets/icons/socialMedia/ios/instagram.png";
import spotify from "../../assets/icons/socialMedia/ios/spotify.png";
import youtube from "../../assets/icons/socialMedia/ios/youtube.png";
import whatsapp from "../../assets/icons/socialMedia/ios/whatsapp.png";
import marker from "../../assets/icons/socialMedia/ios/marker.png";
import BorderPage from "../../components/borderPage";
import InvertBorderPage from "../../components/invertBorderPage";
import FoodCard from "../../components/foodCard";
import HomeBanner from "../../components/homeBanner";
import foods from "./foods";

export type TProducts = {
  img: string;
  description: string;
  price: string;
  category: string;
  categoryIcon: string;
  label: string;
  isDestaque: boolean;
  isMainDestaque?: boolean;
  isDrink?: boolean;
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
    reservation: true,
    offersText: "Confira as promoções do Ren!",
    happyHourText: "É dia de happy hour no Ren!",
    reservationText: "Reserve sua mesa!",
    socialMedia: {
      instagram: { icon: instagram, link: "//" },
      spotify: { icon: spotify, link: "//" },
      youtube: { icon: youtube, link: "" },
      whatsapp: { icon: whatsapp, link: "//" },
      address: { icon: marker, link: "//" },
    },
  };

  //   "Entradas"
  //  "Primeiro Prato"
  //  "Prato Principal"
  //  "Sobremesas"
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
      label: "Entradas",
      color: "white",
      bgColor: "#386641",
      auxColor: header.auxColor,
      fontStyle: header.fontStyle,
    },

    {
      icon: drinks,
      label: "Primeiro Prato",
      color: "white",
      bgColor: "#386641",
      auxColor: header.auxColor,
      fontStyle: header.fontStyle,
    },

    {
      icon: sobremesa,
      label: "Prato Principal",
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

  const [defaultCategory, setDefaultCategory] = useState<string>("Todas");

  const width = window.screen.width;
  const navigate = useNavigate();

  const redirect = (id: number) => {
    if (id === 0) {
      navigate("/contato");
    }
    if (id === 1) {
      navigate("/contato");
    }
    if (id === 2) {
      navigate("/contato");
    }
  };

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
        {header.offers && header.hasHappyHour && header.reservation && (
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
                  <HomeBanner
                    bannerDateColor={header.auxColor}
                    bannerImg={happyhour}
                    infoSpan={header.happyHourText}
                    infoSpanColor={header.textColor}
                  />
                  <HomeBanner
                    bannerDateColor={header.textColor}
                    bannerImg={offers}
                    infoSpan={header.offersText}
                    infoSpanColor={header.auxColor}
                  />
                  <HomeBanner
                    bannerDateColor={header.auxColor}
                    bannerImg={reservation}
                    infoSpan={header.reservationText}
                    infoSpanColor={header.textColor}
                  />
                </Carousel>
              </Styled.CarouselContainer>
            </Styled.MainContainer>
          </>
        )}

        {header.offers && header.hasHappyHour && !header.reservation && (
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
                  <HomeBanner
                    bannerDateColor={header.auxColor}
                    bannerImg={happyhour}
                    infoSpan={header.happyHourText}
                    infoSpanColor={header.textColor}
                  />
                  <HomeBanner
                    bannerDateColor={header.textColor}
                    bannerImg={offers}
                    infoSpan={header.offersText}
                    infoSpanColor={header.auxColor}
                  />
                </Carousel>
              </Styled.CarouselContainer>
            </Styled.MainContainer>
          </>
        )}

        {header.offers && !header.hasHappyHour && header.reservation && (
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
                  <HomeBanner
                    bannerDateColor={header.textColor}
                    bannerImg={offers}
                    infoSpan={header.offersText}
                    infoSpanColor={header.auxColor}
                  />
                  <HomeBanner
                    bannerDateColor={header.auxColor}
                    bannerImg={reservation}
                    infoSpan={header.reservationText}
                    infoSpanColor={header.textColor}
                  />
                </Carousel>
              </Styled.CarouselContainer>
            </Styled.MainContainer>
          </>
        )}

        {!header.offers && header.hasHappyHour && header.reservation && (
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
                  <HomeBanner
                    bannerDateColor={header.auxColor}
                    bannerImg={happyhour}
                    infoSpan={header.happyHourText}
                    infoSpanColor={header.textColor}
                  />
                  <HomeBanner
                    bannerDateColor={header.auxColor}
                    bannerImg={reservation}
                    infoSpan={header.reservationText}
                    infoSpanColor={header.textColor}
                  />
                </Carousel>
              </Styled.CarouselContainer>
            </Styled.MainContainer>
          </>
        )}

        {header.hasHappyHour && !header.offers && !header.reservation && (
          <>
            <Styled.SingleBanner>
              <HomeBanner
                bannerDateColor={header.auxColor}
                bannerImg={happyhour}
                infoSpan={header.happyHourText}
                infoSpanColor={header.textColor}
              />
            </Styled.SingleBanner>
          </>
        )}
        {header.offers && !header.hasHappyHour && !header.reservation && (
          <>
            <Styled.SingleBanner>
              <HomeBanner
                bannerDateColor={header.textColor}
                bannerImg={offers}
                infoSpan={header.offersText}
                infoSpanColor={header.auxColor}
              />
            </Styled.SingleBanner>
          </>
        )}
        {header.reservation && !header.offers && !header.hasHappyHour && (
          <>
            <Styled.SingleBanner>
              <HomeBanner
                bannerDateColor={header.auxColor}
                bannerImg={reservation}
                infoSpan={header.reservationText}
                infoSpanColor={header.textColor}
              />
            </Styled.SingleBanner>
          </>
        )}
        <Styled.ContainerCategories>
          {categories.map((cateItem, index) => (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a
              onClick={() => {
                setDefaultCategory(cateItem.label);
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
            {defaultCategory === "Todas"
              ? foods
                  .filter((cate) => cate.isMainDestaque)
                  .map((foodItem, index) => (
                    <FoodCard
                      category=""
                      categoryIcon=""
                      bgColor={header.auxColor}
                      price={foodItem.price}
                      color={header.textColor}
                      label={foodItem.label}
                      description={foodItem.description}
                      img={foodItem.img}
                    />
                  ))
              : foods
                  .filter(
                    (cate) =>
                      cate.category === defaultCategory && cate.isDestaque
                  )
                  .map((foodItem, index) => (
                    <FoodCard
                      category=""
                      categoryIcon=""
                      bgColor={header.auxColor}
                      price={foodItem.price}
                      color={header.textColor}
                      label={foodItem.label}
                      description={foodItem.description}
                      img={foodItem.img}
                    />
                  ))}

            {/* foods
                  .filter((cate) => cate.category === defaultCategory)
                  .map((foodItem, index) => (
                    <FoodCard
                      category=""
                      categoryIcon=""
                      bgColor={header.auxColor}
                      price={foodItem.price}
                      color={header.textColor}
                      label={foodItem.label}
                      description={foodItem.description}
                      img={foodItem.img}
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
