import React from "react";
import * as Styled from "./styles";
import { TCardProps } from "./card";

const Homecard: React.FC<TCardProps> = ({
  icon,
  title,
  text,
  mainColor,
  auxColor,
  textColor,
  customWidth,
  fontFamily,
}) => {
  const mobile = require("is-mobile");

  return (
    <>
      {!customWidth ? (
        <Styled.Container
          style={{
            backgroundColor: mainColor,
            width: mobile ? "80%" : "13%",
          }}
        >
          <Styled.Title style={{ color: auxColor, fontFamily: fontFamily }}>
            {title}
          </Styled.Title>
          <Styled.LogoImg src={icon} alt="icone" />
          <Styled.Paragraph style={{ color: textColor ? textColor : "#fff" }}>
            {text}
          </Styled.Paragraph>
        </Styled.Container>
      ) : (
        <Styled.ContainerAux
          style={{
            backgroundColor: mainColor,
            width: mobile ? "80%" : "13%",
          }}
        >
          <Styled.Title style={{ color: auxColor, fontFamily: fontFamily }}>
            {title}
          </Styled.Title>
          <Styled.LogoImg src={icon} alt="icone" />
          <Styled.Paragraph style={{ color: textColor ? textColor : "#fff" }}>
            {text}
          </Styled.Paragraph>
        </Styled.ContainerAux>
      )}
    </>
  );
};

export default Homecard;
