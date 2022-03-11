import React, { FC, useEffect, useState } from "react";
import { Column } from "@material-table/core";
import { ElementWithDnd, Element } from "../../..";
import { dynamicApi } from "api";
import { DataTable } from "components/shared";
import { toast } from "react-toastify";

export interface ITableParams {
  title?: string;
  viewName?: string;
  seqColumns?: string;
  getUrl?: string;
  deleteUrl?: string;
  addUrl?: string;
  editUrl?: string;
}

interface ITableElement {
  withDnd?: boolean;
  params: ITableParams;
  id: string;
  onEdit?(type: string, id: string): void;
  onDelete?(id: string): void;
  onCopy?(type: string, id: string): void;
}

export const TableElement: FC<ITableElement> = ({ withDnd, params, ...rest }) => {
  const { title, seqColumns, getUrl, deleteUrl, editUrl, addUrl } = params;

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
      editable={{
        // isEditHidden: (rowData) =>
        //   rowData.name === "id" ||
        //   rowData.name === "create_date" ||
        //   rowData.name === "create_user_id" ||
        //   rowData.name === "update_date" ||
        //   rowData.name === "update_user_id" ||
        //   rowData.name === "active",
        // isDeleteHidden: (rowData) =>
        //   rowData.name === "id" ||
        //   rowData.name === "create_date" ||
        //   rowData.name === "create_user_id" ||
        //   rowData.name === "update_date" ||
        //   rowData.name === "update_user_id" ||
        //   rowData.name === "active",
        // onRowAdd: async (newData) =>
        //   dispatch(addColumn({ tableName: selectedTable, columnName: newData.name, columnType: newData.type })),
        // onRowUpdate: async (newData, oldData) =>
        //   dispatch(
        //     editColumn({
        //       tableName: selectedTable,
        //       oldFieldName: oldData!.name,
        //       oldFieldType: oldData!.type,
        //       fieldName: newData.name,
        //       fieldType: newData.type,
        //     })
        //   ),
        onRowDelete: async (oldData: any) => {
          if (deleteUrl && getUrl) {
            const { id } = oldData;

            const { data } = await dynamicApi.remove(deleteUrl, id);

            if (data?.err.length === 0) {
              toast.success("Column silindi");
              await dynamicApi.getAll(getUrl).then((res) => setTableData(res.data.tbl[0]));
            }
          }
        },
        // dispatch(
        //   removeColumn({ tableName: selectedTable, columnName: oldData.name, columnType: oldData.type })
        // ),
      }}
    />
  );

  return withDnd ? (
    <ElementWithDnd {...rest} type="table" params={params}>
      {table}
    </ElementWithDnd>
  ) : (
    <Element params={params}>{table}</Element>
  );
};
