import React, { FC } from "react";
import { IElement, Element } from "../..";
import { Select } from "./select";

interface ISelectElement extends IElement {
  model: string;
  label: string;
  required?: string;
  dataType: "dic" | "rest";
  dicId?: string;
  parentId?: string;
  dataUrl?: string;
  dataName?: string;
}

export const SelectElement: FC<ISelectElement> = ({
  label,
  model,
  required,
  dataType,
  dicId,
  parentId,
  dataUrl,
  dataName,
  ...rest
}) => {
  const selectProps = {
    label,
    model,
    required,
    dataType,
    dicId,
    parentId,
    dataUrl,
    dataName,
  };

  return (
    <Element {...rest} type="select">
      <Select {...selectProps} fromConf />
    </Element>
  );
};
