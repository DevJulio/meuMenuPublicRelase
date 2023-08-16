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
  isRequired?: boolean;
  isDisabled?: boolean;
  isStartLbl?: boolean;
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
  isRequired,
  isDisabled,
  isStartLbl,
}) => {
  return (
    <>
      <Styled.MainContainer
        style={{
          color: labelColor ? labelColor : theme.colors.white.normal,
          alignItems: isStartLbl ? "center" : "inherit",
        }}
      >
        <Styled.InputRow>
          {label}
          {isRequired && <span className="span-required">*</span>}
        </Styled.InputRow>

        {isTextArea ? (
          <Styled.InputTextField
            style={{
              width: customWidth ? customWidth : "initial",
            }}
            rows={5}
            placeholder={placeholder ? placeholder : ""}
            defaultValue={value ? value : ""}
            onChange={(e: any) => {
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
            onChange={(e: any) => {
              setValue(e.target.value);
            }}
            disabled={isDisabled ? true : false}
          />
        ) : (
          <Styled.InputPw
            onChange={(e: any) => {
              setValue(e.target.value);
            }}
          />
        )}
      </Styled.MainContainer>
    </>
  );
};

export default Input;
