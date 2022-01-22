import React, { FC, memo } from "react";
import { Icon, IconButton } from "@mui/material";
import { useDrag } from "react-dnd";
import { StyledElement } from "./element-with-dnd.styled";

export interface IElementWithDnd {
  onEdit?(type: string, index: number): void;
  onDelete?(index: number): void;
  index: number;
  top: number;
  left: number;
  width?: string;
  height?: string;
  type: string;
}

export const ElementWithDnd: FC<IElementWithDnd> = memo(
  ({ children, onEdit, onDelete, index, top = 0, left = 0, width, height, type }) => {
    const [{ isDragging }, drag] = useDrag(
      () => ({
        type: "box",
        item: { index, left, top },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
      }),
      [index, left, top]
    );

    return (
      <StyledElement
        ref={drag}
        style={{
          transform: `translate3d(${left}px, ${top}px, 0)`,
          width: width ? parseInt(width) : "auto",
          height: isDragging ? 0 : height ? parseInt(height) : "auto",
          opacity: isDragging ? 0 : 1,
        }}
      >
        {children}
        <div className="action-btns">
          <IconButton size="small" className="edit-btn" onClick={() => onEdit!(type, index)}>
            <Icon>edit</Icon>
          </IconButton>
          <IconButton className="delete-btn" onClick={() => onDelete!(index)}>
            <Icon>delete</Icon>
          </IconButton>
        </div>
      </StyledElement>
    );
  }
);
