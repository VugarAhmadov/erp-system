import React, { FC } from "react";
import {
  FormControl,
  FormHelperText,
  Icon,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
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

export const SelectElement: FC<ISelectElement> = ({ handleDelete, handleEdit, placeholder, label, name, required }) => {
  const { t } = useTranslation("common");

  const [age, setAge] = React.useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <div className="select-container">
      <FormControl>
        <Select value={age} onChange={handleChange} name={name} readOnly>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
