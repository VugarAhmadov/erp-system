import React from "react";
import { TextField as MuiTextField, TextFieldProps as MuiTextFieldProps } from "@mui/material";
import { Field, FieldProps, FieldRenderProps } from "react-final-form";
import { ShowErrorFunc, showErrorOnChange, getValidator } from "helpers";
import { FieldValidator } from "final-form";
import { useValidators } from "hooks";

export const TYPE_PASSWORD = "password";
export const TYPE_TEXT = "text";
export const TYPE_EMAIL = "email";
export const TYPE_NUMBER = "number";
export const TYPE_URL = "url";
export const TYPE_TELEPHONE = "tel";
export const TYPE_DATE = "date";
export const TYPE_DATETIME_LOCAL = "datetime-local";
export const TYPE_MONTH = "month";
export const TYPE_TIME = "time";
export const TYPE_WEEK = "week";

// Restricts the type values to 'password', 'text', 'email', 'number', and 'url'.
export type TEXT_FIELD_TYPE =
  | typeof TYPE_PASSWORD
  | typeof TYPE_TEXT
  | typeof TYPE_EMAIL
  | typeof TYPE_NUMBER
  | typeof TYPE_URL
  | typeof TYPE_TELEPHONE
  | typeof TYPE_DATE
  | typeof TYPE_DATETIME_LOCAL
  | typeof TYPE_MONTH
  | typeof TYPE_TIME
  | typeof TYPE_WEEK;

export type TextFieldProps = Partial<Omit<MuiTextFieldProps, "type" | "onChange">> & {
  name: string;
  type?: TEXT_FIELD_TYPE;
  fieldProps?: Partial<Omit<FieldProps<any, any>, "validate">>;
  showError?: ShowErrorFunc;
  validate?: FieldValidator<any> | FieldValidator<any>[];
};

export const TextField = (props: TextFieldProps) => {
  const { required: requiredValidator } = useValidators();
  const { name, type, fieldProps, validate, required, ...rest } = props;

  const defaultValidators = () => {
    return [
      // type === "email" ? email : undefined,
      required ? requiredValidator : undefined,
    ] as FieldValidator<any>[];
  };

  return (
    <Field
      name={name}
      type={type}
      render={({ input, meta }) => (
        <TextFieldWrapper input={input} meta={meta} name={name} type={type} {...rest} required={required} />
      )}
      validate={getValidator(validate, defaultValidators())}
      {...fieldProps}
    />
  );
};

type TextWrapperProps = FieldRenderProps<MuiTextFieldProps>;

export const TextFieldWrapper = (props: TextWrapperProps) => {
  const {
    input: { name, value, type, onChange, onBlur, onFocus, ...restInput },
    meta,
    required,
    fullWidth,
    helperText,
    showError = showErrorOnChange,
    ...rest
  } = props;

  const { error, submitError } = meta;
  const isError = showError({ meta });

  return (
    <MuiTextField
      fullWidth={fullWidth}
      helperText={isError ? error || submitError : helperText}
      error={isError}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      name={name}
      value={value}
      type={type}
      required={required}
      inputProps={{ required, ...restInput }}
      {...rest}
    />
  );
};
