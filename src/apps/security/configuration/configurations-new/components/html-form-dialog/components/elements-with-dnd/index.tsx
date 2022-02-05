import React, { FC, Fragment, memo, useCallback, useState } from "react";
import { deleteElement, editElement } from "apps/security/configuration/configurations-new/store";
import { useDispatch } from "react-redux";
import {
  ButtonDialog,
  ButtonElement,
  DatepickerDialog,
  DatepickerElement,
  InputDialog,
  InputElement,
  SelectDialog,
  SelectElement,
} from "./components";
import { IButtonParams } from "./components/button/button-element";
import { IInputParams } from "./components/input/input-element";
import { IDatepickerParams } from "./components/datepicker/datepicker-element";
import { IDialogState } from "./components/dialog/types";
import { ISelectParams } from "./components/select/select-element";

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
    data: IButtonParams | IInputParams | IDatepickerParams
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
      {/* {element.element === "label" && (
        <LabelElement withDnd onEdit={onEdit} onDelete={onDelete} index={element.index} {...element.params} />
      )}
      {element.element === "checkbox" && (
        <CheckboxElement withDnd onEdit={onEdit} onDelete={onDelete} index={element.index} {...element.params} />
      )}
      {element.element === "datepicker" && (
        <DatepickerElement withDnd onEdit={onEdit} onDelete={onDelete} index={element.index} {...element.params} />
      )}
      
      {element.element === "image" && (
        <ImageElement
          withDnd
          onEdit={onEdit}
          onDelete={onDelete}
          index={element.index}
          dependedFieldData={
            element.params.dependedComponent === "select" && element.params.dependedModelName
              ? selectData.find((d) => d.model === element.params.dependedModelName)?.data
              : undefined
          }
          {...element.params}
        />
      )}
      {element.element === "table" && (
        <TableElement withDnd onEdit={onEdit} onDelete={onDelete} index={element.index} {...element.params} />
      )}
      {element.element === "tab" && (
        <TabElement withDnd onEdit={onEdit} onDelete={onDelete} index={element.index} {...element.params} />
      )}
      {element.element === "radio" && (
        <RadioElement withDnd onEdit={onEdit} onDelete={onDelete} index={element.index} {...element.params} />
      )} */}
    </Fragment>
  );
});
