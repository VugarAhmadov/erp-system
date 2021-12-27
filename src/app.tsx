import React from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "themes";
import { AppRouting } from "app-routing";
import store from "store";
import "translation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dialogs } from "components/shared";

export const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppRouting />
      </ThemeProvider>
      <ToastContainer theme="colored" />
      <Dialogs />
    </Provider>
  );
};
