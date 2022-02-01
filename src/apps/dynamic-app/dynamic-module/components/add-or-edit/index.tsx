import React, { FC, Fragment, useState } from "react";
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
import {
  InputElement,
  SelectElement,
  LabelElement,
  DatepickerElement,
  CheckboxElement,
  ButtonElement,
  TableElement,
  ImageElement,
  RadioElement,
  TabElement,
  FileUploadElement,
} from "apps/security/configuration/configurations/components/add-form/components";

interface IAddOrEdit {
  dialog: IDialog;
  onClose(): void;
  onSubmit(data: IAddOrEditApplicationRequest): void;
}

export const AddOrEdit: FC<IAddOrEdit> = ({ dialog, onClose, onSubmit }) => {
  const { t } = useTranslation("common");

  const module = useSelector((state: AppState) => state.module.module);

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

              <div className="form-elements">
                {data?.formElements?.map((element: any) => (
                  <Fragment key={element.index}>
                    {element.element === "input" && (
                      <InputElement
                        {...element.params}
                        dependedFieldData={
                          element.params.dependedComponent === "select" && element.params.dependedModelName
                            ? selectData.find((d) => d.model === element.params.dependedModelName)?.data
                            : null
                        }
                      />
                    )}
                    {element.element === "select" && (
                      <SelectElement
                        {...element.params}
                        onSelectChange={(data: any) => {
                          setSelectData((prev) => {
                            if (prev.find((p) => p.model === element.params.model)) {
                              return prev.map((n) => (n.model === element.params.model ? { ...n, data } : n));
                            } else {
                              return [...prev, { model: element.params.model, data }];
                            }
                          });
                        }}
                      />
                    )}
                    {element.element === "label" && <LabelElement {...element.params} />}
                    {element.element === "checkbox" && <CheckboxElement {...element.params} />}
                    {element.element === "datepicker" && <DatepickerElement {...element.params} />}
                    {element.element === "button" && <ButtonElement {...element.params} />}
                    {element.element === "table" && <TableElement {...element.params} />}
                    {element.element === "radio" && <RadioElement {...element.params} />}
                    {element.element === "tab" && <TabElement {...element.params} />}
                    {element.element === "image" && (
                      <ImageElement
                        {...element.params}
                        dependedFieldData={
                          element.params.dependedComponent === "select" && element.params.dependedModelName
                            ? selectData.find((d) => d.model === element.params.dependedModelName)?.data
                            : null
                        }
                      />
                    )}
                    {element.element === "fileUpload" && <FileUploadElement {...element.params} />}
                  </Fragment>
                ))}
              </div>
            </form>
          )}
        />
      </DialogContent>
    </StyledDialog>
  );
};
