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

const JSolicitations: React.FC = () => {
  const [user, setUser] = useState<TUser>();
  const [solicitations, setSolicitations] = useState<TCompany[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [index, setIndex] = useState<number>();

  useEffect(() => {
    const usr = isAuth(true);
    if (usr.userType === "admin-j") {
      setUser(usr);
      const fetchData = async () => {
        const resSolicitations: any =
          await SolicitationService.getSolicitations();
        if (resSolicitations.status === 200) {
          setSolicitations(resSolicitations.data);
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

  const aprove = async (i: number) => {

    //Abrir modal igual o de detalhes, mas pedindo as informações abaixo: 
    const ownerUid = solicitations[i].adminsUids[0];
    const iconUrl = solicitations[i].icon;

    //Ao cadastrar, adicionar data e hora de quando foi cadastrado

    //Atualizar status de empresa que tem icon == iconUrl e usuário uid ==  ownerUid
    //Chaves para serem atualizadas:
    //statusCadastro = true;
    //details.fontStyleAux
    //details.auxColor //secundária, contraste
    //details.mainColor //fundo
    //details.textColor //texto

    //details.socialMedia.address //colocar mapa incorporado
    //details.socialMedia.spotify //colocar playlist incorporada

    //Ao aprovar: colocar data de quando foi aprovado.

    console.log(solicitations[i]);
  };
  const refuse = async (i: number) => {
    message.error("não implementou pq? não precisava excluir na mão? kkkkkk");
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
            {solicitations &&
              solicitations.map((solicitation, index) => (
                <div className="solicitation-card">
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
                      <span className="address">{solicitation.address}</span>
                      <span className="address">
                        Cidade: {solicitation.details.city}
                      </span>
                      <div className="solicitation-btns-container">
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
              ))}
          </Styled.SolicitationsContainer>
        </Styled.CategoryContainer>
      </Styled.MainContainer>
      <Footer />
    </>
  );
};

export default JSolicitations;
