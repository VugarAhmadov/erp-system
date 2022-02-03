import { Breakpoint } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOperation } from "apps/auth/store/types";
import { IDialog } from "types";
import { getDictionaryTypeList, getHtmlFormOrViewname } from "./actions";
import { IDictionyType, IGetHtmlFormOrViewnameResponse, ILoading } from "./types";

export interface IConfigurationsState {
  loading: ILoading;
  dialog: IDialog;
  selectedOperation: IGetHtmlFormOrViewnameResponse;
  // dictionaryTpyeList: IDictionyType[];
}

const initialState: IConfigurationsState = {
  loading: {
    getDictionaryTypeList: false,
    getHtmlFormOrViewname: false,
  },
  dialog: {
    type: "",
    opened: false,
  },
  selectedOperation: {} as IGetHtmlFormOrViewnameResponse,
  // dictionaryTpyeList: [],
};

export const configurationsNewSlice = createSlice({
  name: "configurationsNew",
  initialState: initialState,
  reducers: {
    closeDialog: (state) => {
      state.dialog.type = "";
      state.dialog.opened = false;
      state.selectedOperation = {} as IGetHtmlFormOrViewnameResponse;
    },
    setDialogSize: (state, action: PayloadAction<Breakpoint>) => {
      state.selectedOperation.dialogSize = action.payload;
    },
    // setSelectedOperation: (state, action: PayloadAction<IOperation>) => {
    //   state.selectedOperation = action.payload;
    // },
  },
  extraReducers: {
    //* GET_DICTIONARY_TYPE_LIST
    // [getDictionaryTypeList.pending.type]: (state) => {
    //   state.loading.getDictionaryTypeList = true;
    // },
    // [getDictionaryTypeList.rejected.type]: (state) => {
    //   state.loading.getDictionaryTypeList = false;
    //   state.dictionaryTpyeList = [];
    // },
    // [getDictionaryTypeList.fulfilled.type]: (state, action: PayloadAction<IDictionyType[]>) => {
    //   state.loading.getDictionaryTypeList = false;
    //   state.dictionaryTpyeList = action.payload;
    // },
    //* GET_DICTIONARY_TYPE_LIST END
    //* GET HTML FORM OR VIEWNAME
    [getHtmlFormOrViewname.pending.type]: (state) => {
      state.loading.getHtmlFormOrViewname = true;
    },
    [getHtmlFormOrViewname.rejected.type]: (state) => {
      state.loading.getHtmlFormOrViewname = false;
      state.dialog.type = "";
      state.dialog.opened = false;
      // state.dictionaryTpyeList = [];
    },
    [getHtmlFormOrViewname.fulfilled.type]: (state, action: PayloadAction<IGetHtmlFormOrViewnameResponse>) => {
      state.loading.getHtmlFormOrViewname = false;
      state.dialog.type = "add";
      state.dialog.opened = true;
      state.selectedOperation = action.payload;
      // state.dictionaryTpyeList = action.payload;
    },
    //* GET HTML FORM OR VIEWNAME END
  },
});

export const { closeDialog, setDialogSize } = configurationsNewSlice.actions;
