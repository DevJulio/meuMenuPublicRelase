import styled from "styled-components";


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
export const CategoryContainer = styled.div`
justify-content: center;
margin-top: 10vh;
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
  }
`;
export const CategoryContainerAux = styled.div`
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
export const CateRow = styled.div`
display: flex;
flex-direction: row;
align-self: center;
 `

export const CateItem = styled.div`
display: flex;
margin-inline: 3vh;
cursor: pointer;
flex-direction: column;
align-self: center;
justify-content: center;
  span {
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: ${({ theme }) => theme.fontSize.md};
    margin-top: 1vh;
    color: ${({ theme }) => theme.colors.yellow.palete};  }
`

export const CateIcon = styled.img`
 width: 100px;
`

