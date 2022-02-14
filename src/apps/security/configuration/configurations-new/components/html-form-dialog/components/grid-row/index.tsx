import React, { FC, memo } from "react";
import { Icon, IconButton } from "@mui/material";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { Components } from "../dialog-config/constants";
import { StyledGridRow } from "./grid-row.styled";
import { addItem, deleteItem } from "apps/security/configuration/configurations-new/store";
import { GridColumn } from "..";
import { ICloumn, IRow } from "../types";
import { uniqueId } from "lodash";

interface IGridRow {
  row: IRow;
}

export const GridRow: FC<IGridRow> = memo(({ row }) => {
  const dispatch = useDispatch();

  const [{ isOverColumn, canDropColumn }, dropColumn] = useDrop(
    () => ({
      accept: Components.COLUMN,
      drop(item: { columnSize: number }, monitor) {
        const didDrop = monitor.didDrop();

        if (didDrop) return;

        dispatch(
          addItem({
            id: uniqueId(),
            parentId: row.id,
            type: "column",
            params: {
              columnSize: item.columnSize,
            },
          })
        );

        return undefined;
      },
      collect: (monitor) => ({
        isOverColumn: monitor.isOver(),
        canDropColumn: monitor.canDrop(),
      }),
    }),
    [row]
  );

  const isActiveRow = isOverColumn && canDropColumn;
  let backgroundColor = "rgb(204, 204, 204, 0.2)";
  if (isActiveRow) {
    backgroundColor = "darkgreen";
  } else if (canDropColumn) {
    backgroundColor = "darkkhaki";
  }

  return (
    <StyledGridRow container ref={dropColumn} style={{ backgroundColor }}>
      <IconButton size="small" className="row-delete-btn" onClick={() => dispatch(deleteItem(row.id))}>
        <Icon fontSize="small">delete</Icon>
      </IconButton>
      {row.children.map((column: ICloumn) => (
        <GridColumn key={column.id} column={column} />
      ))}
    </StyledGridRow>
  );
});
