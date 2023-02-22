import React from "react";
import * as Styled from "./styles";

interface IBorderProps {
  destop: any;
  mobile: any;
  outsideColor: string;
  insideColor: string;
  isRow?: boolean;
}

const BorderPage: React.FC<IBorderProps> = ({
  destop,
  mobile,
  outsideColor,
  insideColor,
  isRow = false,
}) => {
  return (
    <>
      <Styled.MainContainer style={{ backgroundColor: outsideColor }}>
        <Styled.Container style={{ backgroundColor: insideColor }}>
          {destop}
        </Styled.Container>
        <Styled.ContainerMobile
          style={{
            backgroundColor: insideColor,
            flexDirection: isRow ? "row" : "column",
          }}
        >
          {mobile}
        </Styled.ContainerMobile>
      </Styled.MainContainer>
    </>
  );
};

export default BorderPage;
