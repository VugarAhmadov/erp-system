import React, { FC, Fragment, memo, useState } from "react";
import { ButtonElement, InputElement } from "..";

interface IElements {
  element: any;
  onDelete?(rowIndex: number, columnIndex: number): void;
  onEdit?(type: string, rowIndex: number, columnIndex: number): void;
  selectData?: any[];
  onSelectChange?(data: any): void;
}

export const Elements: FC<IElements> = memo(({ element, onEdit, onDelete, onSelectChange, selectData }) => {
  return (
    <Fragment key={element.index}>
      {element.type === "button" && (
        <ButtonElement
          withDnd
          onEdit={onEdit}
          onDelete={onDelete}
          rowIndex={element.rowIndex}
          columnIndex={element.columnIndex}
          params={element.params}
          {...element.params}
        />
      )}
      {element.type === "input" && (
        <InputElement
          withDnd
          onEdit={onEdit}
          onDelete={onDelete}
          rowIndex={element.rowIndex}
          columnIndex={element.columnIndex}
          dependedFieldData={
            element.params?.dependedComponent === "select" && element.params.dependedModelName
              ? selectData?.find((d) => d.model === element.params.dependedModelName)?.data
              : undefined
          }
          {...element.params}
        />
      )}
      {/* {element.element === "select" && (
        <SelectElement
          withDnd
          onEdit={onEdit}
          onDelete={onDelete}
          index={element.index}
          onSelectChange={(data: any) => onSelectChange(data)}
          {...element.params}
        />
      )}
      {element.element === "label" && (
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
