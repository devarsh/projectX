import React from "react";
import { useField, FieldProps } from "packages/form";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";

export type MyTextFieldProps = FieldProps & TextFieldProps;

const MyTextField: React.FC<MyTextFieldProps> = ({
  name: fieldName,
  validate,
  dependentFields,
  fieldKey: fieldID,
  ...others
}) => {
  const {
    value,
    error,
    touched,
    handleChange,
    handleBlur,
    isSubmitting,
    fieldKey,
    name,
  } = useField({
    name: fieldName,
    validate,
    dependentFields,
    fieldKey: fieldID,
  });
  const isError = touched && (error ?? "") !== "";
  return (
    <TextField
      {...others}
      key={fieldKey}
      id={fieldKey}
      name={name}
      value={value}
      error={isError}
      helperText={isError ? error : null}
      //@ts-ignore
      onChange={handleChange}
      onBlur={handleBlur}
      disabled={isSubmitting}
    />
  );
};

export default MyTextField;
