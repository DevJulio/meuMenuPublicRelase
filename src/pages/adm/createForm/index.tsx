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
import latlon from "../../../assets/icons/socialMedia/gif/latlon.gif";

import happy from "../../../assets/icons/socialMedia/gif/happy.gif";
import resevation from "../../../assets/icons/socialMedia/gif/resevation.png";
import loadingGif from "../../../assets/icons/loading.gif";

import { theme } from "../../../theme/theme";
import isMobile from "is-mobile";
import Checkbox from "../../../components/CheckBox";
import InputMasked from "../../../components/MaskedIpunt";
import ButtonSecondary from "../../../components/buttons/secondary";
import Modal from "../../../components/modal";
import {
  TCompany,
  TLatLon,
  TUser,
  createUser,
} from "../../../service/module/login";
import { useNavigate } from "react-router-dom";
import { fileUpload } from "../../../service/module/fileUpload";
import { message } from "antd";
import { CompanyService } from "../../../service/module/company";
import { UserService } from "../../../service/module/users";
import { decryptToAuth } from "../../../utils/security/isAuth";
import MapComponent from "../../../components/googleMap";

const SolicitationMeuMenu: React.FC = () => {
  const [title, setTitle] = useState<string>("Sua empresa");
  const [contactEmail, setContactEmail] = useState<string>("");

  const [nome, setNome] = useState<string>("");
  const [cidade, setCidade] = useState<string>("");
  const [URL, setURL] = useState<string>("");

  const [contactNumber, setContactNumber] = useState<string>("");
  const [contactReservationNumber, setContactReservationNumber] =
    useState<string>("");
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [welcome, setWelcome] = useState<string>("");
  const [instagramLink, setinstagramLink] = useState<string>("");
  const [endereco, setEndereco] = useState<string>("");
  const [spotifyLink, setSpotifyLink] = useState<string>("");
  const [whatsAppLink, setWhatsAppLink] = useState<string>("");
  const [youtubeLink, setYoutubeLink] = useState<string>("");
  //const [reservationText, setReservationText] = useState<string>("");
  //const [happyHourText, setHappyHourText] = useState<string>("");

  const [icon, setIcon] = useState<File>();
  const [banner, setBanner] = useState<File>();
  const [fontStyle, setFontStyle] = useState<string>("");

  const [modal, setModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalAux, setModalAux] = useState<boolean>(false);
  const [modalFail, setModalFail] = useState<boolean>(false);
  const [disponiility, setDisponiility] = useState<boolean>(false);
  const [localization, setLocalization] = useState<TLatLon>({ lat: 0, lng: 0 });

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
      URL &&
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
          const newDate = new Date();
          try {
            const company: TCompany = {
              title: title,
              plan: decryptToAuth(localStorage.getItem("@meumenu/planType")),
              statusCadastro: false,
              isAproved: true,
              icon: iconUrl,
              URL,
              address: endereco,
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
                offers: {
                  bannerText: "Confira as nossas promoções!",
                  bannerTitle: "",
                  status: false,
                },
                reservation: {
                  bannerText: "Evite filas, faça sua reserva.",
                  bannerTitle: "",
                  status: false,
                  reservationNumber: contactReservationNumber,
                },
                happyHour: {
                  bannerText: "É dia de happy hour!",
                  bannerTitle: "",
                  status: false,
                  daysOfWeek: [],
                  startAt: "",
                  endAt: "",
                },
                contactEmail,
                contactNumber,
                contactName: nome,
                city: cidade,
                socialMedia: {
                  localization: localization,
                  address: endereco,
                  spotify: spotifyLink,
                  instagram: instagramLink,
                  youtube: youtubeLink,
                  whatsapp: whatsAppLink,
                },
              },
              categories: [],
              menu: [],
              offers: [],
              tables: [],
              staff: [],
              createdAt: {
                seconds: newDate.getTime() / 1000,
                nanoseconds: newDate.getMilliseconds(),
              },
              updatedAt: {
                seconds: 0,
                nanoseconds: 0,
              },
            };
            const resCompany: any = await CompanyService.setCompany(company);
            if (resCompany.status === 200) {
              const companyDocId = resCompany.data;
              const user: TUser = {
                name: nome,
                statusCadastro: false,
                uid: userUid,
                userType: "admin",
                codCompany: companyDocId,
                createdAt: {
                  seconds: newDate.getTime() / 1000,
                  nanoseconds: newDate.getMilliseconds(),
                },
                updatedAt: {
                  seconds: 0,
                  nanoseconds: 0,
                },
              };
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
    navigate("/login");
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

  const checkURL = async () => {
    if (URL.length > 0) {
      const urlRes = await CompanyService.CheckUrl(URL);
      if (urlRes) {
        message.success("URL disponível!");
        setDisponiility(true);
      } else {
        message.error("URL já em uso, tente novamente");
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
                    navigate("/login");
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
            bannerColor={theme.colors.blue.palete}
            title={"Onde fica seu estabelecimento?"}
            handleClose={handleCloseAux}
            titleFont={theme.fonts.primary}
          >
            <>
              <MapComponent
                localization={localization}
                setLocalization={setLocalization}
              />
              <Styled.BtnContainer
                style={{
                  marginTop: "0px",
                  justifyContent: "center",
                  marginBottom: "2vh",
                }}
              >
                <ButtonSecondary
                  action={() => {
                    if (localization.lat === 0) {
                      message.error("Você precisa escolher um local");
                    } else {
                      handleCloseAux();
                      message.success("Localização adicionada com sucesso!");
                    }
                  }}
                  Label={"Salvar"}
                  fontSize={theme.fontSize.md}
                  color={theme.colors.white.normal}
                  bgColor={theme.colors.green.normal}
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
                navigate("/cardapio");
              }}
            >
              Clique aqui e veja um exemplo de cardápio
            </span>
          </Styled.MenusRow>
          <Styled.MenusRow>
            <Styled.FormItemContainer>
              <Input
                setValue={setTitle}
                isRequired
                label="Nome do estabelecimento"
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
              <div className="row-aux">
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
              </div>
              <div className="row-aux">
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
              </div>
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
