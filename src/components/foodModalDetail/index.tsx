import React from "react";
import { TProducts } from "../../pages/menu";
import * as Styled from "./styles";
import harmonizacao from "../../assets/icons/harmonizacao.png";
import grape from "../../assets/icons/grape.png";

import flag from "../../assets/icons/flag.gif";
import saibaMais from "../../assets/icons/saibaMais.gif";
import IBU from "../../assets/icons/IBU.gif";
import { theme } from "../../theme/theme";

interface TFood {
  modalIten: any; //TProducts
}

const FoodModalDetail: React.FC<TFood> = ({ modalIten }) => {
  return (
    <>
      <Styled.MainContainer>
        <Styled.HarmozizationContainer>
          <Styled.HarmozizationIcon src={saibaMais} />
          <Styled.Harmozization>Saiba mais!</Styled.Harmozization>
        </Styled.HarmozizationContainer>
        {modalIten.description
          ? modalIten.description
          : modalIten.descriptionText}
        {modalIten.harmoziation && (
          <>
            <Styled.HarmozizationContainer>
              <Styled.HarmozizationIcon src={harmonizacao} />
              <Styled.Harmozization>Harmoniza bem com...</Styled.Harmozization>
            </Styled.HarmozizationContainer>
            {modalIten.harmoziation}
          </>
        )}
        {modalIten.country && (
          <>
            <Styled.HarmozizationContainer>
              <Styled.HarmozizationIcon src={flag} />
              <Styled.Harmozization>Pais de origem: </Styled.Harmozization>
            </Styled.HarmozizationContainer>
            {modalIten.country}
          </>
        )}
        {modalIten.IBU && (
          <>
            <Styled.HarmozizationContainer>
              <Styled.HarmozizationIcon src={IBU} />
              <Styled.Harmozization>IBU: </Styled.Harmozization>
            </Styled.HarmozizationContainer>
            {modalIten.IBU}
          </>
        )}
        {modalIten.grape && (
          <>
            <Styled.HarmozizationContainer>
              <Styled.HarmozizationIcon src={grape} />
              <Styled.Harmozization>Uva: </Styled.Harmozization>
            </Styled.HarmozizationContainer>
            {modalIten.grape}
          </>
        )}
      </Styled.MainContainer>
      <Styled.Price
        style={{
          backgroundColor: theme.colors.black.normal,
          color: "white",
        }}
      >
        <span> R$ {modalIten.price}</span>
      </Styled.Price>
    </>
  );
};

export default FoodModalDetail;
