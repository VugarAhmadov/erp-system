import React, { ReactNode } from "react";
import {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteProps as MuiAutocompleteProps,
  TextField as MuiTextField,
  Autocomplete as MuiAutocomplete,
} from "@mui/material";
import { AutocompleteValue, UseAutocompleteProps as MuiUseAutocompleteProps } from "@mui/material/useAutocomplete";
import { Field, FieldProps, FieldRenderProps } from "react-final-form";
import { getValidator, ShowErrorFunc, showErrorOnChange } from "helpers";
import { TextFieldProps as MuiTextFieldProps } from "@mui/material";
import { FieldValidator } from "final-form";
import { useValidators } from "hooks";

export type AutocompleteData = {
  [key: string]: any | null;
};

export interface AutocompleteProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
> extends Omit<
    MuiAutocompleteProps<T, Multiple, DisableClearable, FreeSolo> &
      MuiUseAutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
    "renderInput"
  > {
  name: string;
  label: ReactNode;
  helperText?: string;
  required?: boolean;
  getOptionValue?: (option: T) => any;
  options: T[];
  fieldProps?: Partial<FieldProps<any, any>>;
  textFieldProps?: Partial<MuiTextFieldProps>;
  showError?: ShowErrorFunc;
  validate?: FieldValidator<any> | FieldValidator<any>[];
}

export function Autocomplete<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
>(props: AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>): JSX.Element {
  const { name, fieldProps, validate, required, ...rest } = props;
  const { required: requiredValidator } = useValidators();

  const defaultValidators = () => {
    return [required ? requiredValidator : undefined] as FieldValidator<any>[];
  };

  return (
    <Field
      name={name}
      render={(fieldRenderProps) => <AutocompleteWrapper {...fieldRenderProps} required={required} {...rest} />}
      {...fieldProps}
      validate={getValidator(validate, defaultValidators())}
    />
  );
}

interface AutocompleteWrapperProps<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
> extends AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
  label: ReactNode;
  required?: boolean;
  textFieldProps?: Partial<MuiTextFieldProps>;
  getOptionValue?: (option: T) => any;
}

function AutocompleteWrapper<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
>(
  props: AutocompleteWrapperProps<T, Multiple, DisableClearable, FreeSolo> & FieldRenderProps<MuiTextFieldProps>
): JSX.Element {
  const {
    input: { name, value, onChange },
    meta,
    options,
    label,
    required,
    multiple,
    textFieldProps,
    getOptionValue,
    showError = showErrorOnChange,
    placeholder,
    onChange: onChangeCallback,
    ...rest
  } = props;

  function getValue(values: any) {
    if (!getOptionValue) {
      return values;
    }

    if (multiple) {
      if (values) {
        return values.map(getOptionValue);
      } else {
        return null;
      }
    } else {
      if (values) {
        return getOptionValue(values);
      } else {
        return null;
      }
    }
  }

  const { helperText, ...lessrest } = rest;
  const { variant, ...restTextFieldProps } = textFieldProps || {};

  // yuck...
  let defaultValue: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo> | undefined;

  if (!getOptionValue) {
    defaultValue = value as AutocompleteValue<T, Multiple, DisableClearable, FreeSolo> | undefined;
  } else if (value) {
    options.forEach((option) => {
      const optionValue = getOptionValue(option);
      if (multiple) {
        if (!defaultValue) {
          defaultValue = [] as any;
        }
        (value as any).forEach((v: any) => {
          if (v === optionValue) {
            (defaultValue as any).push(option);
          }
        });
      } else {
        if (value === optionValue) {
          defaultValue = option as any;
        }
      }
    });
  }

  const onChangeFunc = (
    event: React.SyntheticEvent,
    value: AutocompleteValue<T, Multiple, DisableClearable, FreeSolo>,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<T>
  ) => {
    const gotValue = getValue(value);
    onChange(gotValue);

    if (onChangeCallback) {
      onChangeCallback(event, value, reason, details);
    }
  };

  const { error, submitError } = meta;
  const isError = showError({ meta });

  return (
    <MuiAutocomplete
      multiple={multiple}
      // TODO vaxt olanda bax --> tsignore u yigisdir
      //@ts-ignore
      onChange={onChangeFunc}
      options={options}
      // TODO vaxt olanda bax --> NULL-u sonradan eleva elemisem
      //@ts-ignore
      value={defaultValue ? defaultValue : multiple ? [] : null}
      renderInput={(params) => (
        <MuiTextField
          label={label}
          required={required}
          helperText={isError ? error || submitError : helperText}
          error={isError}
          name={name}
          placeholder={placeholder}
          variant={variant}
          {...params}
          {...restTextFieldProps}
          InputProps={{
            ...params.InputProps,
            ...restTextFieldProps.InputProps,
            ...(restTextFieldProps.InputProps?.startAdornment && {
              startAdornment: (
                <>
                  {restTextFieldProps.InputProps.startAdornment}
                  {params.InputProps?.startAdornment}
                </>
              ),
            }),
            ...(restTextFieldProps.InputProps?.endAdornment && {
              endAdornment: (
                <>
                  {params.InputProps?.endAdornment}
                  {restTextFieldProps.InputProps?.endAdornment}
                </>
              ),
            }),
          }}
          fullWidth={true}
        />
      )}
      {...lessrest}
    />
  );
}
