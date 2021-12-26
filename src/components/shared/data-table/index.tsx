import React, { FC } from "react";
import MaterialTable, { MaterialTableProps, Options } from "@material-table/core";

interface IDataTable extends MaterialTableProps<object> {}

export const DataTable: FC<IDataTable> = ({ options, ...rest }) => {
  return (
    <MaterialTable
      options={{
        paging: false,
        headerStyle: {
          position: "sticky",
          top: "0",
          background: "#e0e0e0",
        },
        maxBodyHeight: "calc(100vh - 280px)",
        padding: "dense",
        ...options,
      }}
      {...rest}
    />
  );
};
