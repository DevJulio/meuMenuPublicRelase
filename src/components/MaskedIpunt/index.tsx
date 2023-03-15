import React from "react";
import * as Styled from "./styles";
interface Props {
  setValue: Function;
  label: string;
  placeholder?: string;
  mask?: string;
}
const InputMasked: React.FC<Props> = ({
  setValue,
  label,
  placeholder,
  mask = "",
}) => {
  return (
    <>
      <Styled.MainContainer>
        {label}
        <Styled.InputMaskHtml
          placeholder={placeholder}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          mask={mask}
        ></Styled.InputMaskHtml>
      </Styled.MainContainer>
    </>
  );
};

export default InputMasked;
