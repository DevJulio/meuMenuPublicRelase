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
import loadingGif from "../../../assets/icons/loading.gif";

import { theme } from "../../../theme/theme";
import isMobile from "is-mobile";
import Checkbox from "../../../components/CheckBox";
import InputMasked from "../../../components/MaskedIpunt";
import ButtonSecondary from "../../../components/buttons/secondary";
import Modal from "../../../components/modal";
import { TCompany, TUser, createUser } from "../../../service/module/login";
import { useNavigate } from "react-router-dom";
import { Map } from "google-maps-react";
import { fileUpload } from "../../../service/module/fileUpload";
import { message } from "antd";
//import { GoogleMap, Marker } from "react-google-maps";
//import { Map } from "google-maps-react";
import { CompanyService } from "../../../service/module/company";
import { UserService } from "../../../service/module/users";

const SolicitationMeuMenu: React.FC = () => {
  const [title, setTitle] = useState<string>("Sua empresa");
  const [contactEmail, setContactEmail] = useState<string>("");

  const [nome, setNome] = useState<string>("");
  const [cidade, setCidade] = useState<string>("");

  const [contactNumber, setContactNumber] = useState<string>("");
  const [contactReservationNumber, setContactReservationNumber] =
    useState<string>("");
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [welcome, setWelcome] = useState<string>("");
  const [instagramLink, setinstagramLink] = useState<string>("");
  const [localizacao, setLocalizacao] = useState<string>("");
  const [spotifyLink, setSpotifyLink] = useState<string>("");
  const [whatsAppLink, setWhatsAppLink] = useState<string>("");
  const [youtubeLink, setYoutubeLink] = useState<string>("");
  const [reservationText, setReservationText] = useState<string>("");
  const [happyHourText, setHappyHourText] = useState<string>("");

  const [icon, setIcon] = useState<File>();
  const [banner, setBanner] = useState<File>();
  const [fontStyle, setFontStyle] = useState<string>("");

  const [modal, setModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalAux, setModalAux] = useState<boolean>(false);
  const [modalFail, setModalFail] = useState<boolean>(false);

  const handleMapClick = (clickEvent: any) => {
    // const { latLng } = clickEvent;
    // setSelectedLocation({
    // lat: latLng.lat(),
    // lng: latLng.lng(),
    // });
  };

  const changeInput = (e: any, isBanner: boolean = false) => {
    const localFile = e.target.files[0];

    if (localFile) {
      if (localFile.size > 5 * 1024 * 1024) {
        message.error(
          "A imagem é muito grande. Por favor, escolha uma imagem menor que 5 mb."
        );
      } else {
        if (isBanner) {
          setBanner(localFile);
        } else {
          setIcon(localFile);
        }
      }
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
      nome &&
      password
    ) {
      const path = "/companies/imgs/";
      const userUid = await createLogin(); //False ou o uid do usuario recém criado.
      setLoading(true);
      if (userUid) {
        const imgUploadResult = await Promise.all([
          fileUpload(icon, path + "icon" + icon.name),
          fileUpload(banner, path + "banner" + banner.name),
        ])
          .then((results) => {
            return results;
          })
          .catch((error) => {
            console.error(error);
          });

        const checkUploadAux = imgUploadResult as Array<any>;
        const checkUpload = checkUploadAux.every(
          (data: any) => data.status === 200
        );
        if (checkUpload) {
          const iconUrl = checkUploadAux[0].data;
          const bannerUrl = checkUploadAux[1].data;
          try {
            const company: TCompany = {
              title: title,
              statusCadastro: false,
              icon: iconUrl,
              address: localizacao,
              adminsUids: [{ uid: userUid }],
              stafsUids: [{ uid: "" }],
              details: {
                icon: iconUrl,
                title: title,
                mainColor: "",
                auxColor: "",
                textColor: "",
                fontStyle,
                fontStyleAux: "",
                welcome,
                banner: bannerUrl,
                offers: true,
                hasHappyHour: happyHourText ? true : false,
                reservation: reservationText ? true : false,
                reservationTextDetail: reservationText,
                reservationContactNumber: contactReservationNumber,
                offersText: "Confira as nossas promoções!",
                happyHourText: "É dia de happy hour",
                happyHourTextDetail: happyHourText,
                reservationText: "Reserve sua mesa!",
                contactEmail,
                contactNumber,
                city: cidade,
                socialMedia: {
                  instagram: instagramLink,
                  youtube: youtubeLink,
                  whatsapp: whatsAppLink,
                  address: localizacao,
                  spotify: spotifyLink,
                },
              },
              categories: [],
              menu: [],
              offers: [],
              tables: [],
              staff: [],
            };

            //Cadastrar empresa na tabela de solicitação, e pegar código.
            const resCompany: any = await CompanyService.setCompany(company);
            if (resCompany.status === 200) {
              const companyDocId = resCompany.data;
              console.log(
                "ID DO DOC DA REMPRESA RECÉM CRIADA ==> ",
                companyDocId
              );
              const user: TUser = {
                name: nome,
                statusCadastro: false,
                uid: userUid,
                userType: "admin",
                codCompany: companyDocId, //alterar com o código do documento criado da empresa
              };
              console.log("USUÁRIO QUE SERÁ CRIADO ==> ", user);
              const resUser: any = await UserService.setUser(user);
              if (resUser.status === 200) {
                setLoading(false);
                setModal(true);
                setModalFail(false);
              } else {
                setLoading(false);
                setModalFail(true);
                console.log(resUser);
                message.error(
                  "Verifique os dados de usuário e tente novamente"
                );
              }
            } else {
              setLoading(false);
              setModalFail(true);
              console.log(resCompany);
              message.error("Verifique os campos e tente novamente");
            }
          } catch (error) {
            console.log(error);
            message.error("Verifique todos os campos e tente novamente");
          }
        } else {
          setLoading(false);
          setModalFail(true);
          message.error("Verifique o formato e tamanho das imagens");
        }
      } else {
        setLoading(false);
        setModalFail(true);
        message.warning("Atenção!");
      }
    } else {
      message.error("Preencha os campos e tente novamente!");
    }
  };

  const createLogin = async () => {
    const credenciais = {
      email: login,
      password,
    };
    try {
      const userResponse = await createUser(credenciais);
      if (userResponse && userResponse.status === 200) {
        if (userResponse.data) {
          return userResponse.data.userCredential.user.uid;
        }
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const handleClose = () => {
    setModal(false);
  };
  const handleCloseAux = () => {
    setModalAux(false);
  };
  const handleCloseFail = () => {
    setModalFail(false);
  };
  const handleCloseLoading = () => {
    setLoading(false);
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

  const navigate = useNavigate();
  //const width = window.screen.width;

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
        {modalAux && (
          <Modal
            bannerColor={theme.colors.green.normal}
            title={"Onde fica seu estabelecimento?"}
            handleClose={handleCloseAux}
            titleFont={theme.fonts.primary}
          >
            <>
              <div>
                <Map
                  google={process.env.REACT_APP_MAP_API_KEY}
                  center={{ lat: 0, lng: 0 }}
                  onClick={handleMapClick}

                  // zoom={14}
                ></Map>
              </div>
              {/* <Styled.BtnContainer
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
              </Styled.BtnContainer> */}
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
                navigate("/cardapio");
              }}
            >
              Clique aqui e veja um exemplo de cardápio
            </span>
          </Styled.MenusRow>
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
              <Input
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
                  onChange={(e) => {
                    changeInput(e, true);
                  }}
                />
              </Styled.Centralize>
            </Styled.FormItemContainer>
          </Styled.MenusRow>
          <Styled.MenusRow>
            <Styled.FormItemContainer>
              <InputMasked
                mask="(99) 9 9999-9999"
                setValue={setContactReservationNumber}
                label="Número para contato dos clientes e reservas."
              />
            </Styled.FormItemContainer>
            {/* <Styled.FormItemContainer>
              <Input setValue={setCidade} label="Cidade" />
            </Styled.FormItemContainer> */}
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
            Informações para seu perfil na plataforma e para a equipe do Meu
            Menu entrar em contato.
          </Styled.ItemSpan>
          <Styled.MenusRow>
            <Styled.FormItemContainer>
              <Input setValue={setNome} label="Nome" />
            </Styled.FormItemContainer>
            <Styled.FormItemContainer>
              <Input setValue={setCidade} label="Cidade" />
            </Styled.FormItemContainer>
          </Styled.MenusRow>
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
