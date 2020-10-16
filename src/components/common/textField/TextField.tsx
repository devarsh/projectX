import { FC, useEffect } from "react";
import { useField, UseFieldHookProps } from "packages/form";
import { TextFieldProps } from "@material-ui/core/TextField";
import { TextField } from "components/styledComponent";
import InputAdornment from "@material-ui/core/InputAdornment";
import Grid, { GridProps } from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Merge } from "../types";
import numWords from "num-words";

interface MyGridExtendedProps {
  enableNumWords?: boolean;
  GridProps?: GridProps;
  enableGrid: boolean;
}

type MyTextFieldAllProps = Merge<TextFieldProps, MyGridExtendedProps>;

export type MyTextFieldProps = UseFieldHookProps & MyTextFieldAllProps;

const MyTextField: FC<MyTextFieldProps> = ({
  name: fieldName,
  validate,
  postValidationSetCrossFieldValues,
  shouldExclude,
  dependentFields,
  fieldKey: fieldID,
  GridProps,
  enableGrid,
  enableNumWords,
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
    excluded,
    incomingMessage,
  } = useField({
    name: fieldName,
    validate,
    dependentFields,
    fieldKey: fieldID,
    shouldExclude: shouldExclude,
    postValidationSetCrossFieldValues: postValidationSetCrossFieldValues,
  });
  useEffect(() => {
    if (incomingMessage !== null && typeof incomingMessage === "object") {
      const { value } = incomingMessage;
      if (Boolean(value)) {
        handleChange(value);
      }
    }
  }, [incomingMessage, handleChange]);

  if (excluded) {
    return null;
  }
  let myError = error;
  let numWordsVar: any = null;
  let myTouch = touched;
  try {
    if (enableNumWords) {
      let amountArray = String(value).split(".");
      numWordsVar = `${numWords(amountArray[0])} Rupees`;
      if (amountArray.length === 2 && Boolean(amountArray[1])) {
        numWordsVar = `${numWordsVar} and ${numWords(amountArray[1])} paise`;
      }
    }
  } catch (e) {
    myError = "oops...i don't know how to spell this";
    myTouch = true;
  }
  const isError = myTouch && Boolean(myError);
  const result = (
    <TextField
      {...others}
      key={fieldKey}
      id={fieldKey}
      name={name}
      value={value}
      error={isError}
      //can keep error field enabled at all times by replacing null with " " so UI wont shift when error occurs
      helperText={isError ? myError : numWordsVar}
      //@ts-ignore
      InputProps={{
        endAdornment: validationRunning ? (
          <InputAdornment position="end">
            <CircularProgress color="primary" variant="indeterminate" />
          </InputAdornment>
        ) : null,
      }}
      InputLabelProps={{
        shrink: true,
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
