import React from "react";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { camelCase, snakeCase } from "lodash";
import { Autocomplete } from "components/shared";
import { AppState } from "store";
import { Button, Checkbox, DialogContent, Typography } from "@mui/material";
import { StyledDialog } from "./view-form-dialog.styled";
import { closeDialog } from "../../store";
import { addViewForm } from "apps/security/operation/store/actions";

export const ViewFormDialog = () => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation("common");

  const views = useSelector((state: AppState) => state.views?.views);

  const opened = useSelector((state: AppState) => state.configurations.viewFormDialogOpened);
  const selectedOperation = useSelector((state: AppState) => state.configurations.selectedOperationViewForm);

  const handleClose = (event: any, reason: "backdropClick" | "escapeKeyDown" | "closeButtonClick") => {
    if (reason && (reason === "backdropClick" || reason === "escapeKeyDown")) return;
    dispatch(closeDialog());
  };

  const handleSubmit = (data: any) => {
    dispatch(
      addViewForm({
        viewName: data.viewName,
        seqColumn: data.seqColumn?.map((column: string) => camelCase(column)).join(","),
        operationId: selectedOperation.id,
        viewCode: "0",
      })
    );
  };

  return (
    <StyledDialog
      open={opened}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="sm"
      scroll="paper"
    >
      <DialogContent>
        <Form
          onSubmit={handleSubmit}
          initialValues={{ viewName: selectedOperation.viewName, seqColumn: selectedOperation.seqColumn }}
          render={({ handleSubmit, values, invalid, form }) => (
            <form className="form" onSubmit={handleSubmit}>
              <Typography variant="h5">{t("allView")}</Typography>
              <Autocomplete
                name="viewName"
                id="view"
                label={t("views")}
                options={views.map((view) => view.name)}
                className="views"
                onChange={(e, v: any) => {
                  form.change("seqColumn");
                  form.resetFieldState("seqColumn");
                }}
                required
              />
              <Autocomplete
                label={t("columns")}
                name="seqColumn"
                options={
                  views?.filter((view) => view.name === values.viewName)[0]?.columns?.map((column) => column.name) || []
                }
                disabled={!values.viewName}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox style={{ marginRight: 8 }} checked={selected} />
                    {option}
                  </li>
                )}
                multiple
                freeSolo
                disableCloseOnSelect
              />
              <div className="action-buttons">
                <Button variant="outlined" className="cancel-btn" onClick={() => handleClose({}, "closeButtonClick")}>
                  {t("cancel")}
                </Button>
                <Button className="submit-btn" type="submit" disabled={invalid}>
                  {t("submit")}
                </Button>
              </div>
            </form>
          )}
        />
      </DialogContent>
    </StyledDialog>
  );
};
