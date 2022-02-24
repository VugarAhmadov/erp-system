import React, { FC, memo, useState } from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { generate } from "short-uuid";
import { addItem, deleteItem, editItem } from "apps/security/configuration/configurations/store";
import { Components } from "../..";
import { StyledGridRowElementWithDnd } from "./grid-row-element-with-dnd.styled";
import { ActionPanel } from "../../action-panel";
import { ICloumn, IGridRowParams, IRow } from "../../types";
import { GridColumnElementWithDnd } from "../../grid-column";
import { GridRowDialog } from "..";

interface IGridRow {
  row: IRow;
}

export const GridRowElementWithDnd: FC<IGridRow> = memo(({ row }) => {
  const dispatch = useDispatch();

  const [dialogOpened, setDialogOpened] = useState(false);

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
    <>
      <StyledGridRowElementWithDnd container ref={dropColumn} style={{ backgroundColor }} {...row.params}>
        <ActionPanel onDeleteClick={() => dispatch(deleteItem(row.id))} onEditClick={() => setDialogOpened(true)} />
        {row.children.map((column: ICloumn) => (
          <GridColumnElementWithDnd key={column.id} column={column} />
        ))}
      </StyledGridRowElementWithDnd>
      <GridRowDialog
        open={dialogOpened}
        onClose={() => setDialogOpened(false)}
        onSubmit={(data: IGridRowParams) => dispatch(editItem({ id: row.id, params: data }))}
        params={row.params}
      />
    </>
  );
});
