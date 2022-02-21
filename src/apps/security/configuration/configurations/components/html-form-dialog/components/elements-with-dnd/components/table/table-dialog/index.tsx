import React, { FC } from "react";
import { Button, Checkbox, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import { camelCase } from "lodash";
import { useSelector } from "react-redux";
import { Autocomplete, TextField } from "components/shared";
import { AppState } from "store";
import { Dialog } from "../..";
import { StyledForm } from "./table-dialog.styled";
import { ITableParams } from "../table-element";

interface ITableDialog {
  open: boolean;
  onClose(): void;
  onSubmit(data: ITableParams): void;
  params: ITableParams;
}

export const TableDialog: FC<ITableDialog> = ({ open, onClose, onSubmit, params }) => {
  const { t } = useTranslation("common");

  const views = useSelector((state: AppState) => state.views?.views);

  const urlLists = useSelector((state: AppState) => state.auth.user.privilegeList);

  return (
    <Dialog open={open} onClose={onClose}>
      <Form
        onSubmit={onSubmit}
        initialValues={params}
        render={({ handleSubmit, invalid, form, values }) => (
          <StyledForm onSubmit={handleSubmit}>
            <Typography variant="h6">{t("addTableComponent")}</Typography>

            <div>
              <Autocomplete
                name="viewName"
                id="view"
                label={t("views")}
                options={views.map((view) => view.name)}
                className="views"
                onChange={(e, v: any) => {
                  form.change("seqColumns");
                  form.resetFieldState("seqColumns");
                }}
                required
              />
              <Autocomplete
                label={t("columns")}
                name="seqColumns"
                options={
                  views
                    ?.filter((view) => view.name === values?.viewName)[0]
                    ?.columns?.map((column) => camelCase(column.name)) || []
                }
                disabled={!values?.viewName}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox style={{ marginRight: 8 }} checked={selected} />
                    {option}
                  </li>
                )}
                // required
                multiple
                freeSolo
                disableCloseOnSelect
              />

              <TextField name="title" label={t("title")} className="field" />

              <Autocomplete name="getUrl" id="getUrl" label={t("getUrls")} options={urlLists} required />
            </div>

            <div className="styles">
              <Typography variant="h6">{t("Styles")}</Typography>
              <TextField name="top" label="top" className="field" />
              <TextField name="left" label="left" className="field" />
              <TextField name="width" label="width" className="field" />
            </div>

            <div className="action-buttons">
              <Button onClick={onClose} className="cancel-btn" variant="outlined">
                {t("cancel")}
              </Button>
              <Button type="submit" className="add-btn" disabled={invalid}>
                {t("add")}
              </Button>
            </div>
          </StyledForm>
        )}
      />
    </Dialog>
  );
};
