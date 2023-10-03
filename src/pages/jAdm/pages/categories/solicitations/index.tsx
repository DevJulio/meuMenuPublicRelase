import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import isMobile from "is-mobile";
import { isAuth } from "../../../../../utils/security/isCrypto";
import { TCompany, TUser } from "../../../../../service/module/login";
import Header from "../../../../../components/header";
import Footer from "../../../../../components/footer";
import * as Styled from "./styles";
import { SolicitationService } from "../../../../../service/module/solicitations";
import { getFontStyle } from "../../../../../utils/getFontStyle";
import ButtonSecondary from "../../../../../components/buttons/secondary";
import Modal from "../../../../../components/modal";
import { ColorPicker, message } from "antd";
import { UserService } from "../../../../../service/module/users";
import { theme } from "../../../../../theme/theme";
import { CategoryService } from "../../../../../service/module/categories";
import {
  TCardProps,
  TCardPropsAux,
} from "../../../../../components/plansCards/card";
import Input from "../../../../../components/input";
import { Color } from "antd/es/color-picker";
import { fileUpload } from "../../../../../service/module/fileUpload";
import Checkbox from "../../../../../components/CheckBox";

const JCategoriesSolicitations: React.FC = () => {
  const [user, setUser] = useState<TUser>();
  const [solicitations, setSolicitations] = useState<TCardPropsAux[]>([]);
  const [modal, setModal] = useState<boolean>(false);

  const [iconFile, setIconFile] = useState<File>();
  const [docId, setDocId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [mainColor, setMainColor] = useState<string>("");
  const [textColor, setTextColor] = useState<string>("");
  const [auxColor, setAuxColor] = useState<string>("");
  const [mainCategory, setMainCategory] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>();

  useEffect(() => {
    const usr = isAuth(true);
    if (usr && usr.userType === "admin-j") {
      setUser(usr);
      const fetchData = async () => {
        const resSolicitations: any =
          await CategoryService.getCategorySolicitations();
        if (resSolicitations && resSolicitations.status === 200) {
          console.log(resSolicitations.data);
          setSolicitations(
            resSolicitations.data.filter(
              (req: TCardPropsAux) => req.status === false
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

  const addCategory = async () => {
    let bannerUrl: any;
    if (iconFile) {
      const path = "/companies/imgs/categories/";
      bannerUrl = await fileUpload(iconFile, path + "icon" + iconFile.name);
      const bannerRelease = bannerUrl && bannerUrl.data;
      try {
        const cardRef = "card" + currentIndex;
        const category: TCardProps = {
          icon: bannerRelease,
          title,
          text,
          mainColor,
          auxColor,
          textColor,
          customWidth: true,
          isDrink: mainCategory === "beber" ? true : false,
          status: true,
        };
        const res = await CategoryService.updateCategory(docId, {
          ...category,
        });
        if (res.status) {
          message.success("Categoria atualizada com sucesso!");
          solicitationsCounter++;
          const card = document.getElementById(cardRef);
          card!.style.display = "none";
          if (solicitationsCounter === solicitations.length) {
            setSolicitations([]);
          }
          handleClose();
        } else {
          message.error("Verifique os campos e tente novamente");
        }
      } catch (error) {
        console.log(error);
        message.error("verique o log");
        handleClose();
      }
    } else {
      message.error("Ícone deve ser enviado");
    }
  };

  const refuse = async (i: number, doc: string) => {
    const cardRef = "card" + i;
    try {
      const refuseRes = await CategoryService.deleteCategory(doc);
      console.log(refuseRes);
    } catch (error) {
      console.log(error);
      message.error("verique o log");
    }
    // const company = solicitations[i];
    // const solicitationPayload = {
    //   statusCadastro: false,
    //   isAproved: false,
    // };
    // await SolicitationService.updateSolicitations(
    //   company.docId!,
    //   solicitationPayload
    // ).then(async (companyRes: any) => {
    //   console.log(companyRes);
    //   solicitationsCounter++;
    //   const card = document.getElementById(cardRef);
    //   card!.style.display = "none";
    //   message.success("Sucesso ao negar " + company.title);
    //   if (solicitationsCounter === solicitations.length) {
    //     setSolicitations([]);
    //   }
    // });
  };
  const setIconModal = (e: any) => {
    const localFile = e.target.files[0];
    setIconFile(localFile);
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
            <Styled.ModalContainer>
              <Styled.FormContainer>
                <div className="form-row">
                  <Styled.FormItemContainer>
                    <Input
                      setValue={setTitle}
                      labelColor={theme.colors.blue.palete}
                      label="Novo nome: "
                      value={title}
                    />
                  </Styled.FormItemContainer>
                  <Styled.FormItemContainer>
                    <Styled.ItemSpan
                      style={{
                        color: theme.colors.blue.palete,
                        paddingBottom: "0px",
                        marginTop: "5px",
                      }}
                    >
                      Selecione o icone:
                    </Styled.ItemSpan>
                    <Styled.Centralize>
                      <Styled.FileInput
                        style={{
                          color: theme.colors.blue.palete,
                        }}
                        type="file"
                        id="mainBanner"
                        onChange={(e: any) => {
                          setIconModal(e);
                        }}
                      />
                    </Styled.Centralize>
                  </Styled.FormItemContainer>
                </div>
                <div className="form-row">
                  <Styled.FormItemContainer>
                    <Styled.ItemSpan
                      style={{
                        paddingBottom: "0px",
                        marginTop: "5px",
                      }}
                    >
                      Cor de fundo
                    </Styled.ItemSpan>
                    <ColorPicker
                      showText
                      onChange={(value: Color, hex: string) => {
                        setMainColor(hex);
                      }}
                      value={mainColor}
                    />
                  </Styled.FormItemContainer>
                  <Styled.FormItemContainer>
                    <Styled.ItemSpan
                      style={{
                        paddingBottom: "0px",
                        marginTop: "5px",
                      }}
                    >
                      Cor do texto
                    </Styled.ItemSpan>
                    <ColorPicker
                      showText
                      onChange={(value: Color, hex: string) => {
                        setTextColor(hex);
                      }}
                      value={textColor}
                    />
                  </Styled.FormItemContainer>
                </div>
                <div className="form-row">
                  <Styled.FormItemContainer>
                    <Styled.ItemSpan
                      style={{
                        paddingBottom: "0px",
                        marginTop: "5px",
                      }}
                    >
                      Cor do título
                    </Styled.ItemSpan>
                    <ColorPicker
                      showText
                      onChange={(value: Color, hex: string) => {
                        setAuxColor(hex);
                      }}
                      value={auxColor}
                    />
                  </Styled.FormItemContainer>
                  <Styled.FormItemContainer>
                    <Input
                      setValue={setText}
                      labelColor={theme.colors.blue.palete}
                      label="Sub-titulo: "
                      value={text}
                    />
                  </Styled.FormItemContainer>
                </div>

                <div className="form-row">
                  <Styled.FormItemContainer>
                    <Styled.ItemSpan
                      style={{
                        paddingBottom: "0px",
                        marginTop: "5px",
                      }}
                    >
                      Comer
                    </Styled.ItemSpan>
                    <Checkbox
                      id="6"
                      label=""
                      setValue={() => {
                        setMainCategory("comer");
                      }}
                    />
                  </Styled.FormItemContainer>
                  <Styled.FormItemContainer>
                    <Styled.ItemSpan
                      style={{
                        paddingBottom: "0px",
                        marginTop: "5px",
                      }}
                    >
                      Beber
                    </Styled.ItemSpan>

                    <Checkbox
                      id="7"
                      label=""
                      setValue={() => {
                        setMainCategory("beber");
                      }}
                    />
                  </Styled.FormItemContainer>
                </div>
                <div className="form-row">
                  <span> Vermelho D62828 </span>
                  <span> Amarelo FCBF49 </span>
                  <span> Azul 003049 </span>
                </div>
              </Styled.FormContainer>

              <Styled.BackBtnContainer>
                <ButtonSecondary
                  action={() => {
                    if (title && text && mainColor && textColor && auxColor) {
                      addCategory();
                    } else {
                      message.error("Verifique os campos e tente novamente.");
                    }
                  }}
                  Label={"Salvar"}
                  fontSize={theme.fontSize.md}
                  color={theme.colors.white.normal}
                  bgColor={theme.colors.green.normal}
                />
              </Styled.BackBtnContainer>
            </Styled.ModalContainer>
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
                    <div className="solicitation-detail">
                      <span className="title">{solicitation.title}</span>
                      <span className="address">
                        Solicitante: {solicitation.requester}
                      </span>
                      <span className="address">
                        Descrição: {solicitation.solicitationDesc}
                      </span>
                      <div className="solicitation-btns-container">
                        <div className="btn-row">
                          <div className="btn-item">
                            <ButtonSecondary
                              minWidth="10vw"
                              action={() => {
                                setCurrentIndex(index);
                                setDocId(solicitation.docId);
                                setModal(true);
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
                                refuse(index, solicitation.docId);
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

export default JCategoriesSolicitations;
