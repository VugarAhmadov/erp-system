import React, { FC, memo } from "react";
import { DialogContent, Grid, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { AppState } from "store";
import { IDialog } from "types";
import { IAddOrEditApplicationRequest } from "../../store/types";
import { StyledDialog } from "./add-or-edit-dialog.styled";
import i18n from "translation";
import { IName } from "apps/auth/store/types";
import {
  InputElement,
  SelectElement,
  DatepickerElement,
  ButtonElement,
  LabelElement,
  CheckboxElement,
  TableElement,
  RadioElement,
  TabElement,
  ImageElement,
  FileUploadElement,
} from "apps/security/configuration/configurations-new/components/html-form-dialog/components/elements-with-dnd/components";
import { Button, HiddenInput } from "components/shared";
import { createTree } from "helpers";
import { IRow } from "apps/security/configuration/configurations-new/components/html-form-dialog/components/types";
import { GridRow } from "./grid-row";

interface IAddOrEditDialog {
  dialog: IDialog;
  onClose(): void;
  onSubmit(data: IAddOrEditApplicationRequest): void;
}

export const AddOrEditDialog: FC<IAddOrEditDialog> = memo(({ dialog, onClose, onSubmit }) => {
  const { t } = useTranslation("common");

  const module = useSelector((state: AppState) => state.common.selectedModule);
  const loading = useSelector((state: AppState) => state.dynamic.loading);
  const initialData = useSelector((state: AppState) => state.dynamic.data);

  const formHtml = module && JSON.parse(module.operations.find((op) => op.code === "ADD")?.formHtml!);

  const formInputs = formHtml.formContent
    .filter((c: any) => c.type !== "column" && c.type !== "row" && c.type !== "label")
    .map((a: any) => a.params.model);

  const _initialData = Object.fromEntries(formInputs.map((c: any) => [c, initialData[c]]));

  const _content = formHtml ? createTree(formHtml.formContent) : [];

  return (
    <StyledDialog
      open={(dialog.type === "add" || dialog.type === "edit") && dialog.opened}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={true}
      maxWidth={formHtml?.dialogSize || "sm"}
      scroll="paper"
    >
      <DialogContent>
        <Form
          onSubmit={onSubmit}
          initialValues={_initialData}
          render={({ handleSubmit, invalid }) => (
            <form onSubmit={handleSubmit} className="form">
              <div className="form-header">
                {dialog.type === "add" && (
                  <Typography variant="h5">
                    {module?.operations.find((op) => op.code === "ADD")?.name[i18n.language as keyof IName]}
                  </Typography>
                )}
                {dialog.type === "edit" && (
                  <Typography variant="h5">
                    {module?.operations.find((op) => op.code === "EDIT")?.name[i18n.language as keyof IName]}
                  </Typography>
                )}

                <div className="action-buttons">
                  <Button type="submit" className="submit-btn" loading={loading.add || loading.edit}>
                    {t("submit")}
                  </Button>
                  <Button onClick={onClose} variant="outlined">
                    {t("close")}
                  </Button>
                </div>
              </div>

              <div className="form-body">
                {dialog.type === "edit" && <HiddenInput name="id" />}
                {_content?.map((row: IRow) => (
                  <GridRow row={row} key={row.id} />
                ))}
              </div>
            </form>
          )}
        />
      </DialogContent>
    </StyledDialog>
  );
});
