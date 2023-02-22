import styled from "styled-components";


export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.blue.palete};
  padding-top: 3vh;
  width: 100%;
 
`;

export const ContainerCategories = styled.div`
display: flex;
flex-direction: row;
overflow-x: scroll; 
margin-top: 2vh;
margin-bottom: 1vh;
 height: 12vh;
 &-webkit-scrollbar{
  display: none;
}
`;
export const Span = styled.span`
   display: flex;
  margin-left: 5vw;
  place-self: center;
  font-family: ${({ theme }) => theme.fonts.secundary};
  font-size: ${({ theme }) => theme.fontSize.lg};
  @media ${({ theme }) => theme.devices.tablet} {
    font-size: ${({ theme }) => theme.fontSize.xlg};
  }
`;

export const MainSpanContainer = styled.div`
  display: flex;
  cursor: pointer;
  flex-direction: row;
  @media ${({ theme }) => theme.devices.tablet} {
  }
`;

export const ContainerMobile = styled.div`
display:none;
@media ${({ theme }) => theme.devices.tablet} {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white.normal};
  width: 100%;
  border-top-left-radius: 15vw;
  border-top-right-radius: 15vw;
  padding-top: 5vh;
 
}
`;

export const Arrow = styled.div`
  color: white;
  display: flex;
  flex-direction: row;
  place-self: end;
  margin-right: 1vw;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSize.md};
  margin-bottom: 1vh;
`;
export const CarouselContainer = styled.div`
 height: fit-content;
display: flex;
flex-direction: column;
`
export const SingleBanner = styled.div`
display: flex;
`

export const Title = styled.span`
   display: flex;
  margin-left: 5vw;
  place-self: center;
  font-family: ${({ theme }) => theme.fonts.primary};
  @media ${({ theme }) => theme.devices.tablet} {
    font-size: ${({ theme }) => theme.fontSize.lg};
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

export const SocialMediaContainer = styled.div`
margin-top: 1vh;
display: flex;
flex-direction: row;
border-radius: 25px;
width: 90%;
background-color: ${({ theme }) => theme.colors.white.normal};
align-self: center;
justify-content: center;
// margin-bottom: 5vh;

`

export const Icon = styled.img`
  width: 40px;
  // flex: 1;
  margin-right: 3.5vw;
  margin-left: 3.5vw;
  margin-top: 1lvw;
  margin-bottom: 1vw;
  @media ${({ theme }) => theme.devices.tablet} {
  }
`;
export const Banner = styled.img`
  width: 300px;
  margin-top: 1vw;
  margin-bottom: 1vw;
  // shadow: 1px 5px 5px rgb(0 0 0 / 32%);
`;

export const BannerContainer = styled.div`
display: flex;
flex-direction: row;
align-self: center;
justify-content: center;
`

export const MainRoundDiv = styled.div`
display: flex;
flex-direction: column;
width: 90%;
border-radius: 25px;
margin-top: 3vh;
margin-bottom: 3vh;
padding: 1vw;
`;
export const AuxRoundDiv = styled.div`
display: flex;
flex-direction: column;
width: 100%;
 border-bottom-left-radius: 50px;
border-bottom-right-radius: 50px;
    height: 7vh;
`;
export const RoundSpan = styled.span`

`

export const ContainerAux = styled.div`
display: flex;
flex-direction: column;
width: 100%;
 border-bottom-left-radius: 50px;
border-bottom-right-radius: 50px;
`;
export const BannerCarousel = styled.div`
border-radius: 25px;
display: flex;
flex-direction: row;
min-height: 15vh;
margin-top: 4vh;
font-size: ${({ theme }) => theme.fontSize.md};
`;
export const BannerDate = styled.div`
  display: flex;
  border-bottom-left-radius: 25px;
  border-top-left-radius: 25px; 
 flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white.normal};
  font-family: ${({ theme }) => theme.fonts.primary};
  min-width: 27vw;
  max-height: 10vh;
  justify-content: center;
  align-items: center;
`;
export const BannerInfo = styled.div`
  display: flex;
  justify-content: center;
`;
export const BannerImg = styled.img`
border-top-right-radius: 25px;
border-bottom-right-radius: 25px;w2
min-width: 100%;
max-height: 10vh;
`;
export const DateSpan = styled.span``
export const InfoSpan = styled.span`
position: absolute;
font-family: ${({ theme }) => theme.fonts.primary};
margin-top: 3vh;
background-color: ${({ theme }) => theme.colors.white.normal};
border-radius: 25px;
padding: 1.5vw;
`
export const TitleAndLogo = styled.div`
  display: flex;
  align-items: center;
   flex-direction: row;
  @media ${({ theme }) => theme.devices.tablet} {
    font-size: 12px;
  }
`;
export const LogoImg = styled.img`
  width: 40px;
   cursor: pointer;
   @media ${({ theme }) => theme.devices.tablet} {
    width: 45px;
  }
`;