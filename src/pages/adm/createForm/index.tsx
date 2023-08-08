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
import {
  TCompany,
  createSolicitation,
  createUser,
} from "../../../service/module/login";

const SolicitationMeuMenu: React.FC = () => {
  const [title, setTitle] = useState<string>("Sua empresa");
  const [contactEmail, setContactEmail] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [welcome, setWelcome] = useState<string>("");
  const [instagranLink, setInstagranLink] = useState<string>("");
  const [localizacao, setLocalizacao] = useState<string>("");
  const [spotifyLink, setSpotifyLink] = useState<string>("");
  const [whatsAppLink, setWhatsAppLink] = useState<string>("");
  const [youtubeLink, setYoutubeLink] = useState<string>("");
  const [reservationText, setReservationText] = useState<string>("");
  const [happyHourText, setHappyHourText] = useState<string>("");

  const [icon, setIcon] = useState();
  const [banner, setBanner] = useState();
  const [fontStyle, setFontStyle] = useState<string>("");

  const [modal, setModal] = useState<boolean>(false);
  const [modalFail, setModalFail] = useState<boolean>(false);

  const changeInput = (e: any, isBanner: boolean = false) => {
    const localFile = e.target.files[0];
    if (isBanner) {
      setBanner(localFile);
    } else {
      setIcon(localFile);
    }
  };

  const createRequest = async () => {
    if (
      title &&
      contactEmail &&
      contactNumber &&
      welcome &&
      icon &&
      banner &&
      fontStyle &&
      login &&
      password
    ) {
      setModal(true);
      setModalFail(false);
      try {
        const credenciais = {
          email: contactEmail,
          password,
        };
        //const company: TCompany = {};
        const res = await createSolicitation(credenciais);
      } catch (error) {}
      //Chamar api aqui.
    } else {
      setModal(false);
      setModalFail(true);
    }
  };

  const teste = async () => {
    const credenciais = {
      email: login,
      password,
    };
    try {
      const kkkk = await createUser(credenciais);
      if (kkkk?.status) {
        console.log("sim ", kkkk);
      } else {
        console.log("não");
      }
    } catch (error) {}
  };

  const handleClose = () => {
    setModal(false);
  };
  const handleCloseFail = () => {
    setModalFail(false);
  };
  const handleSwitch = (id: string) => {
    for (var i = 1; i <= 12; i++) {
      const checkbox = document.getElementById(
        i.toString()
      ) as HTMLInputElement | null;
      if (checkbox != null) {
        checkbox.checked = false;
      }
    }
    const checkbox = document.getElementById(
      id.toString()
    ) as HTMLInputElement | null;
    if (checkbox != null) {
      checkbox.checked = true;
    }
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
                  <p>
                    Use as credenciais de login e senha para acessar o Meu Menu
                    e acompanhar o andamento do cardápio.
                  </p>
                  <p>
                    Entraremos em contato apresentando uma prévia do seu novo
                    cardápio em breve!
                  </p>
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
                  //TODO: COLOCAR NUMERO DO ZAP
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
              <Input setValue={setTitle} label="Nome do estabelecimento" />
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
              marginBottom: "-1vh",
            }}
          >
            Redes Sociais:
          </Styled.TitleSpan>
          <Styled.ItemSpan
            style={{
              fontFamily: theme.fonts.secundary,
            }}
          >
            Desconsiderar caso não tenha as redes sociais a seguir:
          </Styled.ItemSpan>
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
                  label="Endereço"
                  customWidth={isMobile() ? "250px" : "300px"}
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
          <Styled.ItemSpan
            style={{
              fontFamily: theme.fonts.secundary,
            }}
          >
            Desconsiderar caso não ofereça os serviços a seguir:
          </Styled.ItemSpan>
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
              fontFamily: theme.fonts.secundary,
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
                {title}
              </Styled.Fonts>
              <Checkbox
                id="1"
                label=""
                setValue={() => {
                  setFontStyle("AlwaysSmile");
                  handleSwitch("1");
                }}
              />
            </Styled.IconCentralize>

            <Styled.IconCentralize>
              <Styled.Fonts
                style={{
                  fontFamily: theme.fonts.Bachelorette,
                }}
              >
                {title}
              </Styled.Fonts>
              <Checkbox
                id="2"
                label=""
                setValue={() => {
                  setFontStyle("Bachelorette");
                  handleSwitch("2");
                }}
              />
            </Styled.IconCentralize>
            <Styled.IconCentralize>
              <Styled.Fonts
                style={{
                  fontFamily: theme.fonts.BeYou,
                }}
              >
                {title}
              </Styled.Fonts>
              <Checkbox
                id="3"
                label=""
                setValue={() => {
                  setFontStyle("BeYou");
                  handleSwitch("3");
                }}
              />
            </Styled.IconCentralize>
            <Styled.IconCentralize>
              <Styled.Fonts
                style={{
                  fontFamily: theme.fonts.Bravely,
                }}
              >
                {title}
              </Styled.Fonts>
              <Checkbox
                id="4"
                label=""
                setValue={() => {
                  setFontStyle("Bravely");
                  handleSwitch("4");
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
                {title}
              </Styled.Fonts>
              <Checkbox
                id="5"
                label=""
                setValue={() => {
                  setFontStyle("GlossySheen");
                  handleSwitch("5");
                }}
              />
            </Styled.IconCentralize>
            <Styled.IconCentralize>
              <Styled.Fonts
                style={{
                  fontFamily: theme.fonts.LatoRegular,
                }}
              >
                {title}
              </Styled.Fonts>
              <Checkbox
                id="6"
                label=""
                setValue={() => {
                  setFontStyle("LatoRegular");
                  handleSwitch("6");
                }}
              />
            </Styled.IconCentralize>

            <Styled.IconCentralize>
              <Styled.Fonts
                style={{
                  fontFamily: theme.fonts.LEMONMILK,
                }}
              >
                {title}
              </Styled.Fonts>
              <Checkbox
                id="7"
                label=""
                setValue={() => {
                  setFontStyle("LEMONMILK");
                  handleSwitch("7");
                }}
              />
            </Styled.IconCentralize>
            <Styled.IconCentralize>
              <Styled.Fonts
                style={{
                  fontFamily: theme.fonts.NiceSugar,
                }}
              >
                {title}
              </Styled.Fonts>
              <Checkbox
                id="8"
                label=""
                setValue={() => {
                  setFontStyle("NiceSugar");
                  handleSwitch("8");
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
                {title}
              </Styled.Fonts>
              <Checkbox
                id="9"
                label=""
                setValue={() => {
                  setFontStyle("RoughAnthem");
                  handleSwitch("9");
                }}
              />
            </Styled.IconCentralize>
            <Styled.IconCentralize>
              <Styled.Fonts
                style={{
                  fontFamily: theme.fonts.primary,
                }}
              >
                {title}
              </Styled.Fonts>
              <Checkbox
                id="10"
                label=""
                setValue={() => {
                  setFontStyle("primary");
                  handleSwitch("10");
                }}
              />
            </Styled.IconCentralize>

            <Styled.IconCentralize>
              <Styled.Fonts
                style={{
                  fontFamily: theme.fonts.secundary,
                }}
              >
                {title}
              </Styled.Fonts>
              <Checkbox
                id="11"
                label=""
                setValue={() => {
                  setFontStyle("secundary");
                  handleSwitch("11");
                }}
              />
            </Styled.IconCentralize>
            <Styled.IconCentralize>
              <Styled.Fonts
                style={{
                  fontFamily: theme.fonts.hand,
                }}
              >
                {title}
              </Styled.Fonts>
              <Checkbox
                id="12"
                label=""
                setValue={() => {
                  setFontStyle("hand");
                  handleSwitch("12");
                }}
              />
            </Styled.IconCentralize>
          </Styled.MenusRow>

          <Styled.TitleSpan>
            Informações Para acesso do Meu Menu
          </Styled.TitleSpan>
          <Styled.ItemSpan
            style={{
              fontFamily: theme.fonts.secundary,
            }}
          >
            Login e senha para realizar o acesso a plataforma.
          </Styled.ItemSpan>
          <Styled.MenusRow>
            <Styled.FormItemContainer>
              <Input
                setValue={setLogin}
                label="E-mail para login na plataforma"
              />
            </Styled.FormItemContainer>
            <Styled.FormItemContainer>
              <Input isPassowd setValue={setPassword} label={"Senha"}></Input>
            </Styled.FormItemContainer>
          </Styled.MenusRow>

          <Styled.TitleSpan>Informações Para o Meu Menu</Styled.TitleSpan>
          <Styled.ItemSpan
            style={{
              fontFamily: theme.fonts.secundary,
            }}
          >
            Informações para a equipe do Meu Menu entrar em contato.
          </Styled.ItemSpan>
          <Styled.MenusRow>
            <Styled.FormItemContainer>
              <InputMasked
                mask="(99) 9 9999-9999"
                setValue={setContactNumber}
                label="Número para contato"
              />
            </Styled.FormItemContainer>
            <Styled.FormItemContainer>
              <Input setValue={setContactEmail} label="E-mail para contato" />
            </Styled.FormItemContainer>
          </Styled.MenusRow>
        </Styled.Menus>
        <Styled.BtnContainer>
          <ButtonSecondary
            action={() => {
              //createRequest();
              teste();
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
