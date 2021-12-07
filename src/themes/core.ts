import { ThemeOptions } from "@mui/material";

export const coreTheme = {
  typography: {
    fontFamily: "'SanFrancisco'",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          height: "100%",
        },
        body: {
          fontFamily: "'OpensSans', sans-serif",
          height: "100%",
        },
      },
    },
  },
} as ThemeOptions;
