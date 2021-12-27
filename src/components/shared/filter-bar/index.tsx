import React, { FC } from "react";
import { Button, Grid, Icon, Paper } from "@mui/material";
import { StyledPaper } from "./filter-bar.styled";
import { IFilterBar, IFilterBarConfig } from "./type";
import { Link as RouterLink } from "react-router-dom";
import { DialogFormContent } from "./form";
import { useDialog } from "hooks";

export const FilterBar: FC<IFilterBar> = ({ addButton }) => {
  // const initialConfig: IFilterBarConfig = {
  //   addButton: {
  //     show: true,
  //     ...addButton
  //   },
  //   ...config,
  // };
  const openDialog = useDialog();

  const handleDialogOpen = () => {
    openDialog({ content: <div>salam</div>, fullWidth: true });
  };

  return (
    <StyledPaper elevation={2}>
      <Grid container>
        <Grid item xs={4}>
          {addButton.show && (
            <Button
              // component={RouterLink}
              // to={addButton.link!}
              startIcon={<Icon>{addButton.icon ?? "add"}</Icon>}
              variant="contained"
              color="success"
              onClick={addButton.onClick}
            >
              {addButton.title}
            </Button>
          )}
          <Button onClick={() => handleDialogOpen()}>open dialog</Button>
        </Grid>
        <Grid item xs={8}></Grid>
      </Grid>
    </StyledPaper>
  );
};
