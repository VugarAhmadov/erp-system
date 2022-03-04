import React, { FC, Fragment, memo, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { addItem, deleteItem, editItem } from "apps/security/configuration/configurations/store";
import {
  ButtonDialog,
  ButtonElement,
  IButtonParams,
  TabDialog,
  TabElementWithDnd,
  CheckboxDialog,
  CheckboxElement,
  ICheckboxParams,
  DatepickerDialog,
  DatepickerElement,
  IDatepickerParams,
  FileUploadDialog,
  FileUploadElement,
  IFileUploadParams,
  ImageDialog,
  ImageElement,
  IImageParams,
  InputDialog,
  InputElement,
  IInputParams,
  LabelDialog,
  LabelElement,
  ILabelParams,
  RadioDialog,
  RadioElement,
  IRadioParams,
  SelectDialog,
  SelectElement,
  ISelectParams,
  TableDialog,
  TableElement,
  ITableParams,
  ProfileImageDialog,
  ProfileImageElement,
  IProfileImageParams,
} from "../../components";
import {} from "../../components";
import { IDialogState, ITabParams } from "../../types";
import { differenceWith, isEqual } from "lodash";

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
      profileImage: false,
    },
  });

  const handleDialogEdit = (type: string, id: number) => {
    setDialog((state) => ({
      open: { ...state.open, [type]: true },
    }));
  };

  const handleDialogClose = useCallback((type: string) => {
    setDialog((state) => ({ open: { ...state.open, [type]: false } }));
  }, []);

  const handleElementDelete = (id: number) => {
    dispatch(deleteItem(id));
  };

  const handleElementEdit = (
    id: number,
    data:
      | IButtonParams
      | IInputParams
      | IDatepickerParams
      | ISelectParams
      | ILabelParams
      | ICheckboxParams
      | IRadioParams
      | ITableParams
      | IImageParams
      | IFileUploadParams
  ) => {
    dispatch(editItem({ id, params: data }));
  };

  const handleTabEdit = (tab: any, data: ITabParams) => {
    dispatch(editItem({ id: tab.id, params: data }));

    const prevArr = tab.params.tabs.map((p: any) => p.id);
    const newArr = data.tabs?.map((n) => n.id);

    const deleted = differenceWith(prevArr, newArr as any, isEqual);
    const newAdded = differenceWith(newArr, prevArr, isEqual);

    if (deleted.length > 0) {
      deleted.map((d) => {
        dispatch(deleteItem(d));
      });
    }

    if (newAdded.length > 0) {
      newAdded.map((n) => {
        dispatch(
          addItem({
            id: n,
            parentId: tab.id,
            type: "tabContent",
            params: {},
          })
        );
      });
    }
  };

  const handleElementCopy = (id: string) => {};

  return (
    <Fragment key={element.index}>
      {element.type === "button" && (
        <>
          <ButtonElement
            withDnd
            onEdit={handleDialogEdit}
            onDelete={handleElementDelete}
            id={element.id}
            params={element.params}
          />
          <ButtonDialog
            open={dialog.open.button}
            onClose={() => handleDialogClose("button")}
            onSubmit={(data: IButtonParams) => handleElementEdit(element.id, data)}
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
            id={element.id}
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
            onSubmit={(data: IInputParams) => handleElementEdit(element.id, data)}
            params={element.params}
          />
        </>
      )}
      {element.type === "datepicker" && (
        <>
          <DatepickerElement
            withDnd
            onEdit={handleDialogEdit}
            onDelete={handleElementDelete}
            id={element.id}
            params={element.params}
          />
          <DatepickerDialog
            open={dialog.open.datepicker}
            onClose={() => handleDialogClose("datepicker")}
            onSubmit={(data: IDatepickerParams) => handleElementEdit(element.id, data)}
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
            onCopy={handleElementCopy}
            id={element.id}
            params={element.params}
            // onSelectChange={(data: any) => onSelectChange(data)}
          />
          <SelectDialog
            open={dialog.open.select}
            onClose={() => handleDialogClose("select")}
            onSubmit={(data: ISelectParams) => handleElementEdit(element.id, data)}
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
            id={element.id}
            params={element.params}
          />
          <LabelDialog
            open={dialog.open.label}
            onClose={() => handleDialogClose("label")}
            onSubmit={(data: ILabelParams) => handleElementEdit(element.id, data)}
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
            id={element.id}
            params={element.params}
          />
          <CheckboxDialog
            open={dialog.open.checkbox}
            onClose={() => handleDialogClose("checkbox")}
            onSubmit={(data: ICheckboxParams) => handleElementEdit(element.id, data)}
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
            id={element.id}
            params={element.params}
          />
          <RadioDialog
            open={dialog.open.radio}
            onClose={() => handleDialogClose("radio")}
            onSubmit={(data: IRadioParams) => handleElementEdit(element.id, data)}
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
            id={element.id}
            params={element.params}
          />
          <TableDialog
            open={dialog.open.table}
            onClose={() => handleDialogClose("table")}
            onSubmit={(data: ITableParams) => handleElementEdit(element.id, data)}
            params={element.params}
          />
        </>
      )}
      {element.type === "tab" && (
        <>
          <TabElementWithDnd tab={element} onEdit={handleDialogEdit} onDelete={handleElementDelete} />
          <TabDialog
            open={dialog.open.tab}
            onClose={() => handleDialogClose("tab")}
            onSubmit={(data: ITabParams) => handleTabEdit(element, data)} //handleElementEdit(element.id, data)}
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
            id={element.id}
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
            onSubmit={(data: IImageParams) => handleElementEdit(element.id, data)}
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
            id={element.id}
            params={element.params}
          />
          <FileUploadDialog
            open={dialog.open.fileUpload}
            onClose={() => handleDialogClose("fileUpload")}
            onSubmit={(data: IFileUploadParams) => handleElementEdit(element.id, data)}
            params={element.params}
          />
        </>
      )}
      {element.type === "profileImage" && (
        <>
          <ProfileImageElement
            withDnd
            onEdit={handleDialogEdit}
            onDelete={handleElementDelete}
            id={element.id}
            params={element.params}
          />
          <ProfileImageDialog
            open={dialog.open.profileImage}
            onClose={() => handleDialogClose("profileImage")}
            onSubmit={(data: IProfileImageParams) => handleElementEdit(element.id, data)}
            params={element.params}
          />
        </>
      )}
    </Fragment>
  );
});
