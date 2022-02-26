import React, { FC, memo, useState } from "react";
import { useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import { generate } from "short-uuid";
import { StyledGridColumnElementWithDnd } from "./grid-column-element-with-dnd.styled";
import { addItem, deleteItem, editItem, moveItem } from "apps/security/configuration/configurations/store";
import { ICloumn, IGridColumnParams } from "../../types";
import { ActionPanel, ElementsWithDnd, Components, Content, GridColumnDialog } from "../..";

interface IGridColumnElementWithDnd {
  column: ICloumn;
}

export const GridColumnElementWithDnd: FC<IGridColumnElementWithDnd> = memo(({ column }) => {
  const dispatch = useDispatch();
  const [dialogOpened, setDialogOpened] = useState(false);

  const [{ isOverGridElement, canDropGridElement }, dropElement] = useDrop(
    () => ({
      accept: [Components.ELEMENT, Components.GRID],
      drop(item: any, monitor) {
        const didDrop = monitor.didDrop();

        if (didDrop) return;

        if (
          (column.children.length === 0 && item.type === "row") ||
          (column.children.length > 0 && column.children[0].type === "row" && item.type === "row") ||
          (column.children.length === 0 && item.type !== "row" && !item.move)
        ) {
          const id = generate();

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
            dispatch(
              addItem({
                id: item.params.tabs[1].id,
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
    []
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
      <StyledGridColumnElementWithDnd item xs={column.params.columnSize} ref={dropElement} style={{ backgroundColor }}>
        <ActionPanel
          onDeleteClick={() => dispatch(deleteItem(column.id))}
          onEditClick={() => setDialogOpened(true)}
          align="left"
        />

        {column.children.length > 0 && column.children[0].type === "row" && <Content content={column.children} />}

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
      </StyledGridColumnElementWithDnd>
      <GridColumnDialog
        open={dialogOpened}
        onClose={() => setDialogOpened(false)}
        onSubmit={(data: IGridColumnParams) => dispatch(editItem({ id: column.id, params: data }))}
        params={column?.params}
      />
    </>
  );
});
