import React, { FC, memo, useState } from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { generate } from "short-uuid";
import { addItem, deleteItem, editItem } from "apps/security/configuration/configurations/store";
import { Components } from "../..";
import { StyledGridRowWithDnd } from "./grid-row-with-dnd.styled";
import { ActionPanel } from "../../action-panel";
import { IColumn, IGridRowParams, IRow } from "../../types";
import { GridColumnWithDnd } from "../../grid-column";
import { GridRowDialog } from "..";

interface IGridRow {
  row: IRow;
}

export const GridRowWithDnd: FC<IGridRow> = memo(({ row }) => {
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
            ...item,
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
      <StyledGridRowWithDnd
        container
        ref={dropColumn}
        style={{ backgroundColor }}
        direction={row?.params?.direction}
        justifyContent={row?.params?.justifyContent}
        alignItems={row?.params?.alignItems}
      >
        <ActionPanel onDeleteClick={() => dispatch(deleteItem(row.id))} onEditClick={() => setDialogOpened(true)} />
        {row.children.map((column: IColumn) => (
          <GridColumnWithDnd key={column.id} column={column} />
        ))}
      </StyledGridRowWithDnd>
      <GridRowDialog
        open={dialogOpened}
        onClose={() => setDialogOpened(false)}
        onSubmit={(data: IGridRowParams) => dispatch(editItem({ id: row.id, params: data }))}
        params={row?.params}
      />
    </>
  );
});
