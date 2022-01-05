import React, { FC, useEffect, useState, CSSProperties } from "react";
import { dictionaryApi, dynamicApi } from "api";
import { ISelectData } from "types";
import { Select as SelectRff } from "components/shared";

interface ISelect {
  model: string;
  label: string;
  required?: string;
  dataType: "dic" | "rest";
  dicId?: string;
  parentId?: string;
  dataUrl?: string;
  dataName?: string;
  fromConf?: boolean;
  top?: number;
  left?: number;
}

export const Select: FC<ISelect> = ({
  label,
  model,
  required,
  dataType,
  dicId,
  parentId,
  dataUrl,
  dataName,
  fromConf,
  top,
  left,
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

  const style = {
    position: "absolute",
    transform: `translate3d(${left}px, ${top}px, 0)`,
  } as CSSProperties;

  return (
    <div style={!fromConf ? style : undefined}>
      <SelectRff name={model} data={selectData} required={!!required} label={label} style={{ minWidth: "120px" }} />
    </div>
  );
};
