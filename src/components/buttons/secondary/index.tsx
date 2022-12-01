import React from "react";
import { theme } from "../../../theme/theme";
import * as Styled from "./styles";

interface Props {
  Action: Function;
  Label: string;
  color?: string;
  bgColor?: string;
  fontSize?: string;
}
const ButtonSecondary: React.FC<Props> = ({
  Action,
  Label,
  color,
  bgColor,
  fontSize,
}) => {
  return (
    <>
      <Styled.MainContainer>
        <Styled.Btn
          style={{
            color: color ? color : theme.colors.white.normal,
            backgroundColor: bgColor ? bgColor : theme.colors.red.normal,
            fontSize: fontSize ? fontSize : theme.fontSize.md2,
          }}
          onClick={() => {
            Action();
          }}
        >
          {Label}
        </Styled.Btn>
      </Styled.MainContainer>
    </>
  );
};

export default ButtonSecondary;
