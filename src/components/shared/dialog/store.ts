import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { IDialog } from "./dialog/types";

export const dialogSlice = createSlice({
  name: "dialog",
  initialState: [] as any[],
  reducers: {
    openDialog: (state, action) => {
      state.push(action.payload);
    },
    closeDialog: (state, action: PayloadAction<any>) => {
      return state.filter((dialog) => dialog.id !== action.payload);
    },
  },
});

export const { openDialog, closeDialog } = dialogSlice.actions;
