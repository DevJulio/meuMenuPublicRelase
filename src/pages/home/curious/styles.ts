import styled from "styled-components";

export const Span = styled.span`
  color: ${({ theme }) => theme.colors.white.normal};
  display: flex;
  margin-right: 12px;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSize.xxlg};
  @media ${({ theme }) => theme.devices.tablet} {
    font-size: ${({ theme }) => theme.fontSize.lg};
  }
`;

export const SpanAux = styled.span`
  color: ${({ theme }) => theme.colors.white.normal};
  display: flex;
  margin-right: 12px;
  font-family: ${({ theme }) => theme.fonts.secundary};
  font-size: ${({ theme }) => theme.fontSize.md};
  @media ${({ theme }) => theme.devices.tablet} {
    font-size: ${({ theme }) => theme.fontSize.sm};
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

export const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 2vw;
  padding-bottom: 2vw;
  width: 90%;
  @media ${({ theme }) => theme.devices.tablet} {
    flex-direction: column;
  }
`;
