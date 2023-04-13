import React, { useEffect, useState } from "react";
import { TProducts } from "../../pages/menu";
import { theme } from "../../theme/theme";
import * as Styled from "./styles";

export interface IFood {
  label: string;
  color: string;
  description: string;
  img: string;
  fontStyle?: string;
  price: string;
  oldPrice?: string;
  isCombo: boolean;
  bgColor: string;
  categoryIcon?: string;
  category?: string;
  comboItens?: TProducts[];
}

const FoodCardOffer: React.FC<IFood> = ({
  fontStyle,
  color,
  label,
  description,
  img,
  price,
  bgColor,
  categoryIcon,
  category,
  oldPrice,
  isCombo,
  comboItens,
}) => {
  const [comboItensState, setComboIensState] = useState<any>();

  useEffect(() => {
    let itens = comboItens?.map((comboItem) => {
      return comboItem.label + ", ";
    });
    if (itens) {
      itens[itens.length - 1] = itens[itens.length - 1].slice(0, -2);
    }
    itens?.push(".");

    setComboIensState(itens);
  }, [comboItens]);

  return (
    <>
      {isCombo ? (
        <>
          <Styled.ComboContainer>
            <Styled.ComboImg src={img} />
            <Styled.Title
              style={{
                color: color,
                fontFamily: fontStyle,
              }}
            >
              {label}
            </Styled.Title>
            <Styled.ComboParagrah
              style={{
                fontFamily: theme.fonts.primary,
                fontSize: theme.fontSize.md2,
              }}
            >
              Itens do combo: {comboItensState}
            </Styled.ComboParagrah>

            <Styled.ComboParagrah>
              {description.substring(0, 170)}...
              <Styled.Anchor
                style={{
                  color: theme.colors.red.normal,
                }}
                onClick={() => {}}
              >
                {" "}
                ver mais...
              </Styled.Anchor>
            </Styled.ComboParagrah>

            <Styled.ComboPrice
              style={{
                color: "white",
              }}
            >
              <span> R$ {price}</span>
            </Styled.ComboPrice>
          </Styled.ComboContainer>
        </>
      ) : (
        <Styled.MainContainer
          style={{
            backgroundColor: bgColor,
          }}
        >
          {categoryIcon && categoryIcon && (
            <Styled.TitleAndLogo>
              <Styled.LogoImg src={categoryIcon} alt="icone" />
              <Styled.Title
                style={{
                  color: "white",
                  fontFamily: fontStyle,
                }}
              >
                {category}
              </Styled.Title>
            </Styled.TitleAndLogo>
          )}

          <Styled.Container
            style={{
              backgroundColor: "white",
            }}
          >
            <Styled.Img src={img} />
            <Styled.Title
              style={{
                color: color,
                fontFamily: fontStyle,
              }}
            >
              {label}
            </Styled.Title>
            <Styled.Description
              style={{
                marginBottom: label.length >= 25 ? "0px" : "0.7vh",
              }}
            >
              {description.substring(0, 120)}...
              <Styled.Anchor
                style={{
                  color: theme.colors.red.normal,
                }}
                onClick={() => {}}
              >
                {" "}
                ver mais...
              </Styled.Anchor>
            </Styled.Description>
            <Styled.OfferText>De:</Styled.OfferText>
            <Styled.PriceAux
              style={{
                color: "white",
                textDecoration: "line-through",
              }}
            >
              <span> R$ {oldPrice}</span>
            </Styled.PriceAux>
            <Styled.OfferText>Por:</Styled.OfferText>
            <Styled.Price
              style={{
                color: "white",
              }}
            >
              <span> R$ {price}</span>
            </Styled.Price>
          </Styled.Container>
        </Styled.MainContainer>
      )}
    </>
  );
};

export default FoodCardOffer;
