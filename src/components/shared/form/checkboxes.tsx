import React, { ReactNode } from "react";
import {
  FormControlLabel,
  FormControlLabelProps,
  FormControlProps,
  FormGroup,
  FormGroupProps,
  FormHelperTextProps,
  FormLabel,
  FormLabelProps,
  Checkbox as MuiCheckbox,
  CheckboxProps as MuiCheckboxProps,
  FormControl,
} from "@mui/material";
import { ErrorMessage, ShowErrorFunc, showErrorOnChange, useFieldForErrors } from "helpers";
import { Field, FieldProps } from "react-final-form";

export interface CheckboxData {
  label: string | number | React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  value: unknown;
  disabled?: boolean;
  indeterminate?: boolean;
}

export interface CheckboxesProps extends Partial<Omit<MuiCheckboxProps, "onChange">> {
  name: string;
  data: CheckboxData | CheckboxData[];
  label?: string | number | React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  required?: boolean;
  helperText?: string;
  fieldProps?: Partial<FieldProps<any, any>>;
  formControlProps?: Partial<FormControlProps>;
  formGroupProps?: Partial<FormGroupProps>;
  formLabelProps?: Partial<FormLabelProps>;
  formControlLabelProps?: Partial<FormControlLabelProps>;
  formHelperTextProps?: Partial<FormHelperTextProps>;
  showError?: ShowErrorFunc;
}

export const Checkboxes = (props: CheckboxesProps) => {
  const {
    required,
    label,
    data,
    name,
    helperText,
    fieldProps,
    formControlProps,
    formGroupProps,
    formLabelProps,
    formControlLabelProps,
    formHelperTextProps,
    showError = showErrorOnChange,
    ...restCheckboxes
  } = props;

  const itemsData = Array.isArray(data) ? data : [data];
  const single = !Array.isArray(data);
  const field = useFieldForErrors(name);
  const isError = showError(field);

  return (
    <FormControl required={required} error={isError} {...formControlProps}>
      {label ? <FormLabel {...formLabelProps}>{label}</FormLabel> : <></>}
      <FormGroup {...formGroupProps}>
        {itemsData.map((item: CheckboxData, idx: number) => (
          <FormControlLabel
            key={idx}
            name={name}
            label={item.label}
            value={single ? undefined : item.value}
            disabled={item.disabled}
            control={
              <Field
                type="checkbox"
                name={name}
                render={({ input: { name, value, onChange, checked, ...restInput } }) => (
                  <MuiCheckbox
                    name={name}
                    value={value}
                    onChange={onChange}
                    checked={checked}
                    disabled={item.disabled}
                    inputProps={{ required, ...restInput }}
                    indeterminate={item.indeterminate}
                    {...restCheckboxes}
                  />
                )}
                {...fieldProps}
              />
            }
            {...formControlLabelProps}
          />
        ))}
      </FormGroup>
      <ErrorMessage
        showError={isError}
        meta={field.meta}
        formHelperTextProps={formHelperTextProps}
        helperText={helperText}
      />
    </FormControl>
  );
};
