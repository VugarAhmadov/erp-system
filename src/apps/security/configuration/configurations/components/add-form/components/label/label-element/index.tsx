import React, { FC, memo } from "react";
import { Icon, IconButton, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDrag } from "react-dnd";
import { StyledElementContainer } from "components/styled";

interface ILabelElement {
  handleDelete(): void;
  handleEdit(): void;
  index: number;
  type:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "caption"
    | "button"
    | "overline"
    | "inherit";
  label: string;
  left: number;
  top: number;
}

export const LabelElement: FC<ILabelElement> = memo(
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
        <Typography variant={type}>{label}</Typography>
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
