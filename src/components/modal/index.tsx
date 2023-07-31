import React, { ReactNode } from "react";

import * as Styled from "./styles";

interface Props {
  handleClose(value: boolean): void;
  children?: ReactNode;
  title: string;
  bannerColor: string;
  titleFont: string;
  customWidth?: number;
  footerLabel?: string;
  footerMaior?: string;
  money?: boolean;
}

const Modal: React.FC<Props> = ({
  handleClose,
  children,
  title,
  bannerColor,
  titleFont,
  customWidth,
  footerLabel,
  footerMaior,
  money = false,
}) => {
  return (
    <>
      <Styled.Container>
        <Styled.Content
          style={{ width: customWidth ? `${customWidth}%` : "60%" }}
        >
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
          {footerLabel && (
            <Styled.Footer
              style={{ backgroundColor: bannerColor, fontFamily: titleFont }}
            >
              <Styled.FooterContainer>
                <Styled.FooterLbl>{footerLabel}</Styled.FooterLbl>
                {money && (
                  <Styled.FooterLbl
                    style={{
                      marginInline: "2vw",
                    }}
                  >
                    R$
                  </Styled.FooterLbl>
                )}
                <Styled.FooterMaior>{footerMaior}</Styled.FooterMaior>
              </Styled.FooterContainer>
            </Styled.Footer>
          )}
        </Styled.Content>
      </Styled.Container>
    </>
  );
};

export default Modal;
