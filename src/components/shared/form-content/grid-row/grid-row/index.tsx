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
      columnSpacing={Number(row.params?.columnSpacing)}
      style={{
        width: row.params.width && `${row.params.width}px`,
        height: row.params.height && `${row.params.height}px`,
        marginBottom: `${row.params.marginBottom}px`,
        marginTop: `${row.params.marginTop}px`,
      }}
    >
      {row.children.map((column: IColumn) => (
        <GridColumn key={column.id} column={column} />
      ))}
    </Grid>
  );
};
