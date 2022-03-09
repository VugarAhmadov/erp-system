import React, { FC } from "react";
import { DatePickerView } from "@mui/lab/DatePicker/shared";
import { ElementWithDnd, Element } from "../../..";
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
  id: string;
  onEdit?(type: string, id: string): void;
  onDelete?(id: string): void;
}

export const DatepickerElement: FC<IDatepickerElement> = ({ withDnd, params, ...rest }) => {
  const { label, model, required, variant } = params;

  const datepicker = (
    <DatePicker
      name={model || `model-${rest.id}`}
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
