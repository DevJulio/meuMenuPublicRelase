import styled from "styled-components";
import color from "color";

export const Container = styled.div`
  z-index: 9;
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: ${({ theme }) =>
    color(theme.colors.black.normal)
      .alpha(0.8)
      .toString()};
`;

export const Content = styled.div`
  border-radius: 5px;
  position: relative;
  background-color: ${({ theme }) => theme.colors.white.normal};
  margin: auto;
  padding: 0;
  width: 60%;
  -webkit-animation-name: ${({ theme }) => theme.animation.name};
  -webkit-animation-duration: 0.4s;
  animation-name: ${({ theme }) => theme.animation.name};
  animation-duration: 0.4s;
  @media ${({ theme }) => theme.devices.tablet} {
    width: 90%;
  }
`;

export const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.white.normal};
  letter-spacing: 1px;
  font-weight: 100;
`;

export const Header = styled.div`
  border-radius: 5px 5px 0 0;
  padding: 2px 16px;
  background-color: ${({ theme }) => theme.colors.orange.normal};
  font-size: ${({ theme }) => theme.fontSize.md2};
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.white.normal};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Close = styled.span`
  color: ${({ theme }) => theme.colors.white.normal};
  float: right;
  font-size: ${({ theme }) => theme.fontSize.md2};
  font-weight: bold;
  &:hover {
    color: ${({ theme }) => theme.colors.gray.dark};
    text-decoration: none;
    cursor: pointer;
  }

  &:focus {
    color: ${({ theme }) => theme.colors.gray.dark};
    text-decoration: none;
    cursor: pointer;
  }
`;
