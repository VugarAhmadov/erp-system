import React from "react";
import { DatePicker as MuiDatePicker, DatePickerProps as MuiDatePickerProps } from "@mui/lab";
import TextField from "@mui/material/TextField";
import { Field, FieldProps, FieldRenderProps } from "react-final-form";
import { FieldValidator } from "final-form";
import { getValidator, ShowErrorFunc, showErrorOnChange } from "helpers";
import pickerProviderWrapper from "./picker-provider";
import { useValidators } from "hooks";

export interface DatePickerProps extends Partial<Omit<MuiDatePickerProps, "onChange">> {
  name: string;
  locale?: any;
  fieldProps?: Partial<FieldProps<any, any>>;
  required?: boolean;
  showError?: ShowErrorFunc;
  validate?: FieldValidator<any> | FieldValidator<any>[];
  fullWidth?: boolean;
}

export const DatePicker = (props: DatePickerProps) => {
  const { required: requiredValidator } = useValidators();
  const { name, fieldProps, validate, required, ...rest } = props;

  const defaultValidators = () => {
    return [
      // type === "email" ? email : undefined,
      required ? requiredValidator : undefined,
    ] as FieldValidator<any>[];
  };

  return (
    <Field
      name={name}
      render={(fieldRenderProps) => <DatePickerWrapper required={required} {...fieldRenderProps} {...rest} />}
      {...fieldProps}
      validate={getValidator(validate, defaultValidators())}
    />
  );
};

interface DatePickerWrapperProps extends FieldRenderProps<MuiDatePickerProps> {
  fullWidth?: boolean;
  required?: boolean;
  locale?: any;
}

const DatePickerWrapper = (props: DatePickerWrapperProps) => {
  const {
    input: { name, onChange, value, ...restInput },
    meta,
    fullWidth,
    locale,
    required,
    showError = showErrorOnChange,
    ...rest
  } = props;
  const { error, submitError } = meta;
  const isError = showError({ meta });

  const { helperText, ...lessrest } = rest;

  return pickerProviderWrapper(
    <MuiDatePicker
      onChange={onChange}
      value={(value as any) === "" ? null : value}
      {...lessrest}
      renderInput={(props) => (
        <TextField
          helperText={isError ? error || submitError : helperText}
          error={isError}
          name={name}
          required={required}
          fullWidth={fullWidth}
          {...restInput}
          {...props}
        />
      )}
    />,
    locale
  );
};
