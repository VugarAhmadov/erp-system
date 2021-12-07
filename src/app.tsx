import React from "react";
import { ThemeProvider } from "themes";
import { AppRouting } from "app-routing";

export const App = () => {
  return (
    <ThemeProvider>
      <AppRouting />
    </ThemeProvider>
  );
};
