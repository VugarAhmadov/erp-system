import React, { FC } from "react";
import { DatePickerView } from "@mui/lab/DatePicker/shared";
import { ElementWithDnd, Element } from "../..";
import { DatePicker } from "components/shared";

export interface IDatepickerParams {
  table?: string;
  views?: string;
  model?: string;
  label?: string;
  variant?: string;
  required?: string;
}

interface IDatepickerElement {
  withDnd?: boolean;
  params: IDatepickerParams;
  gridRowIndex: number;
  gridColumnIndex: number;
  onEdit?(type: string, gridRowIndex: number, gridColumnIndex: number): void;
  onDelete?(gridRowIndex: number, gridColumnIndex: number): void;
}

export const DatepickerElement: FC<IDatepickerElement> = ({ withDnd, params, ...rest }) => {
  const { label, model, required, variant } = params;

  const datepicker = (
    <DatePicker
      name={model || `model-${rest.gridRowIndex}-${rest.gridColumnIndex}`}
      label={label}
      required={!!required}
      views={variant?.split("/") as DatePickerView[]}
      fullWidth
    />
  );

  return withDnd ? (
    <ElementWithDnd {...rest} type="datepicker" params={params}>
      {datepicker}
    </ElementWithDnd>
  ) : (
    <Element>{datepicker}</Element>
  );
};
