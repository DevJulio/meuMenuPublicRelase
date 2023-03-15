import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 25px;
  align-items: center;
  padding: 25px;
  text-align: center;
  width: 100%;
  margin-left: 1vw;
  margin-right: 1vw;
  min-width: 17vw;
  max-width: 17vw;

   {
    position: relative;
    -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3),
      0 0 40px rgba(0, 0, 0, 0.1) inset;
    -moz-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3),
      0 0 40px rgba(0, 0, 0, 0.1) inset;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  }
  :before,
  :after {
    content: "";
    position: absolute;
    z-index: -1;
    -webkit-box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
    -moz-box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
    top: 0;
    bottom: 0;
    left: 10px;
    right: 10px;
    -moz-border-radius: 100px / 50px;
    border-radius: 100px / 50px;
  }
  :after {
    right: 10px;
    left: auto;
    -webkit-transform: skew(8deg) rotate(3deg);
    -moz-transform: skew(8deg) rotate(3deg);
    -ms-transform: skew(8deg) rotate(3deg);
    -o-transform: skew(8deg) rotate(3deg);
    transform: skew(8deg) rotate(3deg);
  }
  @media ${({ theme }) => theme.devices.tablet} {
    margin-left: 0vw;
    margin-bottom: 3vh;
    place-self: center;
      min-width: 65vw;
      max-width: 65vw;
  }
 

`;

export const LogoImg = styled.img`
  width: 40px;
  padding-top: 1.5vh;
  cursor: pointer;
  padding-bottom: 1.5vh;
  @media ${({ theme }) => theme.devices.tablet} {
    width: 45px;
  }
`;
export const Title = styled.span`
  display: flex;
  padding-left: 1vw;
  width: 95%;
  justify-content: center;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSize.lg};
  @media ${({ theme }) => theme.devices.tablet} {
    padding-left: 10vw;
    font-size: ${({ theme }) => theme.fontSize.xxlg};
    width: 25%;
  }
`;
export const Paragraph = styled.p`
  display: flex;
  margin-right: auto;
  margin-top: 0vh;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSize.md};
  @media ${({ theme }) => theme.devices.tablet} {
    margin-top: 0.5vh;
  }
`;
export const TitleAndLogo = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;
  flex-direction: row;
  @media ${({ theme }) => theme.devices.tablet} {
    font-size: 12px;
  }
`;
export const PriceAndDescription = styled.div`
  display: flex;
  align-items: baseline;
  flex-direction: row;
  width: 85%;
  @media ${({ theme }) => theme.devices.tablet} {
    width: 95%;
  }
`;
export const Price = styled.span`
  color: ${({ theme }) => theme.colors.red.normal};
  display: flex;
  justify-content: left;
  width: 50%;
  //justify-content: center;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSize.xxlg};
  @media ${({ theme }) => theme.devices.tablet} {
  }
`;
export const PriceText = styled.span`
  color: ${({ theme }) => theme.colors.yellow.palete};
  display: flex;
  padding-left: 0.5vw;
  width: 100%;
  justify-content: left;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSize.md};
  @media ${({ theme }) => theme.devices.tablet} {
    font-size: 35px;
  }
`;
export const List = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media ${({ theme }) => theme.devices.tablet} {
    font-size: 12px;
  }
`;
export const Include = styled.span`
  color: ${({ theme }) => theme.colors.blue.palete};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSize.md};
  place-self: flex-start;
  margin-top: 4vh;
  margin-bottom: 2vh;
  @media ${({ theme }) => theme.devices.tablet} {
    font-size: 35px;
  }
`;
export const ListItem = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  margin-bottom: 1.5vh;
  @media ${({ theme }) => theme.devices.tablet} {
    font-size: 12px;
  }
`;
export const ListImg = styled.img`
height: 25px;
padding-right: 1vw;
  @media ${({ theme }) => theme.devices.tablet} {
    width: 10%; !important
   }
`;
export const ListSpan = styled.span`
  color: ${({ theme }) => theme.colors.yellow.palete};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSize.md};
  place-self: flex-start;
  @media ${({ theme }) => theme.devices.tablet} {
    font-size: 18px;
  }
`;

export const BtnContainer = styled.div`
  display: flex;
  padding-top: 2vh;
  @media ${({ theme }) => theme.devices.tablet} {
  }
`;
export const PlansDetailModal = styled.span`
  display: flex;
  justify-content: left;
  width: 95%;
  padding: 2vh;
  justify-content: center;
  font-family: ${({ theme }) => theme.fonts.secundary};
  font-size: ${({ theme }) => theme.fontSize.mm};
 
`;