import styled from "styled-components";

export const SwitchContainer = styled.div`
display: flex;
 flex-direction: column;
align-self: center;
`
export const SwitchBtnContainer = styled.div`
  margin-left: 1vw;
`

export const SwitchContainerRow = styled.div`
 display: flex;
 flex-direction: row;
 align-self: center;
 margin-top: 1.5vh;
 align-items: center;
 box-shadow: 1px 5px 5px rgb(0 0 0 / 32%);
 background-color: ${({ theme }) => theme.colors.white.normal};
 border-radius: 25px;
 width: 250px;
 justify-content: center;
 `
export const SwitchSpan = styled.span`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.black.normal};
  margin-top: 1vh;
  margin-bottom: 1vh;
`;
export const SwitchIconEdit = styled.img`
  width: 55px;
  margin-left: 3.5vw;
  `;
