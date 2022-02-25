import React, { FC, memo } from "react";
import { Icon, IconButton } from "@mui/material";
import { useDrag } from "react-dnd";
import { StyledElement } from "./element-with-dnd.styled";
import { ActionPanel, Components } from "components/shared/form-content";

export interface IElementWithDnd {
  onEdit?(type: string, id: number): void;
  onDelete?(id: number): void;
  type: string;
  id: number;
  params: any;
}

export const ElementWithDnd: FC<IElementWithDnd> = memo(({ children, onEdit, onDelete, type, id, params }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: Components.ELEMENT,
      item: { type, move: true, id, params },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id]
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
      <ActionPanel onDeleteClick={() => onDelete!(id)} onEditClick={() => onEdit!(type, id)} />
    </StyledElement>
  );
});
