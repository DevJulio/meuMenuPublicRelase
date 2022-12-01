import { createGlobalStyle } from "styled-components";
import bebas from "../assets/fonts/BebasNeue-Regular.woff"
import MontserratRegular from "../assets/fonts/MontserratRegular.ttf"



export const FontsImport = createGlobalStyle`
    @font-face {
        font-family: 'bebas';
        src: local('bebas'), local('bebas'),
         url(${bebas}) format('woff');
        font-style: normal;
    }
    @font-face {
      font-family: 'MontserratRegular';
      src: local('MontserratRegular'), local('MontserratRegular'),
       url(${MontserratRegular}) format('woff');
      font-style: normal;
  }
`;


export const theme = {
  colors: {
    white: {
      normal: "#FFFFFF",
    },
    black: {
      normal: "#000000",
    },
    gray: {
      light: "#EBEBEB",
      normal: "#939598",
      dark: "#58595b",
    },
    green: {
      darker: "#0E4D03",
      dark: "#02720C",
      normal: "#4cb967",
      light: "#22CC4F",
    },
    orange: {
      normal: "#F77F00"
    },
    red: {
      normal: "#D62828",
      amog: "#8c1914",
    },
    yellow: {
      normal: "rgb(234, 125, 36)",
      palete: "#FCBF49"
    },
    pink: {
      amog: "#905966",
    },
    blue: {
      palete: "#003049"
    }
  },
  fonts: {
    primary: "bebas, sans-serif",
    secundary: "MontserratRegular, sans-serif;",
  },

  fontSize: {
    sm: "0.875em",
    mm: "1em",
    md: "1.25em",
    md2: "1.625em",
    lg: "2.1875em",
    xlg: "2.625em",
    xxlg: "3.75em",
    xxxlg: "6.25em",
    base: "16px",
  },
  shadow: {
    vertical: "0px 3px 5px -1px rgba(0, 0, 0, 0.4)",
    bottomRight: "4px 4px 7px 0px rgba(0,0,0,0.4)",
    black: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);",
  },
  animation: {
    duration: "0.2s ease-in",
    name: "animatetop",
  },
  devices: {
    mobileS: `(max-width: 320px)`,
    mobileM: `(max-width: 375px)`,
    mobileL: `(max-width: 425px)`,
    tablet: `(max-width: 1023px)`,
    laptop: `(min-width: 1024px)`,
    laptopL: `(max-width: 1440px)`,
    desktop: `(max-width: 2560px)`,
  },
  siteWidth: `1140px`,
};

export const ResetCss = createGlobalStyle`

  html {
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }
  
  body {
    padding:0;
    margin: 0;
    font-size: ${theme.fontSize.base}
    font-family: ${theme.fonts.secundary};
    overflow-x: hidden;
    @media ${theme.devices.tablet} {
      width: 100vw;
    }
  }

  input {
    &:focus {
      outline: none;
    }
  }
  
  .fade-enter {
    opacity: 0;
    z-index: 1;
  }
  
  .fade-enter.fade-enter-active {
    opacity: 1;
    transition: opacity 250ms ease-in;
  }

  .fade-exit {
    opacity: 1;
    z-index: 1;
    position: absolute;
    left: 0;
    right: 0;
  }

  .fade-exit.fade-exit-active {
    opacity: 0;
    transition: opacity 250ms ease-in;
  }

  .slideup-enter {
    opacity: 0;
    transform: translateY(30px);
    z-index: 1;
  }
  
  .slideup-enter.slideup-enter-active {
    opacity: 1;
    transform: translateY(0);
    transition: opacity 250ms ease-in, transform 250ms ease-in;
  }

  .slideup-exit {
    opacity: 1;
    z-index: 1;
  }

  .slideup-exit.slideup-exit-active {
    opacity: 0;
    transition: opacity 250ms ease-in;
  }


@-webkit-keyframes icon-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(359deg);
            transform: rotate(359deg);
  }
}

@keyframes icon-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(359deg);
            transform: rotate(359deg);
  }
}

@-webkit-keyframes animatetop {
  from {
    top: -300px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
}

@keyframes shake {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}
`;
