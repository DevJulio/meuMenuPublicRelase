import food from "../../../../assets/icons/food.png";
import drink from "../../../../assets/icons/drink.png";
import request from "../../../../assets/icons/request.png";

import { theme } from "../../../../theme/theme";

export const mainCategories = [
  {
    icon: food,
    title: "Para comer",
    text: "O Melhor da cozinha (dos outros)",
    mainColor: theme.colors.red.normal,
    auxColor: "white",
    textColor: "white",
    customWidth: true,
  },
  {
    icon: drink,
    title: "para beber",
    text: "O melhor da adega(dos outros)",
    mainColor: theme.colors.yellow.palete,
    auxColor: "",
    textColor: "black",
    customWidth: true,
  },
  {
    icon: request,
    title: "Solicitações",
    text: "Pedidos para criar categorias",
    mainColor: theme.colors.blue.palete,
    auxColor: theme.colors.yellow.palete,
    textColor: "white",
    customWidth: true,
  },
];

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  mainCategories,
};
