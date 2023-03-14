import styled from "styled-components";


export const MainVantageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.yellow.palete};
`;

export const VantageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white.normal};
  width: 100%;
  border-top-left-radius: 15vw;
  border-top-right-radius: 15vw;
 
  {
    position:relative;
 
}
:before, :after
{
  content:"";
    position:absolute;
    z-index:-1;
 
    top:0;
    bottom:0;
    left:10px;
    right:10px;
    -moz-border-radius:100px / 50px;
    border-radius:100px / 50px;
}
:after
{
  right:10px;
    left:auto;
    -webkit-transform:skew(8deg) rotate(3deg);
       -moz-transform:skew(8deg) rotate(3deg);
        -ms-transform:skew(8deg) rotate(3deg);
         -o-transform:skew(8deg) rotate(3deg);
            transform:skew(8deg) rotate(3deg);
}
@media ${({ theme }) => theme.devices.tablet} {
display:none;
}
`;
export const VantageSpan = styled.span`
  margin-top: 3vh;
  color: ${({ theme }) => theme.colors.black.normal};
  display: flex;
  margin-right: 12px;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSize.xxlg};
  @media ${({ theme }) => theme.devices.tablet} {
    font-size: 35px;
  }
`;

export const MainSpanContainer = styled.div`
  display: flex;
  cursor: pointer;
  flex-direction: row;
  @media ${({ theme }) => theme.devices.tablet} {
    text-align: -webkit-center;
    width: 95%;
    padding-bottom: 5vh;
  }
`;



export const CardsContainer = styled.div`
  justify-content: center;
  display: flex;
  flex: 3;
  flex-direction: row;
  overflow-x: auto;
  width: 50%;
  align-self: center;
  padding-bottom: 5vh;
  padding-top: 5vh;
  @media ${({ theme }) => theme.devices.tablet} {
    width: 100%;
  }
`;
export const VantageContainerMobile = styled.div`
display:none;
@media ${({ theme }) => theme.devices.tablet} {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white.normal};
  width: 100%;
  border-top-left-radius: 15vw;
  border-top-right-radius: 15vw;
  padding-top: 5vh;
 
}
`;

export const CarouselContainerMobile = styled.div`
display:none;
@media ${({ theme }) => theme.devices.tablet} {
  width: 85%;
  display: flex;
}
`;


export const CardsContainerMobile = styled.div`
display:none;

  @media ${({ theme }) => theme.devices.tablet} {
    justify-content: center;
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    width: 100%;
    align-self: center;
  }
`;
