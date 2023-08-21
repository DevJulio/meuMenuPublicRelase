import { theme } from "../theme/theme";

export const getFontStyle = (fontStyle: string) => {
  switch (fontStyle) {
    case "LEMONMILK":
      return theme.fonts.LEMONMILK;
    case "AlwaysSmile":
      return theme.fonts.AlwaysSmile;
    case "Bachelorette":
      return theme.fonts.Bachelorette;
    case "BeYou":
      return theme.fonts.BeYou;
    case "Bravely":
      return theme.fonts.Bravely;
    case "GlossySheen":
      return theme.fonts.GlossySheen;
    case "LatoRegular":
      return theme.fonts.LatoRegular;
    case "NiceSugar":
      return theme.fonts.NiceSugar;
    case "RoughAnthem":
      return theme.fonts.RoughAnthem;
    case "primary":
      return theme.fonts.primary;
    case "secundary":
      return theme.fonts.secundary;
    case "hand":
      return theme.fonts.hand;
    default:
      return theme.fonts.secundary;
  }
};
