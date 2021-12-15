import React, { useState } from "react";
import { Grid, Icon, IconButton, List, ListItem, ListItemButton, ListItemText, Paper, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { AppState } from "store";
import { StyledView } from "./views.styled";
import { IView } from "../../store/types";
import { ViewInsert } from "..";

export const Views = () => {
  const [selectedView, setSelectedView] = useState<IView | null>(null);
  const [dialogOpened, setDialogOpened] = useState(false);
  const _views = useSelector((state: AppState) => state.configuration.views);
  const { t } = useTranslation();

  return (
    <>
      <StyledView>
        <Typography variant="h5" className="title">
          {t("views")}
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <Paper elevation={3}>
              <List className="views-list">
                {_views.map((view) => (
                  <ListItem key={view.name}>
                    <ListItemButton selected={view.name === selectedView?.name} onClick={() => setSelectedView(view)}>
                      <ListItemText primary={view.name} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={8}>
            {selectedView && (
              <Paper className="view-detail" elevation={3}>
                <div className="view-detail-header">
                  <Typography variant="h6" className="view-name">
                    {selectedView?.name}
                  </Typography>
                  <div className="view-detail-buttons">
                    <IconButton className="edit-btn" size="large" onClick={() => setDialogOpened(true)}>
                      <Icon fontSize="small">edit</Icon>
                    </IconButton>
                    <IconButton className="delete-btn" size="large">
                      <Icon fontSize="small">delete</Icon>
                    </IconButton>
                  </div>
                </div>
                <ul className="view-columns">
                  {selectedView?.columns.map((column, index) => (
                    <li key={index}>{column.name}</li>
                  ))}
                </ul>
              </Paper>
            )}
          </Grid>
        </Grid>
      </StyledView>
      <ViewInsert open={dialogOpened} handleClose={() => setDialogOpened(false)} />
    </>
  );
};
