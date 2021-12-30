import React, { FC } from "react";
import { Icon, IconButton, InputAdornment, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

interface IInputElement {
  handleDelete(): void;
  handleEdit(): void;
  index: number;
  type: "number" | "text";
  name: string;
  label?: string;
  placeholder?: string;
  required?: string;
}

export const InputElement: FC<IInputElement> = ({
  handleDelete,
  handleEdit,
  placeholder,
  label,
  type,
  name,
  required,
}) => {
  const { t } = useTranslation("common");

  return (
    <div className="input-container">
      <TextField
        type={type}
        name={name}
        required={!!required}
        label={label && t(label)}
        placeholder={placeholder && t(placeholder)}
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
    </div>
  );
};
