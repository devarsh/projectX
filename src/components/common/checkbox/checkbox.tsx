import React from "react";
import { useField, UseFieldHookProps } from "packages/form";
import FormControlLabel, {
  FormControlLabelProps,
} from "@material-ui/core/FormControlLabel";
import FormControl, { FormControlProps } from "@material-ui/core/FormControl";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import FormHelperText, {
  FormHelperTextProps,
} from "@material-ui/core/FormHelperText";
import { Merge } from "../types";

interface extendedFiledProps extends UseFieldHookProps {
  label: string;
}

type MyCheckboxMixedProps = Merge<CheckboxProps, extendedFiledProps>;

interface MyCheckboxExtendedProps {
  FormControlLabelProps?: FormControlLabelProps;
  FormControlProps?: FormControlProps;
  FormHelperTextProps?: FormHelperTextProps;
}

type MyChecboxAllProps = Merge<MyCheckboxMixedProps, MyCheckboxExtendedProps>;

const MyCheckbox: React.FC<MyChecboxAllProps> = ({
  name: fieldName,
  validate,
  dependentFields,
  fieldKey: fieldID,
  label,
  FormControlProps,
  FormHelperTextProps,
  FormControlLabelProps,
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

  return (
    // @ts-ignore
    <FormControl
      {...FormControlProps}
      key={fieldKey}
      component="fieldset"
      disabled={isSubmitting}
      error={isError}
      onBlur={handleBlur}
    >
      <FormControlLabel
        {...FormControlLabelProps}
        name={name}
        control={<Checkbox {...others} />}
        onChange={handleChange}
        label={label}
        checked={Boolean(value)}
      />

      {isError ? (
        <FormHelperText {...FormHelperTextProps}>{error}</FormHelperText>
      ) : null}
    </FormControl>
  );
};

export default MyCheckbox;
