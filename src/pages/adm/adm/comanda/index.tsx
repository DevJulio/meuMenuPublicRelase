import React, { useEffect, useState } from "react";
import * as Styled from "./styles";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import Header from "../../../../components/header";
import Footer from "../../../../components/footer";
import Modal from "../../../../components/modal";
import { theme } from "../../../../theme/theme";
import ButtonSecondary from "../../../../components/buttons/secondary";
import Input from "../../../../components/input";
import isMobile from "is-mobile";
import { TCategory } from "../../../../components/category";
import { TCounter } from "../../keepOffersCombo";
import { message } from "antd";
import { TAT, TUser } from "../../../../service/module/login";
import { CompanyService } from "../../../../service/module/company";
import { isAuth } from "../../../../utils/security/isCrypto";
import { useNavigate } from "react-router-dom";
import { TabsService } from "../../../../service/module/tabs";
import { CategoryService } from "../../../../service/module/categories";
import { FoodsService } from "../../../../service/module/foods";
import { TProducts } from "../../../menu";

export type TTable = {
  docId?: string;
  tableLbl: string;
  custumerName: string;
  tableItens: TComandaItem[];
  isOpen: boolean; //só exibir as que possuem true
  createdAt?: TAT;
  updatedAt?: TAT;
};

export type TComandaItem = {
  qtd: number;
  lbl: string;
  price: string;
  itemId?: string;
};

