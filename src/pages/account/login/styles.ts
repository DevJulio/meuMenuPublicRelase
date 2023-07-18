import styled from "styled-components";


// export const MainContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   height:100%;
//   width: 100%;
//   background-color: ${({ theme }) => theme.colors.blue.palete};
//   color: white;

//   .form-container {
//     .logo {

//     }
//     .inputs-container {

//     }
//   }
// `;



export const Cointainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  width: 100%;
  height: fit-content;
  @media ${({ theme }) => theme.devices.tablet} {
  }
`;
export const FormCointainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.blue.palete};
  height: 100vh;
  width: 100%;
  position: fixed;
  padding-top: 2vh;
  @media ${({ theme }) => theme.devices.tablet} {
  }
`;
export const Input = styled.input`
  width: 25vw;
  border-radius: 10px;
  font-size: 12px;
  background-color: ${({ theme }) => theme.colors.yellow.palete};
  color: ${({ theme }) => theme.colors.black.normal};
  padding: 1em;
  font-size: ${({ theme }) => theme.fontSize.mm};
  @media ${({ theme }) => theme.devices.tablet} {
    padding: 1vh;
    width: 100%;
    
  }
`;
export const LogoImg = styled.img`
  width: 10%;
  padding-bottom: 5px;
  @media ${({ theme }) => theme.devices.tablet} {
    width: 31%;
    padding-top: 5px;
    cursor: pointer;
  }
`;

export const BtnContainer = styled.div`
  place-content: center;
  display: flex;
  padding-top: 3vh;
  @media ${({ theme }) => theme.devices.tablet} {
    width: 100%;
  }
`;

export const MainContainer = styled.div`
  display: flex;
  padding-top: 4vh;
  flex-direction: column;
  width: 31%;
  align-items: center;
  background-color: white;
  border-radius: 25px;
  padding-bottom: 4vh;

  .error-span {
    color: red;
    font-size: ${({ theme }) => theme.fontSize.mm};
  }

  .span-input-container {
    display: flex;
    flex-direction: column;
    margin-top: 2vh;

    .span-input {
      margin-bottom: 2vh;
      font-weight: 600;
      margin-left: 0.1vw;
      font-size: ${({ theme }) => theme.fontSize.md};
      margin-right: auto;
    }
    @media ${({ theme }) => theme.devices.tablet} {
      align-items: center;
      width: 70vw;
    }  
  }

  .span-forget {
    margin-top: 3vh;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.blue.palete};
  }

  @media ${({ theme }) => theme.devices.tablet} {
    width: 90%;
  }
`;

export const Btn = styled.button`
  place-self: center;
  min-width: 25vw;
  padding: 0.5vw;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-size: ${({ theme }) => theme.fontSize.md2};
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.yellow.palete};
  color: ${({ theme }) => theme.colors.black.normal};
  cursor: pointer;
  border-style: none;
  transition:  background-color 0.5s ease-in;
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray.light};
  }
  @media ${({ theme }) => theme.devices.tablet} {
    font-size: ${({ theme }) => theme.fontSize.md};
    padding: 3vw;
    width: 84%;
  }
`;
