import { theme } from "../../theme/theme";
const width = window.screen.width;
const diference = (width / 10) * 6.5 * -1;
const formatDiference = diference.toString() + "px";

const styles = {
  bmBurgerButton: {
    marginTop: "2.9vh",
    position: "relative",
    width: "36px",
    height: "30px",
    right: "6vw",
  },
  bmBurgerBars: {
    background: theme.colors.yellow.palete,
  },
  bmBurgerBarsHover: {
    background: "#a90000",
  },
  bmCrossButton: {
    height: "24px",
    width: "24px",
  },
  bmCross: {
    background: theme.colors.red.normal,
  },
  bmMenuWrap: {
    position: "fixed",
    height: "100%",
    marginLeft: formatDiference,
    marginTop: "-6vh",
  },
  bmMenu: {
    backgroundColor: "#fff",
    padding: "2.5em 1.5em 0",
    fontSize: theme.fontSize.base,
    paddingTop: "8vh",
    borderColor: theme.colors.red.normal,
    borderTopLeftRadius: "40px",
    borderBottomStyle: "none",
    background: theme.colors.blue.palete,
  },
  bmMorphShape: {
    background: theme.colors.blue.palete,
  },
  bmItemList: {
    color: "#b8b7ad",
    padding: "0.8em",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    textAlign: "right",
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0)",
  },
};

export default styles;
