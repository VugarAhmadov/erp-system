import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "themes";
import { AppRouting } from "app-routing";
import store from "store";
import "translation";
import "react-toastify/dist/ReactToastify.css";
import { Dialogs } from "components/shared";

export const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <Provider store={store}>
        <ThemeProvider>
          <AppRouting />
        </ThemeProvider>
        <ToastContainer theme="colored" />
        <Dialogs />
      </Provider>
    </DndProvider>
  );
};
