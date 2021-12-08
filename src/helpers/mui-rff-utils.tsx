import React from "react";
import { FieldMetaState, useField } from "react-final-form";
import { FormHelperText, FormHelperTextProps } from "@mui/material";
import { FieldState, FieldValidator } from "final-form";

export interface ErrorMessageProps {
  showError: boolean;
  meta: FieldMetaState<any>;
  formHelperTextProps?: Partial<FormHelperTextProps>;
  helperText?: string;
}

export const ErrorMessage = ({ showError, meta, formHelperTextProps, helperText }: ErrorMessageProps) => {
  if (showError) {
    return <FormHelperText {...formHelperTextProps}>{meta.error || meta.submitError}</FormHelperText>;
  } else if (helperText) {
    return <FormHelperText {...formHelperTextProps}>{helperText}</FormHelperText>;
  } else {
    return <></>;
  }
};

export type ShowErrorFunc = (props: ShowErrorProps) => boolean;

export interface ShowErrorProps {
  meta: FieldMetaState<any>;
}

const config = {
  subscription: {
    error: true,
    submitError: true,
    dirtySinceLastSubmit: true,
    touched: true,
    modified: true,
  },
};

export const useFieldForErrors = (name: string) => useField(name, config);

export const showErrorOnChange: ShowErrorFunc = ({
  meta: { submitError, dirtySinceLastSubmit, error, touched, modified },
}: ShowErrorProps) => !!(((submitError && !dirtySinceLastSubmit) || error) && (touched || modified));

export const showErrorOnBlur: ShowErrorFunc = ({
  meta: { submitError, dirtySinceLastSubmit, error, touched },
}: ShowErrorProps) => !!(((submitError && !dirtySinceLastSubmit) || error) && touched);

export const getValidator = (
  validators: FieldValidator<any> | FieldValidator<any>[] | undefined,
  builtInValidators = [] as FieldValidator<any>[]
) => {
  const validatorArr =
    typeof validators === "object" ? [...validators, ...builtInValidators] : [validators, ...builtInValidators];

  return (value: any, allValues: object, meta?: FieldState<any> | undefined) =>
    validatorArr.reduce((error, validator) => error || (validator && validator(value, allValues, meta)), undefined);
};
