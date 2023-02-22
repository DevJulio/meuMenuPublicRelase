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
    width: 100%;

  }
`;

export const SpanAux = styled.span`
  color: ${({ theme }) => theme.colors.blue.palete};
  display: flex;
  margin-top: 1vh;
  font-family: ${({ theme }) => theme.fonts.primary};
  argin-right: auto;
  font-size: ${({ theme }) => theme.fontSize.lg};
  @media ${({ theme }) => theme.devices.tablet} {
     display: flex;
    text-align: center;
    width: 100%;
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
    padding: 1vh;
    justify-content: center;
  }
`;
export const SpanAndIcon = styled.div`
  display: flex;
  flex-direction: row;
  @media ${({ theme }) => theme.devices.tablet} {
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


export const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 95%;
  border-radius: 25px;
   margin-bottom: 3vh;
  flex: 2;
  // background-color: ${({ theme }) => theme.colors.yellow.palete};
   @media ${({ theme }) => theme.devices.tablet} {
    flex-direction: column;
   }

`;

export const MainContainerLeft = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
   flex: 1;
  padding-left: 10.5vh;
  @media ${({ theme }) => theme.devices.tablet} {
    align-items: center;
    padding-left: 0vh;
    width: 100%;
  }
`;


export const MainContainerRight = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 50%;
  padding-top: 1vh;
  @media ${({ theme }) => theme.devices.tablet} {
    align-items: center;
    width: 100%;
    padding-bottom: 4vh;
  }
`;

export const BgContainer = styled.div`
 background-color: ${({ theme }) => theme.colors.white.normal};
width: 90%;
height: 100%;
border-radius: 25px;
@media ${({ theme }) => theme.devices.tablet} {
  width: 100%;

}
`

export const TitleContainer = styled.div`
  display: flex;
  cursor: pointer;
  flex-direction: row;
  @media ${({ theme }) => theme.devices.tablet} {
  }
`;

export const TitleSpan = styled.span`
  color: ${({ theme }) => theme.colors.blue.palete};
  display: flex;
   font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSize.xxlg};
  @media ${({ theme }) => theme.devices.tablet} {
    font-size: ${({ theme }) => theme.fontSize.xlg};
    text-align: center;
  }
`;
export const Spacer = styled.div`
width: 3vw;
height: 16px;
border-radius: 25px;
@media ${({ theme }) => theme.devices.tablet} {
  width: 15vw;
  align-self: normal;
 }
`;

export const TextSpan = styled.span`
  color: ${({ theme }) => theme.colors.black.normal};
  display: flex;
  width: 95%;
  text-align: justify;
  padding-top: 1vh;
   font-family: ${({ theme }) => theme.fonts.secundary};
  font-size: ${({ theme }) => theme.fontSize.md};
  @media ${({ theme }) => theme.devices.tablet} {
    width: 90%;
   }
`;
export const TextContainer = styled.div`
displat: flex;
flex-direction: column;

@media ${({ theme }) => theme.devices.tablet} {
}
`;