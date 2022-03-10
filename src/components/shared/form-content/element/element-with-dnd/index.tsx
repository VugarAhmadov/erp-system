import React, { FC, memo } from "react";
import { Icon, IconButton } from "@mui/material";
import { useDrag } from "react-dnd";
import { StyledElement } from "./element-with-dnd.styled";
import { ActionPanel, Components } from "components/shared/form-content";

export interface IElementWithDnd {
  onEdit?(type: string, id: string): void;
  onDelete?(id: string): void;
  onCopy?(type: string, id: string): void;
  type: string;
  id: string;
  params: any;
}

export const ElementWithDnd: FC<IElementWithDnd> = memo(({ children, onEdit, onDelete, onCopy, type, id, params }) => {
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
      <ActionPanel
        onDeleteClick={() => onDelete!(id)}
        onEditClick={() => onEdit!(type, id)}
        onCopyClick={() => onCopy!(type, id)}
      />
    </StyledElement>
  );
});
