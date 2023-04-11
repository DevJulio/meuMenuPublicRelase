import styled from "styled-components";

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
export const MainContainer = styled.div`
  display: flex;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.blue.palete};
  flex-direction: column;
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

export const BackBtnContainer = styled.div`
  display: flex;
  margin-top:2vw;
   margin-bottom: 2vh;
 `;
export const MenuContainer = styled.div`
 display: flex;
 width: 100%;
 background-color: ${({ theme }) => theme.colors.blue.palete};
 flex-direction: column;
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
align-items: center;
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

export const ContainerCategories = styled.div`
display: flex;
flex-direction: row;
margin-top: 2vh;
height: 12vh;
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
export const FoodCategoryItem = styled.div`
display: flex;
margin-bottom: 5vh;
cursor: pointer;
flex-direction: column;
 `
export const FormItemContainer = styled.div`
  margin-left: 40px;
  margin-right: 40px;
      align-self: center;
 
  display: flex;
  flex-direction: column;
  @media ${({ theme }) => theme.devices.tablet} {
    margin-left: 0px;
    margin-right: 0px;
    width: 95%;
    align-self: center;
  }
`;

export const PlusContainer = styled.div`
display: flex;
background-color: ${({ theme }) => theme.colors.white.normal};
border-radius: 25px;
cursor: pointer;
 align-self: center;
align-items: center;
justify-content: center;
 
`;
export const PlusSpan = styled.span`
font-family: ${({ theme }) => theme.fonts.primary};
    font-size: ${({ theme }) => theme.fontSize.xxxlg};
    margin-bottom: 2vh;
    color: ${({ theme }) => theme.colors.yellow.palete};  
    margin-inline: 3vw;
`

export const DeleteContainer = styled.div`
display: flex;
 flex-direction: column;
align-self: center;
 `

export const DeleteSpan = styled.span`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSize.md};
  color: ${({ theme }) => theme.colors.black.normal};
  margin-top: 1vh;
  margin-bottom: 1vh;
`;
export const CounterRow = styled.div`
  display: flex;
  flex-direction: row;
  align-self: center;
  margin-top: 3vh;
  margin-bottom: -2vh;
  background-color: ${({ theme }) => theme.colors.yellow.palete};
  border-radius: 25px;
  align-items: center;
   `
export const CounterBtn = styled.div`
  align-self: center;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSize.xxlg};
  margin-inline: 2.7vw;
 `
export const CounterSpan = styled.span`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.blue.palete};
   `
export const ItemRow = styled.div`
  display: flex;
  flex-direction: row;
  align-self: center;
   `
export const ItemCol = styled.div`
   display: flex;
   flex-direction: column;
   align-self: center;
    `
export const LblPriceDetail = styled.div`
display: flex;
flex-direction: row;
align-self: center;
background-color: ${({ theme }) => theme.colors.red.normal};
    border-radius: 25px;
 
`
export const PageSpan = styled.span`
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSize.xlg};
  color: ${({ theme }) => theme.colors.white.normal};
  margin-top: 2vh;
  margin-bottom: 2vh;
margin-inline: 3vw;
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
export const Centralize = styled.div`
display: flex;
place-Self: center;
`;
export const MenuBanner = styled.img`
  width: 500px;
  margin-top: 1vw;
  margin-bottom: 1vw;
  @media ${({ theme }) => theme.devices.tablet} {
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
