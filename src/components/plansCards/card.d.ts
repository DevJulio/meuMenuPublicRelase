export type TCardProps = {
  icon: string;
  title: string;
  text: string;
  mainColor: string;
  auxColor: string;
  textColor?: string;
  price?: number;
  list?: string[];
  includeText?: string;
  priceText?: string;
  isLast?: boolean;
  customWidth?: boolean;
  url?: string;
};
