import React, { FC, memo } from "react";
import { Grid } from "@mui/material";
import { ICloumn, IRow } from "apps/security/configuration/configurations/components/html-form-dialog/components/types";
import { GridColumn } from "../grid-column";

interface IGridRow {
  row: IRow;
}

export const GridRow: FC<IGridRow> = memo(({ row }) => {
  return (
    <Grid container spacing={3}>
      {row.children.map((column: ICloumn) => (
        <GridColumn key={column.id} column={column} />
      ))}
    </Grid>
  );
});
