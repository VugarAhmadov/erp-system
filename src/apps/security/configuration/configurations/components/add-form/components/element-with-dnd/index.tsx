import React, { FC, memo } from "react";
import { Icon, IconButton } from "@mui/material";
import { useDrag } from "react-dnd";
import { StyledElement } from "./element-with-dnd.styled";

export interface IElementWithDnd {
  handleEdit?(type: string, index: number): void;
  handleDelete?(index: number): void;
  index: number;
  top: number;
  left: number;
  type: string;
}

export const ElementWithDnd: FC<IElementWithDnd> = memo(
  ({ children, handleEdit, handleDelete, index, top = 0, left = 0, type }) => {
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
          opacity: isDragging ? 0 : 1,
          height: isDragging ? 0 : "",
        }}
      >
        {children}
        <div className="action-btns">
          <IconButton size="small" className="edit-btn" onClick={() => handleEdit!(type, index)}>
            <Icon>edit</Icon>
          </IconButton>
          <IconButton className="delete-btn" onClick={() => handleDelete!(index)}>
            <Icon>delete</Icon>
          </IconButton>
        </div>
      </StyledElement>
    );
  }
);
