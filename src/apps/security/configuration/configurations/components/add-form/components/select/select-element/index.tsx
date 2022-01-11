import React, { FC, useEffect, useState } from "react";
import { Select } from "components/shared";
import { ElementWithDnd, Element } from "../..";
import { dictionaryApi, dynamicApi } from "api";
import { ISelectData } from "types";

interface ISelectElement {
  withDnd: boolean;
  model: string;
  label: string;
  required?: string;
  dataType: "dic" | "rest";
  dicId?: string;
  parentId?: string;
  dataUrl?: string;
  dataName?: string;
  top: number;
  left: number;
  width?: string;
  index: number;
  handleEdit?(type: string, index: number): void;
  handleDelete?(index: number): void;
}

export const SelectElement: FC<ISelectElement> = ({
  withDnd,
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
  const [selectData, setSelectData] = useState<ISelectData[]>([]);

  useEffect(() => {
    if (dataType === "dic") {
      dictionaryApi
        .getDictionariesListByCommon({ typeId: dicId!, parentId: parentId })
        .then((res) => setSelectData(res.data.tbl[0].r.map((row) => ({ value: row.id, label: row.name }))));
    } else if (dataType === "rest") {
      dynamicApi
        .getAll(dataUrl!)
        .then((res) => setSelectData(res.data.tbl[0].r.map((row) => ({ value: row.id, label: row[dataName!] }))));
    }
  }, []);

  const select = (
    <Select
      name={model}
      data={selectData}
      required={!!required}
      label={label}
      style={{ minWidth: "120px" }}
      fullWidth
    />
  );

  return withDnd ? (
    <ElementWithDnd {...rest} type="select">
      {select}
    </ElementWithDnd>
  ) : (
    <Element top={rest.top} left={rest.left} width={rest.width}>
      {select}
    </Element>
  );
};
