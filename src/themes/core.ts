import { ThemeOptions } from "@mui/material";

export const coreTheme = {
  typography: {
    fontFamily: "'OpensSans', sans-serif",
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
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "0.6rem 1rem",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          padding: "0.875rem !important",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          lineHeight: "1rem",
        },
      },
    },
  },
} as ThemeOptions;
