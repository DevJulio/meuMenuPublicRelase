
import { TProducts } from ".";


const foods: TProducts[] = [{
    img: "https://www.receiteria.com.br/wp-content/uploads/pate-de-ricota-com-ervas.jpg",
    label: "Pate de ricota com ervas",
    description: "Este pâté cremoso é feito com ricota fresca e temperado com ervas finas, como manjericão e tomilho. Perfeito como entrada ou como acompanhamento de pães crocantes",
    price: "20,00",
    category: "Entradas",
    categoryIcon: "",
    isDrink: false,
    isDestaque: true

}, {
    img: "https://melepimenta.com/wp-content/uploads/2013/02/Antepasto-a-espanhola-Baixa-1024x683.jpg",
    label: "Antepasto de tomate",
    description: "Uma combinação saudável e saborosa de tomates frescos, mussarela de búfala, azeitonas pretas e um toque de azeite extra-virgem. Ideal para compartilhar com amigos ou familiares.",
    price: "25,00",
    category: "Entradas",
    categoryIcon: "",
    isDrink: false,
    isDestaque: true,
    isMainDestaque: true,

}, {
    img: "https://img.itdg.com.br/tdg/images/recipes/000/165/944/304385/304385_original.jpg?mode=crop&width=710&height=400",
    label: "Dadinhos de tapioca",
    description: "Estes dadinhos crocantes feitos com tapioca são uma opção saudável e saborosa para petiscar. Servem-se quentes e são ideais para acompanhar uma bebida gelada",
    price: "15,00",
    category: "Entradas",
    categoryIcon: "",
    isDrink: false,
    isDestaque: false

}, {
    img: "https://www.debemcomacomida.com.br/wp-content/uploads/2020/09/italian-bruschettas-7433A4M-1536x997.jpg",
    label: "Bruschettas suíças",
    description: "Fatias de pão de forma torradas com queijo suíço derretido e tomates frescos picados.",
    price: "20,00",
    category: "Entradas",
    categoryIcon: "",
    isDrink: false,
    isDestaque: false

}, {
    img: "https://s2.glbimg.com/-DPqdTPQF-TPoTFuWUQCseYWJNo=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_1f540e0b94d8437dbbc39d567a1dee68/internal_photos/bs/2022/W/x/Wn4GNBSU2FxnlXKo565g/ceviche-de-peixe-1-.jpg",
    label: "Ceviche",
    description: "Um prato típico da culinária peruana, feito com peixe branco marinados em limão, cebola roxa e pimenta. Servido com tortilhas de milho crocantes.",
    price: "35,00",
    category: "Entradas",
    categoryIcon: "",
    isDrink: false,
    isDestaque: false

}, {
    img: "https://img.itdg.com.br/tdg/images/recipes/000/302/736/326520/326520_original.jpg?mode=crop&width=710&height=400",
    label: "Croque madame",
    description: "Um sanduíche quente feito com pão de miga, presunto, queijo gruyère e uma gema de ovo por cima. Um clássico francês perfeito para um café da manhã ou lanche da tarde. ",
    price: "25,00",
    category: "Primeiro Prato",
    categoryIcon: "",
    isDrink: false,
    isDestaque: false

}, {
    img: "https://www.sabornamesa.com.br/media/k2/items/cache/dc45d75a725d95012d163ad4aae9c1e4_XL.jpg",
    label: "Croque monsieur",
    description: "Um sanduíche quente feito com pão de miga, presunto e queijo gruyère. Uma opção fácil e saborosa para um lanche rápido.",
    price: "20,00",
    category: "Primeiro Prato",
    categoryIcon: "",
    isDrink: false,
    isMainDestaque: true,
    isDestaque: true
}, {
    img: "https://www.receitasnestle.com.br/sites/default/files/styles/recipe_detail_desktop/public/srh_recipes/206aa7da9e090d12f3d47c08ec031c5d.webp?itok=28YI8BPb",
    label: "Ovos Benedict",
    description: "Ovos pochês servidos sobre muffins ingleses, presunto e molho holandês. Um café da manhã elegante e satisfatório.",
    price: "25,00",
    category: "Primeiro Prato",
    categoryIcon: "",
    isDrink: false,
    isDestaque: false

}, {
    img: "https://guiadacozinha.com.br/wp-content/uploads/2020/01/croissant-presunto-e-queijo.jpg",
    label: "Croissant recheado com presunto e queijo",
    description: "Croissants quentes e crocantes recheados com presunto e queijo derretido. Perfeito para um café da manhã ou lanche da tarde.",
    price: "20,00",
    category: "Primeiro Prato",
    categoryIcon: "",
    isDrink: false,
    isDestaque: false

},
{
    img: "https://www.pingodoce.pt/wp-content/uploads/2019/07/salada-cesar-com-croutons-1.jpg",
    label: "Salada Ceasar",
    description: "Uma salada clássica feita com folhas de alface romana, croutons crocantes, queijo parmesão e um molho Ceasar delicioso.",
    price: "25,00",
    category: "Prato Principal",
    categoryIcon: "",
    isDrink: false,
    isDestaque: true

}, {
    img: "https://www.dicasdemulher.com.br/wp-content/uploads/2019/03/salada-caprese.jpg",
    label: "Salada Caprese",
    description: "Tomates frescos, mussarela de búfala e manjericão fresco dispostos em camadas e regados com um pouco de azeite extra-virgem e sal. Uma opção saudável e saborosa.",
    price: "20,00",
    category: "Prato Principal",
    categoryIcon: "",
    isDrink: false,
    isDestaque: false

}, {
    img: "https://claudia.abril.com.br/wp-content/uploads/2020/02/receita-fritada-forno-abobrinha.jpg?quality=85",
    label: "Frittata de abobrinha ao forno",
    description: "Uma omelete leve e fofa feita com abobrinhas, queijo e ervas. Perfeita para um café da manhã ou jantar saudável.",
    price: "25,00",
    category: "Prato Principal",
    categoryIcon: "",
    isDrink: false,
    isDestaque: false

}, {
    img: "https://img.cybercook.com.br/receitas/369/quiche-de-espinafre-com-ricota-1.jpeg",
    label: "Quiche de espinafre com queijo",
    description: "Uma mistura de espinafre fresco, queijos suaves e creme de leite em um delicioso crust de massa folhada. Serve bem quente ou frio como um almoço leve ou jantar.",
    price: "25,00",
    category: "Prato Principal",
    categoryIcon: "",
    isDrink: false,
    isDestaque: false,
    isMainDestaque: true

}, {
    img: "https://img.itdg.com.br/tdg/images/blog/uploads/2018/02/receita-de-salada-waldorf.jpg?w=1200",
    label: "Salada Waldorf",
    description: "Uma salada clássica feita com maçãs cortadas em cubinhos, nozes torradas, uvas vermelhas e um toque de suave maionese. ",
    price: "20,00",
    category: "Prato Principal",
    categoryIcon: "",
    isDrink: false,
    isDestaque: true

},
{
    img: "https://www.receiteria.com.br/wp-content/uploads/naked-cake-de-frutas-vemelhas-1.jpg",
    label: "Naked cake de frutas vermelhas",
    description: "Um naked cake simples e elegante feito com uma camada de bolo de frutas vermelhas, coberto com chantilly e frutas frescas. (Torta com 8 fatias)",
    price: "50,00",
    category: "Sobremesas",
    categoryIcon: "",
    isDrink: false,
    isDestaque: false

}, {
    img: "https://cdn.panelinha.com.br/receita/1601926621338-cookie.jpg",
    label: "Cookies com gotas de chocolate",
    description: "Cookies macios e cheios de gotas de chocolate. Perfeitos para um lanche da tarde ou como sobremesa. (6 un.)",
    price: "15,00",
    category: "Sobremesas",
    categoryIcon: "",
    isDrink: false,
    isMainDestaque: true,
    isDestaque: false
}, {
    img: "https://cooknenjoy.com/wp-content/uploads/2021/10/torta-de-limao-01-1800x1286.jpg",
    label: "Torta de limão",
    description: "Uma crosta crocante recheada com uma mistura cítrica e refrescante de limão, açúcar e creme de leite. (Torta com 8 fatias)",
    price: "30,00",
    category: "Sobremesas",
    categoryIcon: "",
    isDrink: false,
    isDestaque: true

}];

export default foods;
