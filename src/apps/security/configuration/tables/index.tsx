import React from "react";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { StyledTables } from "./tables.styled";
import { AppState } from "store";
import { StyledList, StyledListItem, StyledListItemButton, StyledListItemText } from "components/styled";
import { StyledGridHeader } from "../configuration.styled";
import MaterialTable, { Column } from "@material-table/core";
import { tableIcons } from "components/icons";

export const Tables = () => {
  const { t } = useTranslation("common");
  const _tables = useSelector((state: AppState) => state.tables.tables);

  interface IPerson {
    firstName: string;
    lastName: string;
    birthYear: number;
    availability: boolean;
  }

  const lookup = { true: "Available", false: "Unavailable" };

  const columns: Array<Column<IPerson>> = [
    { title: "First Name", field: "firstName" },
    { title: "Last Name", field: "lastName" },
    { title: "Birth Year", field: "birthYear", type: "numeric" },
    { title: "Availablity", field: "availability", lookup },
  ];

  const data: Array<IPerson> = [
    { firstName: "Tod", lastName: "Miles", birthYear: 1987, availability: true },
    { firstName: "Jess", lastName: "Smith", birthYear: 2000, availability: false },
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
                  // selected={view.name === selectedView.viewName}
                  // onClick={() => dispatch(setSelectedView({ viewName: view.name, viewScript: "" }))}
                  >
                    <StyledListItemText primary={table.name} />
                  </StyledListItemButton>
                </StyledListItem>
              ))}
            </StyledList>
          </Paper>
        </Grid>

        <Grid item xs={8} className="view-detail-grid">
          <MaterialTable columns={columns} data={data} icons={tableIcons} />

          {/* {isNotNull(selectedView) && (
            <Paper className="view-detail" elevation={3}>
              <div className="view-detail-header">
                <Typography variant="h6" className="view-name">
                  {selectedView.viewName}
                </Typography>
                <div className="view-detail-buttons">
                  <IconButton className="edit-btn" size="large" onClick={handleViewEdit}>
                    <Icon fontSize="small">edit</Icon>
                  </IconButton>
                  <IconButton className="delete-btn" size="large" onClick={handleViewDelete}>
                    <Icon fontSize="small">delete</Icon>
                  </IconButton>
                </div>
              </div>
              <ul className="view-columns">
                {_views
                  .filter((view) => view.name === selectedView.viewName)[0]
                  .columns.map((column, index) => (
                    <li key={index}>{column.name}</li>
                  ))}
              </ul>
            </Paper>
          )} */}
        </Grid>
      </Grid>
    </StyledTables>
  );
};
