import styled from "styled-components";
import about1 from "../../../assets/banners/about1.jpeg";
import banner from "../../../assets/banners/banner.jpeg";

export const Span = styled.span`
  color: ${({ theme }) => theme.colors.yellow.palete};
  display: flex;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSize.xxlg};
  @media ${({ theme }) => theme.devices.tablet} {
    font-size: ${({ theme }) => theme.fontSize.lg};
  }
`;

export const SpanAux = styled.span`
  color: ${({ theme }) => theme.colors.blue.palete};
  display: flex;
  font-family: ${({ theme }) => theme.fonts.primary};
  argin-right: auto;
  font-size: ${({ theme }) => theme.fontSize.lg};
  @media ${({ theme }) => theme.devices.tablet} {
    font-size: ${({ theme }) => theme.fontSize.sm};
    display: flex;
    text-align: center;
    width: 95%;
  }
`;

export const MainSpanContainer = styled.div`
  display: flex;
  align-items: center;
  background-image: url(${about1});
  background-repeat: no-repeat;
  padding-inline: 8vw;
  width: 32%;
  height: 22vh;
  background-position: center;
  background-color: ${({ theme }) => theme.colors.white.normal};
  flex-direction: column;
  border-radius: 25px;
  padding: 2vh;
  justify-content: center;
  @media ${({ theme }) => theme.devices.tablet} {
  }
`;

export const MainImgContainer = styled.div`
  background-image: url(${banner});
  background-repeat: no-repeat;
  display: flex;
  width: 95%;
  border-radius: 25px;
  margin-top: 4vh;
  height: 78vh;
  place-content: center;
  background-size: cover;
  align-items: center;
  @media ${({ theme }) => theme.devices.tablet} {
  }
`;

export const AuxMainSpanContainer = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  background-position: center;
  background-color: ${({ theme }) => theme.colors.white.normal};
  flex-direction: column;
  border-radius: 25px;
  padding: 2vh;
  @media ${({ theme }) => theme.devices.tablet} {
  }
`;
export const SpanAndIcon = styled.div`
  display: flex;
  flex-direction: row;
  @media ${({ theme }) => theme.devices.tablet} {
    flex-direction: column;
  }
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  justify-content: center;
  @media ${({ theme }) => theme.devices.tablet} {
    flex-direction: column;
  }
`;

export const LogoImg = styled.img`
  display: flex;
  max-width: 60px;
`;

export const Title = styled.span`
  color: ${({ theme }) => theme.colors.red.normal};
  display: flex;
  margin-right: 12px;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSize.xxlg};
  @media ${({ theme }) => theme.devices.tablet} {
    font-size: ${({ theme }) => theme.fontSize.lg};
  }
`;

export const TitleAux = styled.span`
  color: ${({ theme }) => theme.colors.blue.palete};
  display: flex;
  margin-right: 12px;
  font-family: ${({ theme }) => theme.fonts.secundary};
  font-size: ${({ theme }) => theme.fontSize.md};
  @media ${({ theme }) => theme.devices.tablet} {
    font-size: ${({ theme }) => theme.fontSize.sm};
    display: flex;
    text-align: center;
    width: 95%;
  }
`;

export const MainTitleContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  @media ${({ theme }) => theme.devices.tablet} {
  }
`;
