import styled from "styled-components";

export const MainContainer = styled.div`
  place-content: center;
  display: flex;
  flex-direction: column;
  flex: auto;
  padding-top: 20px;
`;

export const Input = styled.input.attrs(() => ({
  type: "checkbox",
}))`
  color: black;
  font-size: 25px;
  border: 2px solid ${({ theme }) => theme.colors.black.normal};
  border-radius: 5px;
  width: 32px;
  height: 32px;
 `;
