import React, { FC, memo } from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { Components } from "../..";
import { StyledGridRowElementWithDnd } from "./grid-row-element-with-dnd.styled";
import { addItem, deleteItem } from "apps/security/configuration/configurations/store";
import { generate } from "short-uuid";
import { ActionPanel } from "../../action-panel";
import { IRow } from "../../types";

interface IGridRow {
  row: IRow;
}

export const GridRowElementWithDnd: FC<IGridRow> = memo(({ row, children }) => {
  const dispatch = useDispatch();

  const [{ isOverColumn, canDropColumn }, dropColumn] = useDrop(
    () => ({
      accept: Components.COLUMN,
      drop(item: { columnSize: number }, monitor) {
        const didDrop = monitor.didDrop();

        if (didDrop) return;

        dispatch(
          addItem({
            id: generate(),
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
    <StyledGridRowElementWithDnd container ref={dropColumn} style={{ backgroundColor }}>
      <ActionPanel onDeleteClick={() => dispatch(deleteItem(row.id))} />
      {children}
    </StyledGridRowElementWithDnd>
  );
});
