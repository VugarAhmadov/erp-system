import React, { FC } from "react";
import { Icon, IconButton } from "@mui/material";
import { useDrop } from "react-dnd";
import { StyledGridColumn } from "./grid-column.styled";
import { Components } from "../../../dialog-config/constants";
import { Elements } from "../elements";
import { InputElement } from "..";

interface IGridColumn {
  column: any;
  columnSize: number;
  onGridColumnDelete(columnIndex: number): void;
  onComponentAdd(columnIndex: number, element: any): void;
  onElementDelete(rowIndex: number, columnIndex: number): void;
  onElementEdit(type: string, rowIndex: number, columnIndex: number): void;
}

export const GridColumn: FC<IGridColumn> = ({
  column,
  columnSize,
  onGridColumnDelete,
  onComponentAdd,
  onElementDelete,
  onElementEdit,
}) => {
  const [{ isOverGridColumn, canDropGridColumn }, dropColumn] = useDrop(
    () => ({
      accept: Components.ELEMENT,
      drop(item: any, monitor) {
        onComponentAdd(column.index, item);
        return undefined;
      },
      collect: (monitor) => ({
        isOverGridColumn: monitor.isOver(),
        // isOverCurrent: monitor.isOver({ shallow: true }),
        canDropGridColumn: monitor.canDrop(),
      }),
    }),
    [onComponentAdd]
  );

  const isActiveGridColumn = isOverGridColumn && canDropGridColumn;
  let backgroundColor = "rgb(204, 204, 204, 0.2)";
  if (isActiveGridColumn) {
    backgroundColor = "darkblue";
  } else if (canDropGridColumn) {
    backgroundColor = "purple";
  }

  return (
    <StyledGridColumn item xs={columnSize} ref={dropColumn} style={{ backgroundColor }}>
      <IconButton size="small" className="column-delete-btn" onClick={() => onGridColumnDelete(column.index)}>
        <Icon fontSize="small">delete</Icon>
      </IconButton>
      {column?.element && (
        <Elements
          element={column.element}
          onEdit={onElementEdit}
          onDelete={onElementDelete}
          // selectData={selectData}
          // onSelectChange={(data: any) =>
          //   setSelectData((prev) => {
          //     if (prev.find((p) => p.model === element.params.model)) {
          //       return prev.map((n) => (n.model === element.params.model ? { ...n, data } : n));
          //     } else {
          //       return [...prev, { model: element.params.model, data }];
          //     }
          //   })
          // }
        />
      )}
    </StyledGridColumn>
  );
};
