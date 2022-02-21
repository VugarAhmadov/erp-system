import React, { FC, memo } from "react";
import { GridRow } from "../grid-row";
import { Grid } from "@mui/material";
import { ICloumn, IRow } from "apps/security/configuration/configurations/components/html-form-dialog/components/types";
import { Elements } from "../elements";

interface IGridColumn {
  column: ICloumn;
}

export const GridColumn: FC<IGridColumn> = memo(({ column }) => {
  return (
    <Grid item xs={column.params.columnSize}>
      {column.children.length > 0 &&
        column.children[0].type === "row" &&
        column.children.map((row) => <GridRow row={row as IRow} key={row.id} />)}

      {column.children.length === 1 && column.children[0].type !== "row" && <Elements element={column.children[0]} />}
    </Grid>
  );
});
