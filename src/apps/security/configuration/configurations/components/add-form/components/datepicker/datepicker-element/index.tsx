import React, { FC } from "react";
import { DatePickerView } from "@mui/lab/DatePicker/shared";
import { DatePicker } from "components/shared";
import { Element, IElement } from "../..";

interface IDatepickerElement extends IElement {
  model: string;
  label: string;
  variant: string;
  required?: string;
}

export const DatepickerElement: FC<IDatepickerElement> = ({ label, model, required, variant, ...rest }) => {
  return (
    <Element {...rest} type="datepicker">
      <DatePicker name={model} label={label} required={!!required} views={variant.split("/") as DatePickerView[]} />
    </Element>
  );
};
