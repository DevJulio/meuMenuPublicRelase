import React, { useState } from "react";
import Footer from "../../../components/footer";
import Header from "../../../components/header";
import Input from "../../../components/input";
import * as Styled from "./styles";

import { theme } from "../../../theme/theme";
import isMobile from "is-mobile";
import InputMasked from "../../../components/MaskedIpunt";
import ButtonSecondary from "../../../components/buttons/secondary";
import Modal from "../../../components/modal";

const CreateFood: React.FC = () => {
  const [name, setName] = useState<string>("Seu prato");
  const [price, setPrice] = useState<string>("");
  const [descriptionText, setDescriptionText] = useState<string>("");
  const [harmonizacaoText, setHarmonizacaoText] = useState<string>("");
  const [banner, setBanner] = useState();
  const [IBU, setIBU] = useState<string>("");
  const [contry, setContry] = useState<string>("");
  const [grape, setGrape] = useState<string>("");

  const meuMenuFoodCategory = localStorage.getItem("meuMenuFoodCategory");
  const meuMenuFoodType = localStorage.getItem("meuMenuFoodType");

  const [modal, setModal] = useState<boolean>(false);
  const [modalFail, setModalFail] = useState<boolean>(false);

  const changeInput = (e: any) => {
    const localFile = e.target.files[0];
    setBanner(localFile);
  };

  const createRequest = () => {
    if (name && price && descriptionText && harmonizacaoText && banner) {
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
                  <p
                    style={{
                      textAlignLast: "center",
                    }}
                  >
                    {meuMenuFoodCategory} cadastrado com sucesso!
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
                  Label={`Cadastrar mais um item da categoria ${meuMenuFoodCategory}`}
                  fontSize={theme.fontSize.md}
                  color={theme.colors.white.normal}
                  bgColor={theme.colors.green.normal}
                />
                <div
                  style={{
                    marginRight: "12vw",
                  }}
                >
                  <ButtonSecondary
                    action={() => {}}
                    Label={`Escolher outra categoria`}
                    fontSize={theme.fontSize.md}
                    color={theme.colors.white.normal}
                    bgColor={theme.colors.green.normal}
                  />
                </div>
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
                    Todos os campos do cadastro devem estar preenchidos,
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
              <Input setValue={setName} label="Nome" />
            </Styled.FormItemContainer>

            <Styled.FormItemContainer>
              <Input setValue={setPrice} label="Preço" />
            </Styled.FormItemContainer>
          </Styled.MenusRow>

          <Styled.MenusRow>
            <Styled.IconCentralize>
              <Input
                labelColor={theme.colors.red.normal}
                setValue={setDescriptionText}
                label="Descrição e detalhes"
                isTextArea
                customWidth={isMobile() ? "250px" : "650px"}
              />
            </Styled.IconCentralize>

            <Styled.IconCentralize>
              <Input
                labelColor={theme.colors.red.normal}
                setValue={setHarmonizacaoText}
                label="dica de harmonização"
                isTextArea
                customWidth={isMobile() ? "250px" : "650px"}
              />
            </Styled.IconCentralize>
          </Styled.MenusRow>

          {meuMenuFoodType === "beber" && (
            <>
              <Styled.MenusRow>
                <Styled.FormItemContainer>
                  <Input setValue={setContry} label="País de origem" />
                </Styled.FormItemContainer>
                <Styled.FormItemContainer>
                  <Styled.ItemSpan>
                    Selecione a foto para o cardápio.
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
            </>
          )}

          {meuMenuFoodCategory === "Cervejas" && (
            <>
              <Styled.MenusRow>
                <Styled.FormItemContainer>
                  <Input setValue={setIBU} label="IBU" />
                </Styled.FormItemContainer>
              </Styled.MenusRow>
            </>
          )}

          {meuMenuFoodCategory === "Vinhos" && (
            <>
              <Styled.MenusRow>
                <Styled.FormItemContainer>
                  <Input setValue={setGrape} label="Tipo da uva" />
                </Styled.FormItemContainer>
              </Styled.MenusRow>
            </>
          )}

          {meuMenuFoodType !== "beber" && (
            <Styled.MenusRow>
              <Styled.FormItemContainer>
                <Styled.ItemSpan>
                  Selecione a foto para o cardápio.
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
          )}
        </Styled.Menus>
        <Styled.BtnContainer>
          <ButtonSecondary
            action={() => {
              createRequest();
            }}
            Label="Finalizar cadastro"
            color={theme.colors.red.normal}
            bgColor={theme.colors.white.normal}
          />
        </Styled.BtnContainer>
      </Styled.MainContainer>
      <Footer />
    </>
  );
};

export default CreateFood;
