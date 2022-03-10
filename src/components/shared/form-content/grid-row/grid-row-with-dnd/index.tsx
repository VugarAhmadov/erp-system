import React, { FC, memo, useState } from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { generate } from "short-uuid";
import { addItem, copyItem, deleteItem, editItem } from "apps/security/configuration/configurations/store";
import { Components } from "../..";
import { StyledGridRowWithDnd } from "./grid-row-with-dnd.styled";
import { ActionPanel } from "../../action-panel";
import { IColumn, IGridRowParams, IRow } from "../../types";
import { GridColumnWithDnd } from "../../grid-column";
import { GridRowDialog } from "..";
import { copyTreeNode } from "helpers";
import { AppState } from "store";

interface IGridRow {
  row: IRow;
}

export const GridRowWithDnd: FC<IGridRow> = memo(({ row }) => {
  const dispatch = useDispatch();

  const [dialogOpened, setDialogOpened] = useState(false);
  const formContet = useSelector((state: AppState) => state.configurations.selectedOperationHtmlForm.formContent);

  const [{ isOverColumn, canDropColumn }, dropColumn] = useDrop(
    () => ({
      accept: Components.COLUMN,
      drop(item: any, monitor) {
        const didDrop = monitor.didDrop();

        if (didDrop) return;

        if (item.copied) {
          console.log(copyTreeNode(formContet, item.id, row.id));
          return;
        }
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
        style={{
          backgroundColor,
          width: row.params.width && `${row.params.width}px`,
          height: row.params.height && `${row.params.height}px`,
          marginBottom: `${row.params.marginBottom}px`,
          marginTop: `${row.params.marginTop}px`,
        }}
        direction={row?.params?.direction}
        justifyContent={row?.params?.justifyContent}
        alignItems={row?.params?.alignItems}
      >
        <ActionPanel
          onDeleteClick={() => dispatch(deleteItem(row.id))}
          onEditClick={() => setDialogOpened(true)}
          onCopyClick={() => dispatch(copyItem({ type: "row", id: row.id }))}
        />
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
