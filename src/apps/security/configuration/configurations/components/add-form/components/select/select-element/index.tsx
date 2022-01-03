import React, { FC, memo } from "react";
import { Icon, IconButton, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDrag } from "react-dnd";
import { StyledFormControl } from "./select-element.styled";
import { StyledElementContainer } from "components/styled";

interface ISelectElement {
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

export const SelectElement: FC<ISelectElement> = memo(
  ({ handleDelete, handleEdit, placeholder, label, name, required, index, left = 0, top = 0 }) => {
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

    const [age, setAge] = React.useState("");
    const handleChange = (event: SelectChangeEvent) => {
      setAge(event.target.value);
    };

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
        <StyledFormControl required={!!required}>
          <InputLabel id={`${index}-select-label`}>{label}</InputLabel>
          <Select
            value={age}
            onChange={handleChange}
            name={name}
            readOnly
            labelId={`${index}-select-label`}
            id={`${index}-select`}
            label={label}
            endAdornment={
              <InputAdornment position="end">
                <IconButton size="small" className="edit-btn" onClick={handleEdit}>
                  <Icon>edit</Icon>
                </IconButton>
                <IconButton className="delete-btn" onClick={handleDelete}>
                  <Icon>delete</Icon>
                </IconButton>
              </InputAdornment>
            }
          >
            {placeholder && (
              <MenuItem disabled value="">
                <em>{placeholder}</em>
              </MenuItem>
            )}
          </Select>
        </StyledFormControl>
      </StyledElementContainer>
    );
  }
);
