import styled from "styled-components";

export const MainRowDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 12vh;
  width: 90%;
  @media ${({ theme }) => theme.devices.tablet} {
    width: 100%;
    margin-bottom: 0vh;
  }
`;
export const MainColDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;
export const MainDiv = styled.div`
  display: flex;
  flex-direction: row;
  place-content: center;
  background-color: ${({ theme }) => theme.colors.blue.palete};
  padding-inline: 4vw;
  @media ${({ theme }) => theme.devices.tablet} {
    flex-direction: column;
  }
`;
export const PlusContainer = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.yellow.palete};
  border-radius: 25px;
  cursor: pointer;
  align-self: center;
  align-items: center;
  justify-content: center;
  height: 50vh;
`;
export const PlusSpan = styled.span`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSize.xxxlg};
  margin-bottom: 2vh;
  color: ${({ theme }) => theme.colors.white.normal};
  margin-inline: 3vw;
`;
export const TablesContainer = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.white.normal};
  border-radius: 25px;
  align-self: center;
  align-items: center;
  justify-content: center;
  height: 50vh;
  width: 100%;
  margin-left: 2vw;
  flex-direction: column;
  overflow: hidden;
  @media ${({ theme }) => theme.devices.tablet} {
    margin-left: 4vw;
  }
`;
export const TablesContainerAux = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.white.normal};
  border-radius: 25px;
  align-self: center;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  flex-direction: column;
  overflow-y: scroll;
  height: 100%;
  place-content: flex-start;
  min-width: 54vw;
`;

export const TablesRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100px;
  margin-top: 1vh;
  margin-bottom: 0.5vh;
  align-self: start;
`;

export const Tables = styled.div`
  border-radius: 25px;
  background-color: ${({ theme }) => theme.colors.blue.palete};
  width: 13vw;
  margin-inline: 3px;
  text-align-last: center;
  display: flex;
  place-items: center;
  justify-content: center;
  height: 100px;
  @media ${({ theme }) => theme.devices.tablet} {
    width: 22vw;
  }
`;
export const TablesSpan = styled.span`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.white.normal};
  place-content: center;
  display: flex;
`;
export const BtnContainer = styled.div`
  display: flex;
  padding-top: 2vh;
  @media ${({ theme }) => theme.devices.tablet} {
    flex-direction: column;
  }
`;
export const FormItemContainer = styled.div`
  margin-left: 40px;
  margin-right: 40px;
  align-self: center;
  align-items: center;
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
export const CategoriesContainer = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.white.normal};
  align-self: center;
  align-items: center;
  justify-content: center;
  height: 75vh;
  width: 100%;
  flex-direction: column;
  overflow: hidden;
  @media ${({ theme }) => theme.devices.tablet} {
    height: 50vh;
  }
`;
export const CategoriesContainerAux = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.white.normal};
  align-self: center;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 95%;
  flex-direction: column;
  overflow-y: scroll;
  place-content: flex-start;
`;
export const CategoriaLinha = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: start;
  border-style: solid;
  width: -webkit-fill-available;
  margin-top: 1vh;
  border-radius: 10px;
  border-color: ${({ theme }) => theme.colors.blue.palete};
  background-color: ${({ theme }) => theme.colors.yellow.palete};
`;
export const CategoriaLinhaImg = styled.img`
  width: 75px;
  margin: 1vh;
`;
export const CategoriaLinhaSpan = styled.span`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSize.md2};
  color: ${({ theme }) => theme.colors.black.normal};
  margin-left: 4vw;
`;
export const FoodItem = styled.div`
  display: flex;
  flex-direction: column;
  width: -webkit-fill-available;
  background-color: ${({ theme }) => theme.colors.yellow.palete};
  margin-bottom: 0.5vh;
  border-radius: 25px;
  padding: 5px;
  margin-top: 0.5vh;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.blue.palete};
`;
export const CounterRow = styled.div`
  display: flex;
  flex-direction: row;
  height: 7vh;
  align-self: center;
  background-color: ${({ theme }) => theme.colors.blue.palete};
  border-radius: 25px;
  align-items: center;
  width: 70%;
  justify-content: center;
`;
export const CounterBtn = styled.div`
  align-self: center;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSize.xxlg};
  margin-inline: 2.7vw;
  color: ${({ theme }) => theme.colors.white.normal};
`;
export const CounterSpan = styled.span`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.white.normal};
`;

export const AddBtnContainer = styled.div`
  display: flex;
  margin-top: 2vw;
  margin-bottom: 2vh;
`;
export const ConfirmationModal = styled.span`
  display: flex;
  justify-content: left;
  width: 95%;
  padding: 2vh;
  justify-content: center;
  font-family: ${({ theme }) => theme.fonts.secundary};
  font-size: ${({ theme }) => theme.fontSize.md};
`;
export const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSize.lg};
  margin-bottom: 2vh;
  color: ${({ theme }) => theme.colors.blue.palete};
  margin-inline: 3vw;
  @media ${({ theme }) => theme.devices.tablet} {
    font-size: ${({ theme }) => theme.fontSize.md2};
  }
`;
export const AllContainer = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.red.normal};
  border-radius: 25px;
  cursor: pointer;
  align-self: center;
  align-items: center;
  justify-content: center;
  width: 93%;
  margin-top: 3vh;
  margin-left: 1vw;
`;
export const AllSpan = styled.span`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSize.xlg};
  margin-bottom: 3vh;
  margin-top: 3vh;
  color: ${({ theme }) => theme.colors.white.normal};
  margin-inline: 1vw;
  @media ${({ theme }) => theme.devices.tablet} {
    font-size: ${({ theme }) => theme.fontSize.lg};
  }
`;
