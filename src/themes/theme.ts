import { createTheme } from "@mui/material";
import { coreTheme } from "./core";

export const theme = createTheme({
  ...coreTheme,
  palette: {
    mode: "light",
  },
});
