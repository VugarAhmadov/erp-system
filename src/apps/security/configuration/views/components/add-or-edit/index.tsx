import React, { FC } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  DialogContent,
  Grid,
  Icon,
  Paper,
  Typography,
} from "@mui/material";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { TextField } from "components/shared";
import { useValidators } from "hooks";
import { AppState } from "store";
import { isNotNull } from "helpers";
import { ISelectedView } from "../../store/types";
import { StyledDialog } from "./add-or-edit.styled";

interface IAddOrEdit {
  open: boolean;
  onClose(): void;
  onSubmit(data: ISelectedView): void;
}

export const AddOrEdit: FC<IAddOrEdit> = ({ open, onClose, onSubmit }) => {
  const { t } = useTranslation("common");
  const { required } = useValidators();
  const tables = useSelector((state: AppState) => state.tables.tables);
  const selectedView = useSelector((state: AppState) => state.views.selectedView);

  const initialValues = selectedView.viewName ? selectedView : { oldName: "", viewScript: "" };

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={true}
      maxWidth="md"
      scroll="paper"
    >
      <DialogContent>
        <Grid container spacing={4}>
          <Grid item xs={8}>
            <Form
              onSubmit={onSubmit}
              initialValues={initialValues}
              render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} className="insert-form">
                  <Typography variant="h5" className="view-title">
                    {t("view-detail")}
                  </Typography>
                  <TextField name="viewName" id="viewName" label={t("view-name")} validate={required} />
                  <TextField
                    name="viewScript"
                    id="viewScript"
                    className="view-script"
                    label={t("view-script")}
                    validate={required}
                    multiline
                    rows={18}
                  />
                  <div className="action-buttons">
                    <Button variant="contained" color="inherit" className="back-btn" onClick={onClose}>
                      {t("back")}
                    </Button>
                    <Button variant="contained" color="warning" className="edit-btn" type="submit">
                      {t(isNotNull(selectedView) ? "edit" : "add")}
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
