import styled from "styled-components";

export const Span = styled.span`
  color: ${({ theme }) => theme.colors.black.normal};
  display: flex;
  margin-top: 3vh;
  margin-right: 12px;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSize.xxlg};
  @media ${({ theme }) => theme.devices.tablet} {
    font-size: ${({ theme }) => theme.fontSize.lg};
  }
`;

export const SpanAux = styled.span`
  color: ${({ theme }) => theme.colors.blue.palete};
  display: flex;
  margin-right: 12px;
  font-family: ${({ theme }) => theme.fonts.secundary};
  font-size: ${({ theme }) => theme.fontSize.md};
  @media ${({ theme }) => theme.devices.tablet} {
    font-size: ${({ theme }) => theme.fontSize.md};
    display: flex;
    text-align: center;
    width: 95%;
  }
`;

export const MainSpanContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  @media ${({ theme }) => theme.devices.tablet} {
  }
`;
export const PlansContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 5vh;
  flex: 3;
  width: 65%;
  @media ${({ theme }) => theme.devices.tablet} {
    flex-direction: column;
    flex: 3;
  }
`;

export const PlanCard = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const SwitchContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  @media ${({ theme }) => theme.devices.tablet} {
  }
`;

export const SpacerContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 2vh;
  place-self: self-end;
  padding-right: 5vw;
  @media ${({ theme }) => theme.devices.laptopL} {
    padding-right: 10vw;
  }
`;
export const OffCointainer = styled.div`
  display: flex;
  flex-direction: column;
  @media ${({ theme }) => theme.devices.tablet} {
  }
`;
export const OffSpan = styled.div`
  background-color: ${({ theme }) => theme.colors.white.normal};
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.red.normal};
  font-size: ${({ theme }) => theme.fontSize.md2};
  justify-content: center;
  align-self: flex-end;
  margin-right: -0.1vw;
  border-radius: 25px;
  margin-bottom: 10px;
  align-items: center;
  padding-bottom: 1vh;
  padding-top: 1.5vh;
  margin-top: 10px;
  display: flex;
  width: 4.5vw;
  height: 1vh;
  opacity: 1;
  @media ${({ theme }) => theme.devices.laptopL} {
    padding-bottom: 0vh;
    width: 6vw;
    height: 4vh;
    padding-top: 0.5vh;
  }
  @media ${({ theme }) => theme.devices.tablet} {
    padding-bottom: 0vh;
    width: 20vw;
    height: 4vh;
    padding-top: 0.5vh;
  }
`;
export const SwitchIcon = styled.img`
  width: 30px;
  @media ${({ theme }) => theme.devices.tablet} {
  }
`;

export const SwitchIconCointainer = styled.div`
  display: flex;
  justify-content: center;
  @media ${({ theme }) => theme.devices.tablet} {
  }
`;
export const SwitchUnder = styled.div`
  display: flex;
  flex-direction: row;
  height: 5px;
  @media ${({ theme }) => theme.devices.tablet} {
  }
`;
export const SwitchUnderLeft = styled.div`
  display: flex;
  padding-bottom: 2vh;
  padding-right: 5vw;
  @media ${({ theme }) => theme.devices.laptopL} {
    padding-right: 10vw;
  }
`;
export const SwitchUnderRight = styled.div`
  display: flex;
  padding-bottom: 2vh;
  padding-left: 9.3vw;
  @media ${({ theme }) => theme.devices.laptopL} {
    margin-left: auto;
  }
`;
export const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 5vw;
  width: 90%;
  @media ${({ theme }) => theme.devices.tablet} {
    flex-direction: column;
  }
`;
