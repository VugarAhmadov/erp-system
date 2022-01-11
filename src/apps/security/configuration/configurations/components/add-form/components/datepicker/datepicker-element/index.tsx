import React, { FC } from "react";
import { ElementWithDnd, IElementWithDnd } from "../..";
import { Datepicker } from "./datepicker";

interface IDatepickerElement extends IElementWithDnd {
  model: string;
  label: string;
  variant: string;
  required?: string;
}

export const DatepickerElement: FC<IDatepickerElement> = ({ label, model, required, variant, ...rest }) => {
  const datepickerProps = { label, model, required, variant };

  return (
    <ElementWithDnd {...rest} type="datepicker">
      <Datepicker {...datepickerProps} fromConf />
    </ElementWithDnd>
  );
};
