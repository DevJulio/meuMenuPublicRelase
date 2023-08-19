import React from "react";
import { theme } from "../../../theme/theme";
import * as Styled from "./styles";

interface Props {
  action: Function;
  Label: string;
  color?: string;
  bgColor?: string;
  fontSize?: string;
  minWidth?: string;
  isDisabled?: boolean;
}
const ButtonSecondary: React.FC<Props> = ({
  action,
  Label,
  color,
  bgColor,
  fontSize,
  minWidth,
  isDisabled,
}) => {
  return (
    <>
      <Styled.MainContainer>
        <Styled.Btn
          disabled={isDisabled ? true : false}
          style={{
            color: color ? color : theme.colors.white.normal,
            backgroundColor: bgColor ? bgColor : theme.colors.red.normal,
            fontSize: fontSize ? fontSize : theme.fontSize.md2,
            minWidth: minWidth ? minWidth : "275px",
          }}
          onClick={() => {
            action();
          }}
        >
          {Label}
        </Styled.Btn>
      </Styled.MainContainer>
    </>
  );
};

export default ButtonSecondary;
