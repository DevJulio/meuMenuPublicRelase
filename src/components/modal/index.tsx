import React, { ReactNode } from "react";

import * as Styled from "./styles";

interface Props {
  handleClose(value: boolean): void;
  children?: ReactNode;
  title: string;
  bannerColor: string;
  titleFont: string;
}

const Modal: React.FC<Props> = ({
  handleClose,
  children,
  title,
  bannerColor,
  titleFont,
}) => {
  return (
    <>
      <Styled.Container>
        <Styled.Content>
          <Styled.Header
            style={{ backgroundColor: bannerColor, fontFamily: titleFont }}
          >
            <Styled.Title>{title}</Styled.Title>
            <Styled.Close
              onClick={() => {
                handleClose(false);
              }}
            >
              X
            </Styled.Close>
          </Styled.Header>
          {children}
        </Styled.Content>
      </Styled.Container>
    </>
  );
};

export default Modal;
