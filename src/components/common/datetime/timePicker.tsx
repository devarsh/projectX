import { FC } from "react";
import { useField, UseFieldHookProps } from "packages/form";
import {
  KeyboardTimePicker,
  KeyboardTimePickerProps,
} from "@material-ui/pickers";
import Grid, { GridProps } from "@material-ui/core/Grid";
import { Omit, Merge } from "../types";

type KeyboardTimePickerPropsSubset = Omit<
  KeyboardTimePickerProps,
  "onChange" | "value"
>;

interface MyGridExtendedProps {
  GridProps?: GridProps;
  enableGrid: boolean;
}

export type MyTimeTimePickerAllProps = Merge<
  Merge<KeyboardTimePickerPropsSubset, MyGridExtendedProps>,
  UseFieldHookProps
>;

export const MyTimePicker: FC<MyTimeTimePickerAllProps> = ({
  name: fieldName,
  validate,
  validationRun,
  shouldExclude,
  postValidationSetCrossFieldValues,
  dependentFields,
  fieldKey: fieldID,
  type,
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
    fieldKey,
    name,
    excluded,
  } = useField({
    name: fieldName,
    validate,
    dependentFields,
    fieldKey: fieldID,
    shouldExclude: shouldExclude,
    postValidationSetCrossFieldValues: postValidationSetCrossFieldValues,
    validationRun: validationRun,
  });
  if (excluded) {
    return null;
  }
  const isError = touched && (error ?? "") !== "";
  const customDateChangeHandler = (date) => {
    handleChange(date);
  };
  const result = (
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
  if (Boolean(enableGrid)) {
    return (
      <Grid {...GridProps} key={fieldKey}>
        {result}
      </Grid>
    );
  } else {
    return result;
  }
};

export default MyTimePicker;
