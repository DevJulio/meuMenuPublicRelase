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
import foods, { renCategories } from "../../../menu/foods";
import { ICategory } from "../../../../components/category";
import { TCounter } from "../../keepOffersCombo";
import { message } from "antd";

export type TTable = {
  // docId: string;
  tableLbl: string;
  custumerName: string;
  tableItens: TComandaItem[];
  isOpen: boolean; //só exibir as que possuem true
};

export type TComandaItem = {
  qtd: number;
  lbl: string;
  itemId?: string;
};

const Comanda: React.FC = () => {
  const tables: TTable[] = [
    {
      tableLbl: "1",
      isOpen: true,
      custumerName: "Sophia",
      tableItens: [
        { lbl: "Mimosa", qtd: 3 },
        { lbl: "Torta de limão", qtd: 10 },
      ],
    },
    {
      tableLbl: "2",
      isOpen: true,
      custumerName: "Gabriel",
      tableItens: [{ lbl: "Salada Caprese", qtd: 10 }],
    },
    {
      tableLbl: "3",
      isOpen: true,
      custumerName: "Isabella",
      tableItens: [
        { lbl: "Croque monsieur", qtd: 2 },
        { lbl: "Croque madame", qtd: 3 },
      ],
    },
    {
      tableLbl: "4",
      isOpen: true,
      custumerName: "Lucas",
      tableItens: [{ lbl: "Dadinhos de tapioca", qtd: 4 }],
    },
    {
      tableLbl: "5",
      isOpen: true,
      custumerName: "Olivia",
      tableItens: [{ lbl: "Ceviche", qtd: 1 }],
    },
    {
      tableLbl: "6",
      isOpen: true,
      custumerName: "Miguel",
      tableItens: [{ lbl: "Antepasto de tomate", qtd: 2 }],
    },
    {
      tableLbl: "7",
      isOpen: true,
      custumerName: "Emma",
      tableItens: [{ lbl: "Pate de ricota com ervas", qtd: 1 }],
    },
    {
      tableLbl: "8",
      isOpen: true,
      custumerName: "Enzo",
      tableItens: [{ lbl: "Café preto", qtd: 15 }],
    },
  ];
  //const [tableData, setTableData] = useState();
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

  useEffect(() => {
    // window.location.reload();
    //tables chamada da api
    console.log(reFetch);

    const arrayDividido = dividirArray(tables, 3);
    setTablesToBeRender(arrayDividido);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reFetch]);

  useEffect(() => {
    const counter: TCounter[] = [];
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
  }, [foodCategory]);

  useEffect(() => {
    if (currentTable) {
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
                  width: index + 1 === arrayDividido.length ? "34%" : "50%",
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
        tableItens: [{ lbl: "", qtd: 0 }],
      };
      //api.post(/addTable, newTable)
      //fetch após adição
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

  const renIndex = renCategories.findIndex(
    (categoria) => categoria.label === "Todas"
  );

  const getArraysExceptIndex = (list: ICategory[], index: number) => {
    return list.filter((_, i) => i !== index);
  };

  const parsedRenCategories = getArraysExceptIndex(renCategories, renIndex);

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
      message.success("Item adicionado com sucesso.");
      handleCloseTableAddItem();
      console.log(currentTable, comandaItem, isUpdateOrInsert);
    }
    if (isUpdateOrInsert === "Update") {
      message.success("Item adicionado com sucesso.");
      console.log(currentTable, comandaItem, isUpdateOrInsert);
    }
    //atualizar a página após then do update ou do add.
    setReFetch(Math.random());
  };
  const closeComanda = async () => {
    message.success("Comanda fechada com sucesso.");
    handleCloseTableConfirm();
    handleCloseTableClose();
    console.log(currentTable, comandaItem);
  };

  //REGRAS:
  //1 - Ao abrir o menu das comandas, todas as mesas devem estar atualizadas.

  return (
    <>
      <Header />
      {modal && (
        <Modal
          customWidth={isMobile() ? 90 : 60}
          bannerColor={theme.colors.blue.palete}
          title="Adicionar nova comanda"
          handleClose={handleClose}
          titleFont={theme.fonts.primary}
        >
          <>
            <Styled.FormItemContainer>
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
      {modalTable && (
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
              {parsedRenCategories.map((cateItem, index) => (
                <Styled.CategoriaLinha
                  onClick={() => {
                    //setCounterStates([]);
                    handleCloseTableAdd();
                    setFoodCategory(cateItem.label);
                    setModalTableAddItem(true);
                  }}
                >
                  <Styled.CategoriaLinhaImg src={cateItem.icon} />
                  <Styled.CategoriaLinhaSpan>
                    {cateItem.label}
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
          footerMaior="150,00"
          money={true}
        >
          <Styled.CategoriesContainer>
            <Styled.CategoriesContainerAux>
              {tables
                .filter((table) => table.tableLbl === currentTable?.tableLbl)[0]
                .tableItens.map((tableItem, index) => (
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
              {tables
                .filter((table) => table.tableLbl === currentTable?.tableLbl)[0]
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
      </Styled.MainDiv>
      <Footer />
    </>
  );
};
export default Comanda;
