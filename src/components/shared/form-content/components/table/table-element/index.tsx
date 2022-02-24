import React, { FC, useEffect, useState } from "react";
import { Column } from "@material-table/core";
import { ElementWithDnd, Element } from "../../..";
import { dynamicApi } from "api";
import { DataTable } from "components/shared";

export interface ITableParams {
  viewName?: string;
  title?: string;
  getUrl?: string;
  seqColumns?: string;
}

interface ITableElement {
  withDnd?: boolean;
  params: ITableParams;
  id: number;
  onEdit?(type: string, id: number): void;
  onDelete?(id: number): void;
}

export const TableElement: FC<ITableElement> = ({ withDnd, params, ...rest }) => {
  const { title, seqColumns, getUrl } = params;

  const [tableData, setTableData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (getUrl) {
      setLoading(true);
      dynamicApi.getAll(getUrl).then((res) => setTableData(res.data.tbl[0]));
      setLoading(false);
    }
  }, [getUrl]);

  const buildColumns = () => {
    let columns: Column<object>[] = [
      {
        title: "№",
        field: "index",
        width: "100px",
      },
    ];
    console.log(tableData);
    if (seqColumns) {
      tableData?.c?.forEach((column: any) =>
        columns.push({
          title: column.n,
          field: column.i,
          hidden: !seqColumns.includes(column.i),
        })
      );
    }

    return columns;
  };

  const buildData = () => {
    let data: any[] = [];

    tableData?.r?.map((row: any, index: number) => {
      data.push({ index: index + 1, ...row });
    });

    return data;
  };

  const table = (
    <DataTable
      title={title}
      columns={buildColumns()}
      data={buildData()}
      style={{ width: "100%" }}
      isLoading={loading}
      options={{
        showTitle: !!title,
      }}
    />
  );

  return withDnd ? (
    <ElementWithDnd {...rest} type="table" params={params}>
      {table}
    </ElementWithDnd>
  ) : (
    <Element>{table}</Element>
  );
};
