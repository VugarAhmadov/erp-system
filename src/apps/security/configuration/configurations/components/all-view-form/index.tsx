import React, { FC, useEffect, useState } from "react";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Autocomplete } from "components/shared";
import { AppState } from "store";
import { Button, Checkbox, Typography } from "@mui/material";
import { StyledForm } from "./all-view-form.styled";
import { operationApi } from "api";

interface IAllViewForm {
  onClose(): void;
}

export const AllViewForm: FC<IAllViewForm> = ({ onClose }) => {
  const { t, i18n } = useTranslation("common");
  const [initialValues, setInitialValues] = useState({});
  const views = useSelector((state: AppState) => state.views?.views);
  const selectedOperation = useSelector((state: AppState) => state.configurations.selectedOperation);

  useEffect(() => {
    operationApi.getHtmlFormOrViewname({ lang: i18n.language, operationId: selectedOperation }).then(({ data }) => {
      if (data.err.length === 0) {
        setInitialValues({ viewName: data.tbl[0].r[0].viewName, seqColumns: data.tbl[0].r[0].seqColumns });
      }
    });
  }, []);

  return (
    <Form
      onSubmit={(data) => console.log(data)}
      initialValues={initialValues}
      render={({ handleSubmit, values, invalid }) => (
        <StyledForm onSubmit={handleSubmit}>
          <Typography variant="h5">{t("allView")}</Typography>
          <Autocomplete
            name="viewName"
            id="view"
            label={t("views")}
            options={views.map((view) => view.name)}
            className="views"
            required
          />
          <Autocomplete
            label={t("columns")}
            name="columns"
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
            <Button variant="outlined" className="cancel-btn" onClick={onClose}>
              {t("cancel")}
            </Button>
            <Button className="submit-btn" type="submit" disabled={invalid}>
              {t("submit")}
            </Button>
          </div>
        </StyledForm>
      )}
    />
  );
};
