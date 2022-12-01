import { TCardProps } from "../../../components/homeCard/card";
import { theme } from "../../../theme/theme";
import personalizar from "../../../assets/icons/cardsIcons/personalizar.png";
import ideia from "../../../assets/icons/cardsIcons/ideia.png";
import central from "../../../assets/icons/cardsIcons/central.png";
import visita from "../../../assets/icons/cardsIcons/visita.png";
import easy from "../../../assets/icons/cardsIcons/easy.png";
import sail from "../../../assets/icons/cardsIcons/sail.png";

const cardProps: TCardProps[] = [
  {
    icon: ideia,
    title: "Vá além do obvio",
    text: "Muito mais que um cardápio digital, traduza sua cozinha, ingredientes e serviços em cores, textos e imagens!",
    mainColor: theme.colors.white.normal,
    auxColor: theme.colors.red.normal,
    textColor: theme.colors.black.normal,
    customWidth: "10vw",
  },
  {
    icon: central,
    title: "Centralize suas informações",
    text: "Muito mais que um cardápio digital. Todas suas redes socias e contatos (até a playlist do spotify!) em um único lugar",
    mainColor: theme.colors.blue.palete,
    auxColor: theme.colors.white.normal,
    customWidth: "10vw",
  },
  {
    icon: visita,
    title: "Use fora das 4 paredes",
    text: "Muito mais que um cardápio digital! é o cartão de visitas online, é o site com todas as formas de ser encontrado.",
    mainColor: theme.colors.yellow.palete,
    auxColor: "",
    textColor: theme.colors.black.normal,
    customWidth: "10vw",
  },
  {
    icon: personalizar,
    title: "Personalização e Facilidade",
    text: "Muito mais que um cardápio digital! Traduza a cozinha, seus ingredientes, seus serviços em cores, textos e imagens!",
    mainColor: theme.colors.blue.palete,
    auxColor: theme.colors.red.normal,
    customWidth: "10vw",
  },
  {
    icon: easy,
    title: "Leve e fácil de usar",
    text: "Muito mais que um cardápio digital! Funciona na maioria dos dispositivos sem problemas e é extremamente leve e modular.",
    mainColor: theme.colors.white.normal,
    auxColor: theme.colors.red.normal,
    textColor: theme.colors.black.normal,
    customWidth: "10vw",
  },
  {
    icon: sail,
    title: "E muito mais do que isso!",
    text: "Muito mais que um cardápio digital! Faça parte da rede Meu menu e expanda cada vez mais seus horizontes!",
    mainColor: theme.colors.yellow.palete,
    auxColor: theme.colors.blue.palete,
    textColor: theme.colors.blue.palete,
    customWidth: "10vw",
  },
];

export default cardProps;
