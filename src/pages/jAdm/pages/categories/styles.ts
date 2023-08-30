import styled from "styled-components";

export const CategoryContainer = styled.div`
  justify-content: center;
  margin-top: 1vh;
  display: flex;
  flex-direction: column;
  border-radius: 25px;
  width: 65%;
  text-align: -webkit-center;
  box-shadow: 1px 5px 5px rgb(0 0 0 / 32%);
  background-color: ${({ theme }) => theme.colors.white.normal};
  align-self: center;
  justify-content: center;
  @media ${({ theme }) => theme.devices.tablet} {
    flex-direction: column;
    width: 75%;
  }
`;
export const CardsContainer = styled.div`
  justify-content: center;
  display: flex;
  flex: 3;
  flex-direction: row;
  overflow-x: auto;
  width: 100%;
  align-self: center;
  padding-bottom: 2vh;
  @media ${({ theme }) => theme.devices.tablet} {
    width: 100%;
    flex-direction: column;
    align-items: center;
  }
`;

export const TitleSpan = styled.span`
  color: ${({ theme }) => theme.colors.yellow.palete};
  display: flex;
  font-size: ${({ theme }) => theme.fontSize.xxlg};
  text-align: center;
  align-self: center;
  margin-top: 5vh;
  margin-bottom: 5vh;
  font-family: ${({ theme }) => theme.fonts.primary};
  @media ${({ theme }) => theme.devices.tablet} {
    font-size: ${({ theme }) => theme.fontSize.lg};
    padding-top: 2vh;
  }
`;
export const MainContainer = styled.div`
  display: flex;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.blue.palete};
  flex-direction: column;
`;
export const Menus = styled.div`
  display: flex;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.blue.palete};
  flex-direction: column;
`;
export const MenusRow = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.blue.palete};
  flex-direction: row;
  @media ${({ theme }) => theme.devices.tablet} {
    flex-direction: column;
  }
`;

export const ItemSpan = styled.span`
  color: white;
  margin-top: 4vh;
  font-size: ${({ theme }) => theme.fontSize.md2};
  color: ${({ theme }) => theme.colors.blue.palete};
  align-self: center;
  padding-bottom: 3vh;
  padding-inline: 10px;
  font-family: ${({ theme }) => theme.fonts.primary};
  @media ${({ theme }) => theme.devices.tablet} {
    text-align-last: left;
  }
`;

export const Centralize = styled.div`
  display: flex;
  place-self: center;
`;
export const IconCentralize = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  place-self: center;
  place-items: center;
  text-align-last: center;
  margin-inline: 2vw;
  margin-bottom: 1vw;
`;

export const Icon = styled.img`
  width: 55px;
  margin-right: 3.5vw;
  margin-left: 3.5vw;
  margin-top: 1vw;
  margin-bottom: 1vw;
  @media ${({ theme }) => theme.devices.tablet} {
  }
`;

export const BtnContainer = styled.div`
  display: flex;
  margin-top: 4vw;
  margin-bottom: 4vw;
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

export const BackBtnContainer = styled.div`
  display: flex;
  margin-bottom: 1vw;
`;
export const ModalContainer = styled.div`
  display: flex;
  margin-bottom: 5vh;
  flex-direction: column;
`;
export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5vh;
  .form-row {
    display: flex;
    flex-direction: row;
    margin-bottom: 1vh;
  }
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
export const FileInput = styled.input`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  color: ${({ theme }) => theme.colors.white.normal};
  font-size: ${({ theme }) => theme.fontSize.md};
  font-family: ${({ theme }) => theme.fonts.primary};
`;
export const LogoImg = styled.img`
  width: 50px;
  padding-top: 1.5vh;
   cursor: pointer;
  padding-bottom: 1.5vh;
  @media ${({ theme }) => theme.devices.tablet} {
    width: 50px; !important
   }
`;