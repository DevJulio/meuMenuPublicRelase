export type TCardProps = {
  icon: string;
  title: string;
  text: string;
  mainColor: string;
  auxColor: string;
  docId?: string;
  isDrink?: boolean;
  textColor?: string;
  price?: number;
  list?: string[];
  includeText?: string;
  priceText?: string;
  isLast?: boolean;
  customWidth?: boolean;
  url?: string;
  status?: boolean;
  solicitationDesc?: string;
  requester?: string;
};
export type TCardPropsAux = {
  docId: string;
  status: boolean;
  solicitationDesc: string;
  requester: string;
  title: string;
};
