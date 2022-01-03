import React, { FC, memo } from "react";
import { Checkbox, FormControlLabel, Icon, IconButton, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDrag } from "react-dnd";
import { StyledFormControl } from "./datepicker-element.styled";
import { StyledElementContainer } from "components/styled";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { DatePickerView } from "@mui/lab/DatePicker/shared";

interface IDatepickerElement {
  handleDelete(): void;
  handleEdit(): void;
  index: number;
  type: string;
  name: string;
  label: string;
  required?: string;
  left: number;
  top: number;
}

export const DatepickerElement: FC<IDatepickerElement> = memo(
  ({ handleDelete, handleEdit, label, name, required, index, type, left = 0, top = 0 }) => {
    const { t } = useTranslation("common");
    const [value, setValue] = React.useState<Date | null>(null);

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
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <StyledFormControl required={!!required}>
            <DatePicker
              views={type.split("/") as DatePickerView[]}
              label={label}
              value={value}
              readOnly
              onChange={(newValue) => setValue(newValue)}
              renderInput={(params) => <TextField {...params} name={name} />}
            />
          </StyledFormControl>
        </LocalizationProvider>
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
