import React, { FC, useEffect, useState } from "react";
import { dictionaryApi, dynamicApi } from "api";
import { Select } from "components/shared";
import { ISelectData } from "types";
import { IElement, Element } from "../..";

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

  return (
    <Element {...rest} type="select">
      <Select name={model} data={selectData} required={!!required} label={label} sx={{ minWidth: "120px" }} />
    </Element>
  );
};
