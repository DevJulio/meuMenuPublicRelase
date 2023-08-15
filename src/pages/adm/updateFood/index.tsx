import React, { useEffect, useState } from "react";
import Footer from "../../../components/footer";
import Header from "../../../components/header";
import Input from "../../../components/input";
import * as Styled from "./styles";

import { theme } from "../../../theme/theme";
import isMobile from "is-mobile";
import ButtonSecondary from "../../../components/buttons/secondary";
import Modal from "../../../components/modal";
import { useNavigate } from "react-router-dom";

const UpdateFood: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [descriptionText, setDescriptionText] = useState<string>("");
  const [harmonizacaoText, setHarmonizacaoText] = useState<string>("");
  const [banner, setBanner] = useState();
  const [IBU, setIBU] = useState<string>("");
  const [contry, setContry] = useState<string>("");
  const [grape, setGrape] = useState<string>("");
  const [foodType, setFoodType] = useState<string>("");
  const [foodCategory, setFoodCategory] = useState<string>("");

  const [modal, setModal] = useState<boolean>(false);
  const [modalFail, setModalFail] = useState<boolean>(false);

  const foodDetailString = localStorage.getItem("meuMenuFoodDetail");
  const navigate = useNavigate();

  useEffect(() => {
    if (foodDetailString) {
      const foodDetail = JSON.parse(foodDetailString);
      setName(foodDetail.label);
      setPrice(foodDetail.price);
      setDescriptionText(foodDetail.description);
      setHarmonizacaoText(foodDetail.harmoziation);
      setBanner(foodDetail.img);
      setFoodCategory(foodDetail.category);

      if (foodDetail.isDrink) {
        setFoodType("beber");
        if (foodDetail.country) {
          setContry(foodDetail.country);
        }
        if (foodDetail.IBU) {
          setIBU(foodDetail.IBU);
        }
        if (foodDetail.grape) {
          setGrape(foodDetail.grape);
        }
      } else {
        setFoodType("comer");
      }
    }
  }, []);

  let updatePic = false;

  const changeInput = (e: any) => {
    const localFile = e.target.files[0];
    updatePic = true;
    setBanner(localFile);
  };

  const createRequest = () => {
    if (name && price && descriptionText && harmonizacaoText && banner) {
      if (updatePic) {
        //adicionar nova foto para o update.
      }
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
                    {foodCategory} atualizado com sucesso!
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
                  action={() => {
                    navigate("/home");
                  }}
                  Label={`Fechar`}
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
                    Todos os campos devem estar preenchidos, verifique e tente
                    novamente!
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
              <Input setValue={setName} value={name} label="Nome" />
            </Styled.FormItemContainer>

            <Styled.FormItemContainer>
              <Input setValue={setPrice} value={price} label="Preço" />
            </Styled.FormItemContainer>
          </Styled.MenusRow>

          <Styled.MenusRow>
            <Styled.IconCentralize>
              <Input
                labelColor={theme.colors.red.normal}
                setValue={setDescriptionText}
                value={descriptionText}
                label="Descrição e detalhes"
                isTextArea
                customWidth={isMobile() ? "250px" : "650px"}
              />
            </Styled.IconCentralize>

            <Styled.IconCentralize>
              <Input
                labelColor={theme.colors.red.normal}
                setValue={setHarmonizacaoText}
                value={harmonizacaoText}
                label="dica de harmonização"
                isTextArea
                customWidth={isMobile() ? "250px" : "650px"}
              />
            </Styled.IconCentralize>
          </Styled.MenusRow>

          <Styled.MenusRow>
            <Styled.FormItemContainer>
              <Styled.ItemSpan>Foto atual: </Styled.ItemSpan>
              <Styled.Centralize>
                <Styled.MenuBanner src={banner} alt="" />
              </Styled.Centralize>
            </Styled.FormItemContainer>
          </Styled.MenusRow>

          {foodType === "beber" && (
            <>
              <Styled.MenusRow>
                <Styled.FormItemContainer>
                  <Input
                    setValue={setContry}
                    value={contry}
                    label="País de origem"
                  />
                </Styled.FormItemContainer>
                <Styled.FormItemContainer>
                  <Styled.ItemSpan>
                    Selecione a foto para o cardápio.
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
            </>
          )}

          {foodCategory === "Cervejas" && (
            <>
              <Styled.MenusRow>
                <Styled.FormItemContainer>
                  <Input setValue={setIBU} label="IBU" />
                </Styled.FormItemContainer>
              </Styled.MenusRow>
            </>
          )}

          {foodCategory === "Vinhos" && (
            <>
              <Styled.MenusRow>
                <Styled.FormItemContainer>
                  <Input setValue={setGrape} label="Tipo da uva" />
                </Styled.FormItemContainer>
              </Styled.MenusRow>
            </>
          )}

          {foodType !== "beber" && (
            <Styled.MenusRow>
              <Styled.FormItemContainer>
                <Styled.ItemSpan>
                  Selecione a foto para o cardápio.
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
          )}
        </Styled.Menus>
        <Styled.BtnContainer>
          <ButtonSecondary
            action={() => {
              createRequest();
            }}
            Label="Finalizar atualização"
            color={theme.colors.red.normal}
            bgColor={theme.colors.white.normal}
          />
        </Styled.BtnContainer>
      </Styled.MainContainer>
      <Footer />
    </>
  );
};

export default UpdateFood;
