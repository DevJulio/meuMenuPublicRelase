import styled from "styled-components";

export const PlansDetailModal = styled.div`
  display: flex;
  justify-content: left;
  width: 95%;
  padding: 2vh;
  justify-content: center;
  font-family: ${({ theme }) => theme.fonts.secundary};
  font-size: ${({ theme }) => theme.fontSize.mm};

  .map-container {
    display: flex;
    width: 100%;
    height: 100%;
    place-content: center;
  }
 
`;
