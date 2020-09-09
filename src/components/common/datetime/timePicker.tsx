import React from "react";
import { useField, FieldProps } from "packages/form";
import {
  KeyboardTimePicker,
  KeyboardTimePickerProps,
} from "@material-ui/pickers";

export const MyTimePicker: React.FC<FieldProps & KeyboardTimePickerProps> = ({
  name: fieldName,
  validate,
  dependentFields,
  fieldKey: fieldID,
  type,
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
  const customDateChangeHandler = (date) => {
    handleChange(date);
  };
  return (
    <KeyboardTimePicker
      {...others}
      key={fieldKey}
      id={fieldKey}
      name={name}
      value={value === "" ? null : value} //make sure to pass null when input is empty string
      error={isError}
      helperText={isError ? error : null}
      onChange={customDateChangeHandler}
      onBlur={handleBlur}
      disabled={isSubmitting}
    />
  );
};

export default MyTimePicker;
