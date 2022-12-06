import React from "react";
import { theme } from "../../../theme/theme";
import * as Styled from "./styles";
import hamb from "../../../assets/banners/hamb.png";
import Homecard from "../../../components/homeCard";
import { Carousel } from "react-responsive-carousel";
import cardProps from "./cardsProps";
import ButtonPrimaryHome from "../../../components/buttons/homeBtn";

const Welcome: React.FC = () => {
  const mobile = require("is-mobile");
  const width = window.screen.width;

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
                  identidade, sua cozinha e seu estabelecimento em um único lugar. 
                  aliquam id, voluptatum eum labore nulla, quam explicabo, culpa
                  iusto! Doloribus, temporibus facere. Officiis.
                </Styled.TextSpan>
                <Styled.TextSpan style={{ width: "95%" }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis
                  accusamus in voluptates provident totam sapiente corrupti
                  aliquam id, voluptatum eum labore nulla, quam explicabo, culpa
                  iusto! Doloribus, temporibus facere. Officiis.
                </Styled.TextSpan>
              </Styled.ImgAndTextContainerLeft>
              <Styled.ImgAndTextContainerRight>
                <Styled.Img src={hamb} />
              </Styled.ImgAndTextContainerRight>
            </Styled.ImgAndTextContainer>
            {!mobile() && (
              <>
                <Styled.BtnContainer>
                  <ButtonPrimaryHome
                    Action={() => {}}
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
                  Action={() => {}}
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
