import { TCardProps } from "../../../../components/plansCards/card";
import { theme } from "../../../../theme/theme";

import cardapio from "../../../../assets/icons/admIcons/cardapio.png";
import destaque from "../../../../assets/icons/admIcons/destaque.png";
import ofertas from "../../../../assets/icons/admIcons/ofertas.png";
import atualizar from "../../../../assets/icons/admIcons/atualizar.png";
import comanda from "../../../../assets/icons/admIcons/comanda.png";
import info from "../../../../assets/icons/admIcons/info.png";
import estatisticas from "../../../../assets/icons/admIcons/estatisticas.png";
import equipe from "../../../../assets/icons/admIcons/equipe.png";
import outro from "../../../../assets/icons/categories/allCategories/outro.png";


export const mainAdmCategories: TCardProps[] = [
    {
        icon: cardapio,
        title: "Meu cardápio",
        text: "Visualizar, editar, criar, desativar...",
        mainColor: theme.colors.white.normal,
        auxColor: theme.colors.red.normal,
        textColor: "black",
        customWidth: true,
        url: "/adm/cardapio"
    },

    {
        icon: ofertas,
        title: "Ofertas",
        text: "Crie ofertas personalizadas.",
        mainColor: theme.colors.yellow.palete,
        auxColor: theme.colors.blue.palete,
        textColor: "black",
        customWidth: true,
        url: "/adm/ofertas"
    },
    {
        icon: destaque,
        title: "Destaques",
        text: "Defina quais são os destaques por categoria.",
        mainColor: theme.colors.blue.palete,
        auxColor: theme.colors.white.normal,
        textColor: theme.colors.white.normal,
        customWidth: true,
        url: "/adm/destaques"
    },
    {
        icon: atualizar,
        title: "Atualizar Dados",
        text: "Altere o banner, textos, Happy Hour / Reservas, redes sociais...",
        mainColor: theme.colors.blue.palete,
        auxColor: theme.colors.red.normal,
        textColor: theme.colors.white.normal,
        customWidth: true,
        url: "/adm/atualizar"
    },
    {
        icon: comanda,
        title: "Comanda digital",
        text: "Crie, atualize e consulte",
        mainColor: theme.colors.white.normal,
        auxColor: theme.colors.red.normal,
        textColor: "black",
        customWidth: true,
        url: "/adm/comanda"
    },
    {
        icon: info,
        title: "Suporte",
        text: "Dúvidas, informações..",
        mainColor: theme.colors.yellow.palete,
        auxColor: theme.colors.blue.palete,
        textColor: "black",
        customWidth: true,
        url: "/adm/suporte"
    },
    {
        icon: estatisticas,
        title: "estatisticas",
        text: "Acompanhe suas vendas.",
        mainColor: theme.colors.yellow.palete,
        auxColor: theme.colors.blue.palete,
        textColor: "black",
        customWidth: true,
        url: "/adm/ofertas"
    },
    {
        icon: equipe,
        title: "Equipe",
        text: "Atualize e gerencie sua equipe",
        mainColor: theme.colors.blue.palete,
        auxColor: theme.colors.red.normal,
        textColor: theme.colors.white.normal,
        customWidth: true,
        url: "/adm/time"
    },
    {
        icon: outro,
        title: "Em desenvolvimento",
        text: "Em breve, novidades!",
        mainColor: theme.colors.white.normal,
        auxColor: theme.colors.red.normal,
        textColor: "black",
        customWidth: true,
        url: "/home"
    },

];
// eslint-disable-next-line import/no-anonymous-default-export
export default {
    mainAdmCategories,
}