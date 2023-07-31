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

import cerveja from "../../../assets/icons/categories/allCategories/cerveja.png";
import refrigerante from "../../../assets/icons/categories/allCategories/refrigerante.png";
import energetico from "../../../assets/icons/categories/allCategories/energetico.png";
import ice from "../../../assets/icons/categories/allCategories/ice.png";
import drinkAux from "../../../assets/icons/categories/allCategories/drink.png";
import vinho from "../../../assets/icons/categories/allCategories/vinho.png";
import champanhe from "../../../assets/icons/categories/allCategories/champanhe.png";
import milkshake from "../../../assets/icons/categories/allCategories/milkshake.png";
import whiskey from "../../../assets/icons/categories/allCategories/whiskey.png";
import dose from "../../../assets/icons/categories/allCategories/dose.png";
import suco from "../../../assets/icons/categories/allCategories/suco.png";
import agua from "../../../assets/icons/categories/allCategories/agua.png";
import cafe from "../../../assets/icons/categories/allCategories/cafe.png";
import cha from "../../../assets/icons/categories/allCategories/cha.png";
import acai from "../../../assets/icons/categories/allCategories/acai.png";
import hotdog from "../../../assets/icons/categories/allCategories/hotdog.png";
import sorvete from "../../../assets/icons/categories/allCategories/sorvete.png";




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
        icon: hotdog, //10
        title: "Cachorro Quente",
        text: "Tradicional e delicioso",
        mainColor: theme.colors.red.normal,
        auxColor: theme.colors.white.normal,
        textColor: theme.colors.white.normal,
        customWidth: true,
    }, {
        icon: acai, //10
        title: "Açaí",
        text: "Ideal para adoçar dias quentes",
        mainColor: theme.colors.white.normal,
        auxColor: theme.colors.blue.palete,
        textColor: theme.colors.blue.palete,
        customWidth: true,
    }, {
        icon: sorvete, //10
        title: "Sorvetes/Picolés",
        text: "Quem não gosta?",
        mainColor: theme.colors.blue.palete,
        auxColor: theme.colors.white.normal,
        textColor: theme.colors.white.normal,
        customWidth: true,
    },








    // {
    //     icon: hotdog, //10
    //     title: "Padaria",
    //     text: "Direto do forno",
    //     mainColor: theme.colors.red.normal,
    //     auxColor: theme.colors.white.normal,
    //     textColor: theme.colors.white.normal,
    //     customWidth: true,
    // }, {
    //     icon: churrasco, //10
    //     title: "Açaí",
    //     text: "Ideal para adoçar dias quentes",
    //     mainColor: theme.colors.white.normal,
    //     auxColor: theme.colors.blue.palete,
    //     textColor: theme.colors.blue.palete,
    //     customWidth: true,
    // }, {
    //     icon: churrasco, //10
    //     title: "Diversos",
    //     text: "Quem não gosta?",
    //     mainColor: theme.colors.blue.palete,
    //     auxColor: theme.colors.blue.palete,
    //     textColor: theme.colors.blue.palete,
    //     customWidth: true,
    // },


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
        icon: outro, //11 <===========
        title: "Outra..",
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
    foodCategories,
    drinkCategories
}