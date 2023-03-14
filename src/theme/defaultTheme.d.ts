import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      white: {
        normal: string;
      };
      black: {
        normal: string;
      };
      gray: {
        light: string;
        normal: string;
        dark: string;
      };
      green: {
        darker: string;
        dark: string;
        normal: string;
        light: string;
      };
      orange: {
        normal: string
      },
      red: {
        normal: string;
        amog: string;
      };
      yellow: {
        normal: string;
        palete: string;
      };

      pink: {
        amog: string;
      };

      blue: {
        palete: string;
      }
    };
    fonts: {
      primary: string;
      secundary: string;
      hand: string;
      AlwaysSmile: string;
      Bachelorette: string;
      BeYou: string;
      Bravely: string;
      GlossySheen: string;
      LatoRegular: string;
      LEMONMILK: string;
      NiceSugar: string;
      RoughAnthem: string;
    };
    shadow: {
      vertical: string;
      bottomRight: string;
      black: string;
    };
    animation: {
      duration: string;
      name: string;
    };
    devices: {
      mobileS: string;
      mobileM: string;
      mobileL: string;
      tablet: string;
      laptop: string;
      laptopL: string;
      desktop: string;
    };

    fontSize: {
      sm: string;
      mm: string;
      md: string;
      md2: string;
      lg: string;
      xlg: string;
      xxlg: string;
      xxxlg: string;
    };
    siteWidth: string;
  }
}
