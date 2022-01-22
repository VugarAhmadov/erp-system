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
} from "..";

interface IElements {
  element: any;
  onDelete(index: number): void;
  onEdit(type: string, index: number): void;
}

export const Elements: FC<IElements> = memo(({ element, onEdit, onDelete }) => {
  const [selectData, setSelectData] = useState<any[]>([]);

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
          onSelectChange={(data: any) => {
            setSelectData((prev) => {
              if (prev.find((p) => p.model === element.params.model)) {
                return prev.map((n) => (n.model === element.params.model ? { ...n, data } : n));
              } else {
                return [...prev, { model: element.params.model, data }];
              }
            });
          }}
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
    </Fragment>
  );
});
