import styled from "styled-components";


export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 25px;
  margin-left: 2.5vw;
  margin-right: 2.5vw;  
  max-height: 60vh;
  overflow-x: hidden;
  padding-bottom: 5vh;

 `;
export const Harmozization = styled.span`
font-size: ${({ theme }) => theme.fontSize.md};

`;
export const HarmozizationIcon = styled.img`
    width: 45px;
    margin-left: 1vw;
    margin-right: 2vw;
`;
export const HarmozizationContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
   margin-top: 2vh;
  margin-bottom: 2vh;
`;
export const Price = styled.div`
border-bottom-left-radius: 5px;
border-bottom-right-radius: 5px;
margin-top: 2vh;
display: flex;
justify-content: center;
height: 5vh;
align-items: center;
span {
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSize.md2};
}
`;