import React, { FC } from "react";
import { IElement, Element } from "../..";
import { Checkbox } from "./checkbox";

interface ICheckboxElement extends IElement {
  model: string;
  label: string;
  required?: string;
}

export const CheckboxElement: FC<ICheckboxElement> = ({ label, model, required, ...rest }) => {
  const checkboxProps = { label, model, required };

  return (
    <Element {...rest} type="checkbox">
      <Checkbox {...checkboxProps} fromConf />
    </Element>
  );
};
