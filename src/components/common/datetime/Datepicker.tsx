import React from "react";
import { useField, UseFieldHookProps } from "packages/form";
import {
  KeyboardDatePicker,
  KeyboardDatePickerProps,
} from "@material-ui/pickers";
import { Omit } from "../types";

type KeyboardDatePickerPropsSubset = Omit<
  KeyboardDatePickerProps,
  "onChange" | "value"
>;

export const MyDatePicker: React.FC<
  UseFieldHookProps & KeyboardDatePickerPropsSubset
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
  const customDateChangeHandler = (date, dateStr) => {
    handleChange(date);
  };
  return (
    <KeyboardDatePicker
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

export default MyDatePicker;
