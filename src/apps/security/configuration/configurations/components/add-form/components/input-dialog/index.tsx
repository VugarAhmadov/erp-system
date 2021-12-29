import React, { FC, useState } from "react";
import { Button, Icon, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Select, Switches, TextField } from "components/shared";
import { AppState } from "store";
import { Dialog } from "..";
import { StyledForm } from "./input-dialog.styled";
import { camelCase } from "lodash";

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
            <div className="model-field">
              <TextField name="model" label="model" required />
              <IconButton
                aria-label="more"
                id="button"
                className="select-button"
                aria-controls="long-menu"
                aria-expanded={_open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <Icon>more_vert</Icon>
              </IconButton>
              <Menu id="demo-customized-menu" anchorEl={anchorEl} open={_open} onClose={handleClose}>
                {views
                  .find(
                    (view) =>
                      view.name ===
                      modules
                        .find((module) => module.id === selectedOperation.moduleId)
                        ?.operations.find((operation) => operation.code === "ALL_VIEW")?.viewName
                  )
                  ?.columns.map((column) => (
                    <MenuItem
                      onClick={() => {
                        form.change("model", camelCase(column.name));
                        handleClose();
                      }}
                    >
                      {column.name}
                    </MenuItem>
                  ))}
              </Menu>
            </div>
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
