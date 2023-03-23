import food from "../../../assets/icons/food.png";
import drink from "../../../assets/icons/drink.png";

import hamburguer from "../../../assets/icons/categories/allCategories/hamburguer.png";
import pizza from "../../../assets/icons/categories/allCategories/pizza.png";
import batata from "../../../assets/icons/categories/allCategories/batata.png";
import italiana from "../../../assets/icons/categories/allCategories/italiana.png";
import saudavel from "../../../assets/icons/categories/allCategories/saudavel.png";
import carne from "../../../assets/icons/categories/allCategories/carne.png";
import pastel from "../../../assets/icons/categories/allCategories/pastel.png";
import japonesa from "../../../assets/icons/categories/allCategories/japonesa.png";
import bolos from "../../../assets/icons/categories/allCategories/bolos.png";
import vegetariana from "../../../assets/icons/categories/allCategories/vegetariana.png";
import churrasco from "../../../assets/icons/categories/allCategories/churrasco.png";
import outro from "../../../assets/icons/categories/allCategories/outro.png";
import { TCardProps } from "../../../components/plansCards/card";
import { theme } from "../../../theme/theme";

export const mainCategories = [
    {
        icon: food,
        title: "Para comer",
        text: "O Melhor da sua cozinha",
        mainColor: theme.colors.red.normal,
        auxColor: "white",
        textColor: "white",
        customWidth: true,
    },
    {
        icon: drink,
        title: "para beber",
        text: "O melhor da sua adega",
        mainColor: theme.colors.yellow.palete,
        auxColor: "",
        textColor: "black",
        customWidth: true,
    },
];

export const foodCategories: TCardProps[] = [
    {
        icon: hamburguer, //0
        title: "Hamburguer",
        text: "O favorito de muitos!",
        mainColor: theme.colors.red.normal,
        auxColor: "white",
        textColor: "white",
        customWidth: true,
    },

    {
        icon: pizza, //1
        title: "Pizza",
        text: "Clássico italiano delicioso.",
        mainColor: theme.colors.yellow.palete,
        auxColor: "",
        textColor: "black",
        customWidth: true,
    },
    {
        icon: batata, //2
        title: "Porções",
        text: "Para compartilhar!",
        mainColor: theme.colors.blue.palete,
        auxColor: theme.colors.white.normal,
        textColor: theme.colors.white.normal,
        customWidth: true,
    },
    {
        icon: italiana, //3 <=========
        title: "Italiana",
        text: "Massas, Lasanhas, antepastos.",
        mainColor: theme.colors.white.normal,
        auxColor: theme.colors.red.normal,
        textColor: theme.colors.blue.palete,
        customWidth: true,
    },
    {
        icon: saudavel, //4
        title: "Saudável",
        text: " Equilíbrio e sabor.",
        mainColor: theme.colors.blue.palete,
        auxColor: theme.colors.red.normal,
        textColor: theme.colors.white.normal,
        customWidth: true,
    },
    {
        icon: carne, //5
        title: "Carnes",
        text: "Carnes, peixes e frango!",
        mainColor: theme.colors.yellow.palete,
        auxColor: theme.colors.white.normal,
        textColor: theme.colors.black.normal,
        customWidth: true,
    },
    {
        icon: pastel, //6
        title: "Salgados",
        text: "Lanches rápidos deliciosos.",
        mainColor: theme.colors.red.normal,
        auxColor: "",
        textColor: theme.colors.white.normal,
        customWidth: true,
    },
    {
        icon: japonesa, //7<=====
        title: "Japonesa",
        text: "Sushi, sashimi, temaki...",
        mainColor: theme.colors.white.normal,
        auxColor: theme.colors.blue.palete,
        textColor: theme.colors.black.normal,
        customWidth: true,
    },
    {
        icon: bolos, //8
        title: "Doces e Bolos",
        text: "Sobremesas irresistíveis.",
        mainColor: theme.colors.blue.palete,
        auxColor: theme.colors.yellow.palete,
        textColor: theme.colors.red.normal,
        customWidth: true,
    },
    {
        icon: vegetariana, //9
        title: "Vegetariana",
        text: "Opções sem carne.",
        mainColor: theme.colors.blue.palete,
        auxColor: "white",
        textColor: "white",
        customWidth: true,
    },
    {
        icon: churrasco, //10
        title: "Churrasco",
        text: "Sabor e calor",
        mainColor: theme.colors.yellow.palete,
        auxColor: theme.colors.blue.palete,
        textColor: theme.colors.blue.palete,
        customWidth: true,
    },
    {
        icon: outro, //11 <===========
        title: "Outra..",
        text: "Crie uma nova categoria",
        mainColor: theme.colors.white.normal,
        auxColor: theme.colors.blue.palete,
        textColor: theme.colors.blue.palete,
        customWidth: true,
    },
];

export const drinkCategories = [
    {
        icon: hamburguer,
        title: "Cervejas",
        text: "Cervejas geladas, por favor.",
        mainColor: theme.colors.red.normal,
        auxColor: "white",
        textColor: "white",
        customWidth: true,
    },
    {
        icon: hamburguer,
        title: "Refrigerantes",
        text: "Refrigerantes para dias quentes",
        mainColor: theme.colors.red.normal,
        auxColor: "white",
        textColor: "white",
        customWidth: true,
    },
    {
        icon: hamburguer,
        title: "Sucos",
        text: "Naturais e frescos",
        mainColor: theme.colors.red.normal,
        auxColor: "white",
        textColor: "white",
        customWidth: true,
    },
    {
        icon: hamburguer,
        title: "Drinks",
        text: "O favorito de muitos!",
        mainColor: theme.colors.red.normal,
        auxColor: "white",
        textColor: "white",
        customWidth: true,
    },
    {
        icon: hamburguer,
        title: "Vinhos",
        text: "O favorito de muitos!",
        mainColor: theme.colors.red.normal,
        auxColor: "white",
        textColor: "white",
        customWidth: true,
    },
    {
        icon: hamburguer,
        title: "champagne/Espumantes",
        text: "O favorito de muitos!",
        mainColor: theme.colors.red.normal,
        auxColor: "white",
        textColor: "white",
        customWidth: true,
    },
    {
        icon: hamburguer,
        title: "Cremes",
        text: "O favorito de muitos!",
        mainColor: theme.colors.red.normal,
        auxColor: "white",
        textColor: "white",
        customWidth: true,
    },
    {
        icon: hamburguer,
        title: "Whiskey/Licor",
        text: "O favorito de muitos!",
        mainColor: theme.colors.red.normal,
        auxColor: "white",
        textColor: "white",
        customWidth: true,
    },
    {
        icon: hamburguer,
        title: "Doses",
        text: "O favorito de muitos!",
        mainColor: theme.colors.red.normal,
        auxColor: "white",
        textColor: "white",
        customWidth: true,
    },
];
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    mainCategories,
    foodCategories,
    drinkCategories
}