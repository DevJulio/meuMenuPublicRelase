import React from "react";
import * as Styled from "./styles";

export interface IFood {
  label: string;
  color: string;
  description: string;
  img: string;
  fontStyle?: string;
  price: string;
  bgColor: string;
  categoryIcon?: string;
  category?: string;
}

const FoodCard: React.FC<IFood> = ({
  fontStyle,
  color,
  label,
  description,
  img,
  price,
  bgColor,
  categoryIcon,
  category,
}) => {
  return (
    <Styled.MainContainer
      style={{
        backgroundColor: color,
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

      <Styled.Container>
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
            marginBottom: label.length >= 25 ? "0px" : "3.7vh",
          }}
        >
          {description.substring(0, 120)}...
          <Styled.Anchor
            style={{
              color: bgColor,
            }}
            onClick={() => {}}
          >
            {" "}
            ver mais...
          </Styled.Anchor>
        </Styled.Description>
        <Styled.Price
          style={{
            backgroundColor: bgColor,
            color: "white",
          }}
        >
          <span> R$ {price}</span>
        </Styled.Price>
      </Styled.Container>
    </Styled.MainContainer>
  );
};

export default FoodCard;
