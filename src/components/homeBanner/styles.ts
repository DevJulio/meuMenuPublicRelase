import styled from "styled-components";

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
border-bottom-right-radius: 25px;
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