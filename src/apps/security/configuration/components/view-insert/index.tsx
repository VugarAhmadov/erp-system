import React, { FC } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Icon,
  Paper,
  Typography,
} from "@mui/material";
import { StyledDialog } from "./view-insert.styled";
import { Form } from "react-final-form";
import { TextField } from "components/shared";
import { useTranslation } from "react-i18next";
import { useValidators } from "hooks";
import { useSelector } from "react-redux";
import { AppState } from "store";

interface IViewInsert {
  open: boolean;
  handleClose(): void;
}

export const ViewInsert: FC<IViewInsert> = ({ open, handleClose }) => {
  const { t } = useTranslation("common");
  const { required } = useValidators();
  const tables = useSelector((state: AppState) => state.configuration.tables);

  return (
    <StyledDialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={true}
      maxWidth="md"
      scroll="paper"
    >
      {/* <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle> */}
      <DialogContent>
        <Grid container spacing={4}>
          <Grid item xs={8}>
            <Form
              onSubmit={(data) => console.log(data)}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} className="insert-form">
                  <Typography variant="h5" className="view-title">
                    {t("view-detail")}
                  </Typography>
                  <TextField name="viewName" id="viewName" label={t("view-name")} validate={required} />
                  <TextField
                    name="viewScript"
                    id="viewScript"
                    label={t("view-script")}
                    validate={required}
                    multiline
                    rows={10}
                  />
                  <div className="action-buttons">
                    <Button variant="contained" color="inherit" className="back-btn" onClick={handleClose}>
                      {t("back")}
                    </Button>
                    <Button variant="contained" color="warning" className="edit-btn" type="submit">
                      {t("edit")}
                    </Button>
                  </div>
                </form>
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h5" className="view-title">
              {t("tables")}
            </Typography>
            <Paper className="table-list">
              {tables.map((table) => (
                <Accordion className="table" key={table.name} TransitionProps={{ unmountOnExit: true }}>
                  <AccordionSummary
                    expandIcon={<Icon>expand_more</Icon>}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                    <Typography>{table.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ul className="table-columns">
                      {table.columns.map((column) => (
                        <li key={column.name}>{column.name}</li>
                      ))}
                    </ul>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>
    </StyledDialog>
  );
};
