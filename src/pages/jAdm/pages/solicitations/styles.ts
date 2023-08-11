import styled from "styled-components";

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
}
`;

export const SolicitationsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  heigh: 100%;
  overflow-y: scroll;

`