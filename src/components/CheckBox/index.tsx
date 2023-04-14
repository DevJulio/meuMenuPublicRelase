import React from "react";
import * as Styled from "./styles";
interface Props {
  setValue: Function;
  label: string;
  placeholder?: string;
  lblColor?: string;
  value?: boolean;
}
const Checkbox: React.FC<Props> = ({
  setValue,
  label,
  placeholder,
  lblColor,
  value,
}) => {
  return (
    <>
      <Styled.MainContainer>
        <Styled.Label style={{ color: lblColor ? lblColor : "white" }}>
          {label}
        </Styled.Label>
        <Styled.Input
          checked={value}
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
