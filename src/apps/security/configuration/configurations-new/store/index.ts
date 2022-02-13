import { Breakpoint } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOperation } from "apps/auth/store/types";
import { deleteTreeNode } from "helpers";
import { getViewForm, getDictionaryTypeList, getHtmlForm } from "./actions";
import { IDictionyType, IEditElementPayload, IGetHtmlFormResponse, IGetViewFormResponse, ILoading } from "./types";

export interface IConfigurationsState {
  loading: ILoading;
  htmlFormDialogOpened: boolean;
  viewFormDialogOpened: boolean;
  selectedOperationHtmlForm: IGetHtmlFormResponse;
  selectedOperationViewForm: IGetViewFormResponse;
  // dictionaryTpyeList: IDictionyType[];
}

const initialState: IConfigurationsState = {
  loading: {
    getDictionaryTypeList: false,
    getHtmlForm: false,
    getViewForm: false,
  },
  htmlFormDialogOpened: false,
  viewFormDialogOpened: false,
  selectedOperationHtmlForm: {} as IGetHtmlFormResponse,
  selectedOperationViewForm: {} as IGetViewFormResponse,
  // dictionaryTpyeList: [],
};

export const configurationsNewSlice = createSlice({
  name: "configurationsNew",
  initialState: initialState,
  reducers: {
    closeDialog: (state) => {
      state.htmlFormDialogOpened = false;
      state.viewFormDialogOpened = false;
      state.selectedOperationHtmlForm = {} as IGetHtmlFormResponse;
      state.selectedOperationViewForm = {} as IGetViewFormResponse;
    },
    setDialogSize: (state, action: PayloadAction<Breakpoint>) => {
      state.selectedOperationHtmlForm.dialogSize = action.payload;
    },
    addItem: (state, action: PayloadAction<any>) => {
      let copy = [...state.selectedOperationHtmlForm.formContent];

      copy.push(action.payload);
      state.selectedOperationHtmlForm.formContent = copy;
    },
    editItem: (state, action: PayloadAction<any>) => {
      const { id, params } = action.payload;
      let copy = [...state.selectedOperationHtmlForm.formContent];

      copy.find((c) => c.id === id).params = params;

      state.selectedOperationHtmlForm.formContent = copy;
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      let copy = [...state.selectedOperationHtmlForm.formContent];

      state.selectedOperationHtmlForm.formContent = deleteTreeNode(copy, action.payload);
    },
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
    //* GET HTML FORM
    [getHtmlForm.pending.type]: (state) => {
      state.loading.getHtmlForm = true;
    },
    [getHtmlForm.rejected.type]: (state) => {
      state.loading.getHtmlForm = false;
      state.htmlFormDialogOpened = false;
      // state.dictionaryTpyeList = [];
    },
    [getHtmlForm.fulfilled.type]: (state, action: PayloadAction<IGetHtmlFormResponse>) => {
      state.loading.getHtmlForm = false;
      state.htmlFormDialogOpened = true;
      state.selectedOperationHtmlForm = action.payload;
      // state.dictionaryTpyeList = action.payload;
    },
    //* GET HTML FORM END
    //* GET VIEW FORM
    [getViewForm.pending.type]: (state) => {
      state.loading.getViewForm = true;
    },
    [getViewForm.rejected.type]: (state) => {
      state.loading.getViewForm = false;
      state.viewFormDialogOpened = false;
      // state.dictionaryTpyeList = [];
    },
    [getViewForm.fulfilled.type]: (state, action: PayloadAction<IGetViewFormResponse>) => {
      state.loading.getViewForm = false;
      state.viewFormDialogOpened = true;
      state.selectedOperationViewForm = action.payload;
      // state.dictionaryTpyeList = action.payload;
    },
    //* GET VIEW FORM END
  },
});

export const { closeDialog, setDialogSize, addItem, editItem, deleteItem } = configurationsNewSlice.actions;
