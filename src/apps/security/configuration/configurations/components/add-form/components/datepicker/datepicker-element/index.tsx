import React, { FC } from "react";
import { Element, IElement } from "../..";
import { Datepicker } from "./datepicker";

interface IDatepickerElement extends IElement {
  model: string;
  label: string;
  variant: string;
  required?: string;
}

export const DatepickerElement: FC<IDatepickerElement> = ({ label, model, required, variant, ...rest }) => {
  const datepickerProps = { label, model, required, variant };

  return (
    <Element {...rest} type="datepicker">
      <Datepicker {...datepickerProps} fromConf />
    </Element>
  );
};
