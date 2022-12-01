import React from "react";
import * as Styled from "./styles";
import { TCardProps } from "./card";
import { theme } from "../../theme/theme";
import ButtonSecondary from "../buttons/homeBtn";
import point from "../../assets/icons/cardsIcons/plans/point.png";

const PlansCard: React.FC<TCardProps> = ({
  icon,
  title,
  text,
  mainColor,
  auxColor,
  textColor,
  price,
  list,
  includeText,
  priceText,
  isLast,
}) => {
  setTimeout(() => {
    const element = document.querySelector(
      "#root > div:nth-child(3) > div.sc-bYMpWt.kyDhNb > div.sc-ehvNnt.jlTxA > div:nth-child(3) > div.sc-jRwbcX.jMlxSV > span"
    );
    const span = element as any;
    if (span) {
      span["style"].color = "#ffffff";
    }
  }, 150);

  return (
    <>
      <Styled.Container
        style={{
          backgroundColor: mainColor,
        }}
      >
        <Styled.TitleAndLogo>
          <Styled.LogoImg src={icon} alt="icone" />
          <Styled.Title style={{ color: auxColor }}>{title}</Styled.Title>
        </Styled.TitleAndLogo>
        <Styled.Paragraph style={{ color: textColor ? textColor : "#fff" }}>
          {text}
        </Styled.Paragraph>
        <Styled.PriceAndDescription>
          <Styled.Price style={{ color: theme.colors.gray.dark }}>
            R$
          </Styled.Price>
          <Styled.Price>{price}</Styled.Price>
          <Styled.PriceText>{priceText}</Styled.PriceText>
        </Styled.PriceAndDescription>
        <Styled.BtnContainer>
          <ButtonSecondary
            Action={() => {}}
            Label={"assinar e Começar cadastro!"}
            fontSize={theme.fontSize.md}
            color={isLast ? theme.colors.red.normal : theme.colors.white.normal}
            bgColor={
              isLast ? theme.colors.white.normal : theme.colors.red.normal
            }
          />
        </Styled.BtnContainer>
        <Styled.List>
          <Styled.Include
            style={{
              color: isLast
                ? theme.colors.white.normal
                : theme.colors.blue.palete,
            }}
          >
            {includeText}
          </Styled.Include>
          <>
            {list.map((text, id) => {
              return (
                <Styled.ListItem>
                  <Styled.ListImg src={point} />
                  <Styled.ListSpan>{text}</Styled.ListSpan>
                </Styled.ListItem>
              );
            })}
          </>
        </Styled.List>
      </Styled.Container>
    </>
  );
};

export default PlansCard;
