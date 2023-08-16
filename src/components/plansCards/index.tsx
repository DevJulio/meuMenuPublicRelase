import React, { useState } from "react";
import * as Styled from "./styles";
import { TCardProps } from "./card";
import { theme } from "../../theme/theme";
import ButtonSecondary from "../buttons/homeBtn";
import point from "../../assets/icons/cardsIcons/plans/point.png";
import Modal from "../modal";
import { useNavigate } from "react-router-dom";
import { encryptToAuth } from "../../utils/security/isAuth";

const PlansCard: React.FC<TCardProps> = ({
  icon,
  title,
  text,
  mainColor,
  auxColor,
  textColor,
  price,
  list,
  includeText,
  priceText,
  isLast,
}) => {
  const [modal, setModal] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleClose = () => {
    setModal(false);
  };

  setTimeout(() => {
    const element = document.querySelector(
      "#root > div:nth-child(3) > div.sc-bYMpWt.kyDhNb > div.sc-ehvNnt.jlTxA > div:nth-child(3) > div.sc-jRwbcX.jMlxSV > span"
    );
    const span = element as any;
    if (span) {
      span["style"].color = "#ffffff";
    }
  }, 150);

  const signIn = () => {
    localStorage.setItem("@meumenu/planType", encryptToAuth(title));
    setModal(true);
  };
  const continueSignIn = () => {
    handleClose();
    navigate("/cadastro");
  };

  return (
    <>
      {modal && (
        <Modal
          bannerColor={theme.colors.red.normal}
          title={title}
          handleClose={handleClose}
          titleFont={theme.fonts.primary}
        >
          <>
            <Styled.PlansDetailModal>
              O plano {title} foi selecionado, deseja continuar para o cadastro?
            </Styled.PlansDetailModal>
            <Styled.BtnContainer
              style={{
                justifyContent: "center",
                marginBottom: "2vh",
              }}
            >
              <ButtonSecondary
                action={continueSignIn}
                Label={"Começar cadastro!"}
                fontSize={theme.fontSize.md}
                color={theme.colors.white.normal}
                bgColor={theme.colors.red.normal}
              />
            </Styled.BtnContainer>
          </>
        </Modal>
      )}

      <Styled.Container
        style={{
          backgroundColor: mainColor,
        }}
      >
        <Styled.TitleAndLogo>
          <Styled.LogoImg src={icon} alt="icone" />
          <Styled.Title style={{ color: auxColor }}>{title}</Styled.Title>
        </Styled.TitleAndLogo>
        <Styled.Paragraph style={{ color: textColor ? textColor : "#fff" }}>
          {text}
        </Styled.Paragraph>
        <Styled.PriceAndDescription>
          <Styled.Price style={{ color: theme.colors.gray.dark }}>
            R$
          </Styled.Price>
          <Styled.Price>{price}</Styled.Price>
          <Styled.PriceText>{priceText}</Styled.PriceText>
        </Styled.PriceAndDescription>
        <Styled.BtnContainer>
          <ButtonSecondary
            action={signIn}
            Label={"assinar e Começar cadastro!"}
            fontSize={theme.fontSize.md}
            color={isLast ? theme.colors.red.normal : theme.colors.white.normal}
            bgColor={
              isLast ? theme.colors.white.normal : theme.colors.red.normal
            }
          />
        </Styled.BtnContainer>
        <Styled.List>
          <Styled.Include
            style={{
              color: isLast
                ? theme.colors.white.normal
                : theme.colors.blue.palete,
            }}
          >
            {includeText}
          </Styled.Include>
          <>
            {list &&
              list.map((text, id) => {
                return (
                  <Styled.ListItem>
                    <Styled.ListImg src={point} />
                    <Styled.ListSpan>{text}</Styled.ListSpan>
                  </Styled.ListItem>
                );
              })}
          </>
        </Styled.List>
      </Styled.Container>
    </>
  );
};

export default PlansCard;
