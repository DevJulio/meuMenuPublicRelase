import styled from "styled-components";
import { theme } from "../../../../../theme/theme";

export const Span = styled.span`
  color: ${({ theme }) => theme.colors.blue.palete};
  display: flex;
  padding: 2vh;
  place-self: center;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSize.xxlg};
  @media ${({ theme }) => theme.devices.tablet} {
    font-size: ${({ theme }) => theme.fontSize.lg};
  }
`;

export const MainContainer = styled.div`
  display: flex;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.blue.palete};
  flex-direction: column;
  min-height: 56vh;
`;
export const CategoryContainer = styled.div`
  justify-content: center;
  margin-top: 1vh;
  display: flex;
  flex-direction: column;
  border-radius: 25px;
  width: 75%;
  text-align: -webkit-center;
  box-shadow: 1px 5px 5px rgb(0 0 0 / 32%);
  background-color: ${({ theme }) => theme.colors.white.normal};
  align-self: center;
  justify-content: center;
  @media ${({ theme }) => theme.devices.tablet} {
    flex-direction: column;
    width: 90%;
  }
`;

export const SolicitationsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-bottom: 5vh;
  overflow-y: scroll;
  .solicitation-card {
    width: 95%;
    height: 25vh;
    place-self: center;
    border-style: solid;
    border-width: 2px;
    margin-bottom: 2vh;
    display: flex;
    border-radius: 25px;
    .solicitation-row {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;

      .solicitation-img {
        max-width: 10vw;
        min-width: 10vw;
        padding: 1vw;
        @media ${({ theme }) => theme.devices.tablet} {
          max-width: 25vw;
          min-width: 25vw;
          margin-top: 1vh;
        }
      }
      @media ${({ theme }) => theme.devices.tablet} {
        flex-direction: column;
      }
    }
    .solicitation-detail {
      display: flex;
      flex-direction: column;
      text-align-last: left;
      margin-left: 2vw;
      width: 100%;

      .title {
        font-size: ${theme.fontSize.lg};
        @media ${({ theme }) => theme.devices.tablet} {
          align-self: center;
          font-size: ${theme.fontSize.md2};
        }
      }
      .address {
        font-size: ${theme.fontSize.md};
        font-family: ${theme.fonts.secundary};
        @media ${({ theme }) => theme.devices.tablet} {
          font-size: ${theme.fontSize.mm};
          margin-top: 1vh;
        }
      }
      .solicitation-btns-container {
        margin-top: 3vh;
        display: flex;
        flex-direction: row;
        text-align-last: center;
        margin-right: auto;
        .btn-item {
          margin-right: 1vw;
        }
        .btn-row {
          display: flex;
          flex-direction: row;
          @media ${({ theme }) => theme.devices.tablet} {
            margin-bottom: 1vh;
          }
        }
        @media ${({ theme }) => theme.devices.tablet} {
          flex-direction: column;
          align-items: center;
          margin-right: inherit;
        }
      }
    }
    @media ${({ theme }) => theme.devices.tablet} {
      height: 40vh;
    }
  }
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