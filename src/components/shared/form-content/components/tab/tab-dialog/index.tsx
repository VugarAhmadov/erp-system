import React, { FC } from "react";
import { Button, Icon, IconButton, Tooltip, Typography } from "@mui/material";
import { Form } from "react-final-form";
import { useTranslation } from "react-i18next";
import { FieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";
import { Select, TextField } from "components/shared";
import { Dialog } from "../../..";
import { StyledForm } from "./tab-dialog.styled";
import { ITabParams } from "../tab-element";

interface ITabDialog {
  open: boolean;
  onClose(): void;
  onSubmit(data: ITabParams): void;
  params: ITabParams;
}

export const TabDialog: FC<ITabDialog> = ({ open, onClose, onSubmit, params }) => {
  const { t } = useTranslation("common");

  return (
    <Dialog open={open} onClose={onClose}>
      <Form
        onSubmit={onSubmit}
        initialValues={params}
        mutators={{
          ...arrayMutators,
        }}
        render={({ handleSubmit, invalid, form, values }) => (
          <StyledForm onSubmit={handleSubmit}>
            <Typography variant="h6">{t("addTabComponent")}</Typography>

            <div className="add-tabs">
              <Button
                onClick={() =>
                  form.mutators.push("tabs", { index: values.tabs ? values.tabs.length + 1 : 1, label: "" })
                }
              >
                Add Tab
              </Button>

              <FieldArray name="tabs">
                {({ fields }) => (
                  <div className="tab-fields">
                    {fields.map((name, index) => (
                      <div key={name} className="tab-field">
                        <span className="field-index">{index + 1}.</span>
                        <TextField name={`${name}.label`} required label={t("label")} />
                        <Tooltip title={t("remove") as string}>
                          <IconButton onClick={() => fields.remove(index)} size="small">
                            <Icon fontSize="small">delete</Icon>
                          </IconButton>
                        </Tooltip>
                      </div>
                    ))}
                  </div>
                )}
              </FieldArray>
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
