import { FC, useEffect, useRef } from "react";
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
  StartAdornment?: string;
  EndAdornment?: string;
  enableGrid: boolean;
}

type MyTextFieldAllProps = Merge<TextFieldProps, MyGridExtendedProps>;

export type MyTextFieldProps = UseFieldHookProps & MyTextFieldAllProps;

const MyTextField: FC<MyTextFieldProps> = ({
  name: fieldName,
  validate,
  validationRun,
  postValidationSetCrossFieldValues,
  runPostValidationHookAlways,
  shouldExclude,
  isReadOnly,
  dependentFields,
  fieldKey: fieldID,
  GridProps,
  enableGrid,
  enableNumWords,
  InputProps,
  inputProps,
  StartAdornment,
  EndAdornment,
  //@ts-ignore
  isFieldFocused,
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
    readOnly,
    incomingMessage,
  } = useField({
    name: fieldName,
    fieldKey: fieldID,
    dependentFields,
    validate,
    validationRun,
    runPostValidationHookAlways,
    postValidationSetCrossFieldValues,
    isReadOnly,
    shouldExclude,
  });

  const focusRef = useRef();
  useEffect(() => {
    if (isFieldFocused) {
      //@ts-ignore
      setTimeout(() => {
        //@ts-ignore
        focusRef?.current?.focus?.();
      }, 1);
    }
  }, [isFieldFocused]);

  useEffect(() => {
    if (incomingMessage !== null && typeof incomingMessage === "object") {
      const { value } = incomingMessage;
      handleChange(value);
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
        ) : Boolean(EndAdornment) ? (
          EndAdornment
        ) : null,
        startAdornment: Boolean(StartAdornment) ? (
          <InputAdornment position="start">{StartAdornment}</InputAdornment>
        ) : null,
        ...InputProps,
      }}
      InputLabelProps={{
        shrink: true,
      }}
      inputRef={focusRef}
      onChange={handleChange}
      inputProps={{
        readOnly: readOnly,
        tabIndex: readOnly ? -1 : undefined,
        ...inputProps,
      }}
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
