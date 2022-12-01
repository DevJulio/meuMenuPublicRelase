import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  flex: 2;
   background-color: ${({ theme }) => theme.colors.blue.palete};
   @media ${({ theme }) => theme.devices.tablet} {
    flex-direction: column;
   }

`;

export const MainContainerLeft = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%
  background-color: ${({ theme }) => theme.colors.blue.palete};
  flex: 1;
  padding-left: 10.5vh;
  @media ${({ theme }) => theme.devices.tablet} {
    align-items: center;
    padding-left: 0vh;
  }
`;
export const MainSpanContainer = styled.div`
  display: flex;
  cursor: pointer;
  flex-direction: row;
  @media ${({ theme }) => theme.devices.tablet} {
  }
`;

export const TextSpan = styled.span`
  color: ${({ theme }) => theme.colors.white.normal};
  display: flex;
  width: 78%;
  text-align: justify;
  padding-top: 2vh;
  font-family: ${({ theme }) => theme.fonts.secundary};
  font-size: ${({ theme }) => theme.fontSize.md};
  @media ${({ theme }) => theme.devices.tablet} {
    display: none;
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
export const Spacer = styled.div`
width: 3vw;
height: 16px;
border-radius: 25px;
@media ${({ theme }) => theme.devices.tablet} {
  width: 15vw;
  align-self: normal;
  margin-left: 13vw;
}
`;


export const TitleSpan = styled.span`
  color: ${({ theme }) => theme.colors.yellow.palete};
  display: flex;
  padding-top: 10vh;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSize.xxxlg};
  @media ${({ theme }) => theme.devices.tablet} {
    font-size: ${({ theme }) => theme.fontSize.xlg};
    padding-top: 4vh;
  }
`;

export const ImgContainer = styled.div`
 background-color: ${({ theme }) => theme.colors.white.normal};
width: 90%;
height: 100%;
border-radius: 25px;
`
export const TitleImgAuxSpan = styled.span`
  color: ${({ theme }) => theme.colors.blue.palete};
  display: flex;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSize.xxlg};
  padding-top: 1vh;
  padding-left: 1vw;
  width: 30vw;
  @media ${({ theme }) => theme.devices.tablet} {
    font-size: ${({ theme }) => theme.fontSize.xxlg};
    width: 95%;
    margin-left: 5vw;
    padding-top: 0vh;
  }
`;
export const TitleImgSpan = styled.span`
  color: ${({ theme }) => theme.colors.red.normal};
  display: flex;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSize.md2};
  padding-top: 2vh;
  padding-left: 1vw;
  @media ${({ theme }) => theme.devices.tablet} {
    font-size: 35px;
    padding-top: 1vh;
    padding-left: 7vw;
  }
`;
export const ImgAndTextContainer = styled.div`
display: flex;
flex-direction: row;
width: 100%;
flex: 2;
@media ${({ theme }) => theme.devices.tablet} {
  flex-direction: column;
 }
`


export const Container = styled.div`
display: flex;
flex-direction: column;
width: 100%;
 @media ${({ theme }) => theme.devices.tablet} {
  flex-direction: column;
 }
`
export const BtnContainer = styled.div`
display: flex;
flex-direction: column;
padding-top: 5vw;
width: 100%;
 @media ${({ theme }) => theme.devices.tablet} {
  flex-direction: column;
 }
`
export const ImgAndTextContainerRight = styled.div`
display: flex;
flex-direction: column;
width: 100%;
flex: 1;
`
export const ImgAndTextContainerLeft = styled.div`
display: flex;
flex-direction: column;
width: 100%;
flex: 1;
`
export const Img = styled.img`
display: flex;
width: 60%;
padding-left: 2vw;

@media ${({ theme }) => theme.devices.tablet} {
  padding-left: 0vw;
  align-self: center;
}
`
export const MainCardContainer = styled.div`
  display: flex;
  @media ${({ theme }) => theme.devices.tablet} {
    display: flex;
    width: 100%;
    justify-content: center;
    padding-top: 3vh;
  }
`;
export const CardsContainerMobile = styled.div`
  display:none;
  @media ${({ theme }) => theme.devices.tablet} {
    justify-content: center;
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    width: 100%;
    align-self: center;
  }
`;
export const CardsContainer = styled.div`
  justify-content: center;
  display: flex;
  flex: 3;
  flex-direction: row;
  overflow-x: auto;
  width: 100%;
  align-self: center;
  padding-bottom: 2vh;
   @media ${({ theme }) => theme.devices.tablet} {
    width: 100%;
  }
`;

export const CardsContainerDesktop = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;
   @media ${({ theme }) => theme.devices.tablet} {
  display: none;
  }
`;

