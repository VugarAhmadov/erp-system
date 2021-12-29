import React, { FC } from "react";
import { Icon, IconButton, InputAdornment, Select, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

interface ISelectElement {
  handleDelete(): void;
  handleEdit(): void;
  index: number;
  type: "number" | "text";
  name: string;
  label?: string;
  placeholder?: string;
  required?: string;
}

export const SelectElement: FC<ISelectElement> = ({
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
    <div className="select-container">
      {/* <FormControl required={required} error={isError} fullWidth={true} variant={variant} {...formControlProps}>
        {!!label && (
          <InputLabel id={labelId} {...inputLabelProps} variant={variant}>
            {label}
          </InputLabel>
        )}
        <Select
          name={name}
          
          label={label}
          inputProps={{ required, ...restInput }}
          {...restSelectProps}
        >
          {data
            ? data.map((item) => (
                <MenuItem value={item.value} key={item.value} disabled={item.disabled} {...(menuItemProps as any)}>
                  {item.label}
                </MenuItem>
              ))
            : children}
        </Select>
        <ErrorMessage
          showError={isError}
          meta={field.meta}
          formHelperTextProps={formHelperTextProps}
          helperText={helperText}
        />
      </FormControl> */}

      <TextField
        type="text"
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
