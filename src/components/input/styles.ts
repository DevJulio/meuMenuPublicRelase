import styled from "styled-components";
import InputMask from "react-input-mask";

export const MainContainer = styled.div`
  place-content: center;
  display: flex;
  flex-direction: column;
  flex: auto;
  padding-top: 20px;
  color: ${({ theme }) => theme.colors.white.normal};
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSize.md2};
`;

export const Input = styled.input.attrs(() => ({
  type: "text",
}))`
  color: ${({ theme }) => theme.colors.black.normal};
  font-size: 25px;
  border: 2px solid ${({ theme }) => theme.colors.black.normal};
  border-radius: 5px;
  margin-top: 10px;
`;
export const InputPw = styled.input.attrs(() => ({
  type: "password",
}))`
   font-size: 25px;
  border: 2px solid ${({ theme }) => theme.colors.white.normal};
  border-radius: 5px;
  margin-top: 10px;
`;
export const InputTextField = styled.textarea.attrs(() => ({
  type: "text",
}))`
  color: ${({ theme }) => theme.colors.black.normal};
  font-size: 25px;
    resize: none;

  border: 2px solid ${({ theme }) => theme.colors.black.normal};
  border-radius: 5px;
  margin-top: 10px;
`;
export const InputMaskHtml = styled(InputMask)``;
