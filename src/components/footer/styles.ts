import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 85%;
  background-color: ${({ theme }) => theme.colors.blue.palete};
  color: ${({ theme }) => theme.colors.white.normal};
  //margin-top: 60px;
`;
export const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1vw;
  padding-top: 2vh;
  padding-bottom: 2vh;
  @media ${({ theme }) => theme.devices.tablet} {
    width: 27%;
    justify-content: end;
  }
`;
export const LogoImg = styled.img`
  display: flex;
  max-width: 100px;
`;
export const FooterContact = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.yellow.palete};
  color: ${({ theme }) => theme.colors.black.normal};
  @media ${({ theme }) => theme.devices.tablet} {
    justify-content: center;
  }
`;
export const FooterSpan = styled.span`
  color: ${({ theme }) => theme.colors.red.normal};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSize.md};
  padding-top: 15px;
  
  padding-bottom: 15px;
  padding-left: 24px;
  a {
    text-align: center;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.blue.palete};
    font-family: ${({ theme }) => theme.fonts.primary};
    margin-top: 5px;

    &:hover {
      color: ${({ theme }) => theme.colors.black.normal};
    }

    svg {
      padding-right: 5px;
    }
  }

  @media ${({ theme }) => theme.devices.tablet} {
    padding-left: 0px;
  }
`;
export const IconsContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  margin-top: 3vh;
  padding-bottom: 2.5vh;
  margin-left: auto;
  @media ${({ theme }) => theme.devices.tablet} {
    flex-direction: column;
    margin-top: 3vh;
    margin-bottom: auto;
    margin-right: 4vw;
  }
`;
export const Icons = styled.img`
  cursor: pointer;
  margin-right: 1vw;
  max-width: 50px;
  @media ${({ theme }) => theme.devices.tablet} {
    margin-right: 0px;
    margin-bottom: 2vh;
  }
`;

export const CopyDiv = styled.div`
width: 100%;
  display: flex;
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.white.normal};
  color: ${({ theme }) => theme.colors.black.normal};
  justify-content: center;
  font-family: sans-serif;
  padding-top: 1vh;
  font-size: ${({ theme }) => theme.fontSize.sm};
  @media ${({ theme }) => theme.devices.tablet} {
  }
`;

export const Shadow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.blue.palete};
  width: 100%;
  //border-top-left-radius: 15vw;
  //border-top-right-radius: 15vw;
  //padding-top: 5vh;
  @media ${({ theme }) => theme.devices.tablet} {
    padding-top: 1vh;
  }
`;
