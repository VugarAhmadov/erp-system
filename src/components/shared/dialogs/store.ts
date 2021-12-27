import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { IDialog } from "./dialog/types";

export const dialogsSlice = createSlice({
  name: "dialogs",
  initialState: [] as any[],
  reducers: {
    addDialog: (state, action) => {
      state.push(action.payload);
    },
    removeDialog: (state, action: PayloadAction<number>) => {
      return state.filter((dialog) => dialog.id !== action.payload);
    },
    // closeDialog: (state, action: PayloadAction<number>) => {
    //   state[action.payload].open = false;
    // },
  },
});

export const { addDialog, removeDialog } = dialogsSlice.actions;
