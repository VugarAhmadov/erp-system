import React, { FC, memo } from "react";
import { Icon, IconButton, InputAdornment } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDrag } from "react-dnd";
import { StyledTextField } from "./input-element.styled";
import { StyledElementContainer } from "components/styled";

interface IInputElement {
  handleDelete(): void;
  handleEdit(): void;
  index: number;
  type: "number" | "text";
  name: string;
  label?: string;
  placeholder?: string;
  required?: string;
  left: number;
  top: number;
}

export const InputElement: FC<IInputElement> = memo(
  ({ handleDelete, handleEdit, placeholder, label, type, name, required, index, left = 0, top = 0 }) => {
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
          cursor: "move",
        }}
      >
        <StyledTextField
          type={type}
          name={name}
          required={!!required}
          label={label && t(label)}
          placeholder={placeholder && t(placeholder)}
          sx={{ cursor: "move" }}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton size="small" className="edit-btn" onClick={handleEdit}>
                  <Icon>edit</Icon>
                </IconButton>
                <IconButton className="delete-btn" onClick={handleDelete}>
                  <Icon>delete</Icon>
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </StyledElementContainer>
    );
  }
);
