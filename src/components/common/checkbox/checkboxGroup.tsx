import { FC } from "react";
import { useField, UseFieldHookProps } from "packages/form";
import FormLabel, { FormLabelProps } from "@material-ui/core/FormLabel";
import FormGroup, { FormGroupProps } from "@material-ui/core/FormGroup";
import FormControlLabel, {
  FormControlLabelProps,
} from "@material-ui/core/FormControlLabel";
import FormControl, { FormControlProps } from "@material-ui/core/FormControl";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import FormHelperText, {
  FormHelperTextProps,
} from "@material-ui/core/FormHelperText";
import { Merge, OptionsProps } from "../types";

interface extendedFiledProps extends UseFieldHookProps {
  options: OptionsProps[];
  label: string;
}

type MyCheckboxMixedProps = Merge<CheckboxProps, extendedFiledProps>;

interface MyCheckboxExtendedProps {
  FormLabelProps?: FormLabelProps;
  FormGroupProps?: FormGroupProps;
  FormControlLabelProps?: FormControlLabelProps;
  FormControlProps?: FormControlProps;
  FormHelperTextProps?: FormHelperTextProps;
}

type MyChecboxAllProps = Merge<MyCheckboxMixedProps, MyCheckboxExtendedProps>;

const valueExists = (myValue: any[] | any, value: any) => {
  return Array.isArray(myValue) && myValue.indexOf(value) > -1;
};

const MyCheckboxGroup: FC<MyChecboxAllProps> = ({
  name: fieldName,
  validate,
  dependentFields,
  fieldKey: fieldID,
  label,
  options,
  FormControlProps,
  FormLabelProps,
  FormGroupProps,
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
  const checkboxes = options.map((checkbox) => (
    <FormControlLabel
      {...FormControlLabelProps}
      control={<Checkbox {...others} />}
      key={checkbox.value}
      name={name}
      onChange={handleChange}
      label={checkbox.label}
      value={checkbox.value}
      checked={valueExists(value, checkbox.value)}
    />
  ));
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
      <FormLabel {...FormLabelProps} component="label">
        {label}
      </FormLabel>
      <FormGroup {...FormGroupProps}>{checkboxes}</FormGroup>
      {isError ? (
        <FormHelperText {...FormHelperTextProps}>{error}</FormHelperText>
      ) : null}
    </FormControl>
  );
};

export default MyCheckboxGroup;
