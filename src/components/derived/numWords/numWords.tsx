import { FC } from "react";
import { useField, UseFieldHookProps } from "packages/form";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import numWords from "num-words";

export type MyTextFieldProps = UseFieldHookProps & TextFieldProps;

const MyNumWords: FC<MyTextFieldProps> = ({
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
  let numWordsVar;
  try {
    numWordsVar = numWords(value);
  } catch (e) {
    numWordsVar = "value tooo large";
  }
  return (
    <TextField
      {...others}
      key={fieldKey}
      id={fieldKey}
      name={name}
      value={value}
      error={isError}
      helperText={numWordsVar}
      //@ts-ignore
      onChange={handleChange}
      onBlur={handleBlur}
      disabled={isSubmitting}
    />
  );
};

export default MyNumWords;
