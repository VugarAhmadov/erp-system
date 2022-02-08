import React, { FC, memo, useState } from "react";
import { Button as MuiButton, DialogContent, Grid, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { AppState } from "store";
import { IDialog } from "types";
import { IAddOrEditApplicationRequest } from "../../store/types";
import { StyledDialog } from "./add-or-edit.styled";
import i18n from "translation";
import { IName } from "apps/auth/store/types";
import {
  InputElement,
  SelectElement,
  // LabelElement,
  DatepickerElement,
  // CheckboxElement,
  ButtonElement,
  LabelElement,
  CheckboxElement,
  TableElement,
  RadioElement,
  TabElement,
  ImageElement,
  FileUploadElement,
  // TableElement,
  // ImageElement,
  // RadioElement,
  // TabElement,
  // FileUploadElement,
} from "apps/security/configuration/configurations-new/components/html-form-dialog/components/elements-with-dnd/components";
import { useLocation } from "react-router-dom";

interface IAddOrEdit {
  dialog: IDialog;
  onClose(): void;
  onSubmit(data: IAddOrEditApplicationRequest): void;
}

export const AddOrEdit: FC<IAddOrEdit> = memo(({ dialog, onClose, onSubmit }) => {
  const { t } = useTranslation("common");
  const location = useLocation();

  const apps = useSelector((state: AppState) => state.auth.user.applications);
  const module = apps
    .find((app) => app.url === `/${location.pathname.split("/")[1]}`)!
    .modules.find((module) => module.url === `/${location.pathname.split("/")[2]}`)!;

  // const module = useSelector((state: AppState) => state.module.module);

  const data = JSON.parse(module.operations.find((op) => op.code === "ADD")?.formHtml!);

  const [selectData, setSelectData] = useState<any[]>([]);

  return (
    <StyledDialog
      open={dialog.opened}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth={true}
      maxWidth={data?.dialogSize || "sm"}
      scroll="paper"
    >
      <DialogContent>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, invalid }) => (
            <form onSubmit={handleSubmit} className="form">
              <div className="form-header">
                {dialog.type === "add" && (
                  <Typography variant="h5">
                    {module.operations.find((op) => op.code === "ADD")?.name[i18n.language as keyof IName]}
                  </Typography>
                )}
                {dialog.type === "edit" && (
                  <Typography variant="h5">
                    {module.operations.find((op) => op.code === "EDIT")?.name[i18n.language as keyof IName]}
                  </Typography>
                )}

                <div className="action-buttons">
                  <MuiButton type="submit" className="submit-btn">
                    {t("submit")}
                  </MuiButton>
                  <MuiButton onClick={onClose} variant="outlined">
                    {t("close")}
                  </MuiButton>
                </div>
              </div>

              <div className="form-body">
                {data?.formContent?.map((row: any) => (
                  <Grid container key={row.index} spacing={3}>
                    {row?.columns?.map((column: any) => (
                      <Grid item key={column.index} xs={column.gridColumnSize}>
                        {column.element.type === "input" && (
                          <InputElement
                            params={column.element.params}
                            gridColumnIndex={column.index}
                            gridRowIndex={column.gridRowIndex}
                            // dependedFieldData={
                            //   element.params.dependedComponent === "select" && element.params.dependedModelName
                            //     ? selectData.find((d) => d.model === element.params.dependedModelName)?.data
                            //     : null
                            // }
                          />
                        )}
                        {column.element.type === "select" && (
                          <SelectElement
                            params={column.element.params}
                            gridColumnIndex={column.index}
                            gridRowIndex={column.gridRowIndex}
                            // onSelectChange={(data: any) => {
                            //   setSelectData((prev) => {
                            //     if (prev.find((p) => p.model === element.params.model)) {
                            //       return prev.map((n) => (n.model === element.params.model ? { ...n, data } : n));
                            //     } else {
                            //       return [...prev, { model: element.params.model, data }];
                            //     }
                            //   });
                            // }}
                          />
                        )}
                        {column.element.type === "datepicker" && (
                          <DatepickerElement
                            params={column.element.params}
                            gridColumnIndex={column.index}
                            gridRowIndex={column.gridRowIndex}
                          />
                        )}
                        {column.element.type === "button" && (
                          <ButtonElement
                            params={column.element.params}
                            gridColumnIndex={column.index}
                            gridRowIndex={column.gridRowIndex}
                          />
                        )}
                        {column.element.type === "label" && (
                          <LabelElement
                            params={column.element.params}
                            gridColumnIndex={column.index}
                            gridRowIndex={column.gridRowIndex}
                          />
                        )}
                        {column.element.type === "checkbox" && (
                          <CheckboxElement
                            params={column.element.params}
                            gridColumnIndex={column.index}
                            gridRowIndex={column.gridRowIndex}
                          />
                        )}
                        {column.element.type === "table" && (
                          <TableElement
                            params={column.element.params}
                            gridColumnIndex={column.index}
                            gridRowIndex={column.gridRowIndex}
                          />
                        )}
                        {column.element.type === "radio" && (
                          <RadioElement
                            params={column.element.params}
                            gridColumnIndex={column.index}
                            gridRowIndex={column.gridRowIndex}
                          />
                        )}
                        {column.element.type === "tab" && (
                          <TabElement
                            params={column.element.params}
                            gridColumnIndex={column.index}
                            gridRowIndex={column.gridRowIndex}
                          />
                        )}
                        {column.element.type === "image" && (
                          <ImageElement
                            params={column.element.params}
                            gridColumnIndex={column.index}
                            gridRowIndex={column.gridRowIndex}
                            // dependedFieldData={
                            //   element.params.dependedComponent === "select" && element.params.dependedModelName
                            //     ? selectData.find((d) => d.model === element.params.dependedModelName)?.data
                            //     : null
                            // }
                          />
                        )}
                        {column.element.type === "fileUpload" && (
                          <FileUploadElement
                            params={column.element.params}
                            gridColumnIndex={column.index}
                            gridRowIndex={column.gridRowIndex}
                          />
                        )}
                      </Grid>
                    ))}
                  </Grid>
                ))}
              </div>
            </form>
          )}
        />
      </DialogContent>
    </StyledDialog>
  );
});
