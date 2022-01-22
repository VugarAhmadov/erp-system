import React, { FC } from "react";
import { DatePickerView } from "@mui/lab/DatePicker/shared";
import { ElementWithDnd, Element } from "../..";
import { DatePicker } from "components/shared";

interface IDatepickerElement {
  withDnd?: boolean;
  model: string;
  label: string;
  variant: string;
  required?: string;
  top: number;
  left: number;
  width?: string;
  index: number;
  onEdit?(type: string, index: number): void;
  onDelete?(index: number): void;
}

export const DatepickerElement: FC<IDatepickerElement> = ({ withDnd, label, model, required, variant, ...rest }) => {
  const datepicker = (
    <DatePicker
      name={model}
      label={label}
      required={!!required}
      views={variant?.split("/") as DatePickerView[]}
      fullWidth
    />
  );

  return withDnd ? (
    <ElementWithDnd {...rest} type="datepicker">
      {datepicker}
    </ElementWithDnd>
  ) : (
    <Element top={rest.top} left={rest.left} width={rest.width}>
      {datepicker}
    </Element>
  );
};
