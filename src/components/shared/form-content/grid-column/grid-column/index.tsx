import React, { FC } from "react";
import { Grid } from "@mui/material";
import { IColumn, IRow } from "../../types";
import { Elements, GridRow } from "../..";

interface IGridColumn {
  column: IColumn;
}

export const GridColumn: FC<IGridColumn> = ({ column }) => {
  console.log(column.params);
  return (
    <Grid
      item
      xs={column.params.columnSize}
      style={{
        display: "flex",
        height: column.params.height && `${column.params.height}px`,
        marginBottom: column.params.marginBottom && `${column.params.marginBottom}px`,
        marginTop: column.params.marginTop && `${column.params.marginTop}px`,
      }}
      flexDirection={column.params.direction}
      justifyContent={column.params.justifyContent}
      alignItems={column.params.alignItems}
    >
      {column.children.length > 0 &&
        column.children[0].type === "row" &&
        column.children.map((row) => <GridRow row={row as IRow} key={row.id} />)}

      {column.children.length === 1 && column.children[0].type !== "row" && <Elements element={column.children[0]} />}
    </Grid>
  );
};
