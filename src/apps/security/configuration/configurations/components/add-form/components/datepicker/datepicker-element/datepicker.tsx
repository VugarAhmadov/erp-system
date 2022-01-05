import React, { CSSProperties, FC } from "react";
import { DatePickerView } from "@mui/lab/DatePicker/shared";
import { DatePicker as DatepickerRff } from "components/shared";

interface IDatepicker {
  model: string;
  label: string;
  variant: string;
  required?: string;
  fromConf?: boolean;
  top?: number;
  left?: number;
}

export const Datepicker: FC<IDatepicker> = ({ label, model, required, variant, fromConf, top, left }) => {
  const style = {
    position: "absolute",
    transform: `translate3d(${left}px, ${top}px, 0)`,
  } as CSSProperties;

  return (
    <div style={!fromConf ? style : undefined}>
      <DatepickerRff name={model} label={label} required={!!required} views={variant?.split("/") as DatePickerView[]} />
    </div>
  );
};
