import React, { FC, useEffect } from "react";
import { Column } from "@material-table/core";
import { IGetAllTableColumn } from "types";
import { INativeTable } from "./types";
import { useDispatch } from "react-redux";

export const NativeTable: FC<INativeTable> = ({ table, apiEndpoints }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch
  }, []);

  const buildColumns = () => {
    let columns: Column<IGetAllTableColumn>[] = [];

    if (table.columnConfig.numberIndexed) {
      columns.push({ title: "№", field: "index" });
    }
  };

  return (
    <div>
      <h1>test</h1>
    </div>
  );
};
