import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 50px;
  margin-inline: 1.5vw;
  transition: all 0.5s ease-in-out;
  min-width: 78px;
  height: 75px;
  position: relative;
   box-shadow: 1px 5px 5px rgb(0 0 0 / 32%);
  font-size: ${({ theme }) => theme.fontSize.md2};

  img {
    margin-inline-end: auto;
    width: 55px;
    height: 55px;
    margin-top: 1vh;
    margin-left: 3vw;
  }
  span {
    display: none;
    transition: all 0.5s ease-in-out;
    transition-delay:.3s;
  }
  &:hover {
    min-width: 200px;
    border-radius: 95px;
  }
  &:hover span{
    transition: all 0.5s ease-in-out;
    align-self: center;
      display: flex;
     position: absolute;
     margin-left: 20vw;
  }
  &:first-child {
    span {
      transition: all 0.5s ease-in-out;
      align-self: center;
      display: flex;
      position: absolute;
      margin-left: 23vw;
    }
  }
`;
