import React, { FC, useEffect, useState } from "react";
import { Select } from "components/shared";
import { ElementWithDnd, Element } from "../../..";
import { dictionaryApi, dynamicApi } from "api";
import { ISelectData } from "types";

export interface ISelectParams {
  table?: string;
  views?: string;
  model?: string;
  label?: string;
  required?: string;
  dataType?: "dic" | "rest";
  dicId?: string;
  parentId?: string;
  dataUrl?: string;
  dataName?: string;
}

interface ISelectElement {
  withDnd?: boolean;
  params: ISelectParams;
  // onSelectChange(data: any): void;
  id: number;
  onEdit?(type: string, id: number): void;
  onDelete?(id: number): void;
}

export const SelectElement: FC<ISelectElement> = ({ withDnd, params, ...rest }) => {
  const { label, model, required, dataType, dicId, parentId, dataUrl, dataName } = params;

  const [selectData, setSelectData] = useState<any[]>([]);

  useEffect(() => {
    if (dicId || dataUrl) {
      if (dataType === "dic") {
        dictionaryApi
          .getDictionariesListByCommon({ typeId: dicId!, parentId: parentId })
          .then((res) => res.data.tbl.length > 0 && setSelectData(res.data.tbl[0].r));
      } else if (dataType === "rest") {
        dynamicApi.getAll(dataUrl!).then((res) => res.data.tbl.length > 0 && setSelectData(res.data.tbl[0].r));
      }
    }
  }, [dataType]);

  const select = (
    <Select
      name={model || `model-${rest.id}`}
      data={selectData.map((row) => ({ value: row.id, label: dataType === "dic" ? row.name : row[dataName!] })) || []}
      required={!!required}
      label={label}
      style={{ minWidth: "120px" }}
      // inputProps={{
      //   onChange: (e: any) => {
      //     onSelectChange(selectData.find((data) => data.id === e.target.value));
      //   },
      // }}
      fullWidth
    />
  );

  return withDnd ? (
    <ElementWithDnd {...rest} type="select" params={params}>
      {select}
    </ElementWithDnd>
  ) : (
    <Element>{select}</Element>
  );
};
