
import { TProducts } from ".";
import { ICategory } from "../../components/category";
import { theme } from "../../theme/theme";

import all from "../../assets/icons/categories/ios/all.png";
import renEntradas from "../../assets/icons/categories/ios/renEntradas.png";
import renPrincipal from "../../assets/icons/categories/ios/renPrincipal.png";
import renPrimeiro from "../../assets/icons/categories/ios/renPrimeiro.png";
import drinks from "../../assets/icons/categories/ios/drinks.png";
import sobremesa from "../../assets/icons/categories/ios/sobremesa.png";


const foods: TProducts[] = [{
    img: "https://www.receiteria.com.br/wp-content/uploads/pate-de-ricota-com-ervas.jpg",
    isEnable: true,
    label: "Pate de ricota com ervas",
    harmoziation: "Para harmonizar com o pate de ricota com ervas, um vinho branco seco como um Sauvignon Blanc ou um Chardonnay não carvalhado é uma ótima escolha.",
    description: "Este pâté cremoso é feito com ricota fresca e temperado com ervas finas, como manjericão e tomilho. Perfeito como entrada ou como acompanhamento de pães crocantes",
    price: "20,00",
    category: "Entradas",
    categoryIcon: "",
    isDrink: false,
    isDestaque: true,
    isOffer: true,

}, {
    img: "https://melepimenta.com/wp-content/uploads/2013/02/Antepasto-a-espanhola-Baixa-1024x683.jpg",
    isEnable: true,
    label: "Antepasto de tomate",
    harmoziation: "Para Antepasto de tomate, um vinho tinto jovem e frutado como um Pinot Noir ou um Merlot são ideais.",
    description: "Uma combinação saudável e saborosa de tomates frescos, mussarela de búfala, azeitonas pretas e um toque de azeite extra-virgem. Ideal para compartilhar com amigos ou familiares.",
    price: "25,00",
    category: "Entradas",
    categoryIcon: "",
    isDrink: false,
    isDestaque: true,
    isOffer: true,

    isMainDestaque: true,

}, {
    img: "https://img.itdg.com.br/tdg/images/recipes/000/165/944/304385/304385_original.jpg?mode=crop&width=710&height=400",
    isEnable: true,
    label: "Dadinhos de tapioca",
    harmoziation: "Para os Dadinhos de tapioca, uma cerveja IPA ou uma caipirinha são excelentes opções para equilibrar o sabor picante.",
    description: "Estes dadinhos crocantes feitos com tapioca são uma opção saudável e saborosa para petiscar. Servem-se quentes e são ideais para acompanhar uma bebida gelada",
    price: "15,00",
    category: "Entradas",
    categoryIcon: "",
    isDrink: false,
    isDestaque: false


}, {
    img: "https://www.debemcomacomida.com.br/wp-content/uploads/2020/09/italian-bruschettas-7433A4M-1536x997.jpg",
    isEnable: true,
    label: "Bruschettas suíças",
    harmoziation: "Bruschettas suíças são bem acompanhadas por vinhos brancos mais encorpados como um Gewürztraminer ou um Riesling.",
    description: "Fatias de pão de forma torradas com queijo suíço derretido e tomates frescos picados.",
    price: "20,00",
    category: "Entradas",
    categoryIcon: "",
    isDrink: false,
    isDestaque: false


}, {
    img: "https://s2.glbimg.com/-DPqdTPQF-TPoTFuWUQCseYWJNo=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_1f540e0b94d8437dbbc39d567a1dee68/internal_photos/bs/2022/W/x/Wn4GNBSU2FxnlXKo565g/ceviche-de-peixe-1-.jpg",
    isEnable: true,
    label: "Ceviche",
    harmoziation: "O Ceviche é perfeito com uma taça de vinho branco fresco, como um Vinho Verde ou um Sauvignon Blanc.",
    description: "Um prato típico da culinária peruana, feito com peixe branco marinados em limão, cebola roxa e pimenta. Servido com tortilhas de milho crocantes.",
    price: "35,00",
    category: "Entradas",
    categoryIcon: "",
    isDrink: false,
    isDestaque: false


}, {
    img: "https://img.itdg.com.br/tdg/images/recipes/000/302/736/326520/326520_original.jpg?mode=crop&width=710&height=400",
    isEnable: true,
    label: "Croque madame",
    harmoziation: "O Croque madame combina bem com cervejas de trigo, como a Witbier.",
    description: "Um sanduíche quente feito com pão de miga, presunto, queijo gruyère e uma gema de ovo por cima. Um clássico francês perfeito para um café da manhã ou lanche da tarde. ",
    price: "25,00",
    category: "Primeiro Prato",
    categoryIcon: "",
    isDrink: false,
    isDestaque: false


}, {
    img: "https://www.sabornamesa.com.br/media/k2/items/cache/dc45d75a725d95012d163ad4aae9c1e4_XL.jpg",
    isEnable: true,
    label: "Croque monsieur",
    harmoziation: "O Croque monsieur combina bem com cervejas de trigo, como a Witbier.",
    description: "Um sanduíche quente feito com pão de miga, presunto e queijo gruyère. Uma opção fácil e saborosa para um lanche rápido.",
    price: "20,00",
    category: "Primeiro Prato",
    categoryIcon: "",
    isDrink: false,
    isMainDestaque: true,
    isDestaque: true

}, {
    img: "https://www.receitasnestle.com.br/sites/default/files/styles/recipe_detail_desktop/public/srh_recipes/206aa7da9e090d12f3d47c08ec031c5d.webp?itok=28YI8BPb",
    isEnable: true,
    label: "Ovos Benedict",
    harmoziation: "Os Ovos Benedict pedem por uma taça de champanhe brut para realçar o sabor suave dos ovos e do molho hollandaise.",
    description: "Ovos pochês servidos sobre muffins ingleses, presunto e molho holandês. Um café da manhã elegante e satisfatório.",
    price: "25,00",
    category: "Primeiro Prato",
    categoryIcon: "",
    isDrink: false,
    isDestaque: false


}, {
    img: "https://guiadacozinha.com.br/wp-content/uploads/2020/01/croissant-presunto-e-queijo.jpg",
    isEnable: true,
    label: "Croissant recheado com presunto e queijo",
    harmoziation: "O Croissant recheado com presunto e queijo é uma combinação clássica de café com leite, um Capuccino ou um Café Latte são opções ideais.",
    description: "Croissants quentes e crocantes recheados com presunto e queijo derretido. Perfeito para um café da manhã ou lanche da tarde.",
    price: "20,00",
    category: "Primeiro Prato",
    categoryIcon: "",
    isDrink: false,
    isDestaque: false


},
{
    img: "https://www.pingodoce.pt/wp-content/uploads/2019/07/salada-cesar-com-croutons-1.jpg",
    isEnable: true,
    label: "Salada Ceasar",
    harmoziation: "A Salada Caesar é uma opção clássica e saborosa, que combina perfeitamente com vinhos brancos encorpados, como um Chardonnay com leve toque de carvalho. Esse tipo de vinho tem uma boa acidez e um sabor frutado que equilibra a acidez do molho Caesar e realça os sabores dos ingredientes da salada, como o frango, o parmesão e a alface romana. Outra opção é um vinho rosé seco, que traz uma frescura ao paladar e realça a textura cremosa do molho. Para aqueles que preferem uma opção sem álcool, um suco de limão fresco e gelado é uma ótima opção, pois a acidez do limão complementa o sabor da salada e ajuda a limpar o paladar.",
    description: "Uma salada clássica feita com folhas de alface romana, croutons crocantes, queijo parmesão e um molho Ceasar delicioso.",
    price: "25,00",
    category: "Prato Principal",
    categoryIcon: "",
    isDrink: false,
    isDestaque: true


}, {
    img: "https://www.dicasdemulher.com.br/wp-content/uploads/2019/03/salada-caprese.jpg",
    isEnable: true,
    label: "Salada Caprese",
    harmoziation: "Salada Caprese pede por um vinho tinto italiano como um Chianti",
    description: "Tomates frescos, mussarela de búfala e manjericão fresco dispostos em camadas e regados com um pouco de azeite extra-virgem e sal. Uma opção saudável e saborosa.",
    price: "20,00",
    category: "Prato Principal",
    categoryIcon: "",
    isDrink: false,
    isDestaque: false


}, {
    img: "https://claudia.abril.com.br/wp-content/uploads/2020/02/receita-fritada-forno-abobrinha.jpg?quality=85",
    isEnable: true,
    label: "Frittata de abobrinha ao forno",
    harmoziation: "A Frittata de abobrinha ao forno é acompanhada por vinhos brancos com mais corpo, como um Viognier ou um Chenin Blanc.",
    description: "Uma omelete leve e fofa feita com abobrinhas, queijo e ervas. Perfeita para um café da manhã ou jantar saudável.",
    price: "25,00",
    category: "Prato Principal",
    categoryIcon: "",
    isOffer: true,
    isDrink: false,
    isDestaque: false


}, {
    img: "https://img.cybercook.com.br/receitas/369/quiche-de-espinafre-com-ricota-1.jpeg",
    isEnable: true,
    label: "Quiche de espinafre com queijo",
    harmoziation: "A Quiche de espinafre com queijo harmoniza com um vinho tinto leve como um Pinot Noir.",
    description: "Uma mistura de espinafre fresco, queijos suaves e creme de leite em um delicioso crust de massa folhada. Serve bem quente ou frio como um almoço leve ou jantar.",
    price: "25,00",
    category: "Prato Principal",
    categoryIcon: "",
    isDrink: false,
    isDestaque: false,
    isMainDestaque: true

}, {
    img: "https://img.itdg.com.br/tdg/images/blog/uploads/2018/02/receita-de-salada-waldorf.jpg?w=1200",
    isEnable: true,
    label: "Salada Waldorf",
    harmoziation: "Para a Salada Waldorf, um vinho branco seco como um Pinot Grigio é uma boa escolha.",
    description: "Uma salada clássica feita com maçãs cortadas em cubinhos, nozes torradas, uvas vermelhas e um toque de suave maionese. ",
    price: "20,00",
    category: "Prato Principal",
    categoryIcon: "",
    isDrink: false,
    isDestaque: true
},
{
    img: "https://www.receiteria.com.br/wp-content/uploads/naked-cake-de-frutas-vemelhas-1.jpg",
    isEnable: true,
    label: "Naked cake de frutas vermelhas",
    harmoziation: "O Naked cake de frutas vermelhas pede por uma taça de champanhe rosé",
    description: "Um naked cake simples e elegante feito com uma camada de bolo de frutas vermelhas, coberto com chantilly e frutas frescas. (Torta com 8 fatias)",
    price: "50,00",
    category: "Sobremesas",
    categoryIcon: "",
    isDrink: false,
    isDestaque: false


}, {
    img: "https://cdn.panelinha.com.br/receita/1601926621338-cookie.jpg",
    isEnable: true,
    label: "Cookies com gotas de chocolate",
    harmoziation: "Cookies com gotas de chocolate são bem acompanhados por um leite quente com uma pitada de canela.",
    description: "Cookies macios e cheios de gotas de chocolate. Perfeitos para um lanche da tarde ou como sobremesa. (6 un.)",
    price: "15,00",
    category: "Sobremesas",
    categoryIcon: "",
    isDrink: false,
    isMainDestaque: true,
    isDestaque: false

}, {
    img: "https://cooknenjoy.com/wp-content/uploads/2021/10/torta-de-limao-01-1800x1286.jpg",
    isEnable: true,
    label: "Torta de limão",
    harmoziation: "A Torta de limão pede por um vinho branco mais doce, como um Riesling ou um Gewürztraminer.",
    description: "Uma crosta crocante recheada com uma mistura cítrica e refrescante de limão, açúcar e creme de leite. (Torta com 8 fatias)",
    price: "30,00",
    category: "Sobremesas", isOffer: true,

    categoryIcon: "",
    isDrink: false,
    isDestaque: true

}, {
    img: "https://www.comidaereceitas.com.br/wp-content/uploads/2008/09/Mimosa-freepik-780x521.jpg",
    isEnable: true,
    label: "Mimosa",
    harmoziation: "A Mimosa, uma clássica mistura de champanhe e suco de laranja, é um excelente acompanhamento para brunches. ",
    description: "Feito à base de espumante gelado e suco de laranja fresco, a Mimosa vai muito bem com queijos mais delicados, como a ricota. Saladas também são muito bem-vindas",
    price: "30,00",
    category: "Bebidas",
    categoryIcon: "",
    isDrink: true,
    isDestaque: true

}, {
    img: "https://www.receiteria.com.br/wp-content/uploads/aperol-spritz-2-730x450.jpg",
    isEnable: true,
    label: "Aperol Spritz",
    harmoziation: "O Aperol Spritz, um cocktail italiano refrescante, harmoniza bem com aperitivos como o Antepasto de tomate.",
    description: "Em sua composição vai Prosecco, Aperol, Água com gás e gelo. Combina muito com queijos e canapés, e ainda para melhorar, pode escoltar saladas, peixes e carnes brancas.",
    price: "30,00",
    category: "Bebidas",
    categoryIcon: "",
    isDrink: true,
    isDestaque: true

}, {
    img: "https://cdn-caijk.nitrocdn.com/odlefrHlsAQchgWkXbLqZzXasZvKPRXm/assets/static/optimized/rev-9db51cc/wp-content/uploads/2020/09/receita-bloody-mary.jpg",
    isEnable: true,
    label: "Bloody Mary",
    harmoziation: "O Bloody Mary pede por snacks salgados, como amendoins torrados ou chips de batata.",
    description: "Vai vodka, polpa de tomate, sopa de glutamato monossódico, molho inglês, pimenta tabasco, suco de limão, gelo, tomatinho cereja para decoração e talo de salsão para decoração. Esse drink possui umami e a dica é harmonizar com frutos do mar, ostras e carnes",
    price: "30,00",
    category: "Bebidas",
    categoryIcon: "",
    isDrink: true,
    isDestaque: false

}, {
    img: "https://www.sabornamesa.com.br/media/k2/items/cache/65eb99de7f31e7479a8853734ca0c7ac_XL.jpg",
    isEnable: true,
    label: "Mojito",
    harmoziation: "O Mojito, um coquetel cubano, combina bem com pratos de frutos do mar, como o Ceviche.",
    description: "O primo cubano da nossa caipirinha! Na sua formação vai limão, rum branco, hortelã, gelo, açúcar e refrigerante de soda ou água com gás. Vai bem com tomates ou alimentos mais gordurosos.",
    price: "30,00",
    category: "Bebidas",
    categoryIcon: "",
    isDrink: true,
    isDestaque: true

}, {
    img: "https://i1.wp.com/www.wine.com.br/winepedia/wp-content/uploads/2017/11/Como-fazer-Clericot.jpg?fit=1254%2C836&ssl=1",
    isEnable: true,
    label: "Clericot",
    harmoziation: "O Clericot, um vinho branco com frutas, é uma bebida refrescante para acompanhamento de saladas e comidas leves.",
    description: "Feito com vinho branco seco, licor de laranja ou cereja, limão, frutas vermelhas e outra seleção de frutas variadas. Vai bem com pratos leves, como saladas, por exemplo.",
    price: "30,00",
    category: "Bebidas",
    categoryIcon: "",
    isDrink: true,
    isDestaque: true

}, {
    img: "https://i1.wp.com/files.agro20.com.br/uploads/2020/01/Caf%C3%A9-expresso-1.jpg?fit=1024%2C618&ssl=1",
    isEnable: true,
    label: "Café expresso",
    harmoziation: "Café expresso forte é perfeito para acompanhar sobremesas doces",
    description: "Um expresso perfeito é a mistura da química e da física, um produto da união entre ciência e arte, uma bebida que ressalta os cinco sentidos e toda a riqueza do café.",
    price: "30,00",
    category: "Bebidas",
    categoryIcon: "",
    isDrink: true,
    isDestaque: false,
    isOffer: true,


}, {
    img: "https://www.emporiumpax.com.br/wp-content/uploads/2022/05/receita-de-capuccino-cremoso-na-batedeira.png",
    isEnable: true,
    label: "Capuccino",
    harmoziation: "O Capuccino é uma bebida clássica e reconfortante, que combina perfeitamente com um pão de queijo quentinho ou uma fatia de bolo de chocolate úmido e macio. O sabor adocicado do Capuccino harmoniza com a doçura do chocolate e a textura cremosa do leite combina com a maciez do bolo ou a crocância do pão de queijo. Outra opção para acompanhar o Capuccino é um croissant fresco e quentinho, recheado com geleia de frutas vermelhas ou uma fatia de presunto e queijo. A combinação do sabor salgado com o doce do Capuccino é deliciosa e a textura crocante do croissant complementa a cremosidade da bebida.",
    description: "O cappuccino clássico italiano é uma combinação de café espresso e leite quente, coberto com espuma de leite. Não se usa chocolate. Coloca-se cerca de 1/3 de espresso na xícara, seguido de 1/3 de leite e finalizado com 1/3 de espuma de leite.",
    price: "30,00",
    category: "Bebidas",
    categoryIcon: "",
    isDrink: true,
    isDestaque: false

}, {
    img: "https://img.freepik.com/fotos-premium/cafe-preto-em-uma-pequena-xicara-de-cafe-em-cima-da-mesa_557865-191.jpg",
    isEnable: true,
    label: "Café preto",
    harmoziation: "Café preto é uma opção clássica para acompanhar o café da manhã",
    description: "Perfeito para dar aquele gás depois de qualquer refeição.",
    price: "30,00",
    category: "Bebidas",
    categoryIcon: "",
    isDrink: true,
    isDestaque: false

}





];
export const renCategories: ICategory[] = [
    {
        icon: all,
        label: "Todas",
        color: "white",
        bgColor: "#386641",
        auxColor: "#BC4749",
        fontStyle: theme.fonts.hand,
    },

    {
        icon: drinks,
        label: "Bebidas",
        color: "white",
        bgColor: "#386641",
        auxColor: "#BC4749",
        fontStyle: theme.fonts.hand,
    },
    {
        icon: renEntradas,
        label: "Entradas",
        color: "white",
        bgColor: "#386641",
        auxColor: "#BC4749",
        fontStyle: theme.fonts.hand,
    },

    {
        icon: renPrimeiro,
        label: "Primeiro Prato",
        color: "white",
        bgColor: "#386641",
        auxColor: "#BC4749",
        fontStyle: theme.fonts.hand,
    },

    {
        icon: renPrincipal,
        label: "Prato Principal",
        color: "white",
        bgColor: "#386641",
        auxColor: "#BC4749",
        fontStyle: theme.fonts.hand,
    },

    {
        icon: sobremesa,
        label: "Sobremesas",
        color: "white",
        bgColor: "#386641",
        auxColor: "#BC4749",
        fontStyle: theme.fonts.hand,
    },
];
export default foods;
