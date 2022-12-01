import { TCardProps } from "../../../components/homeCard/card";
import { theme } from "../../../theme/theme";
import shine from "../../../assets/icons/cardsIcons/shine.png"
import atualizacao from "../../../assets/icons/cardsIcons/atualizacao.png"
import promo from "../../../assets/icons/cardsIcons/promo.png"
import reserva from "../../../assets/icons/cardsIcons/reserva.png"
import bot from "../../../assets/icons/cardsIcons/bot.png"
import plans from "../../../assets/icons/cardsIcons/plans.png"

const cardProps: TCardProps[] = [
    {
        icon: atualizacao,
        title: "Atualização",
        text: "Altere o valor dos produtos, desabilite o produto do cardápio caso já tenha esgotado, tudo isso de maneira fácil (e instantânea).",
        mainColor: theme.colors.white.normal,
        auxColor: theme.colors.blue.palete,
        customWidth: "15vw",
        textColor: theme.colors.black.normal,
    },
    {
        icon: promo,
        title: "Promoções",
        text: "Crie promoções de maneira dinâmica, elas terão destaque no cardápio! Adicione produtos a preços especiais!",
        mainColor: theme.colors.blue.palete,
        auxColor: theme.colors.white.normal,
        customWidth: "15vw",
    },
    {
        icon: reserva,
        title: "Reservas",
        text: "Um espaço dedicado aos seus clientes. Uma facilidade e praticidade a mais na hora de fazer reservas de mesa.",
        mainColor: theme.colors.yellow.palete,
        auxColor: "",
        customWidth: "15vw",
        textColor: theme.colors.black.normal,

    },
    {
        icon: shine,
        title: "Identidade visual",
        text: "Reforce ainda mais a sua Identidade visual! Torne clara a extensão do estabelecimento no cardápio!",
        mainColor: theme.colors.blue.palete,
        auxColor: theme.colors.red.normal,
        customWidth: "15vw",
    }, {
        icon: bot,
        title: "Automatização",
        text: "Programe rotinas de promoções em dias especificos, envie notificações para seus clientes!",
        mainColor: theme.colors.white.normal,
        auxColor: theme.colors.red.normal,
        customWidth: "15vw",
        textColor: theme.colors.black.normal,
    }, {
        icon: plans,
        title: "Planos",
        text: "Encontre um plano que atenta suas necessidases e que caiba no seu bolso!",
        mainColor: theme.colors.yellow.palete,
        auxColor: theme.colors.white.normal,
        customWidth: "15vw",
        textColor: theme.colors.white.normal,
    },
]

export default cardProps