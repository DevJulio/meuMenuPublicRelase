import { theme } from "../theme/theme";

export const getFontStyle = (fontStyle: string) => {

    switch (fontStyle) {
        case "LEMONMILK":
            return theme.fonts.LEMONMILK
            break;
        case "primary":
            return theme.fonts.primary
            break;

        default:
            break;
    }

}