import React from "react";
import { theme } from "../../theme/theme";
import * as Styled from "./styles";
interface Props {
  setValue: Function;
  label: string;
  labelColor?: string;
  customWidth?: string;
  isPassowd?: boolean;
  isTextArea?: boolean;
  value?: string;
  placeholder?: string;
}
const Input: React.FC<Props> = ({
  setValue,
  label,
  labelColor,
  isPassowd,
  value,
  placeholder,
  isTextArea,
  customWidth,
}) => {
  return (
    <>
      <Styled.MainContainer
        style={{ color: labelColor ? labelColor : theme.colors.white.normal }}
      >
        {label}
        {isTextArea ? (
          <Styled.InputTextField
            style={{
              width: customWidth ? customWidth : "initial",
            }}
            rows={5}
            placeholder={placeholder ? placeholder : ""}
            defaultValue={value ? value : ""}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        ) : !isPassowd ? (
          <Styled.Input
            style={{
              width: customWidth ? customWidth : "initial",
            }}
            placeholder={placeholder ? placeholder : ""}
            defaultValue={value ? value : ""}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        ) : (
          <Styled.InputPw
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        )}
      </Styled.MainContainer>
    </>
  );
};

export default Input;
