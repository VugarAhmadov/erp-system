import React, { FC, memo } from "react";
import { Icon, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import { generate } from "short-uuid";
import { StyledGridColumnElementWithDnd } from "./grid-column-element-with-dnd.styled";
import { addItem, deleteItem, moveItem } from "apps/security/configuration/configurations/store";
// import { ElementsWithDnd } from "../elements-with-dnd";
import { Components } from "components/shared/form-content";
import { ICloumn, IRow } from "../../types";
import { GridRowElementWithDnd } from "../../grid-row";
import { ActionPanel } from "../../action-panel";

interface IGridColumnElementWithDnd {
  column: ICloumn;
}

export const GridColumnElementWithDnd: FC<IGridColumnElementWithDnd> = memo(({ column }) => {
  const dispatch = useDispatch();

  const [{ isOverGridElement, canDropGridElement }, dropElement] = useDrop(
    () => ({
      accept: [Components.ELEMENT, Components.GRID],
      drop(item: any, monitor) {
        const didDrop = monitor.didDrop();

        if (didDrop) return;

        if (
          (column.children.length === 0 && item.type === "row") ||
          (column.children.length > 0 && column.children[0].type === "row" && item.type === "row")
        ) {
          dispatch(
            addItem({
              id: generate(),
              parentId: column.id,
              ...item,
            })
          );
        } else if (column.children.length === 0 && item.type !== "row" && !item.move) {
          dispatch(
            addItem({
              id: generate(),
              parentId: column.id,
              ...item,
            })
          );
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
    <StyledGridColumnElementWithDnd item xs={column.params.columnSize} ref={dropElement} style={{ backgroundColor }}>
      <ActionPanel onDeleteClick={() => dispatch(deleteItem(column.id))} />

      {column.children.length > 0 &&
        column.children[0].type === "row" &&
        column.children.map((row) => <GridRowElementWithDnd row={row as IRow} key={row.id} />)}

      {/* {column.children.length === 1 && column.children[0].type !== "row" && (
        <ElementsWithDnd
          element={column.children[0]}
          selectData={selectData}
          onSelectChange={(data: any) =>
            setSelectData((prev) => {
              if (prev.find((p) => p.model === element.params.model)) {
                return prev.map((n) => (n.model === element.params.model ? { ...n, data } : n));
              } else {
                return [...prev, { model: element.params.model, data }];
              }
            })
          }
        />
      )} */}
    </StyledGridColumnElementWithDnd>
  );
});
