import { FC } from "react";
import { useField, UseFieldHookProps } from "packages/form";
import {
  KeyboardDateTimePicker,
  KeyboardDateTimePickerProps,
} from "@material-ui/pickers";
import Grid, { GridProps } from "@material-ui/core/Grid";
import { Omit, Merge } from "../types";

type KeyboardDateTimePickerPropsSubset = Omit<
  KeyboardDateTimePickerProps,
  "onChange" | "value"
>;

interface MyGridExtendedProps {
  GridProps?: GridProps;
  enableGrid: boolean;
}

type MyDateTimePickerAllProps = Merge<
  KeyboardDateTimePickerPropsSubset,
  MyGridExtendedProps
>;

export const MyDateTimePicker: FC<
  UseFieldHookProps & MyDateTimePickerAllProps
> = ({
  name: fieldName,
  validate,
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
  const result = (
    <KeyboardDateTimePicker
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

export default MyDateTimePicker;
