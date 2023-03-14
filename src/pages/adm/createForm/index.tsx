import React, { useState } from "react";
import Footer from "../../../components/footer";
import Header from "../../../components/header";
import Input from "../../../components/input";
import * as Styled from "./styles";
import instagram from "../../../assets/icons/socialMedia/gif/instagram.gif";
import marker from "../../../assets/icons/socialMedia/gif/marker.gif";
import spotify from "../../../assets/icons/socialMedia/gif/spotify.gif";
import whatsapp from "../../../assets/icons/socialMedia/gif/whatsapp.gif";
import youtube from "../../../assets/icons/socialMedia/gif/youtube.gif";
import happy from "../../../assets/icons/socialMedia/gif/happy.gif";
import resevation from "../../../assets/icons/socialMedia/gif/resevation.png";

import { theme } from "../../../theme/theme";
import isMobile from "is-mobile";
import Checkbox from "../../../components/CheckBox";
import InputMasked from "../../../components/MaskedIpunt";
import ButtonSecondary from "../../../components/buttons/secondary";
import Modal from "../../../components/modal";

const SolicitationMeuMenu: React.FC = () => {
  const [brandName, setBrandName] = useState<string>("Sua empresa");
  const [email, setEmail] = useState<string>("Sua empresa");
  const [contact, setContact] = useState<string>("Sua empresa");

  const [welcome, setWelcome] = useState<string>("");
  const [instagranLink, setInstagranLink] = useState<string>("");
  const [localizacao, setLocalizacao] = useState<string>("");
  const [spotifyLink, setSpotifyLink] = useState<string>("");
  const [whatsAppLink, setWhatsAppLink] = useState<string>("");
  const [youtubeLink, setYoutubeLink] = useState<string>("");
  const [reservationText, setReservationText] = useState<string>("");
  const [happyHourText, setHappyHourText] = useState<string>("");

  const [logo, setLogo] = useState();
  const [banner, setBanner] = useState();
  const [fontStyle, setFontStyle] = useState<string>("");

  const [modal, setModal] = useState<boolean>(false);
  const [modalFail, setModalFail] = useState<boolean>(false);

  const changeInput = (e: any, isBanner: boolean = false) => {
    const localFile = e.target.files[0];
    if (isBanner) {
      setBanner(localFile);
    } else {
      setLogo(localFile);
    }
  };

  const createRequest = () => {
    if (
      brandName &&
      email &&
      contact &&
      welcome &&
      instagranLink &&
      localizacao &&
      spotifyLink &&
      whatsAppLink &&
      youtubeLink &&
      reservationText &&
      happyHourText &&
      logo &&
      banner &&
      fontStyle
    ) {
      setModal(true);
      setModalFail(false);
    } else {
      setModal(false);
      setModalFail(true);
    }
  };
  const handleClose = () => {
    setModal(false);
  };
  const handleCloseFail = () => {
    setModalFail(false);
  };
  return (
    <>
      <Header />
      <Styled.MainContainer>
        {modal && (
          <Modal
            bannerColor={theme.colors.green.normal}
            title={"Sucesso!"}
            handleClose={handleClose}
            titleFont={theme.fonts.primary}
          >
            <>
              <Styled.PlansDetailModal>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  O seu cadastro foi realizado, em breve a equipe do Meu Menu
                  entrará em contato para finalizar o processo de adesão e para
                  começar o cadastro do seu cardápio!
                  <p
                    style={{
                      textAlignLast: "center",
                    }}
                  >
                    Caso tenha dúvidas, entre em contato com o Meu Menu!
                  </p>
                </div>
              </Styled.PlansDetailModal>
              <Styled.BtnContainer
                style={{
                  marginTop: "0px",
                  justifyContent: "center",
                  marginBottom: "2vh",
                }}
              >
                <ButtonSecondary
                  action={() => {}}
                  Label={"Entrar em contato com o Meu Menu!"}
                  fontSize={theme.fontSize.md}
                  color={theme.colors.white.normal}
                  bgColor={theme.colors.green.normal}
                />
              </Styled.BtnContainer>
            </>
          </Modal>
        )}

        {modalFail && (
          <Modal
            bannerColor={theme.colors.red.normal}
            title={"Verifique os campos e tente novamente!"}
            handleClose={handleCloseFail}
            titleFont={theme.fonts.primary}
          >
            <>
              <Styled.PlansDetailModal>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <p
                    style={{
                      textAlignLast: "center",
                    }}
                  >
                    Todos os campos do formulário devem estar preenchidos,
                    verifique e tente novamente!
                  </p>
                </div>
              </Styled.PlansDetailModal>
              <Styled.BtnContainer
                style={{
                  marginTop: "0px",
                  justifyContent: "center",
                  marginBottom: "2vh",
                }}
              >
                <ButtonSecondary
                  action={handleCloseFail}
                  Label={"Entendi"}
                  fontSize={theme.fontSize.md}
                  color={theme.colors.white.normal}
                  bgColor={theme.colors.red.normal}
                />
              </Styled.BtnContainer>
            </>
          </Modal>
        )}

        <Styled.TitleSpan>Preencha todos os campos</Styled.TitleSpan>
        <Styled.Menus>
          <Styled.MenusRow>
            <Styled.FormItemContainer>
              <Input setValue={setBrandName} label="Nome do estabelecimento" />
            </Styled.FormItemContainer>
            <Styled.FormItemContainer>
              <Styled.ItemSpan>
                Selecione a logo do estabelecimento
              </Styled.ItemSpan>
              <Styled.Centralize>
                <Styled.FileInput
                  type="file"
                  id="mainBanner"
                  onChange={(e) => {
                    changeInput(e);
                  }}
                />
              </Styled.Centralize>
            </Styled.FormItemContainer>
          </Styled.MenusRow>
          <Styled.MenusRow>
            <Styled.FormItemContainer>
              <Input setValue={setWelcome} label="Frase de boas vindas" />
            </Styled.FormItemContainer>
            <Styled.FormItemContainer>
              <Styled.ItemSpan>
                Selecione o Banner principal (Imagem de destaque)
              </Styled.ItemSpan>
              <Styled.Centralize>
                <Styled.FileInput
                  type="file"
                  id="mainBanner"
                  onChange={(e) => {
                    changeInput(e, true);
                  }}
                />
              </Styled.Centralize>
            </Styled.FormItemContainer>
          </Styled.MenusRow>
          <Styled.TitleSpan
            style={{
              marginTop: "5vh",
            }}
          >
            Redes Sociais:
          </Styled.TitleSpan>
          <Styled.MenusRow>
            <Styled.SocialMediaContainer>
              <Styled.IconCentralize>
                <Styled.Icon src={instagram} onClick={() => {}} />
                <Input
                  labelColor={theme.colors.red.normal}
                  setValue={setInstagranLink}
                  label="Instagram"
                  customWidth={isMobile() ? "250px" : "170px"}
                />
              </Styled.IconCentralize>

              <Styled.IconCentralize>
                <Styled.Icon src={marker} onClick={() => {}} />
                <Input
                  labelColor={theme.colors.red.normal}
                  setValue={setLocalizacao}
                  label="Localização"
                  customWidth={isMobile() ? "250px" : "170px"}
                />
              </Styled.IconCentralize>
              <Styled.IconCentralize>
                <Styled.Icon src={spotify} onClick={() => {}} />
                <Input
                  labelColor={theme.colors.red.normal}
                  setValue={setSpotifyLink}
                  label="Link da playlist"
                  customWidth={isMobile() ? "250px" : "170px"}
                />
              </Styled.IconCentralize>
              <Styled.IconCentralize>
                <Styled.Icon src={whatsapp} onClick={() => {}} />
                <Input
                  labelColor={theme.colors.red.normal}
                  setValue={setWhatsAppLink}
                  label="WhatsApp"
                  customWidth={isMobile() ? "250px" : "170px"}
                />
              </Styled.IconCentralize>
              <Styled.IconCentralize>
                <Styled.Icon src={youtube} onClick={() => {}} />
                <Input
                  labelColor={theme.colors.red.normal}
                  setValue={setYoutubeLink}
                  label="Canal do Youtube"
                  customWidth={isMobile() ? "250px" : "170px"}
                />
              </Styled.IconCentralize>
            </Styled.SocialMediaContainer>
          </Styled.MenusRow>

          <Styled.TitleSpan
            style={{
              marginTop: "5vh",
            }}
          >
            Reservas / Happy Hour:
          </Styled.TitleSpan>
          <Styled.MenusRow>
            <Styled.SocialMediaContainer>
              <Styled.IconCentralize>
                <Styled.Icon src={happy} onClick={() => {}} />
                <Input
                  labelColor={theme.colors.red.normal}
                  setValue={setHappyHourText}
                  label="Intruções e regras do happy hour"
                  isTextArea
                  customWidth={isMobile() ? "250px" : "450px"}
                />
              </Styled.IconCentralize>

              <Styled.IconCentralize>
                <Styled.Icon src={resevation} onClick={() => {}} />
                <Input
                  labelColor={theme.colors.red.normal}
                  setValue={setReservationText}
                  label="Instruções de reserva"
                  isTextArea
                  customWidth={isMobile() ? "250px" : "450px"}
                />
              </Styled.IconCentralize>
            </Styled.SocialMediaContainer>
          </Styled.MenusRow>
          <Styled.TitleSpan
            style={{
              marginTop: "5vh",
            }}
          >
            Detalhes:
          </Styled.TitleSpan>
          <Styled.ItemSpan
            style={{
              fontFamily: theme.fonts.hand,
            }}
          >
            Selecione a fonte que mais combina com seu estabelecimento para os
            títulos e destaques do seu cardápio!
          </Styled.ItemSpan>
          <Styled.MenusRow>
            <Styled.IconCentralize>
              <Styled.Fonts
                style={{
                  fontFamily: theme.fonts.AlwaysSmile,
                }}
              >
                {brandName}
              </Styled.Fonts>
              <Checkbox
                label=""
                setValue={() => {
                  setFontStyle("AlwaysSmile");
                }}
              />
            </Styled.IconCentralize>

            <Styled.IconCentralize>
              <Styled.Fonts
                style={{
                  fontFamily: theme.fonts.Bachelorette,
                }}
              >
                {brandName}
              </Styled.Fonts>
              <Checkbox
                label=""
                setValue={() => {
                  setFontStyle("Bachelorette");
                }}
              />
            </Styled.IconCentralize>
            <Styled.IconCentralize>
              <Styled.Fonts
                style={{
                  fontFamily: theme.fonts.BeYou,
                }}
              >
                {brandName}
              </Styled.Fonts>
              <Checkbox
                label=""
                setValue={() => {
                  setFontStyle("BeYou");
                }}
              />
            </Styled.IconCentralize>
            <Styled.IconCentralize>
              <Styled.Fonts
                style={{
                  fontFamily: theme.fonts.Bravely,
                }}
              >
                {brandName}
              </Styled.Fonts>
              <Checkbox
                label=""
                setValue={() => {
                  setFontStyle("Bravely");
                }}
              />
            </Styled.IconCentralize>
          </Styled.MenusRow>

          <Styled.MenusRow>
            <Styled.IconCentralize>
              <Styled.Fonts
                style={{
                  fontFamily: theme.fonts.GlossySheen,
                }}
              >
                {brandName}
              </Styled.Fonts>
              <Checkbox
                label=""
                setValue={() => {
                  setFontStyle("GlossySheen");
                }}
              />
            </Styled.IconCentralize>
            <Styled.IconCentralize>
              <Styled.Fonts
                style={{
                  fontFamily: theme.fonts.LatoRegular,
                }}
              >
                {brandName}
              </Styled.Fonts>
              <Checkbox
                label=""
                setValue={() => {
                  setFontStyle("LatoRegular");
                }}
              />
            </Styled.IconCentralize>

            <Styled.IconCentralize>
              <Styled.Fonts
                style={{
                  fontFamily: theme.fonts.LEMONMILK,
                }}
              >
                {brandName}
              </Styled.Fonts>
              <Checkbox
                label=""
                setValue={() => {
                  setFontStyle("LEMONMILK");
                }}
              />
            </Styled.IconCentralize>
            <Styled.IconCentralize>
              <Styled.Fonts
                style={{
                  fontFamily: theme.fonts.NiceSugar,
                }}
              >
                {brandName}
              </Styled.Fonts>
              <Checkbox
                label=""
                setValue={() => {
                  setFontStyle("NiceSugar");
                }}
              />
            </Styled.IconCentralize>
          </Styled.MenusRow>

          <Styled.MenusRow>
            <Styled.IconCentralize>
              <Styled.Fonts
                style={{
                  fontFamily: theme.fonts.RoughAnthem,
                }}
              >
                {brandName}
              </Styled.Fonts>
              <Checkbox
                label=""
                setValue={() => {
                  setFontStyle("RoughAnthem");
                }}
              />
            </Styled.IconCentralize>
            <Styled.IconCentralize>
              <Styled.Fonts
                style={{
                  fontFamily: theme.fonts.primary,
                }}
              >
                {brandName}
              </Styled.Fonts>
              <Checkbox
                label=""
                setValue={() => {
                  setFontStyle("primary");
                }}
              />
            </Styled.IconCentralize>

            <Styled.IconCentralize>
              <Styled.Fonts
                style={{
                  fontFamily: theme.fonts.secundary,
                }}
              >
                {brandName}
              </Styled.Fonts>
              <Checkbox
                label=""
                setValue={() => {
                  setFontStyle("secundary");
                }}
              />
            </Styled.IconCentralize>
            <Styled.IconCentralize>
              <Styled.Fonts
                style={{
                  fontFamily: theme.fonts.hand,
                }}
              >
                {brandName}
              </Styled.Fonts>
              <Checkbox
                label=""
                setValue={() => {
                  setFontStyle("hand");
                }}
              />
            </Styled.IconCentralize>
          </Styled.MenusRow>
          <Styled.TitleSpan>Informações Para o Meu Menu</Styled.TitleSpan>
          <Styled.MenusRow>
            <Styled.FormItemContainer>
              <InputMasked
                mask="(99) 9 9999-9999"
                setValue={setContact}
                label="Número para contato"
              />
            </Styled.FormItemContainer>
            <Styled.FormItemContainer>
              <Input setValue={setEmail} label="E-mail para contato" />
            </Styled.FormItemContainer>
          </Styled.MenusRow>
        </Styled.Menus>
        <Styled.BtnContainer>
          <ButtonSecondary
            action={() => {
              createRequest();
            }}
            Label="Finalizar solicitação"
            color={theme.colors.red.normal}
            bgColor={theme.colors.white.normal}
          />
        </Styled.BtnContainer>
      </Styled.MainContainer>
      <Footer />
    </>
  );
};

export default SolicitationMeuMenu;
