import React from "react";
import * as Styled from "./styles";

interface Props {
  color: string;
  customWidth?: string;
  customHeight?: string;
  disable?: boolean;
}
const Spacer: React.FC<Props> = ({ color, customWidth, customHeight }) => {
  return (
    <>
      <Styled.Spacer
        style={{
          backgroundColor: color,
          width: customWidth ? customWidth : "3vw",
          height: customHeight ? customHeight : "16px",
        }}
      />
    </>
  );
};

export default Spacer;
