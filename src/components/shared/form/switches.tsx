import React, { FC, ReactNode } from "react";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  FormControlProps,
  FormGroup,
  FormGroupProps,
  FormHelperTextProps,
  FormLabel,
  FormLabelProps,
  Switch as MuiSwitch,
  SwitchProps as MuiSwitchProps,
} from "@mui/material";
import { ErrorMessage, getValidator, ShowErrorFunc, showErrorOnChange, useFieldForErrors } from "helpers";
import { Field, FieldProps } from "react-final-form";
import { useValidators } from "hooks";
import { FieldValidator } from "final-form";

export interface SwitchData {
  label: ReactNode;
  value: unknown;
  disabled?: boolean;
}

export interface SwitchesProps extends Partial<Omit<MuiSwitchProps, "onChange">> {
  name: string;
  data: SwitchData | SwitchData[];
  label?: ReactNode;
  required?: boolean;
  helperText?: string;
  fieldProps?: Partial<FieldProps<any, any>>;
  formControlProps?: Partial<FormControlProps>;
  formGroupProps?: Partial<FormGroupProps>;
  formLabelProps?: Partial<FormLabelProps>;
  formControlLabelProps?: Partial<FormControlLabelProps>;
  formHelperTextProps?: Partial<FormHelperTextProps>;
  showError?: ShowErrorFunc;
  validate?: FieldValidator<any> | FieldValidator<any>[];
}

export const Switches: FC<SwitchesProps> = ({
  name,
  data,
  label,
  required,
  helperText,
  fieldProps,
  formControlProps,
  formGroupProps,
  formLabelProps,
  formControlLabelProps,
  formHelperTextProps,
  showError = showErrorOnChange,
  validate,
  ...restSwitches
}) => {
  const itemsData = Array.isArray(data) ? data : [data];
  const single = !Array.isArray(data);
  const field = useFieldForErrors(name);
  const isError = showError(field);

  const { required: requiredValidator } = useValidators();

  const defaultValidators = () => {
    return [required ? requiredValidator : undefined] as FieldValidator<any>[];
  };

  return (
    <FormControl required={required} error={isError} {...formControlProps}>
      {label ? <FormLabel {...formLabelProps}>{label}</FormLabel> : <></>}
      <FormGroup {...formGroupProps}>
        {itemsData.map((item: SwitchData, idx: number) => (
          <FormControlLabel
            key={idx}
            name={name}
            //@ts-ignore
            label={item.label}
            value={single ? undefined : item.value}
            disabled={item.disabled}
            control={
              <Field
                type="checkbox"
                name={name}
                render={({ input: { name, value, onChange, checked, ...restInput } }) => (
                  <MuiSwitch
                    name={name}
                    value={value}
                    onChange={onChange}
                    checked={checked}
                    disabled={item.disabled}
                    required={required}
                    inputProps={{ required, ...restInput }}
                    {...restSwitches}
                  />
                )}
                {...fieldProps}
                validate={getValidator(validate, defaultValidators())}
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
