import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOperation } from "apps/auth/store/types";
import { IDialog } from "types";
import { getDictionaryTypeList, getHtmlFormOrViewname } from "./actions";
import { IDictionyType, ILoading } from "./types";

export interface IConfigurationsState {
  loading: ILoading;
  dialog: IDialog;
  // selectedOperation: IOperation;
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
  // selectedOperation: {} as IOperation,
  // dictionaryTpyeList: [],
};

export const configurationsNewSlice = createSlice({
  name: "configurationsNew",
  initialState: initialState,
  reducers: {
    setDialog: (state, action: PayloadAction<IDialog>) => {
      state.dialog = action.payload;
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
    [getHtmlFormOrViewname.fulfilled.type]: (state, action: PayloadAction) => {
      state.loading.getHtmlFormOrViewname = false;
      state.dialog.type = "add";
      state.dialog.opened = true;
      // state.dictionaryTpyeList = action.payload;
    },
    //* GET HTML FORM OR VIEWNAME END
  },
});

export const { setDialog } = configurationsNewSlice.actions;
