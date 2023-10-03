import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
`;
export const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding-top: 1vh;
  background-color: ${({ theme }) => theme.colors.blue.palete};
  @media ${({ theme }) => theme.devices.tablet} {
    flex: 3;
    align-items: center;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  cursor: pointer;
  @media ${({ theme }) => theme.devices.tablet} {
    flex: 1;
    margin-left: 2vw;
  }
`;
export const LogoContainerAux = styled.div`
  display: flex;
  cursor: pointer;
  @media ${({ theme }) => theme.devices.tablet} {
    margin-left: 2vw;
    place-content: flex-end;
    margin-top: -1vh;
    flex: 2;
    margin-bottom: -4vh;  
  }
`;

export const MainSpanContainer = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  @media ${({ theme }) => theme.devices.tablet} {
    place-content: center;
    width: 100%;
    align-self: center;
    flex: 1;
  }
`;

export const NameSpan = styled.span`
  color: ${({ theme }) => theme.colors.red.normal};
  display: flex;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 50px;
  @media ${({ theme }) => theme.devices.tablet} {
    font-size: 35px;
  }
`;
export const NameSpanAux = styled.span`
  display: flex;
  color: ${({ theme }) => theme.colors.yellow.palete};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: 50px;
  @media ${({ theme }) => theme.devices.tablet} {
    font-size: 35px;
  }
`;
export const LogoImg = styled.img`
  width: 75%;
  padding-top: 5px;
  cursor: pointer;
  padding-bottom: 5px;
  @media ${({ theme }) => theme.devices.tablet} {
    width: 50%;
  }
`;

export const MenuContainer = styled.div`
  display: none;
  @media ${({ theme }) => theme.devices.tablet} {
    display: flex;
    flex: 1;
    display: flex;
    justify-content: right;
    margin-bottom: 3vh;
  }
`;

export const MenuDesktopContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: auto;
  align-items: center;
  @media ${({ theme }) => theme.devices.tablet} {
    display: none;
  }
`;
export const MenuDesktopAnchor = styled.a`
  text-decoration: none;
  margin-right: 1vw;
  font-size: ${({ theme }) => theme.fontSize.md2};
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.yellow.palete};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.white.normal};
  }
`;

export const MenuItem = styled.a`
  display: inline-block;
  transition: transform 0.8s cubic-bezier(0.7, 0, 0.3, 1) 0s;
  text-decoration: none;
  font-size: 2.1875em;
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.yellow.palete};
`;
