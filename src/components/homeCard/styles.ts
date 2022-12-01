import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 50px;
  align-items: center;
  padding: 25px;
  text-align: center;
  cursor: pointer;
  width: 13%;
  margin-left: 1vw;
  margin-right: 1vw;

  {
      position:relative;
      -webkit-box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
         -moz-box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
              box-shadow:0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  }
  :before, :after
  {
    content:"";
      position:absolute;
      z-index:-1;
      -webkit-box-shadow:0 0 20px rgba(0,0,0,0.8);
      -moz-box-shadow:0 0 20px rgba(0,0,0,0.8);
      box-shadow:0 0 20px rgba(0,0,0,0.8);
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
  img {
    width: 45% !important;
  }
  @media ${({ theme }) => theme.devices.tablet} {
    margin-left: 0vw;
    margin-bottom: 3vh;
    img {
      width: 50% !important;
    }
  }

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
export const Title = styled.span`
 display: flex;
 width: 95%;
 justify-content: center;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSize.md2};
  @media ${({ theme }) => theme.devices.tablet} {
    font-size: 35px;
  }
`;
export const Paragraph = styled.p`
  display: flex;
  font-family: ${({ theme }) => theme.fonts.secundary};
  font-size: 12px;
  @media ${({ theme }) => theme.devices.tablet} {
    font-size: 12px;
  }
`;