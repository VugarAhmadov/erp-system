import React, { FC, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import { Select, TextField, Autocomplete } from "components/shared";
import { Dialog } from "../..";
import { StyledForm } from "./button-dialog.styled";
import { useDispatch, useSelector } from "react-redux";
import { getAll as getAllOperations } from "apps/security/operation/store/actions";
import { AppState } from "store";
import { IButtonParams } from "../button-element";

interface IButtonDialog {
  open: boolean;
  onClose(): void;
  onSubmit(data: IButtonParams): void;
  params: IButtonParams;
}

export const ButtonDialog: FC<IButtonDialog> = ({ open, onClose, onSubmit, params }) => {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();

  const operations = useSelector((state: AppState) => state.operation.operations.r);

  useEffect(() => {
    dispatch(getAllOperations());
  }, []);

  return (
    <Dialog open={open} onClose={onClose}>
      <Form
        onSubmit={onSubmit}
        initialValues={params}
        render={({ handleSubmit, invalid, values }) => (
          <StyledForm onSubmit={handleSubmit}>
            <Typography variant="h6">{t("addButtonComponent")}</Typography>

            <div>
              <TextField name="label" label={t("label")} required className="field" />

              <Select
                name="sort"
                data={[
                  { label: "Button", value: "button" },
                  { label: "Link", value: "link" },
                  { label: "Icon", value: "icon" },
                ]}
                required
                label={t("sorts")}
              />

              {values?.sort !== "icon" && (
                <Select
                  name="variant"
                  data={[
                    { label: "Text", value: "text" },
                    { label: "Contained", value: "contained" },
                    { label: "Outlined", value: "outlined" },
                  ]}
                  required
                  label={t("variants")}
                />
              )}

              {values?.sort === "icon" && (
                <TextField name="iconName" label={t("iconName")} required className="field" />
              )}

              {values?.sort === "link" && <TextField name="linkUrl" label={t("linkUrl")} className="field" />}

              <Select
                name="color"
                data={[
                  { label: "Error", value: "error" },
                  { label: "Info", value: "info" },
                  { label: "Warning", value: "warning" },
                  { label: "Success", value: "success" },
                  { label: "Primary", value: "primary" },
                  { label: "Secondary", value: "secondary" },
                  { label: "Inherit", value: "inherit" },
                ]}
                required
                label={t("colors")}
              />

              <Select
                name="size"
                data={[
                  { label: "Small", value: "small" },
                  { label: "Medium", value: "medium" },
                  { label: "Large", value: "large" },
                ]}
                required
                label={t("sizes")}
              />
              <Autocomplete
                name="linkedOperationId"
                label={t("linkedOperation")}
                options={operations}
                getOptionValue={(option) => option.id}
                getOptionLabel={(option) => option.url}
              />
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
