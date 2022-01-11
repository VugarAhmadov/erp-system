import React, { FC, Fragment } from "react";
import { Button as MuiButton, DialogContent, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { AppState } from "store";
import { IDialog } from "types";
import { IAddOrEditApplicationRequest } from "../../store/types";
import { StyledDialog } from "./add-or-edit.styled";
import i18n from "translation";
import { IName } from "apps/auth/store/types";
import { InputElement } from "apps/security/configuration/configurations/components/add-form/components/input/input-element";
import { Select } from "apps/security/configuration/configurations/components/add-form/components/select/select-element/select";
import { Datepicker } from "apps/security/configuration/configurations/components/add-form/components/datepicker/datepicker-element/datepicker";
import { Checkbox } from "apps/security/configuration/configurations/components/add-form/components/checkbox/checkbox-element/checkbox";
import { Label } from "apps/security/configuration/configurations/components/add-form/components/label/label-element/label";
import { Button } from "apps/security/configuration/configurations/components/add-form/components/button/button-element/button";

interface IAddOrEdit {
  dialog: IDialog;
  onClose(): void;
  onSubmit(data: IAddOrEditApplicationRequest): void;
}

export const AddOrEdit: FC<IAddOrEdit> = ({ dialog, onClose, onSubmit }) => {
  const { t } = useTranslation("common");
  const apps = useSelector((state: AppState) => state.application.applications.r);
  const selectedApp = useSelector((state: AppState) => state.application.selectedApp);

  const module = useSelector((state: AppState) => state.module.module);

  const data = JSON.parse(module.operations.find((op) => op.code === "ADD")?.formHtml!);

  const initialValues = apps
    ?.filter((app) => app.id === selectedApp)
    ?.map((app: any) => ({
      nameAz: app.nameAz,
      nameEn: app.nameEn,
      nameRu: app.nameRu,
      shortNameAz: app.shortNameAz,
      shortNameEn: app.shortNameEn,
      shortNameRu: app.shortNameRu,
      url: app.url,
      icon: app.icon,
      parentId: app.parentId,
    }))[0];

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
          initialValues={dialog.type === "edit" ? initialValues : {}}
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

              {data?.formElements?.map((element: any) => (
                <Fragment key={element.index}>
                  {element.element === "input" && <InputElement {...element.params} />}
                  {/* {element.element === "select" && <Select {...element.params} />}
                  {element.element === "datepicker" && <Datepicker {...element.params} />}
                  {element.element === "checkbox" && <Checkbox {...element.params} />}
                  {element.element === "label" && <Label {...element.params} />}
                  {element.element === "button" && <Button {...element.params} />} */}
                </Fragment>
              ))}
            </form>
          )}
        />
      </DialogContent>
    </StyledDialog>
  );
};
