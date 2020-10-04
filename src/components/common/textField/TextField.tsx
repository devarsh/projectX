import React from "react";
import { useField, UseFieldHookProps } from "packages/form";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";

export type MyTextFieldProps = UseFieldHookProps & TextFieldProps;

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
      helperText={isError ? error : null} //can keep error field enabled at all times by replacing null with " " so UI wont shift when error occurs
      //@ts-ignore
      onChange={handleChange}
      onBlur={handleBlur}
      disabled={isSubmitting}
    />
  );
};

export default MyTextField;
