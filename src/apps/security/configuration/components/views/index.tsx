import React, { useState } from "react";
import { Grid, List, ListItem, ListItemButton, ListItemText, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import { AppState } from "store";
import { StyledView } from "./views.styled";
import { IView } from "../../store/types";

export const Views = () => {
  const [selectedView, setSelectedView] = useState<IView | null>(null);
  const _views = useSelector((state: AppState) => state.configuration.views);

  return (
    <StyledView>
      <Grid container spacing={4}>
        <Grid item xs={4}>
          <Paper>
            <List>
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
          <Paper>
            <ul>
              {selectedView?.columns.map((column, index) => (
                <li key={index}>{column.name}</li>
              ))}
            </ul>
          </Paper>
        </Grid>
      </Grid>
    </StyledView>
  );
};
