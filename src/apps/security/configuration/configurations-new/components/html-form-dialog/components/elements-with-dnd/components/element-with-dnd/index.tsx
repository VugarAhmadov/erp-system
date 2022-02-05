import React, { FC, memo } from "react";
import { Icon, IconButton } from "@mui/material";
import { useDrag } from "react-dnd";
import { StyledElement } from "./element-with-dnd.styled";
import { Components } from "../../../dialog-config/constants";

export interface IElementWithDnd {
  onEdit?(type: string, gridRowIndex: number, gridColumnIndex: number): void;
  onDelete?(gridRowIndex: number, gridColumnIndex: number): void;
  type: string;
  gridRowIndex: number;
  gridColumnIndex: number;
  params: any;
}

export const ElementWithDnd: FC<IElementWithDnd> = memo(
  ({ children, onEdit, onDelete, type, gridRowIndex, gridColumnIndex, params }) => {
    const [{ isDragging }, drag] = useDrag(
      () => ({
        type: Components.ELEMENT,
        item: { type, move: true, gridRowIndex, gridColumnIndex, params },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
      }),
      [gridRowIndex, gridColumnIndex]
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
          <IconButton size="small" className="edit-btn" onClick={() => onEdit!(type, gridRowIndex, gridColumnIndex)}>
            <Icon>edit</Icon>
          </IconButton>
          <IconButton className="delete-btn" onClick={() => onDelete!(gridRowIndex, gridColumnIndex)}>
            <Icon>delete</Icon>
          </IconButton>
        </div>
      </StyledElement>
    );
  }
);
