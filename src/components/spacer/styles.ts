import styled from "styled-components";


export const Spacer = styled.div`
width: 3vw;
height: 16px;
border-radius: 25px;
@media ${({ theme }) => theme.devices.tablet} {
  width: 15vw;
  align-self: normal;
 }
`;
