import React from "react";
import { useField, FieldProps } from "packages/form";
import {
  DatePicker,
  DatePickerProps,
  KeyboardDatePicker,
  KeyboardDatePickerProps,
} from "@material-ui/pickers";

export const MyDatePicker: React.FC<
  FieldProps & (DatePickerProps | KeyboardDatePickerProps)
> = ({
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
  const customHandleChange = (date: Date) => {
    handleChange(date.toISOString());
  };
  const Element = type === "datepicker" ? DatePicker : KeyboardDatePicker;
  return React.createElement(Element, {
    ...others,
    key: fieldKey,
    id: fieldKey,
    name: name,
    value: new Date(value),
    error: isError,
    helperText: isError ? error : null,
    onChange: customHandleChange,
    onBlur: handleBlur,
    disabled: isSubmitting,
  });
};
