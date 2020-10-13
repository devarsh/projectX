import { FC } from "react";
import { useField, UseFieldHookProps } from "packages/form";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Grid, { GridProps } from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Merge } from "../types";

interface MyGridExtendedProps {
  GridProps?: GridProps;
  enableGrid: boolean;
}

type MyTextFieldAllProps = Merge<TextFieldProps, MyGridExtendedProps>;

export type MyTextFieldProps = UseFieldHookProps & MyTextFieldAllProps;

const MyTextField: FC<MyTextFieldProps> = ({
  name: fieldName,
  validate,
  dependentFields,
  fieldKey: fieldID,
  GridProps,
  enableGrid,
  ...others
}) => {
  const {
    value,
    error,
    touched,
    handleChange,
    handleBlur,
    isSubmitting,
    validationRunning,
    fieldKey,
    name,
  } = useField({
    name: fieldName,
    validate,
    dependentFields,
    fieldKey: fieldID,
  });
  const isError = touched && (error ?? "") !== "";
  const result = (
    <TextField
      {...others}
      key={fieldKey}
      id={fieldKey}
      name={name}
      value={value}
      error={isError}
      helperText={isError ? error : null} //can keep error field enabled at all times by replacing null with " " so UI wont shift when error occurs
      //@ts-ignore
      InputProps={{
        endAdornment: validationRunning ? (
          <InputAdornment position="end">
            <CircularProgress color="primary" variant="indeterminate" />
          </InputAdornment>
        ) : null,
      }}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled={isSubmitting}
    />
  );
  if (Boolean(enableGrid)) {
    return <Grid {...GridProps}>{result}</Grid>;
  } else {
    return result;
  }
};

export default MyTextField;
