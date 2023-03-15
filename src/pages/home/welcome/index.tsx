import React from "react";
import { theme } from "../../../theme/theme";
import * as Styled from "./styles";
import hamb from "../../../assets/banners/hamb.png";
import Homecard from "../../../components/homeCard";
import { Carousel } from "react-responsive-carousel";
import cardProps from "./cardsProps";
import ButtonPrimaryHome from "../../../components/buttons/homeBtn";
import { useNavigate } from "react-router-dom";
// import { Navigate } from "react-router-dom";

const Welcome: React.FC = () => {
  const mobile = require("is-mobile");
  const width = window.screen.width;
  const navigate = useNavigate();
  return (
    <>
      <Styled.MainContainer>
        <Styled.MainContainerLeft>
          <Styled.MainSpanContainer>
            <Styled.TitleSpan>Conheça o meu menu!</Styled.TitleSpan>
          </Styled.MainSpanContainer>
          <Styled.Spacer style={{ backgroundColor: theme.colors.red.normal }} />

          <Styled.Container>
            <Styled.ImgAndTextContainer>
              <Styled.ImgAndTextContainerLeft>
                <Styled.TextSpan style={{ width: "95%" }}>
                  Conheça o Meu Menu! a solução para restaurantes que tem a sua
                  identidade, sua cozinha e seu estabelecimento em um único
                  lugar. Automatize seu dia a dia, crie promoções, mostre aos
                  seus clientes qual é a especialidade da casa!
                </Styled.TextSpan>
                <Styled.TextSpan style={{ width: "95%" }}>
                  Conheça os planos clicando no botão a baixo, e comece seu
                  cadastro. Reuna todas redes sociais e localização, coloque no
                  mapa e online todas as formas de encontrar seu
                  estabelecimento. Escolha as melhores fotos para seu cardápio e
                  não se preocupe, altere todas as informações, como preço e
                  disponibilidade de maneira fácil e instantânea
                </Styled.TextSpan>
              </Styled.ImgAndTextContainerLeft>
              <Styled.ImgAndTextContainerRight>
                <Styled.Img src={hamb} />
              </Styled.ImgAndTextContainerRight>
            </Styled.ImgAndTextContainer>
            {!mobile() && (
              <>
                <Styled.BtnContainer>
                  {/* <Link to={"/planos"}>
                  </Link> */}
                  <ButtonPrimaryHome
                    action={() => {
                      navigate("/planos");
                    }}
                    Label="Clique e conheça os planos e condições!"
                  />
                </Styled.BtnContainer>
              </>
            )}
          </Styled.Container>
        </Styled.MainContainerLeft>

        <Styled.MainContainerRight>
          <Styled.ImgContainer>
            <Styled.Spacer
              style={{
                backgroundColor: theme.colors.yellow.palete,
                marginLeft: mobile() ? "7vw" : "1vw",
                marginTop: "2vh",
              }}
            />
            <Styled.TitleImgSpan>Sua vitrine digital</Styled.TitleImgSpan>
            <Styled.TitleImgAuxSpan>Fuja do comum!</Styled.TitleImgAuxSpan>

            <Styled.CardsContainerDesktop>
              <Styled.CardsContainer>
                <Homecard {...cardProps[0]} />
                <Homecard {...cardProps[2]} />
                <Homecard {...cardProps[1]} />
              </Styled.CardsContainer>
              <Styled.CardsContainer>
                <Homecard {...cardProps[3]} />
                <Homecard {...cardProps[4]} />
                <Homecard {...cardProps[5]} />
              </Styled.CardsContainer>
            </Styled.CardsContainerDesktop>

            <Styled.MainCardContainer>
              <Carousel
                showThumbs={false}
                width={width - 50}
                autoPlay={false}
                infiniteLoop={true}
                showArrows={true}
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
                  <Homecard {...cardProps[3]} />
                </Styled.CardsContainerMobile>
                <Styled.CardsContainerMobile>
                  <Homecard {...cardProps[5]} />
                </Styled.CardsContainerMobile>
                <Styled.CardsContainerMobile>
                  <Homecard {...cardProps[4]} />
                </Styled.CardsContainerMobile>
              </Carousel>
            </Styled.MainCardContainer>
          </Styled.ImgContainer>
          {mobile() && (
            <>
              <Styled.BtnContainer>
                <ButtonPrimaryHome
                  action={() => {}}
                  Label="Clique e conheça os planos e condições!"
                />
              </Styled.BtnContainer>
            </>
          )}
        </Styled.MainContainerRight>
      </Styled.MainContainer>
    </>
  );
};

export default Welcome;
