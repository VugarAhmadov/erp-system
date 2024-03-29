import React, { FC, memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { generate } from "short-uuid";
import { StyledGridColumnWithDnd } from "./grid-column-with-dnd.styled";
import {
  addItem,
  applyCopiedItem,
  copyItem,
  deleteItem,
  editItem,
  moveItem,
} from "apps/security/configuration/configurations/store";
import { IColumn, IGridColumnParams } from "../../types";
import { ActionPanel, ElementsWithDnd, Components, ContentWithDnd, GridColumnDialog } from "../..";
import { AppState } from "store";
import { copyTreeNode } from "helpers";

interface IGridColumnWithDnd {
  column: IColumn;
}

export const GridColumnWithDnd: FC<IGridColumnWithDnd> = memo(({ column }) => {
  const dispatch = useDispatch();
  const [dialogOpened, setDialogOpened] = useState(false);
  const formContet = useSelector((state: AppState) => state.configurations.selectedOperationHtmlForm.formContent);

  const [{ isOverGridElement, canDropGridElement }, dropElement] = useDrop(
    () => ({
      accept: [Components.ELEMENT, Components.ROW],
      drop(item: any, monitor) {
        const didDrop = monitor.didDrop();

        if (didDrop) return;

        if (
          (column.children.length === 0 && item.type === "row") ||
          (column.children.length > 0 && column.children[0].type === "row" && item.type === "row") ||
          (column.children.length === 0 && item.type !== "row" && !item.move)
        ) {
          const id = generate();

          if (item.copied) {
            dispatch(applyCopiedItem({ copiedItemId: item.id, appliedItemId: column.id }));

            console.log(copyTreeNode(formContet, item.id, column.id));
            return;
          }

          dispatch(
            addItem({
              id,
              parentId: column.id,
              ...item,
            })
          );

          if (item.type === "tab") {
            dispatch(
              addItem({
                id: item.params.tabs[0].id,
                parentId: id,
                type: "tabContent",
                params: {},
              })
            );
          }
        } else if (column.children.length === 0 && item.type !== "row" && item.move) {
          dispatch(moveItem({ id: item.id, movedColumnId: column.id }));
        }

        return undefined;
      },
      collect: (monitor) => ({
        isOverGridElement: monitor.isOver(),
        canDropGridElement: monitor.canDrop(),
      }),
    }),
    [column]
  );

  const isActiveGridElement = isOverGridElement && canDropGridElement;
  let backgroundColor = "rgb(204, 204, 204, 0.2)";
  if (isActiveGridElement) {
    backgroundColor = "darkblue";
  } else if (canDropGridElement) {
    backgroundColor = "purple";
  }

  return (
    <>
      <StyledGridColumnWithDnd item xs={column.params.columnSize} ref={dropElement} style={{ backgroundColor }}>
        <ActionPanel
          onDeleteClick={() => dispatch(deleteItem(column.id))}
          onEditClick={() => setDialogOpened(true)}
          onCopyClick={() => dispatch(copyItem({ type: "column", id: column.id }))}
          align="left"
        />

        {column.children.length > 0 && column.children[0].type === "row" && (
          <ContentWithDnd content={column.children} />
        )}

        {column.children.length === 1 && column.children[0].type !== "row" && (
          <ElementsWithDnd
            element={column.children[0]}
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
      </StyledGridColumnWithDnd>
      <GridColumnDialog
        open={dialogOpened}
        onClose={() => setDialogOpened(false)}
        onSubmit={(data: IGridColumnParams) => dispatch(editItem({ id: column.id, params: data }))}
        params={column?.params}
      />
    </>
  );
});
