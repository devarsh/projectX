import React from "react";
import { useField, FieldProps } from "packages/form";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";

export const MyTextField: React.FC<FieldProps & TextFieldProps> = ({
  name,
  validate,
  dependentFields,
  fieldKey,
  ...others
}) => {
  const {
    value,
    error,
    touched,
    handleChange,
    handleBlur,
    isSubmitting,
  } = useField({ name, validate, dependentFields, fieldKey });
  const isError = touched && (error ?? "") !== "";
  return (
    <TextField
      id={name}
      name={name}
      value={value}
      error={isError}
      helperText={isError ? error : null}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled={isSubmitting}
      {...others}
    />
  );
};
