import React, { useCallback, useEffect, useState } from "react";
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
import venda from "../../../assets/icons/socialMedia/gif/venda.gif";
import loadingGif from "../../../assets/icons/loading.gif";
import dayjs from "dayjs";

import { theme } from "../../../theme/theme";
import isMobile from "is-mobile";
import Checkbox from "../../../components/CheckBox";
import InputMasked from "../../../components/MaskedIpunt";
import ButtonSecondary from "../../../components/buttons/secondary";
import Modal from "../../../components/modal";
import { isAuth } from "../../../utils/security/isCrypto";
import { useNavigate } from "react-router-dom";
import {
  TCompany,
  TLatLon,
  TMenuFeatures,
} from "../../../service/module/login";
import { CompanyService } from "../../../service/module/company";
import { TimePicker, message } from "antd";
import MapComponent from "../../../components/googleMap";

const UpdateData: React.FC = () => {
  const [title, setTitle] = useState<string>("");

  const [welcome, setWelcome] = useState<string>("");
  const [instagramLink, setinstagramLink] = useState<string>("");
  const [endereco, setEndereco] = useState<string>("");
  const [spotifyLink, setSpotifyLink] = useState<string>("");
  const [whatsAppLink, setWhatsAppLink] = useState<string>("");
  const [youtubeLink, setYoutubeLink] = useState<string>("");
  const [happyHourModal, setHappyHourModal] = useState<boolean>(false);

  const [logo, setLogo] = useState<string>("");
  const [banner, setBanner] = useState<string>("");
  const [logoUpdated, setLogoUpdated] = useState<string>("");
  const [bannerUpdated, setBannerUpdated] = useState<string>("");
  const [fontStyle, setFontStyle] = useState<string>("");

  const [modal, setModal] = useState<boolean>(false);
  const [modalFail, setModalFail] = useState<boolean>(false);
  const [featureUpdate, setFeatureUpdate] = useState<boolean>(false);
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
  const [localization, setLocalization] = useState<TLatLon>({ lat: 0, lng: 0 });

  const [offers, setOffers] = useState<TMenuFeatures>();
  const [reservation, setReservation] = useState<TMenuFeatures>();
  const [happyHour, setHappyHour] = useState<TMenuFeatures>();

  const [domingo, setDomingo] = useState(false);
  const [segundaFeira, setSegundaFeira] = useState(false);
  const [tercaFeira, setTercaFeira] = useState(false);
  const [quartaFeira, setQuartaFeira] = useState(false);
  const [quintaFeira, setQuintaFeira] = useState(false);
  const [sextaFeira, setSextaFeira] = useState(false);
  const [sabado, setSabado] = useState(false);
  const [startAt, setStartAt] = useState("00:00");
  const [endAt, setEndAt] = useState("00:00");
  const [bannerText, setBannerText] = useState<string>("");
  const [bannerTitle, setBannerTitle] = useState<string>("");
  const [confirmModal, setConfirmModal] = useState<boolean>(false);

  const navigate = useNavigate();

  const format = "HH:mm";
  const center = {
    lat: -16.665213362370324,
    lng: -49.272946456170146,
  };

  useEffect(() => {
    const usr = isAuth();
    if (usr && usr.userType === "admin") {
      console.log(usr);
      const fetchData = async () => {
        const resCompany: any = await CompanyService.GetCompany(
          usr.codCompany!
        );
        if (resCompany && resCompany.status) {
          const data: TCompany = resCompany.data;
          if (data.URL.length > 0) {
            setDisponiility(true);
          }
          //console.log(data);
          setTitle(data.title);
          setLogo(data.details.icon);
          setBanner(data.details.banner);
          setWelcome(data.details.welcome);
          setURL(data.URL);
          setOriginalUrl(data.URL);
          setContactReservationNumber(
            data.details.reservation.reservationNumber!
          );
          setFontCheckBox(data.details.fontStyle);
          setFontCheckBox(data.details.fontStyleAux, false);
          setinstagramLink(data.details.socialMedia.instagram);
          setLocalization(data.details.socialMedia.localization);
          setOffers(data.details.offers);
          setReservation(data.details.reservation);
          setHappyHour(data.details.happyHour);
          setEndereco(data.details.socialMedia.address);
          setSpotifyLink(data.details.socialMedia.spotify);
          setWhatsAppLink(data.details.socialMedia.whatsapp);
          setYoutubeLink(data.details.socialMedia.youtube);
          setContactEmail(data.details.contactEmail);
          setNome(data.details.contactName);
          setCidade(data.details.city);
          setContactNumber(data.details.contactNumber);

          //muita informação, cara

          if (data.details.happyHour.daysOfWeek?.find((days) => days === 0)) {
            setDomingo(true);
          }
          if (data.details.happyHour.daysOfWeek?.find((days) => days === 1)) {
            setSegundaFeira(true);
          }
          if (data.details.happyHour.daysOfWeek?.find((days) => days === 2)) {
            setTercaFeira(true);
          }
          if (data.details.happyHour.daysOfWeek?.find((days) => days === 3)) {
            setQuartaFeira(true);
          }
          if (data.details.happyHour.daysOfWeek?.find((days) => days === 4)) {
            setQuintaFeira(true);
          }
          if (data.details.happyHour.daysOfWeek?.find((days) => days === 5)) {
            setSextaFeira(true);
          }
          if (data.details.happyHour.daysOfWeek?.find((days) => days === 6)) {
            setSabado(true);
          }
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
  const handleCloseFeatureUpdate = () => {
    setFeatureUpdate(false);
    setHappyHourModal(false);
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

  const checkDays = () => {
    const days = [];
    if (domingo) {
      days.push(0);
    }
    if (segundaFeira) {
      days.push(1);
    }
    if (tercaFeira) {
      days.push(2);
    }
    if (quartaFeira) {
      days.push(3);
    }
    if (quintaFeira) {
      days.push(4);
    }
    if (sextaFeira) {
      days.push(5);
    }
    if (sabado) {
      days.push(6);
    }
    return days;
  };

  const saveHpAndReservation = async () => {
    if (happyHourModal) {
      const days = checkDays();
      if (bannerText && bannerTitle && startAt && endAt && days.length > 0) {
        setHappyHour({
          bannerText: bannerText,
          bannerTitle: bannerTitle,
          status: true,
          daysOfWeek: days,
          startAt: startAt,
          endAt: endAt,
        });
        //Criar função para atualizar esses dados
        handleCloseFeatureUpdate();
      } else {
        message.error("Verifique os campos e tente novamente");
      }
    } else {
      if (bannerText && bannerTitle && startAt && endAt) {
        setReservation({
          bannerText: bannerText,
          bannerTitle: bannerTitle,
          status: true,
        });
        handleCloseFeatureUpdate();
      } else {
        message.error("Verifique os campos e tente novamente");
      }
    }
  };

  const disableFeatures = () => {
    let res = false;
    if (happyHourModal) {
      res = disableHp();
    } else {
      res = disableReservation();
    }
    if (res) {
      handleCloseFeatureUpdate();
      handleCloseConfirmModal();
    } else {
      message.error("Verifique os dadaos e tente novamente");
    }
  };
  const disableHp = () => {
    setHappyHour({
      ...happyHour!,
      status: false,
    });
    return true;
  };

  const disableReservation = () => {
    setHappyHour({
      ...happyHour!,
      status: false,
    });
    return true;
  };

  const handleCloseConfirmModal = () => {
    setConfirmModal(false);
  };
  return (
    <>
      <Header />
      <Styled.MainContainer>
        {modal && (
          <Modal
            bannerColor={theme.colors.red.normal}
            title={`Onde fica ${title}?`}
            handleClose={handleClose}
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
                      handleClose();
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

        {featureUpdate && (
          <Modal
            bannerColor={theme.colors.blue.palete}
            title={
              happyHourModal
                ? "Intruções e regras do happy hour"
                : "Instruções e detalhes de reserva"
            }
            handleClose={handleCloseFeatureUpdate}
            titleFont={theme.fonts.primary}
          >
            <div
              style={{
                display: "flex",
                placeItems: "center",
                justifyContent: "center",
              }}
            >
              {/* 
              Para happy hour:
              1 - Dias da semana
              2 - horários,
              para todos
              1 - título do banner
              2 - texto do banner
              3 - botão de salvar para alterar os status de hp e reserva
               */}
              <Styled.UpdateModalContainer>
                {happyHourModal ? (
                  <div className="HP">
                    <span className="HP-title">
                      Marque os dias da semana que o Happy hour funciona!
                    </span>
                    <Styled.CheckBoxRow>
                      <Styled.CheckBoxItem>
                        <Checkbox
                          lblColor="black"
                          label="Domingo"
                          setValue={() => {
                            setDomingo(!domingo);
                          }}
                          value={domingo}
                        />
                      </Styled.CheckBoxItem>
                      <Styled.CheckBoxItem>
                        <Checkbox
                          lblColor="black"
                          label={"Segunda Feira"}
                          setValue={() => {
                            setSegundaFeira(!segundaFeira);
                          }}
                          value={segundaFeira}
                        />
                      </Styled.CheckBoxItem>
                      <Styled.CheckBoxItem>
                        <Checkbox
                          lblColor="black"
                          label={"Terça Feira"}
                          setValue={() => {
                            setTercaFeira(!tercaFeira);
                          }}
                          value={tercaFeira}
                        />
                      </Styled.CheckBoxItem>
                      <Styled.CheckBoxItem>
                        <Checkbox
                          lblColor="black"
                          label={"Quarta Feira"}
                          setValue={() => {
                            setQuartaFeira(!quartaFeira);
                          }}
                          value={quartaFeira}
                        />
                      </Styled.CheckBoxItem>
                      <Styled.CheckBoxItem>
                        <Checkbox
                          lblColor="black"
                          label={"Quinta Feira"}
                          setValue={() => {
                            setQuintaFeira(!quintaFeira);
                          }}
                          value={quintaFeira}
                        />
                      </Styled.CheckBoxItem>
                      <Styled.CheckBoxItem>
                        <Checkbox
                          lblColor="black"
                          label={"Sexta Feira"}
                          setValue={() => {
                            setSextaFeira(!sextaFeira);
                          }}
                          value={sextaFeira}
                        />
                      </Styled.CheckBoxItem>
                      <Styled.CheckBoxItem>
                        <Checkbox
                          lblColor="black"
                          label={"Sábado"}
                          setValue={() => {
                            setSabado(!sabado);
                          }}
                          value={sabado}
                        />
                      </Styled.CheckBoxItem>
                    </Styled.CheckBoxRow>

                    <span className="HP-title">
                      Infome a hora de início e de fim.
                    </span>
                    <div className="clock-row">
                      <Styled.ClockContainerCol>
                        <Styled.ClockSpan>Começo</Styled.ClockSpan>
                        <TimePicker
                          value={dayjs(startAt, format)}
                          onChange={(value: any) => {
                            setStartAt(value);
                          }}
                          format={format}
                        />
                      </Styled.ClockContainerCol>
                      <Styled.ClockContainerCol>
                        <Styled.ClockSpan>Final</Styled.ClockSpan>
                        <TimePicker
                          value={dayjs(endAt, format)}
                          format={format}
                          onChange={(value: any) => {
                            setEndAt(value);
                          }}
                        />
                      </Styled.ClockContainerCol>
                    </div>
                    <div className="text-container">
                      <Styled.FormItemContainer>
                        <Input
                          value={happyHour?.bannerTitle}
                          setValue={setBannerTitle}
                          label="Titulo do happy hour"
                          labelColor={theme.colors.blue.palete}
                        />
                        <span className="span-lbl" style={{ color: "black" }}>
                          ex: É dia de Happy Hour!
                        </span>
                      </Styled.FormItemContainer>
                      <Styled.FormItemContainer>
                        <Input
                          labelColor={theme.colors.blue.palete}
                          value={happyHour?.bannerText}
                          setValue={setBannerText}
                          label="Descrição"
                          isTextArea
                          customWidth="500px"
                        />
                        <span className="span-lbl" style={{ color: "black" }}>
                          Dê maiores detalhes a respeito do happy hour
                        </span>
                      </Styled.FormItemContainer>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="HP">
                      <div className="text-container">
                        <Styled.FormItemContainer>
                          <Input
                            value={reservation?.bannerTitle}
                            setValue={setBannerTitle}
                            label="Titulo da reserva"
                            labelColor={theme.colors.blue.palete}
                          />
                          <span className="span-lbl" style={{ color: "black" }}>
                            ex: Faça sua reserva para hoje!
                          </span>
                        </Styled.FormItemContainer>
                        <Styled.FormItemContainer>
                          <Input
                            labelColor={theme.colors.blue.palete}
                            value={reservation?.bannerText}
                            setValue={setBannerText}
                            label="Descrição"
                            isTextArea
                            customWidth="500px"
                          />
                          <span className="span-lbl" style={{ color: "black" }}>
                            Dê maiores detalhes a respeito das reservas
                          </span>
                        </Styled.FormItemContainer>
                      </div>
                    </div>
                  </>
                )}
                <Styled.BtnContainer
                  style={{
                    marginTop: "1vh",
                    justifyContent: "center",
                    marginBottom: "2vh",
                  }}
                >
                  <ButtonSecondary
                    action={saveHpAndReservation}
                    Label={"Salvar"}
                    fontSize={theme.fontSize.md}
                    color={theme.colors.white.normal}
                    bgColor={theme.colors.green.normal}
                  />
                  {happyHourModal ? (
                    <ButtonSecondary
                      action={() => {
                        setConfirmModal(true);
                      }}
                      Label={"Desabilitar Happy Hour"}
                      fontSize={theme.fontSize.md}
                      color={theme.colors.white.normal}
                      bgColor={theme.colors.red.normal}
                    />
                  ) : (
                    <ButtonSecondary
                      action={() => {
                        setConfirmModal(true);
                      }}
                      Label={"Desabilitar reservas"}
                      fontSize={theme.fontSize.md}
                      color={theme.colors.white.normal}
                      bgColor={theme.colors.red.normal}
                    />
                  )}
                </Styled.BtnContainer>
              </Styled.UpdateModalContainer>
            </div>
          </Modal>
        )}

        {confirmModal && (
          <Modal
            bannerColor={theme.colors.yellow.palete}
            title={"Atenção"}
            handleClose={handleCloseConfirmModal}
            titleFont={theme.fonts.primary}
          >
            <div
              style={{
                display: "flex",
                placeItems: "center",
                justifyContent: "center",
              }}
            >
              <span>Deseja continuar?</span>
              <Styled.BtnContainer
                style={{
                  marginTop: "1vh",
                  justifyContent: "center",
                  marginBottom: "2vh",
                }}
              >
                <ButtonSecondary
                  action={disableFeatures}
                  Label={"Sim"}
                  fontSize={theme.fontSize.md}
                  color={theme.colors.white.normal}
                  bgColor={theme.colors.blue.palete}
                />

                <ButtonSecondary
                  action={handleCloseConfirmModal}
                  Label={"Não"}
                  fontSize={theme.fontSize.md}
                  color={theme.colors.white.normal}
                  bgColor={theme.colors.red.normal}
                />
              </Styled.BtnContainer>
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
                <span className="placerAux">
                  Intruções e regras do happy hour
                </span>
                <ButtonSecondary
                  action={() => {
                    setHappyHourModal(true);
                    setFeatureUpdate(true);
                  }}
                  Label="Cadastrar"
                  color={theme.colors.yellow.palete}
                  bgColor={theme.colors.blue.palete}
                />
              </Styled.IconCentralize>

              <Styled.IconCentralize>
                <Styled.Icon src={resevation} onClick={() => {}} />
                <span className="placerAux">
                  Instruções e detalhes de reserva
                </span>
                <ButtonSecondary
                  action={() => {
                    setFeatureUpdate(true);
                  }}
                  Label="Cadastrar"
                  color={theme.colors.yellow.palete}
                  bgColor={theme.colors.blue.palete}
                />
              </Styled.IconCentralize>

              <Styled.IconCentralize>
                <Styled.Icon src={venda} onClick={() => {}} />
                <span className="placerAux">Informações para venda online</span>
                <ButtonSecondary
                  action={() => {
                    setFeatureUpdate(true);
                  }}
                  Label="Em breve..."
                  color={theme.colors.blue.palete}
                  bgColor={theme.colors.yellow.palete}
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
          fonte secundária, layout do header e cores
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
