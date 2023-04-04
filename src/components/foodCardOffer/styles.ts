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
  max-width:250px;
  max-height:150px;
  min-width:250px;
  min-height:150px;
  width: auto;
  height: auto;
`;
export const Title = styled.div`
    text-align: center;
    align-self: center;
    margin-top: 1vh;
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: ${({ theme }) => theme.fontSize.md2};


`;
export const Description = styled.div`
height: fit-content;
margin-bottom: 3vh;
margin-top: 1vh;
width: 95%;
align-self: center;
max-height: 100px;
min-height: 100px;
font-size: ${({ theme }) => theme.fontSize.sm};

`;
export const Price = styled.div`
border-bottom-left-radius: 25px;
border-bottom-right-radius: 25px;
display: flex;
    justify-content: center;
    height: 5vh;
    align-items: center;
span {
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSize.md};
}
`;
export const Anchor = styled.a`
text-decoration: none;

`
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