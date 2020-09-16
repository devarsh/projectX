import React from "react";
import { useField, UseFieldHookProps } from "packages/form";
import FormControl, { FormControlProps } from "@material-ui/core/FormControl";
import FormLabel, { FormLabelProps } from "@material-ui/core/FormLabel";
import RadioGroup, { RadioGroupProps } from "@material-ui/core/RadioGroup";
import FormControlLabel, {
  FormControlLabelProps,
} from "@material-ui/core/FormControlLabel";

import Radio, { RadioProps } from "@material-ui/core/Radio";
import FormHelperText, {
  FormHelperTextProps,
} from "@material-ui/core/FormHelperText";
import { Merge, OptionsProps } from "../types";

interface extendedFiledProps extends UseFieldHookProps {
  options: OptionsProps[];
  label: string;
}

type MyRadioMixedProps = Merge<RadioProps, extendedFiledProps>;

interface MyCheckboxExtendedProps {
  FormLabelProps?: FormLabelProps;
  RadioGroupProps?: RadioGroupProps;
  FormControlLabelProps?: FormControlLabelProps;
  FormControlProps?: FormControlProps;
  FormHelperTextProps?: FormHelperTextProps;
}

type MyRadioAllProps = Merge<MyRadioMixedProps, MyCheckboxExtendedProps>;

const MyRadio: React.FC<MyRadioAllProps> = ({
  name: fieldName,
  validate,
  dependentFields,
  fieldKey: fieldID,
  label,
  options,
  FormControlProps,
  FormLabelProps,
  RadioGroupProps,
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
  const radios = options.map((radio) => (
    <FormControlLabel
      {...FormControlLabelProps}
      control={<Radio {...others} />}
      key={radio.value}
      label={radio.label}
      value={radio.value}
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
      <RadioGroup
        {...RadioGroupProps}
        onChange={handleChange}
        name={name}
        value={value}
      >
        {radios}
      </RadioGroup>
      {isError ? (
        <FormHelperText {...FormHelperTextProps}>{error}</FormHelperText>
      ) : null}
    </FormControl>
  );
};

export default MyRadio;
