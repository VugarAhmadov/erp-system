import React, { FC, Fragment, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button, DialogActions, DialogContent } from "@mui/material";
import { Form } from "react-final-form";
import { ModalTitle } from "./modal-title";
import { StyledModal } from "./modal.styled";
// import {
//   InputElement,
//   SelectElement,
//   LabelElement,
//   DatepickerElement,
//   CheckboxElement,
//   ButtonElement,
//   TableElement,
//   ImageElement,
//   RadioElement,
//   TabElement,
// } from "apps/security/configuration/configurations/components/html-form-dialog/components/elements-with-dnd/components";

import { useDispatch, useSelector } from "react-redux";
import { getAll as getAllOperations } from "apps/security/operation/store/actions";
import { AppState } from "store";

interface IModal {
  linkedOperationId: string;
  open: boolean;
  onClose(): void;
}

export const Modal: FC<IModal> = ({ open, onClose, linkedOperationId }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation("common");
  const [selectData, setSelectData] = useState<any[]>([]);

  useEffect(() => {
    dispatch(getAllOperations());
  }, []);

  const operationHtml = useSelector(
    (state: AppState) => state.operation?.operations.r?.find((r) => r.id === linkedOperationId)?.operationHtml
  );
  const data = operationHtml ? JSON.parse(operationHtml) : null;

  return (
    <StyledModal
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth={data?.dialogSize || "md"}
      fullWidth={true}
    >
      <ModalTitle id="customized-dialog-title" onClose={onClose}>
        Add
        {/* <div className="form-header">
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
        </div> */}
      </ModalTitle>

      <DialogContent dividers>
        <Form
          onSubmit={() => console.log("test")}
          render={({ handleSubmit, invalid }) => (
            <form onSubmit={handleSubmit} className="form">
              <div className="form-elements">
                {data?.formElements?.map((element: any) => (
                  <Fragment key={element.index}>
                    {/* {element.element === "input" && (
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
                    )} */}
                  </Fragment>
                ))}
              </div>
            </form>
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button type="submit">{t("submit")}</Button>
        <Button onClick={onClose} variant="outlined">
          {t("close")}
        </Button>
      </DialogActions>
    </StyledModal>
  );
};
