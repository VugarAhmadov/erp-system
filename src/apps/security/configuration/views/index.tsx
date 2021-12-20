import React, { useState } from "react";
import {
  Button,
  Grid,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AppState } from "store";
import { StyledView } from "./views.styled";
import { ISelectedView } from "./store/types";
import { ViewInsert } from "../components";
import { editView, addView, deleteView, getViewScript } from "../store/actions";
import { setSelectedView, setViewDialogOpened } from "../store";
import { isNotNull } from "helpers";

export const Views = () => {
  // const [selectedView, setSelectedView] = useState<IView | null>(null);
  const dispatch = useDispatch();
  const _views = useSelector((state: AppState) => state.configuration.views);
  const selectedView = useSelector((state: AppState) => state.configuration.selectedView);
  const dialogOpened = useSelector((state: AppState) => state.configuration.viewDialogOpened);
  const { t } = useTranslation();

  const handleAddNew = () => {
    dispatch(setSelectedView({} as ISelectedView));
    dispatch(setViewDialogOpened(true));
  };

  const handleViewEdit = () => {
    dispatch(getViewScript(selectedView?.viewName as string));
  };

  const handleViewDialogClose = () => {
    dispatch(setViewDialogOpened(false));
  };

  const handleOnSubmit = (data: ISelectedView) => {
    let requestData;

    if (isNotNull(selectedView)) {
      requestData = {
        oldName: selectedView.viewName,
        ...data,
      };
      dispatch(editView(requestData));
    } else {
      requestData = data;
      dispatch(addView(requestData));
    }
  };

  const handleViewDelete = () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      text: "Are you sure to remove?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "confirm",
      cancelButtonText: "cancel",
    }).then((result) => {
      if (result.value) {
        dispatch(deleteView(selectedView.viewName));
      }
    });
  };

  return (
    <>
      <StyledView>
        <Grid container>
          <Grid item xs={4} className="views-grid">
            <div className="views-header">
              <Typography variant="h5">{t("views")}</Typography>
              <Button variant="contained" onClick={handleAddNew}>
                {t("add-new-view")}
              </Button>
            </div>

            <Paper elevation={3}>
              <List className="views-list">
                {_views.map((view) => (
                  <ListItem key={view.name}>
                    <ListItemButton
                      selected={view.name === selectedView.viewName}
                      onClick={() => dispatch(setSelectedView({ viewName: view.name, viewScript: "" }))}
                    >
                      <ListItemText primary={view.name} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid item xs={8} className="view-detail-grid">
            {isNotNull(selectedView) && (
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
            )}
          </Grid>
        </Grid>
      </StyledView>
      <ViewInsert open={dialogOpened} onClose={handleViewDialogClose} onSubmit={handleOnSubmit} />
    </>
  );
};
