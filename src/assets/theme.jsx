import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";
import MolotWoff2 from "./fonts/Molot.woff2";
import { esES } from "@material-ui/core/locale";

const molot = {
  fontFamily: "Molot",
  fontStyle: "normal",
  fontDisplay: "swap",
  fontWeight: 400,
  src: `
    local('Molot'),
    local('Molot-Regular'),
    url(${MolotWoff2}) format('woff2')
  `,
  unicodeRange:
    "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF",
};

let theme = createMuiTheme(
  {
    typography: {
      h1: {
        fontFamily: "Molot, Arial",
      },
    },
    palette: {
      primary: { main: "#0eacd4", contrastText: "#ffffff" },
      secondary: { main: "#0e49d4", contrastText: "#ffffff" },
    },
    overrides: {
      MuiCssBaseline: {
        "@global": {
          "@font-face": [molot],
        },
      },
      MuiListItem: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "#0e49d4",
            color: "#fff",
            "& svg": {
              color: "#fff",
            },
            "&:hover": {
              backgroundColor: "#0e49d4",
            },
          },
        },
      },
      MuiListItemIcon: {
        root: {
          minWidth: 48,
        },
      },
    },
  },
  esES
);

theme = responsiveFontSizes(theme);

export default theme;
