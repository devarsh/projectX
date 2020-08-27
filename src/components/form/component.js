import React from "react";
import { useField, useFormFeedback, useFieldArray } from "./core";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";

export const MyTextField = ({ name, validate, dependentFields, ...others }) => {
  const {
    value,
    error,
    touched,
    handleChange,
    handleBlur,
    isSubmitting,
  } = useField({ name, validate, dependentFields });
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

export const FormFeedback = () => {
  const { isError, message } = useFormFeedback();
  if ((message ?? "") !== "") {
    return (
      <Alert severity={isError ? "error" : "success"} variant="filled">
        {message}
      </Alert>
    );
  }
  return null;
};

export const MyArrayField = ({ name, template }) => {
  const {
    fieldRows,
    templateFieldNames,
    renderRows,
    push,
    remove,
  } = useFieldArray({ name, template });
  const rows = renderRows((row, fields, rowIndex) => {
    fields.map(field=> {
      const { name, key} = row.values[field]
      return <TextField id={}
    })
  });
};
