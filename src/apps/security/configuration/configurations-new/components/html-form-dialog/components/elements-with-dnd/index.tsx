import React, { FC, Fragment, memo, useCallback, useState } from "react";
import { deleteElement, editElement } from "apps/security/configuration/configurations-new/store";
import { useDispatch } from "react-redux";
import {
  ButtonDialog,
  ButtonElement,
  CheckboxDialog,
  CheckboxElement,
  DatepickerDialog,
  DatepickerElement,
  FileUploadDialog,
  FileUploadElement,
  ImageDialog,
  ImageElement,
  InputDialog,
  InputElement,
  LabelDialog,
  LabelElement,
  RadioDialog,
  RadioElement,
  SelectDialog,
  SelectElement,
  TabDialog,
  TabElement,
  TableDialog,
  TableElement,
} from "./components";
import { IButtonParams } from "./components/button/button-element";
import { IInputParams } from "./components/input/input-element";
import { IDatepickerParams } from "./components/datepicker/datepicker-element";
import { IDialogState } from "./components/dialog/types";
import { ISelectParams } from "./components/select/select-element";
import { ILabelParams } from "./components/label/label-element";
import { ICheckboxParams } from "./components/checkbox/checkbox-element";
import { IRadioParams } from "./components/radio/radio-element";
import { ITableParams } from "./components/table/table-element";
import { ITabParams } from "./components/tab/tab-element";
import { IImageParams } from "./components/image/image-element";
import { IFileUploadParams } from "./components/file-upload/file-upload-element";

interface IElementsWithDnd {
  element: any;
  selectData?: any[];
  onSelectChange?(data: any): void;
}

