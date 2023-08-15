import React, { useEffect, useState } from "react";
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

const UpdateData: React.FC = () => {
  const [brandName, setBrandName] = useState<string>("Sua empresa");
  const [email, setEmail] = useState<string>("");
  const [contact, setContact] = useState<string>("");

  const [welcome, setWelcome] = useState<string>("");
  const [instagramLink, setinstagramLink] = useState<string>("");
  const [localizacao, setLocalizacao] = useState<string>("");
  const [spotifyLink, setSpotifyLink] = useState<string>("");
  const [whatsAppLink, setWhatsAppLink] = useState<string>("");
  const [youtubeLink, setYoutubeLink] = useState<string>("");
  const [reservationText, setReservationText] = useState<string>("");
  const [happyHourText, setHappyHourText] = useState<string>("");

  const [logo, setLogo] = useState<string>("");
  const [banner, setBanner] = useState<string>("");
  const [logoUpdated, setLogoUpdated] = useState<string>("");
  const [bannerUpdated, setBannerUpdated] = useState<string>("");
  const [fontStyle, setFontStyle] = useState<string>("");

  const [modal, setModal] = useState<boolean>(false);
  const [modalFail, setModalFail] = useState<boolean>(false);

  const changeInput = (e: any, isBanner: boolean = false) => {
    const localFile = e.target.files[0];
    if (isBanner) {
      setBannerUpdated(localFile);
    } else {
      setLogoUpdated(localFile);
    }
  };
  const header = {
    icon: "ren",
    title: "Ren.",
    mainColor: "#F2E8CF",
    auxColor: "#BC4749",
    textColor: "#386641",
    fontStyle: theme.fonts.hand,
    fontStyleAux: theme.fonts.primary,
    welcome: "Bem-vindo(a) ao Ren.",
    banner: "food",
    offers: true,
    hasHappyHour: true,
    reservation: true,
    reservationTextDetail:
      "Evite filas de espera, faça sua reserva no Ren, entre em contato com o número a baixo e verifique a disponibilidade!",
    reservationContactNumber: "64996140938",
    offersText: "Confira as promoções do Ren!",
    happyHourText: "É dia de happy hour no Ren!",
    happyHourTextDetail:
      "O happy hour é oferecido de segunda a sexta-feira, das 17h às 20h, Durante o happy hour, nossos clientes podem desfrutar de bebidas com descontos especiais, como cervejas, vinhos e coquetéis.",
    reservationText: "Reserve sua mesa!",
    socialMedia: {
      instagram: { icon: instagram, link: "//" },
      spotify: {
        icon: spotify,
        link: "https://open.spotify.com/embed/playlist/0usD50UnpFtLPEMYsy3s62?utm_source=generator",
      },
      youtube: { icon: youtube, link: "" },
      whatsapp: { icon: whatsapp, link: "//" },
      address: { icon: marker, link: "//" },
    },
  };

  const createRequest = () => {
    if (
      brandName &&
      email &&
      contact &&
      welcome &&
      logo &&
      banner &&
      fontStyle
    ) {
      //       logoUpdated
      // bannerUpdated
      //criar if para verificar se as fotos foram alteradas.
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

  useEffect(() => {
    //chamar api
    setBrandName("teste");
    setWelcome("teste");
    setBanner(
      "https://meu-menu-public-relase-pkprjispv-devjulio.vercel.app/static/media/food.cf115d2f839bce6feab3.png"
    );
    setLogo(
      "data:image/png;base64,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"
    );

    setinstagramLink("teste");
    setLocalizacao("teste");
    setSpotifyLink("teste");
    setWhatsAppLink("teste");
    setYoutubeLink("teste");
    setHappyHourText("teste");
    setReservationText("teste");
    setContact("1140029822");
    setEmail("teste");
    setFontCheckBox("hand"); //método para definir qual é a fonte
  }, []);

  const setFontCheckBox = (fontName: string) => {
    const fonts = [
      "AlwaysSmile",
      "Bachelorette",
      "BeYou",
      "Bravely",
      "GlossySheen",
      "LatoRegular",
      "LEMONMILK",
      "NiceSugar",
      "RoughAnthem",
      "primary",
      "secundary",
      "hand",
    ];
    const fontIndex = fonts.findIndex((font) => font === fontName);
    const indexFinal = fontIndex + 1;
    const checkbox = document.getElementById(
      indexFinal.toString()
    ) as HTMLInputElement | null;
    if (checkbox != null) {
      checkbox.checked = true;
    }
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
              <Input
                setValue={setBrandName}
                value={brandName}
                label="Nome do estabelecimento"
              />
            </Styled.FormItemContainer>
            <Styled.FormItemContainer>
              <Input
                setValue={setWelcome}
                value={welcome}
                label="Frase de boas vindas"
              />
            </Styled.FormItemContainer>
          </Styled.MenusRow>

          <Styled.MenusRow>
            <Styled.FormItemContainer>
              <Styled.ItemSpan>Logo atual: </Styled.ItemSpan>
              <Styled.Centralize>
                <Styled.MenuBanner src={logo} alt="" />
              </Styled.Centralize>
            </Styled.FormItemContainer>
            <Styled.FormItemContainer>
              <Styled.ItemSpan>Banner atual: </Styled.ItemSpan>
              <Styled.Centralize>
                <Styled.MenuBanner src={banner} alt="" />
              </Styled.Centralize>
            </Styled.FormItemContainer>
          </Styled.MenusRow>

          <Styled.MenusRow>
            <Styled.FormItemContainer>
              <Styled.ItemSpan>
                Selecione a logo do estabelecimento
              </Styled.ItemSpan>
              <Styled.Centralize>
                <Styled.FileInput
                  type="file"
                  id="mainBanner"
                  onChange={(e: any) => {
                    changeInput(e);
                  }}
                />
              </Styled.Centralize>
            </Styled.FormItemContainer>
            <Styled.FormItemContainer>
              <Styled.ItemSpan>
                Selecione o Banner principal (Imagem de destaque)
              </Styled.ItemSpan>
              <Styled.Centralize>
                <Styled.FileInput
                  type="file"
                  id="mainBanner"
                  onChange={(e: any) => {
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
                  setValue={setinstagramLink}
                  label="Instagram"
                  value={instagramLink}
                  customWidth={isMobile() ? "250px" : "170px"}
                />
              </Styled.IconCentralize>

              <Styled.IconCentralize>
                <Styled.Icon src={marker} onClick={() => {}} />
                <Input
                  labelColor={theme.colors.red.normal}
                  setValue={setLocalizacao}
                  label="Endereço"
                  value={localizacao}
                  customWidth={isMobile() ? "250px" : "300px"}
                />
              </Styled.IconCentralize>
              <Styled.IconCentralize>
                <Styled.Icon src={spotify} onClick={() => {}} />
                <Input
                  labelColor={theme.colors.red.normal}
                  setValue={setSpotifyLink}
                  label="Link da playlist"
                  value={spotifyLink}
                  customWidth={isMobile() ? "250px" : "170px"}
                />
              </Styled.IconCentralize>
              <Styled.IconCentralize>
                <Styled.Icon src={whatsapp} onClick={() => {}} />
                <Input
                  labelColor={theme.colors.red.normal}
                  setValue={setWhatsAppLink}
                  label="WhatsApp"
                  value={whatsAppLink}
                  customWidth={isMobile() ? "250px" : "170px"}
                />
              </Styled.IconCentralize>
              <Styled.IconCentralize>
                <Styled.Icon src={youtube} onClick={() => {}} />
                <Input
                  labelColor={theme.colors.red.normal}
                  setValue={setYoutubeLink}
                  label="Canal do Youtube"
                  value={youtubeLink}
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
                  value={happyHourText}
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
                  value={reservationText}
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
                {brandName}
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
                {brandName}
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
                {brandName}
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
                {brandName}
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
                {brandName}
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
                {brandName}
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
                {brandName}
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
                {brandName}
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
                {brandName}
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
                {brandName}
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
                {brandName}
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
                {brandName}
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
                setValue={setContact}
                value={contact}
                label="Número para contato"
              />
            </Styled.FormItemContainer>
            <Styled.FormItemContainer>
              <Input
                setValue={setEmail}
                value={email}
                label="E-mail para contato"
              />
            </Styled.FormItemContainer>
          </Styled.MenusRow>
        </Styled.Menus>
        <Styled.BtnContainer>
          <ButtonSecondary
            action={() => {
              createRequest();
            }}
            Label="Atualizar"
            color={theme.colors.red.normal}
            bgColor={theme.colors.white.normal}
          />
        </Styled.BtnContainer>
      </Styled.MainContainer>
      <Footer />
    </>
  );
};

export default UpdateData;
