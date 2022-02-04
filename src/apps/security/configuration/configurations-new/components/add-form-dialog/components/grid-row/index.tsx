import React, { FC } from "react";
import { Icon, IconButton } from "@mui/material";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { Components } from "../dialog-config/constants";
import { StyledGridRow } from "./grid-row.styled";
import { addGridColumn, deleteGridRow } from "apps/security/configuration/configurations-new/store";
import { GridColumn } from "..";

interface IGridRow {
  gridRow: any;
}

export const GridRow: FC<IGridRow> = ({ gridRow }) => {
  const dispatch = useDispatch();

  const getColumnIsAllowed = (columnSize: number = 0) => {
    if (gridRow.columns.length > 0) {
      const sumOfColumnSizes =
        gridRow.columns.map((c: any) => c.gridColumnSize).reduce((prev: number, curr: number) => prev + curr, 0) +
        columnSize;

      if (sumOfColumnSizes <= 12) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  };

  const [{ isOverGridColumn, canDropGridColumn }, dropColumn] = useDrop(
    () => ({
      accept: Components.COLUMN,
      drop(item: { columnSize: number }, monitor) {
        if (!getColumnIsAllowed(item.columnSize)) return;

        dispatch(addGridColumn({ gridRowIndex: gridRow.index, gridColumnSize: item.columnSize }));
        return undefined;
      },
      collect: (monitor) => ({
        isOverGridColumn: monitor.isOver() && getColumnIsAllowed(),
        canDropGridColumn: monitor.canDrop() && getColumnIsAllowed(),
      }),
    }),
    []
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
      <IconButton size="small" className="row-delete-btn" onClick={() => dispatch(deleteGridRow(gridRow.index))}>
        <Icon fontSize="small">delete</Icon>
      </IconButton>
      {gridRow.columns?.map((gridColumn: any) => (
        <GridColumn key={gridColumn.index} gridColumn={gridColumn} />
      ))}
    </StyledGridRow>
  );
};
