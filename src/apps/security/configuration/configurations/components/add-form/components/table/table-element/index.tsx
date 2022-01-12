import React, { FC, useEffect, useState } from "react";
import { Select } from "components/shared";
import { ElementWithDnd, Element } from "../..";
import { dictionaryApi, dynamicApi } from "api";
import { ISelectData } from "types";

interface ITableElement {
  withDnd: boolean;
  model: string;
  label: string;
  required?: string;
  dataType: "dic" | "rest";
  dicId?: string;
  parentId?: string;
  dataUrl?: string;
  dataName?: string;
  onSelectChange(data: any): void;
  top: number;
  left: number;
  width?: string;
  index: number;
  handleEdit?(type: string, index: number): void;
  handleDelete?(index: number): void;
}

export const TableElement: FC<ITableElement> = ({
  withDnd,
  label,
  model,
  required,
  dataType,
  dicId,
  parentId,
  dataUrl,
  dataName,
  onSelectChange,
  ...rest
}) => {
  const [selectData, setSelectData] = useState<any[]>([]);

  useEffect(() => {
    if (dataType === "dic") {
      dictionaryApi
        .getDictionariesListByCommon({ typeId: dicId!, parentId: parentId })
        .then((res) => setSelectData(res.data.tbl[0].r));
    } else if (dataType === "rest") {
      dynamicApi.getAll(dataUrl!).then((res) => setSelectData(res.data.tbl[0].r));
    }
  }, []);

  const select = (
    <Select
      name={model}
      data={selectData.map((row) => ({ value: row.id, label: dataType === "dic" ? row.name : row[dataName!] }))}
      required={!!required}
      label={label}
      style={{ minWidth: "120px" }}
      inputProps={{
        onChange: (e: any) => {
          onSelectChange(selectData.filter((data) => data.id === e.target.value));
        },
      }}
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
