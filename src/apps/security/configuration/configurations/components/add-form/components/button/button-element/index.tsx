import React, { FC, memo } from "react";
import { Icon, IconButton, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDrag } from "react-dnd";
import { StyledElementContainer } from "components/styled";

interface IButtonElement {
  handleDelete(): void;
  handleEdit(): void;
  index: number;
  type: string;
  label: string;
  left: number;
  top: number;
}

export const ButtonElement: FC<IButtonElement> = memo(
  ({ handleDelete, handleEdit, label, type, index, left = 0, top = 0 }) => {
    const { t } = useTranslation("common");

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
      <StyledElementContainer
        ref={drag}
        style={{
          position: "absolute",
          transform: `translate3d(${left}px, ${top}px, 0)`,
          opacity: isDragging ? 0 : 1,
          height: isDragging ? 0 : "",
          display: "flex",
          cursor: "move",
        }}
      >
        <div className="action-btns">
          <IconButton size="small" className="edit-btn" onClick={handleEdit}>
            <Icon>edit</Icon>
          </IconButton>
          <IconButton className="delete-btn" onClick={handleDelete}>
            <Icon>delete</Icon>
          </IconButton>
        </div>
      </StyledElementContainer>
    );
  }
);
