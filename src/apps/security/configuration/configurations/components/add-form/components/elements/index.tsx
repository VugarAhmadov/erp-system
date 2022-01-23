import React, { FC, Fragment, memo, useState } from "react";
import {
  InputElement,
  SelectElement,
  ButtonElement,
  CheckboxElement,
  DatepickerElement,
  LabelElement,
  ImageElement,
  TableElement,
  TabElement,
  RadioElement,
} from "..";

interface IElements {
  element: any;
  onDelete(index: number): void;
  onEdit(type: string, index: number): void;
  selectData: any[];
  onSelectChange(data: any): void;
}

export const Elements: FC<IElements> = memo(({ element, onEdit, onDelete, onSelectChange, selectData }) => {
  return (
    <Fragment key={element.index}>
      {element.element === "input" && (
        <InputElement
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
      {element.element === "select" && (
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
      {element.element === "button" && (
        <ButtonElement withDnd onEdit={onEdit} onDelete={onDelete} index={element.index} {...element.params} />
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
      )}
    </Fragment>
  );
});
