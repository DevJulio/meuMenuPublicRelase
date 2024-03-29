import { TCardProps } from "../../../components/plansCards/card";
import { theme } from "../../../theme/theme";
import create from "../../../assets/icons/admIcons/create.png";
import ofertasBlue from "../../../assets/icons/admIcons/ofertasBlue.png";
import precoCombo from "../../../assets/icons/admIcons/precoCombo.png";
import preco from "../../../assets/icons/admIcons/preco.png";
import combo from "../../../assets/icons/admIcons/combo.png";

export const mainAdmCategories: TCardProps[] = [
  {
    icon: ofertasBlue,
    title: "Minhas Ofertas",
    text: "Visualizar, editar, desativar...",
    mainColor: theme.colors.white.normal,
    auxColor: theme.colors.blue.palete,
    textColor: "black",
    customWidth: true,
  },

  {
    icon: create,
    title: "Criar nova Oferta",
    text: "Crie ofertas personalizadas.",
    mainColor: theme.colors.yellow.palete,
    auxColor: theme.colors.blue.palete,
    textColor: "black",
    customWidth: true,
  },
  {
    icon: precoCombo,
    title: "Automatização das ofertas",
    text: "Automatize e defina peridos e dias das suas ofertas!",
    mainColor: theme.colors.blue.palete,
    auxColor: theme.colors.white.normal,
    textColor: theme.colors.white.normal,
    customWidth: true,
    url: "/adm/ofertas/automacao",
  },
];

export const offerCategories: TCardProps[] = [
  {
    icon: preco,
    title: "Preço",
    text: "Oferta com alteração de preço de item",
    mainColor: theme.colors.white.normal,
    auxColor: theme.colors.blue.palete,
    textColor: "black",
    customWidth: true,
    url: "/adm/ofertas/preco",
  },
  {
    icon: combo,
    title: "Combos",
    text: "Crie ofertas combinando produtos.",
    mainColor: theme.colors.yellow.palete,
    auxColor: theme.colors.blue.palete,
    textColor: "black",
    customWidth: true,
    url: "/adm/ofertas/combo",
  },
  {
    icon: precoCombo,
    title: "Automatização das ofertas",
    text: "Automatize e defina peridos e dias das suas ofertas!",
    mainColor: theme.colors.blue.palete,
    auxColor: theme.colors.white.normal,
    textColor: theme.colors.white.normal,
    customWidth: true,
    url: "/adm/ofertas/automacao",
  },
];
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  mainAdmCategories,
  offerCategories,
};