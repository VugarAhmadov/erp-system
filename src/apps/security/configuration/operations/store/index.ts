import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDialog } from "types";
// import { ILoading } from "./types";

export interface IOperationsState {
  // loading: ILoading;
  dialog: IDialog;
  selectedOperation: string;
}

const initialState: IOperationsState = {
  // loading: {
  //   getAll: false,
  //   add: false,
  //   edit: false,
  //   remove: false,
  // },
  // selectedOpeartion: {},
  selectedOperation: "",
  dialog: {
    type: "",
    opened: false,
  },
};

export const operationsSlice = createSlice({
  name: "operations",
  initialState: initialState,
  reducers: {
    setDialog: (state, action: PayloadAction<IDialog>) => {
      state.dialog = action.payload;
    },
    setSelectedOperation: (state, action: PayloadAction<string>) => {
      state.selectedOperation = action.payload;
    },
  },
  extraReducers: {},
});

export const { setDialog, setSelectedOperation } = operationsSlice.actions;
