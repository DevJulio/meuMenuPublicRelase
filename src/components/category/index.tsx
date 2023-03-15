import { log } from "console";
import React, { useState } from "react";
import * as Styled from "./styles";

export interface ICategory {
  icon: string;
  label: string;
  color: string;
  bgColor: string;
  auxColor: string;
  fontStyle: string;
  fontColor?: string;
  id?: number;
}

const Category: React.FC<ICategory> = ({
  icon,
  label,
  color,
  bgColor,
  auxColor,
  fontStyle,
  fontColor,
  id,
}) => {
  return (
    <Styled.Container
      id={id ? id.toString() : ""}
      style={{
        backgroundColor: id === 1 ? auxColor : bgColor,
        minWidth: id === 1 ? "200px" : "78px",
        fontFamily: fontStyle,
        color: color,
      }}
      onMouseOver={() => {
        const div = document.getElementById(id ? id.toString() : "");
        const divFirst = document.getElementById("1");
        if (divFirst) {
          divFirst.style.backgroundColor = bgColor;
        }
        if (div) {
          if (divFirst) {
            divFirst.style.minWidth = "78px";
          }
          div.style.minWidth = "200px";
          div.style.backgroundColor = auxColor;
        }
      }}
      onMouseOut={() => {
        const div = document.getElementById(id ? id.toString() : "");
        // const divFirst = document.getElementById("1");
        if (div) {
          div.style.backgroundColor = bgColor;
          div.style.minWidth = "78px";
        }
      }}
    >
      <img src={icon} alt="icon" />
      <span
        style={{
          color: fontColor,
        }}
        id={id ? id.toString() + "Span" : ""}
      >
        {label}
      </span>
    </Styled.Container>
  );
};

export default Category;
