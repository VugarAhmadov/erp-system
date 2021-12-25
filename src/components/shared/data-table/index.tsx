import React, { FC } from "react";
import MaterialTable, { MaterialTableProps } from "@material-table/core";

interface IDataTable extends MaterialTableProps<object> {}

export const DataTable: FC<IDataTable> = ({ ...rest }) => {
  const defaultOptions = {};

  return <MaterialTable {...rest} />;
};
