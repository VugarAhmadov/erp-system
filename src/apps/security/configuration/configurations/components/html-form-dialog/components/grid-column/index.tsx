import React, { FC, memo } from "react";
import { Icon, IconButton } from "@mui/material";
import { StyledGridColumn } from "./grid-column.styled";
import { useDispatch } from "react-redux";
import { addItem, deleteItem, moveItem } from "apps/security/configuration/configurations/store";
import { ElementsWithDnd } from "../elements-with-dnd";
import { useDrop } from "react-dnd";
import { Components } from "components/shared/form-content";
import { ICloumn, IRow } from "../types";
import { GridRow } from "..";
import { generate } from "short-uuid";

interface IGridColumn {
  column: ICloumn;
}

export const GridColumn: FC<IGridColumn> = memo(({ column }) => {
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
    <StyledGridColumn item xs={column.params.columnSize} ref={dropElement} style={{ backgroundColor }}>
      <IconButton size="small" className="column-delete-btn" onClick={() => dispatch(deleteItem(column.id))}>
        <Icon fontSize="small">delete</Icon>
      </IconButton>

      {column.children.length > 0 &&
        column.children[0].type === "row" &&
        column.children.map((row) => <GridRow row={row as IRow} key={row.id} />)}

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
    </StyledGridColumn>
  );
});
