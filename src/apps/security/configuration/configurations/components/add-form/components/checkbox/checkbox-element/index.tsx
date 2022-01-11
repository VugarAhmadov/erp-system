import React, { FC } from "react";
import { IElementWithDnd, ElementWithDnd } from "../..";
import { Checkbox } from "./checkbox";

interface ICheckboxElement extends IElementWithDnd {
  model: string;
  label: string;
  required?: string;
}

export const CheckboxElement: FC<ICheckboxElement> = ({ label, model, required, ...rest }) => {
  const checkboxProps = { label, model, required };

  return (
    <ElementWithDnd {...rest} type="checkbox">
      <Checkbox {...checkboxProps} fromConf />
    </ElementWithDnd>
  );
};
