import {
  createMuiTheme,
  responsiveFontSizes,
  Theme,
} from "@material-ui/core/styles";

export const theme: Theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      primary: {
        light: "#727394",
        main: "#464866",
        dark: "#1d213b",
      },
      secondary: {
        main: "#ef9a9a",
      },
      background: {
        default: "#fff",
      },
      error: {
        main: "#B00020",
      },
    },
  })
);
