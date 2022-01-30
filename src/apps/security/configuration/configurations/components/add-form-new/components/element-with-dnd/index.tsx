import React, { FC, memo } from "react";
import { Icon, IconButton } from "@mui/material";
import { useDrag } from "react-dnd";
import { StyledElement } from "./element-with-dnd.styled";
import { Components } from "../../../dialog-config/constants";

export interface IElementWithDnd {
  onEdit?(type: string, rowIndex: number, columnIndex: number): void;
  onDelete?(rowIndex: number, columnIndex: number): void;
  type: string;
  rowIndex: number;
  columnIndex: number;
  params: any;
}

export const ElementWithDnd: FC<IElementWithDnd> = memo(
  ({ children, onEdit, onDelete, type, rowIndex, columnIndex, params }) => {
    console.log(params);
    const [{ isDragging }, drag] = useDrag(
      () => ({
        type: Components.ELEMENT,
        item: { type, move: true, rowIndex, columnIndex, params },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
      }),
      [rowIndex, columnIndex]
    );

    return (
      <StyledElement
        ref={drag}
        style={{
          height: isDragging ? 0 : "auto",
          opacity: isDragging ? 0 : 1,
        }}
      >
        {children}
        <div className="action-btns">
          <IconButton size="small" className="edit-btn" onClick={() => onEdit!(type, rowIndex, columnIndex)}>
            <Icon>edit</Icon>
          </IconButton>
          <IconButton className="delete-btn" onClick={() => onDelete!(rowIndex, columnIndex)}>
            <Icon>delete</Icon>
          </IconButton>
        </div>
      </StyledElement>
    );
  }
);
