import { Breakpoint } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOperation } from "apps/auth/store/types";
import { getViewForm, getDictionaryTypeList, getHtmlForm } from "./actions";
import {
  IAddColumnPayload,
  IAddElementPayload,
  IDeleteColumnPayload,
  IDeleteElementPayload,
  IDictionyType,
  IEditElementPayload,
  IGetHtmlFormResponse,
  IGetViewFormResponse,
  ILoading,
} from "./types";

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
    addGridRow: (state) => {
      let copy = [...state.selectedOperationHtmlForm.formContent];
      copy.push({
        index: copy.length,
        type: "grid-row",
        columns: [],
      });
      state.selectedOperationHtmlForm.formContent = copy;
    },
    deleteGridRow: (state, action: PayloadAction<number>) => {
      let copy = [...state.selectedOperationHtmlForm.formContent];
      copy.splice(action.payload, 1);
      copy.forEach((el, i) => {
        el.index = i;
      });
      state.selectedOperationHtmlForm.formContent = copy;
    },
    addGridColumn: (state, action: PayloadAction<IAddColumnPayload>) => {
      const { gridRowIndex, gridColumnSize } = action.payload;
      let copy = [...state.selectedOperationHtmlForm.formContent];
      copy[gridRowIndex].columns?.push({
        index: copy[gridRowIndex].columns.length,
        type: "grid-column",
        element: {},
        gridRowIndex,
        gridColumnSize,
      });
      state.selectedOperationHtmlForm.formContent = copy;
    },
    deleteGridColumn: (state, action: PayloadAction<IDeleteColumnPayload>) => {
      const { gridRowIndex, gridColumnIndex } = action.payload;

      let copy = [...state.selectedOperationHtmlForm.formContent];
      copy[gridRowIndex].columns.splice(gridColumnIndex, 1);
      // copy[gridRowIndex].columns.map((c: any, i: number) => ({ ...c, index: i }));
      copy[gridRowIndex].columns.forEach((c: any, i: number) => {
        c.index = i;
      });
      state.selectedOperationHtmlForm.formContent = copy;
    },
    addElement: (state, action: PayloadAction<IAddElementPayload>) => {
      const { gridRowIndex, gridColumnIndex, element } = action.payload;
      let copy = [...state.selectedOperationHtmlForm.formContent];
      if (element.move) {
        copy[element.gridRowIndex].columns[element.gridColumnIndex].element = {};
      }

      copy[gridRowIndex].columns[gridColumnIndex].element = { ...element, gridRowIndex, gridColumnIndex };
      state.selectedOperationHtmlForm.formContent = copy;
    },
    deleteElement: (state, action: PayloadAction<IDeleteElementPayload>) => {
      const { gridRowIndex, gridColumnIndex } = action.payload;

      let copy = [...state.selectedOperationHtmlForm.formContent];
      copy[gridRowIndex].columns[gridColumnIndex].element = {};
      state.selectedOperationHtmlForm.formContent = copy;
    },
    editElement: (state, action: PayloadAction<IEditElementPayload>) => {
      const { gridRowIndex, gridColumnIndex, params } = action.payload;

      let copy = [...state.selectedOperationHtmlForm.formContent];
      copy[gridRowIndex].columns[gridColumnIndex].element.params = params;
      state.selectedOperationHtmlForm.formContent = copy;
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

export const {
  closeDialog,
  setDialogSize,
  addGridRow,
  deleteGridRow,
  addGridColumn,
  deleteGridColumn,
  addElement,
  deleteElement,
  editElement,
} = configurationsNewSlice.actions;
