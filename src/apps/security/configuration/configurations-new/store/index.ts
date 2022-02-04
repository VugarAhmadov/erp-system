import { Breakpoint } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOperation } from "apps/auth/store/types";
import { getDictionaryTypeList, getHtmlFormOrViewname } from "./actions";
import {
  IAddColumnPayload,
  IAddElementPayload,
  IDeleteColumnPayload,
  IDeleteElementPayload,
  IDictionyType,
  IEditElementPayload,
  IGetHtmlFormOrViewnameResponse,
  ILoading,
} from "./types";

export interface IConfigurationsState {
  loading: ILoading;
  dialogOpened: boolean;
  selectedOperation: IGetHtmlFormOrViewnameResponse;
  // dictionaryTpyeList: IDictionyType[];
}

const initialState: IConfigurationsState = {
  loading: {
    getDictionaryTypeList: false,
    getHtmlFormOrViewname: false,
  },
  dialogOpened: false,
  selectedOperation: {} as IGetHtmlFormOrViewnameResponse,
  // dictionaryTpyeList: [],
};

export const configurationsNewSlice = createSlice({
  name: "configurationsNew",
  initialState: initialState,
  reducers: {
    closeDialog: (state) => {
      state.dialogOpened = false;
      state.selectedOperation = {} as IGetHtmlFormOrViewnameResponse;
    },
    setDialogSize: (state, action: PayloadAction<Breakpoint>) => {
      state.selectedOperation.dialogSize = action.payload;
    },
    addGridRow: (state) => {
      let copy = [...state.selectedOperation.formContent];
      copy.push({
        index: copy.length,
        type: "grid-row",
        columns: [],
      });
      state.selectedOperation.formContent = copy;
    },
    deleteGridRow: (state, action: PayloadAction<number>) => {
      let copy = [...state.selectedOperation.formContent];
      copy.splice(action.payload, 1);
      copy.forEach((el, i) => {
        el.index = i;
      });
      state.selectedOperation.formContent = copy;
    },
    addGridColumn: (state, action: PayloadAction<IAddColumnPayload>) => {
      const { gridRowIndex, gridColumnSize } = action.payload;
      let copy = [...state.selectedOperation.formContent];
      copy[gridRowIndex].columns?.push({
        index: copy[gridRowIndex].columns.length,
        type: "grid-column",
        element: {},
        gridRowIndex,
        gridColumnSize,
      });
      state.selectedOperation.formContent = copy;
    },
    deleteGridColumn: (state, action: PayloadAction<IDeleteColumnPayload>) => {
      const { gridRowIndex, gridColumnIndex } = action.payload;

      let copy = [...state.selectedOperation.formContent];
      copy[gridRowIndex].columns.splice(gridColumnIndex, 1);
      // copy[gridRowIndex].columns.map((c: any, i: number) => ({ ...c, index: i }));
      copy[gridRowIndex].columns.forEach((c: any, i: number) => {
        c.index = i;
      });
      state.selectedOperation.formContent = copy;
    },
    addElement: (state, action: PayloadAction<IAddElementPayload>) => {
      const { gridRowIndex, gridColumnIndex, element } = action.payload;
      let copy = [...state.selectedOperation.formContent];
      if (element.move) {
        copy[element.gridRowIndex].columns[element.gridColumnIndex].element = {};
      }

      copy[gridRowIndex].columns[gridColumnIndex].element = { ...element, gridRowIndex, gridColumnIndex };
      state.selectedOperation.formContent = copy;
    },
    deleteElement: (state, action: PayloadAction<IDeleteElementPayload>) => {
      const { gridRowIndex, gridColumnIndex } = action.payload;

      let copy = [...state.selectedOperation.formContent];
      copy[gridRowIndex].columns[gridColumnIndex].element = {};
      state.selectedOperation.formContent = copy;
    },
    editElement: (state, action: PayloadAction<IEditElementPayload>) => {
      const { gridRowIndex, gridColumnIndex, params } = action.payload;

      let copy = [...state.selectedOperation.formContent];
      copy[gridRowIndex].columns[gridColumnIndex].element.params = params;
      state.selectedOperation.formContent = copy;
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
    //* GET HTML FORM OR VIEWNAME
    [getHtmlFormOrViewname.pending.type]: (state) => {
      state.loading.getHtmlFormOrViewname = true;
    },
    [getHtmlFormOrViewname.rejected.type]: (state) => {
      state.loading.getHtmlFormOrViewname = false;
      state.dialogOpened = false;
      // state.dictionaryTpyeList = [];
    },
    [getHtmlFormOrViewname.fulfilled.type]: (state, action: PayloadAction<IGetHtmlFormOrViewnameResponse>) => {
      state.loading.getHtmlFormOrViewname = false;
      state.dialogOpened = true;
      state.selectedOperation = action.payload;
      // state.dictionaryTpyeList = action.payload;
    },
    //* GET HTML FORM OR VIEWNAME END
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
