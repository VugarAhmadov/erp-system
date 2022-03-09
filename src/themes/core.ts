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
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
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
    MuiFormControl: {
      defaultProps: {
        variant: "outlined",
        size: "small",
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: "0.375rem 0.875rem",
          borderRadius: "3px",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
          lineHeight: "1em",
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "1rem",
        },
      },
    },
  },
} as ThemeOptions;
