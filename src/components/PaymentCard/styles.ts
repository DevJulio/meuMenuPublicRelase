import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IContainer {
  disable: boolean;
}

export const CardDetails = styled.div<IContainer>`
  display: flex;
  overflow: hidden;
  transition: max-height ${({ theme }) => theme.animation.duration};
  will-change: max-height;
  max-height: ${({ disable }) => (disable ? "100%" : "0px")};
  border-style: solid;
  box-sizing: border-box;
  border-width: 2px;
  border-color: ${({ theme, disable }) =>
    disable ? theme.colors.gray.light : theme.colors.white.normal};
  @media ${({ theme }) => theme.devices.tablet} {
    flex-direction: column;
    align-self: center;
    width: 100%;
    height: ${({ disable }) => (disable ? "100%" : "0px")};
  }
`;
export const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  align-items: stretch;
  padding: 15px 0px 15px 0px;
  @media ${({ theme }) => theme.devices.tablet} {
    padding: 0px 0px 15px 0px;
  }
`;

export const CardsBtnContainer = styled.div`
  display: flex;
  align-self: center;
  flex-direction: column;
  margin-left: auto;
  padding-right: 15px;
  @media ${({ theme }) => theme.devices.tablet} {
    margin-left: inherit;
    padding-right: inherit;
  }
`;

export const CardAdressContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
`;
export const CardContainerTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.gray.light};
  color: ${({ theme }) => theme.colors.gray.dark};
  padding: 10px;
  @media ${({ theme }) => theme.devices.tablet} {
    padding: 5px;
  }
`;
export const CardContainerExpireTitle = styled.div`
  display: flex;
  margin-left: auto;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white.normal};
`;

export const Title = styled.span`
  color: ${({ theme }) => theme.colors.green.normal};
  font-weight: bold;
  padding: 10px 10px 10px 20px;
`;

export const Lbl = styled.span`
  color: ${({ theme }) => theme.colors.gray.normal};
  padding: 0px 0px 0px 20px;
  font-weight: 500;
  font-size: ${({ theme }) => theme.fontSize.sm};
`;
export const CardAddresLabel = styled.label`
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.gray.dark};
  font-size: ${({ theme }) => theme.fontSize.mm};
  letter-spacing: 2px;
  font-weight: 600;
  padding: 15px 10px 0px 20px;
`;

export const CardBannerIconContainer = styled.div`
  display: flex;
  max-width: 35px;
  max-height: 35px;
  align-items: center;
  padding-inline: 10px;
  @media ${({ theme }) => theme.devices.tablet} {
    align-self: center;
  }
`;

export const ToggleIcon = styled(FontAwesomeIcon)`
  border-style: none;
  display: flex;
  margin: auto 0 auto 40px;
  font-size: 20px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.gray.dark};
`;

export const CardItem = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 20px;
`;

export const ConfirmSpan = styled.span`
  color: ${({ theme }) => theme.colors.black.normal};
  padding: 0px 0px 10px 0px;
  font-weight: 500;

  font-size: ${({ theme }) => theme.fontSize.md};
`;
