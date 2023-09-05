import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 25px;

  height: fit-content;
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 25px;
  margin-left: 1.5vw;
  margin-right: 1.5vw;
  max-width: 250px;
  @media ${({ theme }) => theme.devices.tablet} {
    margin-left: 2.5vw;
    margin-right: 2.5vw;
  }
`;

export const Img = styled.img`
  max-height: 20vh;
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  margin-top: -1px;
  max-width: 250px;
  max-height: 250px;
  width: auto;
  height: auto;
`;
export const Title = styled.div`
  text-align: center;
  align-self: center;
  margin-top: 1vh;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSize.lg};
`;
export const Description = styled.div`
  height: fit-content;
  margin-bottom: 3vh;
  margin-top: 1vh;
  width: 95%;
  align-self: center;
  max-height: 100px;
  min-height: 100px;
  color: black;
  font-size: ${({ theme }) => theme.fontSize.sm};
`;
export const Price = styled.div`
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  display: flex;
  justify-content: center;
  height: 5vh;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.blue.palete};
  span {
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: ${({ theme }) => theme.fontSize.md};
  }
`;

export const PriceAux = styled.div`
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  display: flex;
  justify-content: center;
  height: 5vh;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.red.normal};
  span {
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: ${({ theme }) => theme.fontSize.md};
  }
`;
export const OfferText = styled.span`
  color: white;
  margin-bottom: 1vh;
  margin-top: 1vh;
  text-align: center;
  margin-left: 10px;
  color: black;
`;

export const Anchor = styled.a`
  text-decoration: none;
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
export const LogoImg = styled.img`
  width: 40px;
  padding-top: 1.5vh;
  cursor: pointer;
  padding-bottom: 1.5vh;
  @media ${({ theme }) => theme.devices.tablet} {
    width: 45px;
  }
`;
export const ComboContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.white.normal};
  border-radius: 25px;
  max-width: 550px;
  min-width: 550px;
`;
export const ComboImg = styled.img`
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  max-width: 550px;
  min-width: 550px;
`;
export const ComboPrice = styled.div`
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  display: flex;
  justify-content: center;
  height: 5vh;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.yellow.palete};
  span {
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: ${({ theme }) => theme.fontSize.md};
  }
`;

export const ComboParagrah = styled.p`
  color: white;
  margin-top: 0vw;
  margin-bottom: 1vh;
  text-align: left;
  margin-left: 10px;
  color: black;
`;
