import React, { useContext, useState } from "react";
import * as Styled from "./styles";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import ButtonPrimaryHome from "../buttons/homeBtn";
interface Props {
  cardData: any;
  toggle: boolean;
  setToggle: () => void;
}

export const PaymentCard: React.FC<Props> = ({
  cardData,
  toggle,
  setToggle,
}) => {
  const [continueDelete, setContinueDelete] = useState<boolean>(false);

  const disableCard = async (id: string) => {};

  return (
    <>
      <Styled.CardItem>
        <Styled.CardContainer>
          <Styled.CardContainerTitle
            onClick={() => {
              setToggle();
            }}
          >
            <Styled.CardBannerIconContainer>
              {/* {checkCreditCardBanner(cardData.first_two_digits)} */}
            </Styled.CardBannerIconContainer>
            [Crédito] , terminado em
            <Styled.CardContainerExpireTitle>
              Expira em replace
            </Styled.CardContainerExpireTitle>
            <Styled.ToggleIcon icon={toggle ? faAngleUp : faAngleDown} />
          </Styled.CardContainerTitle>
          <Styled.CardDetails disable={toggle}>
            <Styled.CardAdressContainer>
              <Styled.CardAddresLabel>
                Endereço de cobrança
              </Styled.CardAddresLabel>
              <Styled.Title>kkkkkkkkkkkkkk</Styled.Title>
              <Styled.Lbl>street, complement</Styled.Lbl>
              <Styled.Lbl>Cep: </Styled.Lbl>
              &&&& (
              <>
                <Styled.Lbl></Styled.Lbl>
              </>
              )
            </Styled.CardAdressContainer>
            <Styled.CardsBtnContainer>
              <Styled.BtnContainer>
                {!continueDelete ? (
                  <>
                    {/* <ButtonPrimaryHome
                      action={() => {
                        setContinueDelete(!continueDelete);
                      }}
                      color={"red"}
                    >
                      Remover Cartão
                    </ButtonPrimaryHome> */}
                    <button>remover</button>
                  </>
                ) : (
                  <>
                    <Styled.ConfirmSpan>
                      Tem certeza que gostaria <br /> de remover esse cartão?
                    </Styled.ConfirmSpan>
                    <button>kkkkkkkkk</button>
                    {/* <ButtonPrimary
                      action={() => {
                        disableCard(cardData.id);
                      }}
                      color={"red"}
                    >
                      Continuar
                    </ButtonPrimary> */}
                  </>
                )}
              </Styled.BtnContainer>
            </Styled.CardsBtnContainer>
          </Styled.CardDetails>
        </Styled.CardContainer>
      </Styled.CardItem>
    </>
  );
};

export default PaymentCard;
