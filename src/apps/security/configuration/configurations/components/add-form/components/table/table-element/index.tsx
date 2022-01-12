import React, { FC, useEffect, useState } from "react";
import { ElementWithDnd, Element } from "../..";
import { dynamicApi } from "api";
import { DataTable } from "components/shared";
import { Column } from "@material-table/core";

interface ITableElement {
  withDnd: boolean;
  title?: string;
  getUrl: string;
  seqColumns: string;
  top: number;
  left: number;
  width?: string;
  index: number;
  handleEdit?(type: string, index: number): void;
  handleDelete?(index: number): void;
}

export const TableElement: FC<ITableElement> = ({ withDnd, title, seqColumns, getUrl, ...rest }) => {
  const [tableData, setTableData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    dynamicApi.getAll(getUrl).then((res) => setTableData(res.data.tbl[0]));
    setLoading(false);
  }, []);

  const buildColumns = () => {
    let columns: Column<object>[] = [
      {
        title: "№",
        field: "index",
        width: "100px",
      },
    ];

    tableData?.c?.forEach((column: any) =>
      columns.push({
        title: column.n,
        field: column.i,
        hidden: !seqColumns.includes(column.i),
      })
    );

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
    <ElementWithDnd {...rest} type="table">
      {table}
    </ElementWithDnd>
  ) : (
    <Element top={rest.top} left={rest.left} width={rest.width}>
      {table}
    </Element>
  );
};
