import React from "react";
import { Field, FieldProps } from "react-final-form";

export const HiddenInput = (props: FieldProps<any, any>) => {
  return <Field render={({ input }) => <input {...input} type="hidden" name={props.name} />} {...props} />;
};