const Comanda: React.FC = () => {
  const [reFetch, setReFetch] = useState<number>(); //Atribuir valor sempre q alguma atualização ou adicao

  const [modal, setModal] = useState<boolean>(false);
  const [modalTable, setModalTable] = useState<boolean>(false);
  const [foodCategory, setFoodCategory] = useState<string>("");

  const [tableName, setTableName] = useState<string>();
  const [tableNumber, setTableNumber] = useState<string>();

  const [modalTableAdd, setModalTableAdd] = useState<boolean>(false);
  const [modalTableAddItem, setModalTableAddItem] = useState<boolean>(false);
  const [modalTableConfirm, setModalTableConfirm] = useState<boolean>(false);

  const [modalTableClose, setModalTableClose] = useState<boolean>(false);
  const [modalTableCheck, setModalTableCheck] = useState<boolean>(false);
  const [modalTableUpdate, setModalTableUpdate] = useState<boolean>(false);

  const [currentTable, setCurrentTable] = useState<TTable>();
  const [conterStates, setCounterStates] = useState<TCounter[]>([]);
  const [comandaItem, setComandaItem] = useState<TComandaItem>();
  const [isUpdateOrInsert, setIsUpdateOrInsert] = useState<string>("");
  const [tablesToBeRender, setTablesToBeRender] = useState<JSX.Element[]>();
  const [user, setUser] = useState<TUser>();
  const [tables, setTables] = useState<TTable[]>();
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [foods, setFoods] = useState<TProducts[]>();

  const navigate = useNavigate();
  //criar método para verificar qual é o atual versão do cardápio e decidir se vai fazer o fetch ou não
  //atualizar versão do menu a cada atualização de cardápio, seja de categoria ou de disponibilidade.
  useEffect(() => {
    const usr = isAuth();
    if (usr && (usr.userType === "admin" || usr.userType === "staff")) {
      setUser(usr);
      const fetchData = async () => {
        try {
          const categoryTabs: any = await Promise.all([
            await CategoryService.getMyCategories(usr.codCompany!),
            await TabsService.getMyTabs(true),
            await FoodsService.getMyFoods(usr.codCompany!),
          ])
            .then((results) => {
              return results;
            })
            .catch((error) => {
              console.error(error);
            });
          if (categoryTabs[0].length) {
            setCategories(categoryTabs[0] as TCategory[]);
          }
          if (categoryTabs[1].length) {
            const arrayDividido = dividirArray(
              categoryTabs[1],
              isMobile() ? 3 : 4
            );
            setTablesToBeRender(arrayDividido);
            setTables(categoryTabs[1] as TTable[]);
          }
          if (categoryTabs[2].length) {
            setFoods(categoryTabs[2] as TProducts[]);
          }
        } catch (error) {
          console.log(error);
          message.error("Erro ao recuperar categorias, verifique o log");
        }
      };
      fetchData();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reFetch]);

  useEffect(() => {
    const counter: TCounter[] = [];
    foods &&
      foods
        .filter((food) => food.category === foodCategory)
        .map((foodItem, index) =>
          counter.push({
            id: index.toString(),
            counter: 1,
            label: foodItem.label,
          })
        );
    setCounterStates(counter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foodCategory]);

  useEffect(() => {
    if (currentTable && tables) {
      const counter: TCounter[] = [];
      const selectedTable = tables.filter(
        (table) => table.tableLbl === currentTable?.tableLbl
      );

      selectedTable[0].tableItens.map((foodItem, index) =>
        counter.push({
          id: index.toString(),
          counter: 1,
          label: foodItem.lbl,
        })
      );
      setCounterStates(counter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTable]);

  const handleClose = () => {
    setModal(false);
  };
  const handleCloseTable = () => {
    setModalTable(false);
  };
  const handleCloseTableAdd = () => {
    setModalTableAdd(false);
  };
  const handleCloseTableAddItem = () => {
    setModalTableAddItem(false);
    //setModalTableAdd(true);
  };
  const handleCloseTableConfirm = () => {
    setModalTableConfirm(false);
  };
  const handleCloseTableClose = () => {
    setModalTableClose(false);
  };
  const handleCloseTableCheck = () => {
    setModalTableCheck(false);
    setModalTable(true);
  };
  const handleCloseTableUpdate = () => {
    setModalTableUpdate(false);
    setModalTable(true);
  };
  const dividirArray = (array: any[], tamanho: number) => {
    let arrayDividido = [];
    for (let i = 0; i < array.length; i += tamanho) {
      let subarray = array.slice(i, i + tamanho);
      arrayDividido.push(subarray);
    }

    return arrayDividido.map((row: TTable[], index: number) => {
      return (
        <Styled.TablesRow>
          {row.map((item: TTable) => {
            return (
              <div
                style={{
                  display: "flex",
                  cursor: "pointer",
                  width:
                    index + 1 === arrayDividido.length
                      ? isMobile()
                        ? "33%"
                        : "25%"
                      : "50%",
                }}
                onClick={() => {
                  //tratar o fetch aqui
                  setCurrentTable(item);
                  setModalTable(true);
                }}
              >
                <Styled.Tables>
                  <Styled.TablesSpan>{item.tableLbl}</Styled.TablesSpan>
                </Styled.Tables>
              </div>
            );
          })}
        </Styled.TablesRow>
      );
    });
  };

  const addNewTable = async () => {
    if (tableName && tableNumber) {
      const newTable: TTable = {
        tableLbl: tableNumber,
        isOpen: true,
        custumerName: tableName,
        tableItens: [],
      };

      try {
        const offerRes = await CompanyService.setCompanySubCol({
          docId: isAuth()!.codCompany!,
          mainColection: "company",
          subColection: "tabs",
          subdata: newTable,
        });
        if (offerRes && offerRes.status === 200) {
          message.success("Cadastro realizado com sucesso!");
        } else {
          message.error("Verifique os campos e tente novamente.");
        }
      } catch (error) {
        console.log(error);
        message.error("Verifique todos os campos e tente novamente");
      }

      handleClose();
      setReFetch(Math.random());
      console.log(newTable);
    } else {
      message.error("Verifique os dados e tente novamente.");
    }
  };
  //Antes de fazer qualquer atualização verificar se status está disponível
  const addTable = async () => {
    setModalTable(false);
    setModalTableAdd(true);
  };
  const consultTable = async () => {
    setModalTable(false);
    setModalTableCheck(true);
  };
  const closeTable = async () => {
    setModalTable(false);
    setModalTableClose(true);
  };
  const updateTable = async () => {
    setModalTable(false);
    setModalTableUpdate(true);
  };

  const handleConterChange = async (id: string, add: boolean) => {
    setCounterStates((prevConterStates) =>
      prevConterStates.map((counterState) =>
        counterState.counter > 0 && counterState.id === id
          ? {
              ...counterState,
              counter: add
                ? counterState.counter + 1
                : counterState.counter - 1,
            }
          : counterState
      )
    );
  };

  const addToComanda = async () => {
    handleCloseTableConfirm();
    if (isUpdateOrInsert === "Add") {
      const hasOcorrencia: number = currentTable!.tableItens.findIndex(
        (item) => item.lbl === comandaItem?.lbl
      );
      //se tem é zero, se não -1
      if (hasOcorrencia >= 0) {
        const oldQtd = currentTable!.tableItens[hasOcorrencia].qtd;
        const tabUpdated = {
          ...currentTable,
          tableItens: currentTable!.tableItens.map((tab, index) =>
            index === hasOcorrencia
              ? {
                  ...tab,
                  qtd: oldQtd + comandaItem!.qtd,
                }
              : tab
          ),
        };
        try {
          const res = await TabsService.updateTabs({
            ...tabUpdated,
            col: "company",
            subcol: "tabs",
          });
          if (res.status) {
            message.success("Item atualizado com sucesso.");
          } else {
            message.error("Verifique os campos e tente novamente");
          }
          //atualizar a página após then do update ou do add.
          setCurrentTable(undefined);
          setReFetch(Math.random());
          handleCloseTableAddItem();
        } catch (error) {
          console.log(error);
          message.error("Verifique os campos e tente novamente");
        }
      } else {
        console.log(currentTable!.tableItens, comandaItem);
        const { qtd, lbl, price } = comandaItem!;
        const newItens = [{ qtd, lbl, price }, ...currentTable!.tableItens];
        const tab = { ...currentTable, tableItens: newItens };
        try {
          const res = await TabsService.updateTabs({
            ...tab,
            col: "company",
            subcol: "tabs",
          });
          if (res.status) {
            message.success("Item adicionado com sucesso.");
          } else {
            message.error("Verifique os campos e tente novamente");
          }
          //atualizar a página após then do update ou do add.
          setCurrentTable(undefined);
          setReFetch(Math.random());
          handleCloseTableAddItem();
        } catch (error) {
          console.log(error);
          message.error("Verifique os campos e tente novamente");
        }
      }
    }
    if (isUpdateOrInsert === "Update") {
      message.success("Item adicionado com sucesso.");

      const hasOcorrencia: number = currentTable!.tableItens.findIndex(
        (item) => item.lbl === comandaItem?.lbl
      );

      const oldQtd = currentTable!.tableItens[hasOcorrencia].qtd;
      const tabUpdated = {
        ...currentTable,
        tableItens: currentTable!.tableItens.map((tab, index) =>
          index === hasOcorrencia
            ? {
                ...tab,
                qtd: oldQtd + comandaItem!.qtd,
              }
            : tab
        ),
      };
      try {
        const res = await TabsService.updateTabs({
          ...tabUpdated,
          col: "company",
          subcol: "tabs",
        });
        if (res.status) {
          message.success("Item atualizado com sucesso.");
        } else {
          message.error("Verifique os campos e tente novamente");
        }
        //atualizar a página após then do update ou do add.
        setCurrentTable(undefined);
        setReFetch(Math.random());
        handleCloseTableAddItem();
      } catch (error) {
        console.log(error);
        message.error("Verifique os campos e tente novamente");
      }
    }
  };

  const fetchFoods = async () => {
    console.log("adiantou?");

    if (foods) {
      return foods;
    } else {
      try {
        const foodsRes = await FoodsService.getMyFoods(user!.codCompany!);
        if (foodsRes) {
          setFoods(foodsRes as TProducts[]);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const closeComanda = async () => {
    console.log(currentTable);

    message.success("Comanda fechada com sucesso.");
    handleCloseTableConfirm();
    handleCloseTableClose();
    setCurrentTable(undefined);
  };

  const parseValue = () => {
    if (tables) {
      const tab = tables
        .filter((table) => table.tableLbl === currentTable?.tableLbl)[0]
        .tableItens.map((tableItem) => {
          return tableItem;
        });
      //TUTORIAL DE REDUCE
      //Total é uma variável acumuladora que será retornada ao final de percorrer o array, tipo o prevstate...
      //O 0 é o valor inicial da variavél acumuladora.
      //qtd, price são as chaves do objeto que estão sendo acessadas de dentro do array
      //total (variavél acumuladora) está recebendo o valor da multiplicação de price * qtd
      //nesse caso o total já tem o valor atualizado sempre  que é executado, não precisando atribuir o seu valor a ele mesmo
      //evitando ter que criar uma variavel extra apenas para controlar. Exemplo: total += qtd * price;
      const calcularValorTotal = tab.reduce(
        (total, { qtd, price }) => total + qtd * parseFloat(price),
        0
      );
      return calcularValorTotal.toFixed(2);
    }
  };

  //REGRAS:
  //1 - Ao abrir o menu das comandas, todas as mesas devem estar atualizadas.

  return (
    <>
      <Header />
      <Styled.MainDiv>
        <Styled.MainRowDiv>
          <Styled.PlusContainer
            onClick={() => {
              setModal(true);
            }}
          >
            <Styled.PlusSpan style={{ marginTop: "1vh", marginBottom: "0vh" }}>
              +
            </Styled.PlusSpan>
          </Styled.PlusContainer>
          <Styled.TablesContainer>
            <Styled.TablesContainerAux>
              {tablesToBeRender}
            </Styled.TablesContainerAux>
          </Styled.TablesContainer>
        </Styled.MainRowDiv>
        <Styled.MainColDiv>
          <Styled.TablesContainer
            style={{
              marginLeft: "1vw",
              marginTop: "3vh",
              justifyContent: "flex-start",
              width: isMobile() ? "100%" : "93%",
            }}
          >
            <Styled.Title>últimas 10 comandas fechadas</Styled.Title>
          </Styled.TablesContainer>
          <Styled.AllContainer>
            <Styled.AllSpan>Todas as comandas</Styled.AllSpan>
          </Styled.AllContainer>
        </Styled.MainColDiv>
      </Styled.MainDiv>
      {modal && (
        <Modal
          customWidth={isMobile() ? 90 : 60}
          bannerColor={theme.colors.blue.palete}
          title="Adicionar nova comanda"
          handleClose={handleClose}
          titleFont={theme.fonts.primary}
        >
          <>
            <Styled.FormItemContainer
              style={{
                width: "100%",
                marginLeft: "0px",
                marginRight: "0px",
              }}
            >
              <Input
                setValue={setTableName}
                labelColor={theme.colors.blue.palete}
                label="Nome para comanda: "
              />
              <Input
                setValue={setTableNumber}
                labelColor={theme.colors.blue.palete}
                label="Número da mesa: "
              />
            </Styled.FormItemContainer>
            <Styled.BtnContainer
              style={{
                justifyContent: "center",
                marginBottom: "2vh",
              }}
            >
              <ButtonSecondary
                action={addNewTable}
                Label={"finalizar"}
                fontSize={theme.fontSize.md}
                color={theme.colors.white.normal}
                bgColor={theme.colors.green.normal}
              />
            </Styled.BtnContainer>
          </>
        </Modal>
      )}
      {modalTable && user && (
        <Modal
          customWidth={isMobile() ? 90 : 60}
          bannerColor={theme.colors.blue.palete}
          title={"Mesa: " + currentTable?.tableLbl}
          handleClose={handleCloseTable}
          titleFont={theme.fonts.primary}
        >
          <>
            <Styled.BtnContainer
              style={{
                justifyContent: "center",
                marginBottom: "2vh",
              }}
            >
              <ButtonSecondary
                action={addTable}
                Label={"Adicionar"}
                fontSize={theme.fontSize.lg}
                color={theme.colors.white.normal}
                bgColor={theme.colors.green.normal}
              />
            </Styled.BtnContainer>
            <Styled.BtnContainer
              style={{
                justifyContent: "center",
                marginBottom: "4vh",
                marginTop: "3vh",
              }}
            >
              <ButtonSecondary
                action={updateTable}
                Label={"Atualizar"}
                fontSize={theme.fontSize.lg}
                color={theme.colors.white.normal}
                bgColor={theme.colors.yellow.palete}
              />
            </Styled.BtnContainer>
            <Styled.BtnContainer
              style={{
                justifyContent: "center",
                marginBottom: "4vh",
                marginTop: "3vh",
              }}
            >
              <ButtonSecondary
                action={consultTable}
                Label={"Consultar"}
                fontSize={theme.fontSize.lg}
                color={theme.colors.white.normal}
                bgColor={theme.colors.blue.palete}
              />
            </Styled.BtnContainer>
            {user.userType === "admin" && (
              <Styled.BtnContainer
                style={{
                  justifyContent: "center",
                  marginBottom: "4vh",
                  marginTop: "3vh",
                }}
              >
                <ButtonSecondary
                  action={closeTable}
                  Label={"Fechar comanda"}
                  fontSize={theme.fontSize.lg}
                  color={theme.colors.white.normal}
                  bgColor={theme.colors.red.normal}
                />
              </Styled.BtnContainer>
            )}
          </>
        </Modal>
      )}
      {modalTableAdd && (
        <Modal
          customWidth={isMobile() ? 90 : 60}
          bannerColor={theme.colors.blue.palete}
          title={"Categoria, mesa " + currentTable?.tableLbl}
          handleClose={handleCloseTableAdd}
          titleFont={theme.fonts.primary}
        >
          <Styled.CategoriesContainer>
            <Styled.CategoriesContainerAux>
              {categories.map((cateItem, index) => (
                <Styled.CategoriaLinha
                  onClick={() => {
                    //setCounterStates([]);
                    handleCloseTableAdd();
                    setFoodCategory(cateItem.title);
                    setModalTableAddItem(true);
                  }}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <Styled.CategoriaLinhaImg
                    src={cateItem.icon}
                    style={{
                      filter: `brightness(1000%) grayscale(100%) 
                        opacity(0.1)
                        drop-shadow(0 0 0 white) 
                        drop-shadow(0 0 0 white)
                        drop-shadow(0 0 0 white)
                        drop-shadow(0 0 0 white)
                        drop-shadow(0 0 0 white)`,
                    }}
                  />
                  <Styled.CategoriaLinhaSpan>
                    {cateItem.title}
                  </Styled.CategoriaLinhaSpan>
                </Styled.CategoriaLinha>
              ))}
            </Styled.CategoriesContainerAux>
          </Styled.CategoriesContainer>
        </Modal>
      )}
      {modalTableAddItem && (
        <Modal
          customWidth={isMobile() ? 90 : 60}
          bannerColor={theme.colors.blue.palete}
          title={foodCategory + ", mesa " + currentTable?.tableLbl}
          handleClose={handleCloseTableAddItem}
          titleFont={theme.fonts.primary}
        >
          <Styled.CategoriesContainer>
            <Styled.CategoriesContainerAux>
              {foodCategory &&
                foods &&
                foods
                  .filter((cate) => cate.category === foodCategory)
                  .map((foodItem, index) => (
                    <Styled.FoodItem>
                      <Styled.CategoriaLinha
                        onClick={() => {}}
                        style={{ margin: "1vh", placeContent: "center" }}
                      >
                        <Styled.CategoriaLinhaSpan
                          style={{
                            fontSize:
                              foodItem.label.length <= 25
                                ? theme.fontSize.lg
                                : theme.fontSize.md,
                            marginLeft: "0px",
                          }}
                        >
                          {foodItem.label}
                        </Styled.CategoriaLinhaSpan>
                      </Styled.CategoriaLinha>
                      <Styled.CounterRow>
                        <Styled.CounterBtn
                          onClick={() => {
                            handleConterChange(index.toString(), false);
                          }}
                          style={{
                            marginRight: "4vh",
                          }}
                        >
                          -
                        </Styled.CounterBtn>
                        <Styled.CounterSpan>
                          {conterStates &&
                          conterStates[index] &&
                          conterStates[index].counter
                            ? conterStates[index].counter
                            : 1}
                        </Styled.CounterSpan>
                        <Styled.CounterBtn
                          onClick={() => {
                            handleConterChange(index.toString(), true);
                          }}
                          style={{
                            marginLeft: "4vh",
                          }}
                        >
                          +
                        </Styled.CounterBtn>
                      </Styled.CounterRow>
                      <Styled.AddBtnContainer>
                        <ButtonSecondary
                          action={() => {
                            setIsUpdateOrInsert("Add");
                            setComandaItem({
                              lbl: foodItem.label,
                              qtd: conterStates[index].counter,
                              price: foodItem.isOffer
                                ? foodItem.offerPrice!
                                : foodItem.price,
                            });
                            setModalTableConfirm(true);
                          }}
                          Label={"Adicionar"}
                          fontSize={theme.fontSize.md}
                          color={theme.colors.white.normal}
                          bgColor={theme.colors.green.normal}
                        />
                      </Styled.AddBtnContainer>
                    </Styled.FoodItem>
                  ))}
            </Styled.CategoriesContainerAux>
          </Styled.CategoriesContainer>
        </Modal>
      )}
      {modalTableConfirm && (
        <Modal
          bannerColor={theme.colors.blue.palete}
          title={"Atenção!"}
          handleClose={handleCloseTableConfirm}
          titleFont={theme.fonts.primary}
          customWidth={isMobile() ? 90 : 60}
        >
          <>
            <Styled.ConfirmationModal>
              Deseja adicionar {comandaItem?.qtd} {comandaItem?.lbl} a comanda
              da mesa {currentTable?.tableLbl}?
            </Styled.ConfirmationModal>
            <Styled.BtnContainer
              style={{
                marginTop: "0px",
                paddingTop: "0px",
                justifyContent: "center",
                marginBottom: "2vh",
              }}
            >
              <ButtonSecondary
                action={() => {
                  addToComanda();
                }}
                Label={"Confirmar"}
                fontSize={theme.fontSize.md}
                color={theme.colors.white.normal}
                bgColor={theme.colors.green.normal}
              />
              <div
                style={{
                  marginRight: isMobile() ? "0px" : "12vw",
                  marginTop: isMobile() ? "2vh" : "0px",
                }}
              >
                <ButtonSecondary
                  action={() => {
                    message.error("Ação cancelada.");
                    handleCloseTableConfirm();
                  }}
                  Label="Cancelar"
                  fontSize={theme.fontSize.md}
                  color={theme.colors.white.normal}
                  bgColor={theme.colors.red.normal}
                />
              </div>
            </Styled.BtnContainer>
          </>
        </Modal>
      )}
      {modalTableClose && (
        <>
          <Modal
            bannerColor={theme.colors.red.normal}
            title={"Atenção!"}
            handleClose={handleCloseTableClose}
            titleFont={theme.fonts.primary}
            customWidth={isMobile() ? 90 : 60}
          >
            <>
              <Styled.ConfirmationModal>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <p
                    style={{
                      textAlignLast: "center",
                      fontSize: theme.fontSize.md,
                    }}
                  >
                    Deseja fechar a comanda da mesa {currentTable?.tableLbl}?
                  </p>
                </div>
              </Styled.ConfirmationModal>
              <Styled.BtnContainer
                style={{
                  marginTop: "0px",
                  paddingTop: "0px",
                  justifyContent: "center",
                  marginBottom: "2vh",
                }}
              >
                <ButtonSecondary
                  action={() => {
                    closeComanda();
                  }}
                  Label={"Confirmar"}
                  fontSize={theme.fontSize.md}
                  color={theme.colors.white.normal}
                  bgColor={theme.colors.green.normal}
                />
                <div
                  style={{
                    marginRight: isMobile() ? "0px" : "12vw",
                    marginTop: isMobile() ? "2vh" : "0px",
                  }}
                >
                  <ButtonSecondary
                    action={() => {
                      message.error("Ação cancelada.");
                      handleCloseTableConfirm();
                      handleCloseTableClose();
                    }}
                    Label="Cancelar"
                    fontSize={theme.fontSize.md}
                    color={theme.colors.white.normal}
                    bgColor={theme.colors.red.normal}
                  />
                </div>
              </Styled.BtnContainer>
            </>
          </Modal>
        </>
      )}
      {modalTableCheck && (
        <Modal
          customWidth={isMobile() ? 90 : 60}
          bannerColor={theme.colors.blue.palete}
          title={
            currentTable?.custumerName + ", mesa " + currentTable?.tableLbl
          }
          handleClose={handleCloseTableCheck}
          titleFont={theme.fonts.primary}
          footerLabel="Valor total: "
          footerMaior={parseValue()}
          money={true}
        >
          <Styled.CategoriesContainer>
            <Styled.CategoriesContainerAux
              style={{
                width: "100%",
              }}
            >
              {tables &&
                tables
                  .filter(
                    (table) => table.tableLbl === currentTable?.tableLbl
                  )[0]
                  .tableItens.map((tableItem, index) => (
                    <Styled.CategoriaLinha
                      onClick={() => {}}
                      style={{
                        justifyContent: "space-between",
                        marginInline: "2vw",
                      }}
                    >
                      <Styled.CategoriaLinhaSpan
                        style={{
                          fontSize: theme.fontSize.md2,
                          marginLeft: "1vw",
                          padding: "1vh",
                        }}
                      >
                        Item: {tableItem.lbl}.
                      </Styled.CategoriaLinhaSpan>
                      <Styled.CategoriaLinhaSpan
                        style={{
                          fontSize: theme.fontSize.md2,
                          marginLeft: "1vw",
                          padding: "1vh",
                        }}
                      >
                        QTD: {tableItem.qtd}
                      </Styled.CategoriaLinhaSpan>
                    </Styled.CategoriaLinha>
                  ))}
            </Styled.CategoriesContainerAux>
          </Styled.CategoriesContainer>
        </Modal>
      )}
      {modalTableUpdate && (
        <Modal
          customWidth={isMobile() ? 90 : 60}
          bannerColor={theme.colors.blue.palete}
          title={
            currentTable?.custumerName + ", mesa " + currentTable?.tableLbl
          }
          handleClose={handleCloseTableUpdate}
          titleFont={theme.fonts.primary}
        >
          <Styled.CategoriesContainer>
            <Styled.CategoriesContainerAux>
              {tables &&
                tables
                  .filter(
                    (table) => table.tableLbl === currentTable?.tableLbl
                  )[0]
                  .tableItens.map((tableItem, index) => (
                    <>
                      <Styled.FoodItem>
                        <Styled.CategoriaLinha
                          onClick={() => {}}
                          style={{
                            justifyContent: "space-between",
                          }}
                        >
                          <Styled.CategoriaLinhaSpan
                            style={{
                              fontSize: theme.fontSize.md2,
                              marginLeft: "1vw",
                              padding: "1vh",
                            }}
                          >
                            Item: {tableItem.lbl}.
                          </Styled.CategoriaLinhaSpan>
                          <Styled.CategoriaLinhaSpan
                            style={{
                              fontSize: theme.fontSize.md2,
                              marginLeft: "1vw",
                              padding: "1vh",
                            }}
                          >
                            QTD: {tableItem.qtd}
                          </Styled.CategoriaLinhaSpan>
                        </Styled.CategoriaLinha>
                        <Styled.CounterRow
                          style={{
                            marginTop: "1vh",
                          }}
                        >
                          <Styled.CounterSpan>
                            {conterStates &&
                            conterStates[index] &&
                            conterStates[index].counter
                              ? conterStates[index].counter
                              : 1}
                          </Styled.CounterSpan>
                          <Styled.CounterBtn
                            onClick={() => {
                              handleConterChange(index.toString(), true);
                            }}
                            style={{
                              marginLeft: "4vh",
                            }}
                          >
                            +
                          </Styled.CounterBtn>
                        </Styled.CounterRow>
                        <Styled.AddBtnContainer>
                          <ButtonSecondary
                            action={() => {
                              setIsUpdateOrInsert("Update");
                              setModalTableUpdate(false);
                              setComandaItem({
                                lbl: tableItem.lbl,
                                qtd: conterStates[index].counter,
                                price: tableItem.price,
                              });
                              setModalTableAddItem(false);
                              setModalTableConfirm(true);
                              handleCloseTableAdd();
                            }}
                            Label={"Adicionar"}
                            fontSize={theme.fontSize.md}
                            color={theme.colors.white.normal}
                            bgColor={theme.colors.green.normal}
                          />
                        </Styled.AddBtnContainer>
                      </Styled.FoodItem>
                    </>
                  ))}
            </Styled.CategoriesContainerAux>
          </Styled.CategoriesContainer>
        </Modal>
      )}
      <Footer />
    </>
  );
};
export default Comanda;
