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
      custumerName: "Sophia",
      tableItens: [
        { lbl: "Mimosa", qtd: 3 },
        { lbl: "Torta de limão", qtd: 1 },
      ],
    },
    {
      tableLbl: "2",
      custumerName: "Gabriel",
      tableItens: [{ lbl: "Salada Caprese", qtd: 1 }],
    },
    {
      tableLbl: "3",
      custumerName: "Isabella",
      tableItens: [
        { lbl: "Croque monsieur", qtd: 2 },
        { lbl: "Croque madame", qtd: 3 },
      ],
    },
    {
      tableLbl: "4",
      custumerName: "Lucas",
      tableItens: [{ lbl: "Dadinhos de tapioca", qtd: 4 }],
    },
    {
      tableLbl: "5",
      custumerName: "Olivia",
      tableItens: [{ lbl: "Ceviche", qtd: 1 }],
    },
    {
      tableLbl: "6",
      custumerName: "Miguel",
      tableItens: [{ lbl: "Antepasto de tomate", qtd: 2 }],
    },
    {
      tableLbl: "7",
      custumerName: "Emma",
      tableItens: [{ lbl: "Pate de ricota com ervas", qtd: 1 }],
    },
    {
      tableLbl: "8",
      custumerName: "Enzo",
      tableItens: [{ lbl: "Café preto", qtd: 15 }],
    },
  ];
  //const [tableData, setTableData] = useState();
  const [modal, setModal] = useState<boolean>(false);
  const [modalTable, setModalTable] = useState<boolean>(false);
  const [foodCategory, setFoodCategory] = useState<string>("");

  const [modalTableAdd, setModalTableAdd] = useState<boolean>(false);
  const [modalTableAddItem, setModalTableAddItem] = useState<boolean>(false);
  const [modalTableConfirm, setModalTableConfirm] = useState<boolean>(false);

  const [modalTableClose, setModalTableClose] = useState<boolean>(false);
  const [modalTableCheck, setModalTableCheck] = useState<boolean>(false);

  const [currentTable, setCurrentTable] = useState<TTable>();
  const [conterStates, setCounterStates] = useState<TCounter[]>([]);
  const [comandaItem, setComandaItem] = useState<TComandaItem>();

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
    setModalTableAdd(true);
  };
  const handleCloseTableConfirm = () => {
    setModalTableConfirm(false);
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

  const arrayDividido = dividirArray(tables, 3);

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
    message.success("Item adicionado com sucesso.");
    handleCloseTableConfirm();
    handleCloseTableAddItem();
    console.log(currentTable, comandaItem);
  };

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
                setValue={() => {}}
                labelColor={theme.colors.blue.palete}
                label="Nome para comanda: "
              />
              <Input
                setValue={() => {}}
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
                action={addTable}
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
                action={consultTable}
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
                    setFoodCategory(cateItem.label);
                    handleCloseTableAdd();
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
                            fontSize: theme.fontSize.lg,
                            marginLeft: "0px",
                          }}
                        >
                          {foodItem.label}
                        </Styled.CategoriaLinhaSpan>
                      </Styled.CategoriaLinha>
                      <Styled.CounterRow>
                        <Styled.CounterBtn
                          onClick={() => {
                            // handleConterChange(index.toString(), false);
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
                  Deseja adicionar {comandaItem?.qtd} {comandaItem?.lbl} a
                  comanda da mesa {currentTable?.tableLbl}?
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
              {arrayDividido}
            </Styled.TablesContainerAux>
          </Styled.TablesContainer>
        </Styled.MainRowDiv>
      </Styled.MainDiv>
      <Footer />
    </>
  );
};
export default Comanda;
