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
import latlon from "../../../assets/icons/socialMedia/gif/latlon.gif";
import resevation from "../../../assets/icons/socialMedia/gif/resevation.png";
import loadingGif from "../../../assets/icons/loading.gif";

import { theme } from "../../../theme/theme";
import isMobile from "is-mobile";
import Checkbox from "../../../components/CheckBox";
import InputMasked from "../../../components/MaskedIpunt";
import ButtonSecondary from "../../../components/buttons/secondary";
import Modal from "../../../components/modal";
import { isAuth } from "../../../utils/security/isCrypto";
import { useNavigate } from "react-router-dom";
import { TCompany } from "../../../service/module/login";
import { CompanyService } from "../../../service/module/company";
import { message } from "antd";

const UpdateData: React.FC = () => {
  const [title, setTitle] = useState<string>("");

  const [welcome, setWelcome] = useState<string>("");
  const [instagramLink, setinstagramLink] = useState<string>("");
  const [endereco, setEndereco] = useState<string>("");
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
  // const [user, setUser] = useState<TUser>();
  const [loading, setLoading] = useState<boolean>(false);
  const [contactEmail, setContactEmail] = useState<string>("");

  const [nome, setNome] = useState<string>("");
  const [cidade, setCidade] = useState<string>("");
  const [URL, setURL] = useState<string>("");
  const [contactReservationNumber, setContactReservationNumber] =
    useState<string>("");

  const [contactNumber, setContactNumber] = useState<string>("");

  const [disponiility, setDisponiility] = useState<boolean>(false);
  const [originalUrl, setOriginalUrl] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const usr = isAuth();
    if (usr.userType === "admin") {
      console.log(usr);
      //setUser(usr);
      const fetchData = async () => {
        const resCompany: any = await CompanyService.GetCompany(usr.codCompany);
        if (resCompany && resCompany.status) {
          const data: TCompany = resCompany.data;
          if (data.URL.length > 0) {
            setDisponiility(true);
          }
          console.log(data);

          setTitle(data.title);
          setLogo(data.details.icon);
          setBanner(data.details.banner);
          setWelcome(data.details.welcome);
          setURL(data.URL);
          setOriginalUrl(data.URL);
          setContactReservationNumber(data.details.reservationContactNumber);
          setFontCheckBox(data.details.fontStyle);
          setFontCheckBox(data.details.fontStyleAux, false);
          setinstagramLink(data.details.socialMedia.instagram);
          setEndereco(data.details.socialMedia.address);
          setSpotifyLink(data.details.socialMedia.spotify);
          setWhatsAppLink(data.details.socialMedia.whatsapp);
          setYoutubeLink(data.details.socialMedia.youtube);
          setHappyHourText(data.details.happyHourTextDetail);
          setReservationText(data.details.reservationTextDetail);
          setContactEmail(data.details.contactEmail);
          setNome(data.details.contactName);
          setCidade(data.details.city);
          setContactNumber(data.details.contactNumber);
        } else {
          console.log("não ");
        }
      };
      fetchData();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const updateCompany = () => {
    if (
      title &&
      contactEmail &&
      contactNumber &&
      welcome &&
      banner &&
      fontStyle &&
      nome &&
      URL
    ) {
      //logoUpdated
      // bannerUpdated
      //criar if para verificar se as fotos foram alteradas.
      //adicionar fonte secundária, e cores
      //mainColor: "",
      //auxColor: "",
      //textColor: "",
      //fontStyleAux: "",
      //setModal(true);
      //setModalFail(false);
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

  // useEffect(() => {
  //   //chamar api
  //   setTitle("teste");
  //   setWelcome("teste");
  //   setBanner(
  //     "https://meu-menu-public-relase-pkprjispv-devjulio.vercel.app/static/media/food.cf115d2f839bce6feab3.png"
  //   );
  //   setLogo(
  //     "data:image/png;base64,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"
  //   );
  //   setinstagramLink("teste");
  //   setEndereco("teste");
  //   setSpotifyLink("teste");
  //   setWhatsAppLink("teste");
  //   setYoutubeLink("teste");
  //   setHappyHourText("teste");
  //   setReservationText("teste");
  //   setContact("1140029822");
  //   setEmail("teste");
  //   setFontCheckBox("hand"); //método para definir qual é a fonte
  // }, []);

  const setFontCheckBox = (fontName: string, isPrimary: boolean = true) => {
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
    if (isPrimary) {
      const checkbox = document.getElementById(
        indexFinal.toString()
      ) as HTMLInputElement | null;
      if (checkbox != null) {
        checkbox.checked = true;
      }
    } else {
      //tratar fonte secundária
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

  const handleCloseLoading = () => {
    setLoading(false);
  };
  const checkURL = async () => {
    if (URL.length > 0) {
      if (originalUrl === URL) {
        message.success("URL igual!");
        setDisponiility(true);
      } else {
        const urlRes = await CompanyService.CheckUrl(URL);
        if (urlRes) {
          message.success("URL disponível!");
          setDisponiility(true);
        } else {
          message.error("URL já em uso, tente novamente");
        }
      }
    } else {
      message.error("uma URL personalizada precisa ser informada!");
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
                  action={() => {
                    window.location.href =
                      "https://api.whatsapp.com/send?phone=5564996140938&text=Meu menu!";
                  }}
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

        {loading && (
          <Modal
            bannerColor={theme.colors.yellow.palete}
            title={"Carregando..."}
            handleClose={handleCloseLoading}
            titleFont={theme.fonts.primary}
          >
            <div
              style={{
                display: "flex",
                placeItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={loadingGif}
                alt=""
                style={{
                  width: "4vw",
                  padding: "3vh",
                }}
              />
            </div>
          </Modal>
        )}

        <Styled.TitleSpan>Preencha todos os campos</Styled.TitleSpan>
        <Styled.Menus>
          <Styled.MenusRow>
            <span
              style={{
                color: theme.colors.white.normal,
                cursor: "pointer",
                fontFamily: theme.fonts.primary,
                fontSize: theme.fontSize.md2,
              }}
              onClick={() => {
                navigate("/cardapio/ren");
              }}
            >
              Clique aqui e veja um exemplo de cardápio
            </span>
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
              <Input
                setValue={setTitle}
                isRequired
                label="Nome do estabelecimento"
                value={title}
              />
            </Styled.FormItemContainer>
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
          </Styled.MenusRow>
          <Styled.MenusRow>
            <Styled.FormItemContainer>
              <Input
                value={welcome}
                placeholder="Primeiro contato do seu cliente com o cardápio"
                setValue={setWelcome}
                label="Frase de boas vindas"
              />
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
          <Styled.MenusRow>
            <Styled.FormItemContainer>
              <InputMasked
                value={contactReservationNumber}
                mask="(99) 9 9999-9999"
                setValue={setContactReservationNumber}
                label="Número para contato dos clientes e reservas."
              />
              <span className="span-lbl">
                Número que seus clientes falaram com você sobre reservas
              </span>
            </Styled.FormItemContainer>
            <Styled.FormItemContainer>
              <div className="row-container">
                <Input
                  value={URL}
                  setValue={setURL}
                  placeholder="www.meu-menu.com/sua-empresa"
                  label="Link personalizado"
                  isRequired
                  isDisabled={disponiility}
                />
                <div className="btn-container">
                  <ButtonSecondary
                    action={() => {
                      if (!disponiility) {
                        checkURL();
                      } else {
                        setDisponiility(false);
                      }
                    }}
                    fontSize={theme.fontSize.md}
                    Label={
                      disponiility
                        ? URL.length
                          ? "Alterar link"
                          : "verificar disponibilidade"
                        : "verificar disponibilidade"
                    }
                    color={theme.colors.red.normal}
                    bgColor={theme.colors.white.normal}
                  />
                </div>
              </div>
              <span className="span-lbl">
                informe como você quer ser encontrado por seus clientes.
                www.meu-menu.com/cardapio/{URL}
              </span>
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
                  isStartLbl={true}
                  value={instagramLink}
                  labelColor={theme.colors.red.normal}
                  setValue={setinstagramLink}
                  label="Instagram"
                  customWidth={isMobile() ? "250px" : "170px"}
                />
              </Styled.IconCentralize>

              <Styled.IconCentralize>
                <Styled.Icon src={marker} onClick={() => {}} />
                <Input
                  isStartLbl={true}
                  value={endereco}
                  labelColor={theme.colors.red.normal}
                  setValue={setEndereco}
                  label="Endereço"
                  isRequired
                  customWidth={isMobile() ? "250px" : "300px"}
                />
              </Styled.IconCentralize>

              <Styled.IconCentralize>
                <Styled.Icon src={spotify} onClick={() => {}} />
                <Input
                  value={spotifyLink}
                  labelColor={theme.colors.red.normal}
                  setValue={setSpotifyLink}
                  label="Link da playlist"
                  customWidth={isMobile() ? "250px" : "170px"}
                />
              </Styled.IconCentralize>
              <Styled.IconCentralize>
                <Styled.Icon src={latlon} onClick={() => {}} />
                <span className="placer">Localização</span>
                <ButtonSecondary
                  action={() => {
                    setModal(true);
                  }}
                  Label="Clique para abrir mapa"
                  color={theme.colors.yellow.palete}
                  bgColor={theme.colors.blue.palete}
                />
              </Styled.IconCentralize>
              <Styled.IconCentralize>
                <Styled.Icon src={whatsapp} onClick={() => {}} />
                <Input
                  value={whatsAppLink}
                  labelColor={theme.colors.red.normal}
                  setValue={setWhatsAppLink}
                  label="WhatsApp"
                  customWidth={isMobile() ? "250px" : "170px"}
                />
              </Styled.IconCentralize>
              <Styled.IconCentralize>
                <Styled.Icon src={youtube} onClick={() => {}} />
                <Input
                  value={youtubeLink}
                  labelColor={theme.colors.red.normal}
                  setValue={setYoutubeLink}
                  label="Canal do Youtube"
                  customWidth={isMobile() ? "250px" : "170px"}
                />
              </Styled.IconCentralize>
            </Styled.SocialMediaContainer>
          </Styled.MenusRow>
          {/* <Styled.MenusRow style={{ flexDirection: "column" }}>
            <Styled.TitleSpan
              style={{
                marginTop: "5vh",
              }}
            >
              Localização:
            </Styled.TitleSpan>
            <Styled.BtnContainer>
              {!modalAux ? (
                <>
                  <ButtonSecondary
                    action={() => {
                      setModalAux(true);
                    }}
                    Label="Clique para abrir mapa"
                    color={theme.colors.red.normal}
                    bgColor={theme.colors.white.normal}
                  />
                </>
              ) : (
                <>
                  <iframe
                    title="Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30571.286431759458!2d-49.280785039213846!3d-16.70634218493767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935ef12544136db3%3A0x1b20c322bbad1d83!2sGoi%C3%A2nia%20Shopping!5e0!3m2!1spt-BR!2sbr!4v1677269482432!5m2!1spt-BR!2sbr"
                    width={width - 25}
                    height="400"
                    style={{ border: "0", borderRadius: "25px" }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </>
              )}
            </Styled.BtnContainer>
          </Styled.MenusRow> */}
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
                <div className="details-container">
                  <Input
                    value={happyHourText}
                    labelColor={theme.colors.red.normal}
                    setValue={setHappyHourText}
                    label="Intruções e regras do happy hour"
                    isTextArea
                    customWidth={isMobile() ? "250px" : "450px"}
                  />
                  <div className="detail-container-ex"></div>
                </div>
              </Styled.IconCentralize>
              {/* hasHappyHour
                  offers
                reservation */}
              <Styled.IconCentralize>
                <Styled.Icon src={resevation} onClick={() => {}} />
                <div className="details-container">
                  <Input
                    value={reservationText}
                    labelColor={theme.colors.red.normal}
                    setValue={setReservationText}
                    label="Instruções de reserva"
                    isTextArea
                    customWidth={isMobile() ? "250px" : "450px"}
                  />
                </div>
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

          <Styled.TitleSpan>Informações Para o Meu Menu</Styled.TitleSpan>
          <Styled.ItemSpan
            style={{
              fontFamily: theme.fonts.secundary,
            }}
          >
            Informações para seu perfil na plataforma e para a equipe do Meu
            Menu entrar em contato.
          </Styled.ItemSpan>
          <Styled.MenusRow>
            <Styled.FormItemContainer>
              <Input value={nome} setValue={setNome} label="Nome" />
            </Styled.FormItemContainer>
            <Styled.FormItemContainer>
              <Input value={cidade} setValue={setCidade} label="Cidade" />
            </Styled.FormItemContainer>
          </Styled.MenusRow>
          <Styled.MenusRow>
            <Styled.FormItemContainer>
              <InputMasked
                value={contactNumber}
                mask="(99) 9 9999-9999"
                setValue={setContactNumber}
                label="Número para contato"
              />
            </Styled.FormItemContainer>
            <Styled.FormItemContainer>
              <Input
                value={contactEmail}
                setValue={setContactEmail}
                label="E-mail para contato"
              />
            </Styled.FormItemContainer>
          </Styled.MenusRow>
        </Styled.Menus>
        <Styled.BtnContainer>
          <ButtonSecondary
            action={() => {
              updateCompany();
            }}
            Label="Salvar"
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
