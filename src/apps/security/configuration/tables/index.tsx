import React, { useState } from "react";
import { Button, Grid, Icon, IconButton, Paper, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { StyledTables } from "./tables.styled";
import { AppState } from "store";
import { StyledList, StyledListItem, StyledListItemButton, StyledListItemText } from "components/styled";
import { StyledGridHeader } from "../configuration.styled";
import MaterialTable, { Column } from "@material-table/core";
import { tableIcons } from "components/icons";
import { IColumn } from "types";
import { remove, addColumn, editColumn, removeColumn } from "./store/actions";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

export const Tables = () => {
  const { t } = useTranslation("common");
  const _tables = useSelector((state: AppState) => state.tables.tables);
  const [selectedTable, setSelectedTable] = useState("");
  const dispatch = useDispatch();

  const handleTableDelete = () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      text: "Are you sure to remove?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "confirm",
      cancelButtonText: "cancel",
    }).then((result) => {
      if (result.value) {
        dispatch(remove(selectedTable));
      }
    });
  };

  const types = { 1: "text", 2: "bigint", 3: "timestamp", 4: "smallint", 5: "int" };

  const columns: Array<Column<IColumn>> = [
    {
      title: t("name"),
      field: "name",
      // editComponent: (props) => <TextField variant="outlined" name="name" {...props} />,
    },
    { title: t("type"), field: "type", lookup: types },
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
              <div className="view-detail-buttons">
                {/* <IconButton className="edit-btn" size="large" onClick={handleViewEdit}>
                  <Icon fontSize="small">edit</Icon>
                </IconButton> */}
                <IconButton className="delete-btn" size="large" onClick={handleTableDelete}>
                  <Icon fontSize="small">delete</Icon>
                </IconButton>
              </div>
              <MaterialTable
                title={selectedTable}
                options={{
                  search: true,
                  paging: false,
                  headerStyle: {
                    position: "sticky",
                    top: "0",
                    background: "#ecf0f1",
                  },
                  actionsColumnIndex: -1,
                  maxBodyHeight: "calc(100vh - 280px)",
                  editCellStyle: {},
                }}
                columns={columns}
                data={_tables.filter((table) => table.name === selectedTable)[0].columns}
                icons={tableIcons}
                editable={{
                  isEditHidden: (rowData) =>
                    rowData.name === "id" ||
                    rowData.name === "create_date" ||
                    rowData.name === "create_user_id" ||
                    rowData.name === "update_date" ||
                    rowData.name === "update_user_id" ||
                    rowData.name === "active",
                  isDeleteHidden: (rowData) =>
                    rowData.name === "id" ||
                    rowData.name === "create_date" ||
                    rowData.name === "create_user_id" ||
                    rowData.name === "update_date" ||
                    rowData.name === "update_user_id" ||
                    rowData.name === "active",

                  onRowAdd: async (newData) =>
                    dispatch(
                      addColumn({ tableName: selectedTable, columnName: newData.name, columnType: newData.type })
                    ),
                  onRowUpdate: async (newData, oldData) =>
                    dispatch(
                      editColumn({
                        tableName: selectedTable,
                        oldFieldName: oldData!.name,
                        oldFieldType: oldData!.type,
                        fieldName: newData.name,
                        fieldType: newData.type,
                      })
                    ),
                  onRowDelete: async (oldData) =>
                    dispatch(
                      removeColumn({ tableName: selectedTable, columnName: oldData.name, columnType: oldData.type })
                    ),
                }}
              />
            </>
          )}
        </Grid>
      </Grid>
    </StyledTables>
  );
};
