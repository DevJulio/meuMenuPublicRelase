import food from "../../../../assets/icons/food.png";
import drink from "../../../../assets/icons/drink.png";

import categorias from "../../../../assets/icons/admIcons/categorias.png";

import cerveja from "../../../../assets/icons/categories/allCategories/cerveja.png";
import refrigerante from "../../../../assets/icons/categories/allCategories/refrigerante.png";
import energetico from "../../../../assets/icons/categories/allCategories/energetico.png";
import ice from "../../../../assets/icons/categories/allCategories/ice.png";
import drinkAux from "../../../../assets/icons/categories/allCategories/drink.png";
import vinho from "../../../../assets/icons/categories/allCategories/vinho.png";
import champanhe from "../../../../assets/icons/categories/allCategories/champanhe.png";
import milkshake from "../../../../assets/icons/categories/allCategories/milkshake.png";
import whiskey from "../../../../assets/icons/categories/allCategories/whiskey.png";
import dose from "../../../../assets/icons/categories/allCategories/dose.png";
import suco from "../../../../assets/icons/categories/allCategories/suco.png";
import agua from "../../../../assets/icons/categories/allCategories/agua.png";
import cafe from "../../../../assets/icons/categories/allCategories/cafe.png";
import cha from "../../../../assets/icons/categories/allCategories/cha.png";
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
];

export const drinkCategories = [
  {
    icon: cerveja,
    title: "Cervejas",
    text: "Cervejas geladas, por favor.",
    mainColor: theme.colors.red.normal,
    auxColor: "white",
    textColor: "white",
    customWidth: true,
  },
  {
    icon: refrigerante,
    title: "Refrigerantes",
    text: "Refrigerantes para dias quentes",
    mainColor: theme.colors.yellow.palete,
    auxColor: "",
    textColor: "black",
    customWidth: true,
  },
  {
    icon: suco,
    title: "Sucos",
    text: "Naturais e frescos",
    mainColor: theme.colors.blue.palete,
    auxColor: theme.colors.white.normal,
    textColor: theme.colors.white.normal,
    customWidth: true,
  },
  {
    icon: drinkAux,
    title: "Drinks",
    text: "Combinações, cores e sabores.",
    mainColor: theme.colors.white.normal,
    auxColor: theme.colors.red.normal,
    textColor: theme.colors.blue.palete,
    customWidth: true,
  },
  {
    icon: vinho,
    title: "Vinhos",
    text: "Qual é o rótulo?",
    mainColor: theme.colors.blue.palete,
    auxColor: theme.colors.red.normal,
    textColor: theme.colors.white.normal,
    customWidth: true,
  },
  {
    icon: champanhe,
    title: "champagne/Espumantes",
    text: "Ideal para comemorar!",
    mainColor: theme.colors.yellow.palete,
    auxColor: theme.colors.white.normal,
    textColor: theme.colors.black.normal,
    customWidth: true,
  },
  {
    icon: milkshake,
    title: "Cremes/Milkshakes",
    text: "Doce & Gelado",
    mainColor: theme.colors.red.normal,
    auxColor: "",
    textColor: theme.colors.white.normal,
    customWidth: true,
  },
  {
    icon: whiskey,
    title: "Whiskey/Licor",
    text: "Cowboy ou com Gelo?",
    mainColor: theme.colors.white.normal,
    auxColor: theme.colors.blue.palete,
    textColor: theme.colors.black.normal,
    customWidth: true,
  },
  {
    icon: dose,
    title: "Doses",
    text: "Dupla, por favor!",
    mainColor: theme.colors.blue.palete,
    auxColor: theme.colors.yellow.palete,
    textColor: theme.colors.red.normal,
    customWidth: true,
  },

  {
    icon: cafe,
    title: "Cafés",
    text: "Cafés, expressos, capuccinos..",
    mainColor: theme.colors.yellow.palete,
    auxColor: "",
    textColor: "black",
    customWidth: true,
  },
  {
    icon: cha,
    title: "Chá",
    text: "Gelado ou quente?",
    mainColor: theme.colors.blue.palete,
    auxColor: theme.colors.white.normal,
    textColor: theme.colors.white.normal,
    customWidth: true,
  },
  {
    icon: agua,
    title: "Água",
    text: "Gelada.",
    mainColor: theme.colors.red.normal,
    auxColor: "white",
    textColor: "white",
    customWidth: true,
  },
  {
    icon: energetico,
    title: "Energético",
    text: "Aquele up",
    mainColor: theme.colors.blue.palete,
    auxColor: theme.colors.white.normal,
    textColor: theme.colors.white.normal,
    customWidth: true,
  },
  {
    icon: ice,
    title: "Ice",
    text: "Bem doces.",
    mainColor: theme.colors.yellow.palete,
    auxColor: "",
    textColor: "black",
    customWidth: true,
  },
  {
    icon: categorias, //11 <===========
    title: "Nova categoria",
    text: "Crie uma nova categoria",
    mainColor: theme.colors.white.normal,
    auxColor: theme.colors.blue.palete,
    textColor: theme.colors.blue.palete,
    customWidth: true,
  },
];
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  mainCategories,
  drinkCategories,
};
