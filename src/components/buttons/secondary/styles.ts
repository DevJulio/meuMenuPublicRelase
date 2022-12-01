import styled from "styled-components";

export const MainContainer = styled.div`
  place-content: center;
  display: flex;
  flex-direction: column;
  flex: auto;
`;

export const Btn = styled.button`
  place-self: center;
  min-width: 275px;
  padding: 0.7vw;
  font-family: ${({ theme }) => theme.fonts.primary};
  border-radius: 15px;
  background-color: ${({ theme }) => theme.colors.red.normal};
  color:  ${({ theme }) => theme.colors.white.normal};
  cursor: pointer;
  border-style: none;
  @media ${({ theme }) => theme.devices.tablet} {
    font-size: ${({ theme }) => theme.fontSize.md2};
    padding: 3vw;
  }
`;
