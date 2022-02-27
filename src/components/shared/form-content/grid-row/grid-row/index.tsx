import React, { FC } from "react";
import { Grid } from "@mui/material";
import { IColumn, IRow } from "../../types";
import { GridColumn } from "../..";

interface IGridRow {
  row: IRow;
}

export const GridRow: FC<IGridRow> = ({ row }) => {
  return (
    <Grid
      container
      direction={row.params?.direction}
      justifyContent={row?.params?.justifyContent}
      alignItems={row.params?.alignItems}
      columnSpacing={row.params?.columnSpacing ?? 3}
    >
      {row.children.map((column: IColumn) => (
        <GridColumn key={column.id} column={column} />
      ))}
    </Grid>
  );
};
