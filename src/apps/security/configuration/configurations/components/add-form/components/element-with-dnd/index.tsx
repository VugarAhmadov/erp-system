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
  width?: string;
  height?: string;
  type: string;
}

export const ElementWithDnd: FC<IElementWithDnd> = memo(
  ({ children, handleEdit, handleDelete, index, top = 0, left = 0, width, height, type }) => {
    const [{ isDragging }, drag] = useDrag(() => {
      console.log(top);
      return {
        type: "box",
        item: { index, left, top },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
      };
    }, [index, left, top]);

    return (
      <StyledElement
        ref={drag}
        style={{
          transform: `translate3d(${left}px, ${top}px, 0)`,
          // width: width ? parseInt(width) : "auto",
          // height: isDragging ? 0 : height ? parseInt(height) : "auto",
          height: isDragging ? 0 : "",
          opacity: isDragging ? 0 : 1,
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
