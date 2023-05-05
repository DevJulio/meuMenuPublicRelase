import styled from "styled-components";

export const MainCardsContainer = styled.div`
  justify-content: center;
  margin-top: 1vh;
  display: flex;
  flex-direction: column;
  border-radius: 25px;
  width: 65%;
  text-align: -webkit-center;
  align-self: center;
  justify-content: center;
  @media ${({ theme }) => theme.devices.tablet} {
    flex-direction: column;
  }
`;
export const CardsRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 2vh;
  height: 12vh;
`;
export const CardItem = styled.div`
  display: flex;
  margin-bottom: 5vh;
  cursor: pointer;
  flex-direction: column;
`;
export const Container = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.blue.palete};
  flex-direction: column;
  align-items: center;
`;
export const TitleSpan = styled.span`
  color: ${({ theme }) => theme.colors.yellow.palete};
  display: flex;
  font-size: ${({ theme }) => theme.fontSize.xxlg};
  text-align: center;
  align-self: center;
  margin-top: 3vh;
  font-family: ${({ theme }) => theme.fonts.primary};
  @media ${({ theme }) => theme.devices.tablet} {
    font-size: ${({ theme }) => theme.fontSize.lg};
    padding-top: 2vh;
  }
`;
export const BackBtnContainer = styled.div`
  display: flex;
   margin-top: 1vw;
 `;

 export const ModalContainer = styled.div`
  display: flex;
  margin-bottom: 5vh;
  flex-direction: column;
`;
export const PlansDetailModal = styled.span`
  display: flex;
  justify-content: left;
  width: 95%;
  padding: 2vh;
  justify-content: center;
  font-family: ${({ theme }) => theme.fonts.secundary};
  font-size: ${({ theme }) => theme.fontSize.mm};
`;
export const FormItemContainer = styled.div`
  margin-left: 40px;
  margin-right: 40px;
  align-self: center;

  width: 40%;
  display: flex;
  flex-direction: column;
  @media ${({ theme }) => theme.devices.tablet} {
    margin-left: 0px;
    margin-right: 0px;
    width: 95%;
    align-self: center;
  }
`;