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
    color: ${({ theme }) => theme.colors.yellow.palete};  
  }
`

export const CateIcon = styled.img`
 width: 100px;
`


export const FoodCategoryItem = styled.div`
display: flex;
margin-bottom: 5vh;
cursor: pointer;
flex-direction: column;
 `
export const FoodCategoryItemRow = styled.div`
 display: flex;
 flex-direction: column;
 align-self: center;
  `



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
place-Self: center;
`;
export const IconCentralize = styled.div`
display: flex;
align-items: center;
flex-direction: column;
place-Self: center;
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
export const ContainerCategories = styled.div`
display: flex;
flex-direction: row;
margin-top: 2vh;
margin-bottom: 1vh;
 height: 12vh;

`;
export const SwitchContainer = styled.div`
display: flex;
 flex-direction: column;
align-self: center;
`
export const SwitchBtnContainer = styled.div`
  margin-left: 1vw;
`

export const SwitchContainerRow = styled.div`
 display: flex;
 flex-direction: row;
 align-self: center;
 margin-top: 1.5vh;
 align-items: center;
 box-shadow: 1px 5px 5px rgb(0 0 0 / 32%);
 background-color: ${({ theme }) => theme.colors.white.normal};
 border-radius: 25px;
 width: 250px;
 justify-content: center;
 `
export const SwitchSpan = styled.span`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.black.normal};
  margin-top: 1vh;
  margin-bottom: 1vh;
`;
export const SwitchIconEdit = styled.img`
  width: 55px;
  margin-left: 3.5vw;
  `;
