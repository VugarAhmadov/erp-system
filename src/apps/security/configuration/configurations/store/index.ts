import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDialog } from "types";
// import { ILoading } from "./types";

export interface IConfigurationsState {
  // loading: ILoading;
  dialog: IDialog;
  selectedOperation: string;
}

const initialState: IConfigurationsState = {
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

export const configurationsSlice = createSlice({
  name: "configurations",
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

export const { setDialog, setSelectedOperation } = configurationsSlice.actions;
