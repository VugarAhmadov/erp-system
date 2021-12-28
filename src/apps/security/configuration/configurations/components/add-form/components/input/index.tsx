import React, { FC, useEffect, useState } from "react";
import { Button, DialogContent, Icon, IconButton, Menu, MenuItem, Switch, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Dialog } from "../dialog";
import { getAll as getAllViews } from "apps/security/configuration/views/store/actions";
import { Form } from "react-final-form";
import { Select, TextField, Switches } from "components/shared";
import { AppState } from "store";
import { StyledForm } from "./input.styled";
import { useTranslation } from "react-i18next";

interface IInput {
  open: boolean;
  onClose(): void;
  onSubmit(data: any): void;
}

export const Input: FC<IInput> = ({ open, onClose, onSubmit }) => {
  const dispatch = useDispatch();
  const views = useSelector((state: AppState) => state.views.views);
  const selectedOperation = useSelector((state: AppState) => state.operation.selectedOperation);
  const { t } = useTranslation("common");

  useEffect(() => {
    dispatch(getAllViews());
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);
  const _open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // console.log(views.find((view) => view.name === selectedOperation));

  return (
    <Dialog open={open} onClose={onClose}>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, invalid }) => (
          <StyledForm onSubmit={handleSubmit}>
            <Typography variant="h6">{t("addInputComponent")}</Typography>
            <div className="model-field">
              <TextField name="model" label="model" required />
              {/* <IconButton
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
              <Menu id="button-menu" anchorEl={anchorEl} open={_open} onClose={handleClose}>
                {views
                  .find((view) => view.name === selectedOperation)
                  ?.columns.map((column) => (
                    <MenuItem onClick={handleClose}>{column.name}</MenuItem>
                  ))}
              </Menu> */}
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
              <Switches name="required" required data={{ label: t("required"), value: "required" }} />
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
