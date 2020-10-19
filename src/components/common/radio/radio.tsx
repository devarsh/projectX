import { FC } from "react";
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
import Grid, { GridProps } from "@material-ui/core/Grid";
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
  GridProps?: GridProps;
  enableGrid: boolean;
}

export type MyRadioAllProps = Merge<MyRadioMixedProps, MyCheckboxExtendedProps>;

const MyRadio: FC<MyRadioAllProps> = ({
  name: fieldName,
  validate,
  validationRun,
  shouldExclude,
  isReadyOnly,
  postValidationSetCrossFieldValues,
  runPostValidationHookAlways,
  dependentFields,
  fieldKey: fieldID,
  label,
  options,
  FormControlProps,
  FormLabelProps,
  RadioGroupProps,
  FormHelperTextProps,
  FormControlLabelProps,
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
    readOnly,
  } = useField({
    name: fieldName,
    validate,
    dependentFields,
    fieldKey: fieldID,
    shouldExclude: shouldExclude,
    postValidationSetCrossFieldValues: postValidationSetCrossFieldValues,
    validationRun: validationRun,
    runPostValidationHookAlways: runPostValidationHookAlways,
    isReadyOnly: isReadyOnly,
  });
  if (excluded) {
    return null;
  }
  const isError = touched && (error ?? "") !== "";
  const radios = options.map((radio) => (
    <FormControlLabel
      {...FormControlLabelProps}
      control={
        <Radio
          {...others}
          readOnly={readOnly}
          tabIndex={readOnly ? -1 : undefined}
        />
      }
      key={radio.value}
      label={radio.label}
      value={radio.value}
    />
  ));
  const result = (
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

export default MyRadio;
