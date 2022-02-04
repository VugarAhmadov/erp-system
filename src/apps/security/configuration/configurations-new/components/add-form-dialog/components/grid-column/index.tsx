import React, { FC } from "react";
import { Icon, IconButton } from "@mui/material";
import { StyledGridColumn } from "./grid-column.styled";
import { useDispatch } from "react-redux";
import { addElement, deleteGridColumn } from "apps/security/configuration/configurations-new/store";
import { ElementsWithDnd } from "../elements-with-dnd";
import { useDrop } from "react-dnd";
import { Components } from "../dialog-config/constants";

interface IGridColumn {
  gridColumn: any;
}

export const GridColumn: FC<IGridColumn> = ({ gridColumn }) => {
  const dispatch = useDispatch();

  const [{ isOverGridElement, canDropGridElement }, dropElement] = useDrop(
    () => ({
      accept: Components.ELEMENT,
      drop(item: any, monitor) {
        dispatch(
          addElement({
            element: item,
            gridRowIndex: gridColumn.gridRowIndex,
            gridColumnIndex: gridColumn.index,
          })
        );
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
    <StyledGridColumn item xs={gridColumn.gridColumnSize} ref={dropElement} style={{ backgroundColor }}>
      <IconButton
        size="small"
        className="column-delete-btn"
        onClick={() =>
          dispatch(
            deleteGridColumn({ gridRowIndex: gridColumn.gridRowIndex, gridColumnIndex: gridColumn.gridColumnIndex })
          )
        }
      >
        <Icon fontSize="small">delete</Icon>
      </IconButton>
      {gridColumn?.element && (
        <ElementsWithDnd
          element={gridColumn.element}
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
};
