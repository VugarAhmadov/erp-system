import React, { FC, useEffect, useState } from "react";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { camelCase, snakeCase } from "lodash";
import { Autocomplete } from "components/shared";
import { AppState } from "store";
import { Button, Checkbox, Typography } from "@mui/material";
import { StyledForm } from "./all-view-form.styled";
import { operationApi } from "api";
import { IAddViewFormRequest } from "apps/security/operation/store/types";

interface IAllViewForm {
  onClose(): void;
  onSubmit(data: IAddViewFormRequest): void;
}

export const AllViewForm: FC<IAllViewForm> = ({ onClose, onSubmit }) => {
  const { t, i18n } = useTranslation("common");
  const [initialValues, setInitialValues] = useState({});
  const views = useSelector((state: AppState) => state.views?.views);
  const selectedOperation = useSelector((state: AppState) => state.configurations.selectedOperation);

  useEffect(() => {
    operationApi.getHtmlFormOrViewname({ lang: i18n.language, operationId: selectedOperation.id }).then(({ data }) => {
      if (data.err.length === 0) {
        setInitialValues({
          viewName: data.tbl[0].r[0].viewName,
          seqColumn: data.tbl[0].r[0].seqColumns?.split(", ")?.map((column: string) => snakeCase(column)),
        });
      }
    });
  }, [selectedOperation]);

  const handleSubmit = (data: any) => {
    onSubmit({
      viewName: data.viewName,
      seqColumn: data.seqColumn?.map((column: string) => camelCase(column)).join(", "),
      operationId: selectedOperation.id,
      viewCode: "0",
    });
  };

  return (
    <Form
      onSubmit={(data) => handleSubmit(data)}
      initialValues={initialValues}
      render={({ handleSubmit, values, invalid, form }) => (
        <StyledForm onSubmit={handleSubmit}>
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
