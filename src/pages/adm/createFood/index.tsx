import React, { useEffect, useState } from "react";
import Footer from "../../../components/footer";
import Header from "../../../components/header";
import Input from "../../../components/input";
import * as Styled from "./styles";

import { theme } from "../../../theme/theme";
import isMobile from "is-mobile";
import ButtonSecondary from "../../../components/buttons/secondary";
import Modal from "../../../components/modal";
import {
  TamanhosGarrafasCerveja,
  TamanhosGarrafasVinho,
  TamanhosGarrafasWhisky,
  TamanhosLatas,
  cervejaRefriEmbalagens,
} from "./embalagems";
import { CompanyService } from "../../../service/module/company";
import { message } from "antd";
import { CategoryService } from "../../../service/module/categories";
import { isAuth } from "../../../utils/security/isCrypto";
import { useNavigate } from "react-router-dom";
import { TCategory } from "../../../service/module/login";
import { TCardProps } from "../../../components/plansCards/card";
import CurrencyInput from "react-currency-input-field";
import { fileUpload } from "../../../service/module/fileUpload";
import { TProducts } from "../../menu";
import loadingGif from "../../../assets/icons/loading.gif";

const CreateFood: React.FC = () => {
  const [name, setName] = useState<string>("Seu prato");
  const [price, setPrice] = useState<string>("");
  const [descriptionText, setDescriptionText] = useState<string>("");
  const [harmonizacaoText, setHarmonizacaoText] = useState<string>("");
  const [banner, setBanner] = useState<File>();
  const [IBU, setIBU] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [grape, setGrape] = useState<string>("");
  const [cervejaEmbalagem, setCervejaEmbalagem] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const meuMenuFoodCategory = localStorage.getItem("@meumenu/foodcategory");
  const meuMenuFoodType = localStorage.getItem("@meumenu/foodType");
  const categoryDetails: TCardProps = JSON.parse(
    localStorage.getItem("@meumenu/categoryDetails")!
  );

  const [modal, setModal] = useState<boolean>(false);
  const [modalFail, setModalFail] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const usr = isAuth();
    if (usr && usr.userType === "admin") {
      //const fetchData = async () => {
      //  const cateRes = await CategoryService.getMyCategories(usr.codCompany!);
      //  console.log(cateRes);
      //};
      //fetchData();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeInput = (e: any) => {
    const localFile = e.target.files[0];
    setBanner(localFile);
  };

  const createRequest = async () => {
    if (
      meuMenuFoodCategory &&
      meuMenuFoodType &&
      name &&
      price &&
      descriptionText &&
      harmonizacaoText &&
      banner
    ) {
      setLoading(true);

      let imgUrl: any;
      if (banner) {
        const path = "/companies/imgs/";
        imgUrl = await fileUpload(banner, path + "banner" + banner.name);
      }
      const newFood: TProducts = {
        img: imgUrl!.data,
        isEnable: true,
        label: name,
        qtd: 1,
        harmoziation: harmonizacaoText,
        description: descriptionText,
        price,
        category: meuMenuFoodCategory,
        categoryIcon: "",
        isDrink: meuMenuFoodType === "beber" ? true : false,
        isDestaque: false,
        isOffer: false,
        IBU: IBU,
        country,
        grape: grape,
      };

      const res = await CategoryService.getMyCategories(isAuth()!.codCompany!);
      const categoryIndex = res.findIndex(
        (cate: TCategory) => cate.title === meuMenuFoodCategory
      );
      if (categoryIndex >= 0) {
        try {
          await CompanyService.setCompanySubCol({
            docId: isAuth()!.codCompany!,
            mainColection: "company",
            subColection: "menu",
            subdata: newFood,
          });
          setLoading(false);
          message.success("Cadastro realizado com sucesso!");
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } catch (error) {
          setLoading(false);
          console.log(error);
          message.error("Verifique os campos e tente novamente.");
        }
      } else {
        try {
          const categoryAndFood = await Promise.all([
            await CompanyService.setCompanySubCol({
              docId: isAuth()!.codCompany!,
              mainColection: "company",
              subColection: "categories",
              subdata: categoryDetails,
            }),
            await CompanyService.setCompanySubCol({
              docId: isAuth()!.codCompany!,
              mainColection: "company",
              subColection: "menu",
              subdata: newFood,
            }),
          ])
            .then((results) => {
              return results;
            })
            .catch((error) => {
              console.error(error);
            });

          const checkFoodAux = categoryAndFood as Array<any>;
          const checkFood = checkFoodAux.every(
            (data: any) => data.status === 200
          );
          if (checkFood) {
            setLoading(false);
            message.success("Cadastro realizado com sucesso!");
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          } else {
            setLoading(false);
            message.error("Verifique os campos e tente novamente.");
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  const handleClose = () => {
    setModal(false);
  };
  const handleCloseFail = () => {
    setModalFail(false);
  };
  const handleCloseLoading = () => {
    setLoading(false);
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
            <Styled.FormItemContainer>
              <Input setValue={setName} label="Nome" />
            </Styled.FormItemContainer>

            <Styled.FormItemContainer>
              <Styled.ItemSpan
                style={{
                  marginTop: "0px",
                  paddingBottom: "2.5vh",
                  alignSelf: "start",
                }}
              >
                Preço
              </Styled.ItemSpan>
              <CurrencyInput
                placeholder="Informe um preço válido"
                defaultValue={price}
                decimalsLimit={2}
                prefix="R$ "
                onValueChange={(value, name) => setPrice(value!)}
                intlConfig={{ locale: "pt-BR", currency: "BRL" }}
                style={{
                  color: theme.colors.black.normal,
                  fontSize: "25px",
                  border: `2px solid ${theme.colors.black.normal}`,
                  borderRadius: "5px",
                  marginTop: "10px",
                }}
              />
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
                  <Input setValue={setCountry} label="País de origem" />
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

          {meuMenuFoodCategory === "Cervejas" && (
            <>
              <Styled.MenusRow>
                <Styled.FormItemContainer>
                  <Input setValue={setIBU} label="IBU" />
                </Styled.FormItemContainer>
                <Styled.FormItemContainer>
                  <Styled.ItemSpan>Qual é o tipo da embalagem?</Styled.ItemSpan>
                  <Styled.Select
                    name="select"
                    onChange={(e: any) => {
                      setCervejaEmbalagem(e.target.value);
                    }}
                  >
                    <option selected disabled value="0">
                      Escolha a categoria.
                    </option>
                    {cervejaRefriEmbalagens.map((emb: any) => (
                      <option key={emb.value} value={emb.value}>
                        {emb.label}
                      </option>
                    ))}
                  </Styled.Select>
                </Styled.FormItemContainer>
              </Styled.MenusRow>
              <Styled.MenusRow>
                {cervejaEmbalagem && (
                  <>
                    <Styled.FormItemContainer>
                      <Styled.ItemSpan>
                        Qual é o tamanho da embalagem?
                      </Styled.ItemSpan>
                      {cervejaEmbalagem === "Lata" ? (
                        <Styled.Select name="select" onChange={(e: any) => {}}>
                          <option selected disabled value="0">
                            Qual tamanho?
                          </option>
                          {TamanhosLatas.map((emb: any) => (
                            <option key={emb.value} value={emb.value}>
                              {emb.label}
                            </option>
                          ))}
                        </Styled.Select>
                      ) : (
                        <Styled.Select name="select" onChange={(e: any) => {}}>
                          <option selected disabled value="0">
                            Qual tamanho?
                          </option>
                          {TamanhosGarrafasCerveja.map((emb: any) => (
                            <option key={emb.value} value={emb.value}>
                              {emb.label}
                            </option>
                          ))}
                        </Styled.Select>
                      )}
                    </Styled.FormItemContainer>
                  </>
                )}
              </Styled.MenusRow>
            </>
          )}

          {(meuMenuFoodCategory === "Refrigerantes" ||
            meuMenuFoodCategory === "Energético" ||
            meuMenuFoodCategory === "Sucos") && (
            <>
              <Styled.MenusRow>
                <Styled.FormItemContainer>
                  <Styled.ItemSpan>Qual é o tipo da embalagem?</Styled.ItemSpan>
                  <Styled.Select
                    name="select"
                    onChange={(e: any) => {
                      setCervejaEmbalagem(e.target.value);
                    }}
                  >
                    <option selected disabled value="0">
                      Escolha a categoria.
                    </option>
                    {cervejaRefriEmbalagens.map((emb: any) => (
                      <option key={emb.value} value={emb.value}>
                        {emb.label}
                      </option>
                    ))}
                  </Styled.Select>
                </Styled.FormItemContainer>
                {cervejaEmbalagem && (
                  <>
                    <Styled.FormItemContainer>
                      <Styled.ItemSpan>
                        Qual é o tamanho da embalagem?
                      </Styled.ItemSpan>
                      {cervejaEmbalagem === "Lata" ? (
                        <Styled.Select name="select" onChange={(e: any) => {}}>
                          <option selected disabled value="0">
                            Qual tamanho?
                          </option>
                          {TamanhosLatas.map((emb: any) => (
                            <option key={emb.value} value={emb.value}>
                              {emb.label}
                            </option>
                          ))}
                        </Styled.Select>
                      ) : (
                        <Styled.Select name="select" onChange={(e: any) => {}}>
                          <option selected disabled value="0">
                            Qual tamanho?
                          </option>
                          {TamanhosGarrafasCerveja.map((emb: any) => (
                            <option key={emb.value} value={emb.value}>
                              {emb.label}
                            </option>
                          ))}
                        </Styled.Select>
                      )}
                    </Styled.FormItemContainer>
                  </>
                )}
              </Styled.MenusRow>
            </>
          )}

          {meuMenuFoodCategory === "Vinhos" && (
            <>
              <Styled.MenusRow>
                <Styled.FormItemContainer>
                  <Input setValue={setGrape} label="Tipo da uva" />
                </Styled.FormItemContainer>
                <Styled.FormItemContainer>
                  <Styled.ItemSpan>Qual é o tamaho da garrafa?</Styled.ItemSpan>
                  <Styled.Select
                    name="select"
                    onChange={(e: any) => {
                      setCervejaEmbalagem(e.target.value);
                    }}
                  >
                    <option selected disabled value="0">
                      informe o tamanho.
                    </option>
                    {TamanhosGarrafasVinho.map((emb: any) => (
                      <option key={emb.value} value={emb.value}>
                        {emb.label}
                      </option>
                    ))}
                  </Styled.Select>
                </Styled.FormItemContainer>
              </Styled.MenusRow>
            </>
          )}
          {meuMenuFoodCategory === "Champagne/Espumantes" && (
            <>
              <Styled.MenusRow>
                <Styled.FormItemContainer>
                  <Styled.ItemSpan>Qual é o tamaho da garrafa?</Styled.ItemSpan>
                  <Styled.Select
                    name="select"
                    onChange={(e: any) => {
                      setCervejaEmbalagem(e.target.value);
                    }}
                  >
                    <option selected disabled value="0">
                      informe o tamanho.
                    </option>
                    {TamanhosGarrafasVinho.map((emb: any) => (
                      <option key={emb.value} value={emb.value}>
                        {emb.label}
                      </option>
                    ))}
                  </Styled.Select>
                </Styled.FormItemContainer>
              </Styled.MenusRow>
            </>
          )}
          {meuMenuFoodCategory === "Whiskey/Licor" && (
            <>
              <Styled.MenusRow>
                <Styled.FormItemContainer>
                  <Styled.ItemSpan>Qual é o tamaho da garrafa?</Styled.ItemSpan>
                  <Styled.Select
                    name="select"
                    onChange={(e: any) => {
                      setCervejaEmbalagem(e.target.value);
                    }}
                  >
                    <option selected disabled value="0">
                      informe o tamanho.
                    </option>
                    {TamanhosGarrafasWhisky.map((emb: any) => (
                      <option key={emb.value} value={emb.value}>
                        {emb.label}
                      </option>
                    ))}
                  </Styled.Select>
                </Styled.FormItemContainer>
              </Styled.MenusRow>
            </>
          )}
          {(meuMenuFoodCategory === "Cremes/Milkshakes" ||
            meuMenuFoodCategory === "Água" ||
            meuMenuFoodCategory === "Drinks") && (
            <>
              <Styled.MenusRow>
                <Styled.FormItemContainer>
                  <Styled.ItemSpan>Qual é o tamanho do item?</Styled.ItemSpan>
                  <Styled.Select name="select" onChange={(e: any) => {}}>
                    <option selected disabled value="0">
                      Selecione...
                    </option>
                    {TamanhosGarrafasCerveja.map((emb: any) => (
                      <option key={emb.value} value={emb.value}>
                        {emb.label}
                      </option>
                    ))}
                  </Styled.Select>
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
