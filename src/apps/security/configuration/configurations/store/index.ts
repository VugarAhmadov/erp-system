import { Breakpoint } from "@mui/material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteTreeNode } from "helpers";
import { getViewForm, getHtmlForm } from "./actions";
import { IGetHtmlFormResponse, IGetViewFormResponse, ILoading } from "./types";

export interface IConfigurationsState {
  loading: ILoading;
  htmlFormDialogOpened: boolean;
  viewFormDialogOpened: boolean;
  selectedOperationHtmlForm: IGetHtmlFormResponse;
  selectedOperationViewForm: IGetViewFormResponse;
}

const initialState: IConfigurationsState = {
  loading: {
    getHtmlForm: false,
    getViewForm: false,
  },
  htmlFormDialogOpened: false,
  viewFormDialogOpened: false,
  selectedOperationHtmlForm: {} as IGetHtmlFormResponse,
  selectedOperationViewForm: {} as IGetViewFormResponse,
};

export const configurationsSlice = createSlice({
  name: "configurations",
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
    deleteItem: (state, action: PayloadAction<string>) => {
      let copy = [...state.selectedOperationHtmlForm.formContent];

      state.selectedOperationHtmlForm.formContent = deleteTreeNode(copy, action.payload);
    },
    moveItem: (state, action: PayloadAction<any>) => {
      const { id, movedColumnId } = action.payload;
      let copy = [...state.selectedOperationHtmlForm.formContent];

      copy.find((c) => c.id === id).parentId = movedColumnId;

      state.selectedOperationHtmlForm.formContent = copy;
    },
    copyItem: (state, action: PayloadAction<any>) => {},
  },
  extraReducers: {
    //* GET HTML FORM
    [getHtmlForm.pending.type]: (state) => {
      state.loading.getHtmlForm = true;
    },
    [getHtmlForm.rejected.type]: (state) => {
      state.loading.getHtmlForm = false;
      state.htmlFormDialogOpened = false;
    },
    [getHtmlForm.fulfilled.type]: (state, action: PayloadAction<IGetHtmlFormResponse>) => {
      state.loading.getHtmlForm = false;
      state.htmlFormDialogOpened = true;
      state.selectedOperationHtmlForm = action.payload;
    },
    //* GET HTML FORM END
    //* GET VIEW FORM
    [getViewForm.pending.type]: (state) => {
      state.loading.getViewForm = true;
    },
    [getViewForm.rejected.type]: (state) => {
      state.loading.getViewForm = false;
      state.viewFormDialogOpened = false;
    },
    [getViewForm.fulfilled.type]: (state, action: PayloadAction<IGetViewFormResponse>) => {
      state.loading.getViewForm = false;
      state.viewFormDialogOpened = true;
      state.selectedOperationViewForm = action.payload;
    },
    //* GET VIEW FORM END
  },
});

export const { closeDialog, setDialogSize, addItem, editItem, deleteItem, moveItem } = configurationsSlice.actions;
