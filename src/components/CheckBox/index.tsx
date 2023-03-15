import React from "react";
import * as Styled from "./styles";
interface Props {
  setValue: Function;
  label: string;
  placeholder?: string;
}
const Checkbox: React.FC<Props> = ({ setValue, label, placeholder }) => {
  return (
    <>
      <Styled.MainContainer>
        {label}
        <Styled.Input
          placeholder={placeholder}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </Styled.MainContainer>
    </>
  );
};

export default Checkbox;
