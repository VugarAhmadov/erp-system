import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "themes";
import { AppRouting } from "app-routing";
import store from "store";

export const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppRouting />
      </ThemeProvider>
    </Provider>
  );
};
