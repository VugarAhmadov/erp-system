import React, { FC } from "react";
import { StyledGridRow } from "./grid-row.styled";
import { Grid, Icon, IconButton } from "@mui/material";
import { useDrop } from "react-dnd";
import { Components } from "../../../dialog-config/constants";
import { GridColumn } from "../grid-column";

interface IGridRow {
  grid: any;
  onColumnAdd(gridIndex: number): void;
  onGridRowDelete(index: number): void;
  onGridColumnDelete(rowIndex: number, columnIndex: number): void;
  onComponentAdd(rowIndex: number, columnIndex: number, element: any): void;
  onElementDelete(rowIndex: number, columnIndex: number): void;
  onElementEdit(type: string, rowIndex: number, columnIndex: number): void;
}

export const GridRow: FC<IGridRow> = ({
  grid,
  onColumnAdd,
  onGridColumnDelete,
  onGridRowDelete,
  onComponentAdd,
  onElementDelete,
  onElementEdit,
}) => {
  const [{ isOverGridRow, canDropGridRow }, dropRow] = useDrop(
    () => ({
      accept: Components.COLUMN,
      drop(item: any, monitor) {
        console.log(item);
        onColumnAdd(grid.index);
        return undefined;
      },
      collect: (monitor) => ({
        isOverGridRow: monitor.isOver(),
        canDropGridRow: monitor.canDrop(),
      }),
    }),
    [onColumnAdd]
  );

  const isActiveGridRow = isOverGridRow && canDropGridRow;
  let backgroundColor = "rgb(204, 204, 204, 0.2)";
  if (isActiveGridRow) {
    backgroundColor = "darkgreen";
  } else if (canDropGridRow) {
    backgroundColor = "darkkhaki";
  }

  return (
    <StyledGridRow container ref={dropRow} style={{ backgroundColor }}>
      <IconButton size="small" className="row-delete-btn" onClick={() => onGridRowDelete(grid.index)}>
        <Icon fontSize="small">delete</Icon>
      </IconButton>
      {grid.columns?.map((column: any) => (
        <GridColumn
          key={column.key}
          column={column}
          columnSize={12 / grid.columns.length}
          onGridColumnDelete={(columnIndex: number) => onGridColumnDelete(grid.index, columnIndex)}
          onComponentAdd={(columnIndex: number, element: any) => onComponentAdd(grid.index, columnIndex, element)}
          onElementDelete={onElementDelete}
          onElementEdit={onElementEdit}
        />
      ))}
    </StyledGridRow>
  );
};
