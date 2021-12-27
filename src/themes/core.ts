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
          // padding: "0.6rem 1rem",
          textTransform: "initial",
        },
      },
      defaultProps: {
        variant: "contained",
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginTop: 0,
          position: "absolute",
          bottom: -20,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        size: "small",
      },
    },
    MuiSelect: {
      defaultProps: {
        variant: "outlined",
        size: "small",
      },
    },
  },
} as ThemeOptions;
