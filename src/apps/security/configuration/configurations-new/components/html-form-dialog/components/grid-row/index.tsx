import React, { FC, memo } from "react";
import { Icon, IconButton } from "@mui/material";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { Components } from "../dialog-config/constants";
import { StyledGridRow } from "./grid-row.styled";
import { addGridColumn, addItem, deleteGridRow } from "apps/security/configuration/configurations-new/store";
import { GridColumn } from "..";
import { ICloumn, IRow } from "../types";
import { uniqueId } from "lodash";

interface IGridRow {
  row: IRow;
}

export const GridRow: FC<IGridRow> = memo(({ row }) => {
  const dispatch = useDispatch();

  const getColumnIsAllowed = (columnSize: number = 0) => {
    // if (gridRow.columns.length > 0) {
    //   const sumOfColumnSizes =
    //     gridRow.columns.map((c: any) => c.gridColumnSize).reduce((prev: number, curr: number) => prev + curr, 0) +
    //     columnSize;

    //   if (sumOfColumnSizes <= 12) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // }
    return true;
  };

  const [{ isOverGridColumn, canDropGridColumn }, dropColumn] = useDrop(
    () => ({
      accept: Components.COLUMN,
      drop(item: { columnSize: number }, monitor) {
        const didDrop = monitor.didDrop();

        if (didDrop) return;

        if (!getColumnIsAllowed(item.columnSize)) return;

        dispatch(
          addItem({
            id: uniqueId(),
            parentId: row.id,
            index: null,
            type: "column",
            params: {
              columnSize: item.columnSize,
            },
            children: [],
          })
        );
        // dispatch(addGridColumn({ gridRowIndex: gridRow.index, gridColumnSize: item.columnSize }));
        return undefined;
      },
      collect: (monitor) => ({
        isOverGridColumn: monitor.isOver() && getColumnIsAllowed(),
        canDropGridColumn: monitor.canDrop() && getColumnIsAllowed(),
      }),
    }),
    [row]
  );

  const isActiveGridRow = isOverGridColumn && canDropGridColumn;
  let backgroundColor = "rgb(204, 204, 204, 0.2)";
  if (isActiveGridRow) {
    backgroundColor = "darkgreen";
  } else if (canDropGridColumn) {
    backgroundColor = "darkkhaki";
  }

  return (
    <StyledGridRow container ref={dropColumn} style={{ backgroundColor }}>
      {/* <IconButton size="small" className="row-delete-btn" onClick={() => dispatch(deleteGridRow(gridRow.index))}>
        <Icon fontSize="small">delete</Icon>
      </IconButton> */}
      {row.children.map((column: ICloumn) => (
        <GridColumn key={column.id} column={column} />
      ))}
    </StyledGridRow>
  );
});