export const ElementsWithDnd: FC<IElementsWithDnd> = memo(({ element, onSelectChange, selectData }) => {
  const dispatch = useDispatch();

  const [dialog, setDialog] = useState<IDialogState>({
    open: {
      input: false,
      select: false,
      checkbox: false,
      label: false,
      radio: false,
      datepicker: false,
      button: false,
      image: false,
      table: false,
      tab: false,
      fileUpload: false,
    },
  });

  const handleDialogEdit = (type: string, rowIndex: number, columnIndex: number) => {
    setDialog((state) => ({
      open: { ...state.open, [type]: true },
    }));
  };

  const handleDialogClose = useCallback((type: string) => {
    setDialog((state) => ({ open: { ...state.open, [type]: false }, data: null }));
  }, []);

  const handleElementDelete = (gridRowIndex: number, gridColumnIndex: number) => {
    dispatch(deleteElement({ gridRowIndex, gridColumnIndex }));
  };

  const handleElementEdit = (
    gridRowIndex: number,
    gridColumnIndex: number,
    data:
      | IButtonParams
      | IInputParams
      | IDatepickerParams
      | ISelectParams
      | ILabelParams
      | ICheckboxParams
      | IRadioParams
      | ITableParams
      | ITabParams
      | IImageParams
      | IFileUploadParams
  ) => {
    dispatch(editElement({ gridRowIndex, gridColumnIndex, params: data }));
  };

  return (
    <Fragment key={element.index}>
      {element.type === "button" && (
        <>
          <ButtonElement
            withDnd
            onEdit={handleDialogEdit}
            onDelete={handleElementDelete}
            gridRowIndex={element.gridRowIndex}
            gridColumnIndex={element.gridColumnIndex}
            params={element.params}
          />
          <ButtonDialog
            open={dialog.open.button}
            onClose={() => handleDialogClose("button")}
            onSubmit={(data: IButtonParams) => handleElementEdit(element.gridRowIndex, element.gridColumnIndex, data)}
            params={element.params}
          />
        </>
      )}
      {element.type === "input" && (
        <>
          <InputElement
            withDnd
            onEdit={handleDialogEdit}
            onDelete={handleElementDelete}
            gridRowIndex={element.gridRowIndex}
            gridColumnIndex={element.gridColumnIndex}
            params={element.params}
            dependedFieldData={
              element.params?.dependedComponent === "select" && element.params.dependedModelName
                ? selectData?.find((d) => d.model === element.params.dependedModelName)?.data
                : undefined
            }
          />
          <InputDialog
            open={dialog.open.input}
            onClose={() => handleDialogClose("input")}
            onSubmit={(data: IInputParams) => handleElementEdit(element.gridRowIndex, element.gridColumnIndex, data)}
            params={element.params}
            // dependableModelNames={formElements?.filter((e) => e.element === "select").map((e) => e.params.model)}
          />
        </>
      )}
      {element.type === "datepicker" && (
        <>
          <DatepickerElement
            withDnd
            onEdit={handleDialogEdit}
            onDelete={handleElementDelete}
            gridRowIndex={element.gridRowIndex}
            gridColumnIndex={element.gridColumnIndex}
            params={element.params}
          />
          <DatepickerDialog
            open={dialog.open.datepicker}
            onClose={() => handleDialogClose("datepicker")}
            onSubmit={(data: IDatepickerParams) =>
              handleElementEdit(element.gridRowIndex, element.gridColumnIndex, data)
            }
            params={element.params}
          />
        </>
      )}
      {element.type === "select" && (
        <>
          <SelectElement
            withDnd
            onEdit={handleDialogEdit}
            onDelete={handleElementDelete}
            gridRowIndex={element.gridRowIndex}
            gridColumnIndex={element.gridColumnIndex}
            params={element.params}
            // onSelectChange={(data: any) => onSelectChange(data)}
          />
          <SelectDialog
            open={dialog.open.select}
            onClose={() => handleDialogClose("select")}
            onSubmit={(data: ISelectParams) => handleElementEdit(element.gridRowIndex, element.gridColumnIndex, data)}
            params={element.params}
          />
        </>
      )}
      {element.type === "label" && (
        <>
          <LabelElement
            withDnd
            onEdit={handleDialogEdit}
            onDelete={handleElementDelete}
            gridRowIndex={element.gridRowIndex}
            gridColumnIndex={element.gridColumnIndex}
            params={element.params}
          />
          <LabelDialog
            open={dialog.open.label}
            onClose={() => handleDialogClose("label")}
            onSubmit={(data: ILabelParams) => handleElementEdit(element.gridRowIndex, element.gridColumnIndex, data)}
            params={element.params}
          />
        </>
      )}
      {element.type === "checkbox" && (
        <>
          <CheckboxElement
            withDnd
            onEdit={handleDialogEdit}
            onDelete={handleElementDelete}
            gridRowIndex={element.gridRowIndex}
            gridColumnIndex={element.gridColumnIndex}
            params={element.params}
          />
          <CheckboxDialog
            open={dialog.open.checkbox}
            onClose={() => handleDialogClose("checkbox")}
            onSubmit={(data: ICheckboxParams) => handleElementEdit(element.gridRowIndex, element.gridColumnIndex, data)}
            params={element.params}
          />
        </>
      )}

      {element.type === "radio" && (
        <>
          <RadioElement
            withDnd
            onEdit={handleDialogEdit}
            onDelete={handleElementDelete}
            gridRowIndex={element.gridRowIndex}
            gridColumnIndex={element.gridColumnIndex}
            params={element.params}
          />
          <RadioDialog
            open={dialog.open.radio}
            onClose={() => handleDialogClose("radio")}
            onSubmit={(data: IRadioParams) => handleElementEdit(element.gridRowIndex, element.gridColumnIndex, data)}
            params={element.params}
          />
        </>
      )}
      {element.type === "table" && (
        <>
          <TableElement
            withDnd
            onEdit={handleDialogEdit}
            onDelete={handleElementDelete}
            gridRowIndex={element.gridRowIndex}
            gridColumnIndex={element.gridColumnIndex}
            params={element.params}
          />
          <TableDialog
            open={dialog.open.table}
            onClose={() => handleDialogClose("table")}
            onSubmit={(data: ITableParams) => handleElementEdit(element.gridRowIndex, element.gridColumnIndex, data)}
            params={element.params}
          />
        </>
      )}
      {element.type === "tab" && (
        <>
          <TabElement
            withDnd
            onEdit={handleDialogEdit}
            onDelete={handleElementDelete}
            gridRowIndex={element.gridRowIndex}
            gridColumnIndex={element.gridColumnIndex}
            params={element.params}
          />
          <TabDialog
            open={dialog.open.tab}
            onClose={() => handleDialogClose("tab")}
            onSubmit={(data: ITabParams) => handleElementEdit(element.gridRowIndex, element.gridColumnIndex, data)}
            params={element.params}
          />
        </>
      )}
      {element.type === "image" && (
        <>
          <ImageElement
            withDnd
            onEdit={handleDialogEdit}
            onDelete={handleElementDelete}
            gridRowIndex={element.gridRowIndex}
            gridColumnIndex={element.gridColumnIndex}
            params={element.params}
            // dependedFieldData={
            //   element.params.dependedComponent === "select" && element.params.dependedModelName
            //     ? selectData.find((d) => d.model === element.params.dependedModelName)?.data
            //     : undefined
            // }
          />
          <ImageDialog
            open={dialog.open.image}
            onClose={() => handleDialogClose("image")}
            onSubmit={(data: IImageParams) => handleElementEdit(element.gridRowIndex, element.gridColumnIndex, data)}
            params={element.params}
          />
        </>
      )}
      {element.type === "file-upload" && (
        <>
          <FileUploadElement
            withDnd
            onEdit={handleDialogEdit}
            onDelete={handleElementDelete}
            gridRowIndex={element.gridRowIndex}
            gridColumnIndex={element.gridColumnIndex}
            params={element.params}
          />
          <FileUploadDialog
            open={dialog.open.fileUpload}
            onClose={() => handleDialogClose("fileUpload")}
            onSubmit={(data: IFileUploadParams) =>
              handleElementEdit(element.gridRowIndex, element.gridColumnIndex, data)
            }
            params={element.params}
          />
        </>
      )}
    </Fragment>
  );
});
