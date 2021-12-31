import React, { FC, useState } from "react";
import { Button, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Select, Switches, TextField } from "components/shared";
import { AppState } from "store";
import { Dialog, ModelTextField } from "../..";
import { StyledForm } from "./input-dialog.styled";

interface IInputDialog {
  open: boolean;
  onClose(): void;
  onSubmit(data: any): void;
  params: any;
}

export const InputDialog: FC<IInputDialog> = ({ open, onClose, onSubmit, params }) => {
  const { t } = useTranslation("common");

  const views = useSelector((state: AppState) => state.views.views);
  const selectedOperation = useSelector((state: AppState) => state.configurations.selectedOperation);
  const modules = useSelector((state: AppState) => state.auth.user.applications[0].modules);

  const [anchorEl, setAnchorEl] = useState(null);
  const _open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Form
        onSubmit={onSubmit}
        initialValues={params}
        render={({ handleSubmit, invalid, form }) => (
          <StyledForm onSubmit={handleSubmit}>
            <Typography variant="h6">{t("addInputComponent")}</Typography>
            <ModelTextField
              menuData={
                views
                  .find(
                    (view) =>
                      view.name ===
                      modules
                        .find((module) => module.id === selectedOperation.moduleId)
                        ?.operations.find((operation) => operation.code === "ALL_VIEW")?.viewName
                  )
                  ?.columns?.map((column) => column.name)!
              }
              fieldName="model"
              fieldLabel="model"
              form={form}
            />
            <TextField name="label" label={t("label")} required className="field" />
            <TextField name="placeholder" label="placeholder" className="field" />
            <Select
              name="type"
              data={[
                { label: t("number"), value: "number" },
                { label: t("text"), value: "text" },
              ]}
              required
              label={t("types")}
            />
            <div className="switch">
              <Switches name="required" data={{ label: t("required"), value: "required" }} />
            </div>

            <div className="action-buttons">
              <Button onClick={onClose} className="cancel-btn">
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
