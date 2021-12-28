import React, { ReactNode } from "react";
import {
  FormControl,
  FormControlProps,
  FormHelperTextProps,
  InputLabel,
  InputLabelProps,
  MenuItem,
  MenuItemProps,
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
} from "@mui/material";
import { ErrorMessage, getValidator, ShowErrorFunc, showErrorOnChange, useFieldForErrors } from "helpers";
import { Field, FieldProps } from "react-final-form";
import { FieldValidator } from "final-form";
import { useTranslation } from "react-i18next";
import { useValidators } from "hooks";

export interface SelectData {
  label: string;
  value: string | number | string[] | undefined;
  disabled?: boolean;
}

export interface SelectProps extends Partial<Omit<MuiSelectProps, "onChange">> {
  name: string;
  label?: ReactNode;
  required?: boolean;
  multiple?: boolean;
  helperText?: string;
  fieldProps?: Partial<FieldProps<any, any>>;
  formControlProps?: Partial<FormControlProps>;
  inputLabelProps?: Partial<InputLabelProps>;
  formHelperTextProps?: Partial<FormHelperTextProps>;
  showError?: ShowErrorFunc;
  menuItemProps?: Partial<MenuItemProps>;
  data?: SelectData[];
  children?: ReactNode;
  validate?: FieldValidator<any> | FieldValidator<any>[];
  showEmptyLabel?: boolean;
  emptyLabel?: string;
}

export const Select = (props: SelectProps) => {
  const {
    name,
    label,
    data,
    children,
    required,
    multiple,
    helperText,
    fieldProps,
    inputLabelProps,
    formControlProps,
    formHelperTextProps,
    menuItemProps,
    showError = showErrorOnChange,
    showEmptyLabel = true,
    emptyLabel,
    validate,
    ...restSelectProps
  } = props;

  if (!data && !children) {
    throw new Error("Please specify either children or data as an attribute.");
  }

  const { variant, size } = restSelectProps;
  const field = useFieldForErrors(name);
  const isError = showError(field);
  const { t } = useTranslation("common");

  const { required: requiredValidator } = useValidators();

  const defaultValidators = () => {
    return [required ? requiredValidator : undefined] as FieldValidator<any>[];
  };

  return (
    <Field
      name={name}
      render={({ input: { name, value, onChange, ...restInput } }) => {
        // prevents an error that happens if you don't have initialValues defined in advance
        const finalValue = multiple && !value ? [] : value;
        const labelId = `select-input-${name}`;

        return (
          <FormControl required={required} error={isError} fullWidth={true} variant={variant} {...formControlProps}>
            {!!label && (
              <InputLabel id={labelId} {...inputLabelProps} variant={variant}>
                {label}
              </InputLabel>
            )}
            <MuiSelect
              name={name}
              value={finalValue}
              onChange={onChange}
              multiple={multiple}
              label={label}
              labelId={labelId}
              inputProps={{ required, ...restInput }}
              {...restSelectProps}
            >
              {showEmptyLabel && (
                <MenuItem value="" disabled>
                  {emptyLabel ?? t("choose")}
                </MenuItem>
              )}

              {data
                ? data.map((item) => (
                    <MenuItem value={item.value} key={item.value} disabled={item.disabled} {...(menuItemProps as any)}>
                      {item.label}
                    </MenuItem>
                  ))
                : children}
            </MuiSelect>
            <ErrorMessage
              showError={isError}
              meta={field.meta}
              formHelperTextProps={formHelperTextProps}
              helperText={helperText}
            />
          </FormControl>
        );
      }}
      {...fieldProps}
      validate={getValidator(validate, defaultValidators())}
    />
  );
};
