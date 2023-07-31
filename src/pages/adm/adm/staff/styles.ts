import styled from "styled-components";

export const Span = styled.span`
  color: ${({ theme }) => theme.colors.black.normal};
  display: flex;
  margin-right: 12px;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSize.xxlg};
  @media ${({ theme }) => theme.devices.tablet} {
    font-size: ${({ theme }) => theme.fontSize.lg};
  }
`;

export const SpanAux = styled.span`
  color: ${({ theme }) => theme.colors.black.normal};
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
  text-align: center;
  flex-direction: column;
  @media ${({ theme }) => theme.devices.tablet} {
  }
`;

export const Icon = styled.img`
  width: 75px;
  padding-right: 3vw;
  @media ${({ theme }) => theme.devices.tablet} {
  }
`;
export const Card = styled.div`
  display: flex;
  flex-direction: row;
      align-items: center;
  @media ${({ theme }) => theme.devices.tablet} {
  }
`;
export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: start;
    flex-direction: column;
    padding-left: 20vw;
    padding-top: 5vh;
    padding-bottom: 4vh;
  @media ${({ theme }) => theme.devices.tablet} {
  }
`;
export const CardAnchor = styled.a`
text-decoration: none;
    color: white;
    font-size: ${({ theme }) => theme.fontSize.md2};

    `

