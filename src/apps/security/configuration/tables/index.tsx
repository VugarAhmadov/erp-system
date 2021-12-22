import React, { useState } from "react";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { StyledTables } from "./tables.styled";
import { AppState } from "store";
import { StyledList, StyledListItem, StyledListItemButton, StyledListItemText } from "components/styled";
import { StyledGridHeader } from "../configuration.styled";
import MaterialTable, { Column } from "@material-table/core";
import { tableIcons } from "components/icons";
import { IColumn } from "types";

export const Tables = () => {
  const { t } = useTranslation("common");
  const _tables = useSelector((state: AppState) => state.tables.tables);
  const [selectedTable, setSelectedTable] = useState("");

  interface IPerson {
    firstName: string;
    lastName: string;
    birthYear: number;
    availability: boolean;
  }

  const types = { 1: "text", 2: "bigint", 3: "timestamp", 4: "smallint", 5: "int" };

  const columns: Array<Column<IColumn>> = [
    { title: "First Name", field: "name" },
    { title: "Last Name", field: "type", lookup: types },
  ];

  return (
    <StyledTables>
      <Grid container>
        <Grid item xs={4}>
          <StyledGridHeader>
            <Typography variant="h5">{t("tables")}</Typography>
            <Button variant="contained">{t("add-new-table")}</Button>
          </StyledGridHeader>

          <Paper elevation={3}>
            <StyledList>
              {_tables.map((table) => (
                <StyledListItem key={table.name}>
                  <StyledListItemButton
                    selected={table.name === selectedTable}
                    onClick={() => setSelectedTable(table.name)}
                  >
                    <StyledListItemText primary={table.name} />
                  </StyledListItemButton>
                </StyledListItem>
              ))}
            </StyledList>
          </Paper>
        </Grid>

        <Grid item xs={8} className="detail-grid">
          {selectedTable && (
            <>
              <div className="detail-grid-header">
                {/* <div className="view-detail-buttons">
                  <IconButton className="edit-btn" size="large" onClick={handleViewEdit}>
                    <Icon fontSize="small">edit</Icon>
                  </IconButton>
                  <IconButton className="delete-btn" size="large" onClick={handleViewDelete}>
                    <Icon fontSize="small">delete</Icon>
                  </IconButton>
                </div> */}
              </div>
              <MaterialTable
                title={selectedTable}
                options={{
                  search: false,
                  paging: false,
                  headerStyle: {
                    position: "sticky",
                    top: "0",
                  },
                  actionsColumnIndex: -1,
                  maxBodyHeight: "calc(100vh - 280px)",
                }}
                columns={columns}
                data={_tables.filter((table) => table.name === selectedTable)[0].columns}
                icons={tableIcons}
                editable={{
                  onRowAdd: (newData) =>
                    new Promise((resolve, reject) => {
                      setTimeout(() => {
                        // setData([...data, newData]);
                        // resolve();
                      }, 1000);
                    }),
                  onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                      setTimeout(() => {
                        // const dataUpdate = [...data];
                        // const index = oldData.tableData.id;
                        // dataUpdate[index] = newData;
                        // setData([...dataUpdate]);
                        // resolve();
                      }, 1000);
                    }),
                  onRowDelete: (oldData) =>
                    new Promise((resolve, reject) => {
                      setTimeout(() => {
                        // const dataDelete = [...data];
                        // const index = oldData.tableData.id;
                        // dataDelete.splice(index, 1);
                        // setData([...dataDelete]);
                        // resolve();
                      }, 1000);
                    }),
                }}
              />
            </>
          )}
        </Grid>
      </Grid>
    </StyledTables>
  );
};
