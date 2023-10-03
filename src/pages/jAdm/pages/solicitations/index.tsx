import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import isMobile from "is-mobile";
import { isAuth } from "../../../../utils/security/isCrypto";
import { TCompany, TUser } from "../../../../service/module/login";
import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import * as Styled from "./styles";
import { SolicitationService } from "../../../../service/module/solicitations";
import { theme } from "../../../../theme/theme";
import { getFontStyle } from "../../../../utils/getFontStyle";
import ButtonSecondary from "../../../../components/buttons/secondary";
import Modal from "../../../../components/modal";
import { message } from "antd";
import { UserService } from "../../../../service/module/users";

const JSolicitations: React.FC = () => {
  const [user, setUser] = useState<TUser>();
  const [solicitations, setSolicitations] = useState<TCompany[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [index, setIndex] = useState<number>();

  useEffect(() => {
    const usr = isAuth(true);
    if (usr && usr.userType === "admin-j") {
      setUser(usr);
      const fetchData = async () => {
        const resSolicitations: any =
          await SolicitationService.getSolicitations();
        if (resSolicitations && resSolicitations.status === 200) {
          console.log(resSolicitations.data);
          setSolicitations(
            resSolicitations.data.filter(
              (req: TCompany) => req.statusCadastro === false
            )
          );
        } else {
          setSolicitations([]);
        }
      };
      fetchData();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();

  const handleClose = () => {
    setModal(false);
  };
  let solicitationsCounter = 0;
  const aprove = async (i: number) => {
    const cardRef = "card" + i;
    const company = solicitations[i];

    company.details.fontStyleAux = getFontStyle(theme.fonts.secundary);
    company.details.auxColor = theme.colors.yellow.palete;
    company.details.mainColor = "#fff";
    company.details.textColor = "#000";

    const { uid } = company.adminsUids![0];
    const solicitationPayload = {
      statusCadastro: true,
      details: {
        ...company.details,
      },
    };

    await SolicitationService.updateSolicitations(
      company.docId!,
      solicitationPayload
    ).then(async (companyRes: any) => {
      if (companyRes.status) {
        await UserService.updateUser(uid, { statusCadastro: true }).then(
          (res: boolean) => {
            if (res) {
              solicitationsCounter++;
              const card = document.getElementById(cardRef);
              card!.style.display = "none";
              message.success("Sucesso ao aprovar " + company.title);
              if (solicitationsCounter === solicitations.length) {
                setSolicitations([]);
              }
            } else {
              message.error("Erro ao aprovar.");
            }
          }
        );
      } else {
        console.log(companyRes);
        message.error("Erro ao aprovar.");
      }
    });
  };
  const refuse = async (i: number) => {
    const cardRef = "card" + i;

    const company = solicitations[i];
    const solicitationPayload = {
      statusCadastro: false,
      isAproved: false,
    };
    await SolicitationService.updateSolicitations(
      company.docId!,
      solicitationPayload
    ).then(async (companyRes: any) => {
      console.log(companyRes);
      solicitationsCounter++;
      const card = document.getElementById(cardRef);
      card!.style.display = "none";
      message.success("Sucesso ao negar " + company.title);
      if (solicitationsCounter === solicitations.length) {
        setSolicitations([]);
      }
    });
  };

  return (
    <>
      <Header />
      <Styled.MainContainer>
        {modal && (
          <Modal
            customWidth={isMobile() ? 90 : 60}
            bannerColor={theme.colors.blue.palete}
            title={"Detalhes"}
            handleClose={handleClose}
            titleFont={theme.fonts.primary}
          >
            <div>
              <Styled.SolicitationsContainer
                style={{ overflowY: "hidden", marginTop: "6vh" }}
              >
                <div className="solicitation-card">
                  <div className="solicitation-row">
                    <img
                      className="solicitation-img"
                      src={solicitations[index!].icon}
                      alt=""
                    />
                    <div className="solicitation-detail">
                      <span
                        className="title"
                        style={{
                          fontFamily: getFontStyle(
                            solicitations[index!].details.fontStyle
                          ),
                        }}
                      >
                        {solicitations[index!].title}
                      </span>
                      <span className="address">
                        {solicitations[index!].address}
                      </span>
                      <span className="address">
                        Cidade: {solicitations[index!].details.city}
                      </span>
                      <span className="address">
                        Frase de boas vindas:{" "}
                        {solicitations[index!].details.welcome}
                      </span>
                      <span className="address">
                        Aceita reservas:
                        {solicitations[index!].details.reservation
                          ? " Sim."
                          : " Não."}
                      </span>
                      <span className="address">
                        Nome para contato:{" "}
                        {solicitations[index!].details.contactName}
                      </span>
                      <span className="address">
                        Número para contato:{" "}
                        {solicitations[index!].details.contactNumber}
                      </span>
                      <span className="address">
                        E-mail para contato:{" "}
                        {solicitations[index!].details.contactEmail}
                      </span>
                    </div>
                  </div>
                </div>
              </Styled.SolicitationsContainer>
            </div>
          </Modal>
        )}
        <Styled.CategoryContainer>
          <Styled.Span>Solicitações</Styled.Span>
          <Styled.SolicitationsContainer>
            {solicitations.length > 0 ? (
              solicitations.map((solicitation, index) => (
                <div
                  key={index}
                  className="solicitation-card"
                  id={"card" + index}
                >
                  <div className="solicitation-row">
                    <img
                      className="solicitation-img"
                      src={solicitation.icon}
                      alt=""
                    />
                    <div className="solicitation-detail">
                      <span
                        className="title"
                        style={{
                          fontFamily: getFontStyle(
                            solicitation.details.fontStyle
                          ),
                        }}
                      >
                        {solicitation.title}
                      </span>
                      <span className="address">
                        {solicitation.details.socialMedia.address}
                      </span>
                      <span className="address">
                        Cidade: {solicitation.details.city}
                      </span>
                      <div className="solicitation-btns-container">
                        <div className="btn-row">
                          <div className="btn-item">
                            <ButtonSecondary
                              minWidth="10vw"
                              action={() => {
                                aprove(index);
                              }}
                              Label={"Aprovar"}
                              fontSize={theme.fontSize.md}
                              color={theme.colors.white.normal}
                              bgColor={theme.colors.green.normal}
                            />
                          </div>
                          <div className="btn-item">
                            <ButtonSecondary
                              minWidth="10vw"
                              action={() => {
                                setIndex(index);
                                setModal(true);
                              }}
                              Label={"Visualizar dados"}
                              fontSize={theme.fontSize.md}
                              color={theme.colors.white.normal}
                              bgColor={theme.colors.blue.palete}
                            />
                          </div>
                        </div>
                        <div className="btn-row">
                          <div className="btn-item">
                            <ButtonSecondary
                              minWidth="10vw"
                              action={() => {
                                window.location.href = `https://api.whatsapp.com/send?phone=55${solicitation.details.contactNumber.replace(
                                  /\D/g,
                                  ""
                                )}&text=Olá, ${
                                  solicitation.details.contactName
                                }, meu nome é ${
                                  user?.name
                                } e eu gostaria de falar sobre seu cadastro no Meu Menu!`;
                              }}
                              Label={"Entrar em contato"}
                              fontSize={theme.fontSize.md}
                              color={theme.colors.white.normal}
                              bgColor={theme.colors.yellow.palete}
                            />
                          </div>

                          <div className="btn-item">
                            <ButtonSecondary
                              minWidth="10vw"
                              action={() => {
                                refuse(index);
                              }}
                              Label={"Recusar"}
                              fontSize={theme.fontSize.md}
                              color={theme.colors.white.normal}
                              bgColor={theme.colors.red.normal}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <>
                <Styled.Span
                  style={{
                    fontSize: theme.fontSize.md2,
                  }}
                >
                  Tudo aprovado!
                </Styled.Span>
                <ButtonSecondary
                  action={() => {
                    navigate("/j/adm/home");
                  }}
                  Label="Voltar ao menu."
                  color={theme.colors.white.normal}
                  bgColor={theme.colors.green.normal}
                />
              </>
            )}
          </Styled.SolicitationsContainer>
        </Styled.CategoryContainer>
      </Styled.MainContainer>
      <Footer />
    </>
  );
};

export default JSolicitations;
