import { FC } from "react";
import { useField, UseFieldHookProps } from "packages/form";
import FormLabel, { FormLabelProps } from "@material-ui/core/FormLabel";
import FormGroup, { FormGroupProps } from "@material-ui/core/FormGroup";
import FormControlLabel, {
  FormControlLabelProps,
} from "@material-ui/core/FormControlLabel";
import FormControl, { FormControlProps } from "@material-ui/core/FormControl";
import Switch, { SwitchProps } from "@material-ui/core/Switch";
import FormHelperText, {
  FormHelperTextProps,
} from "@material-ui/core/FormHelperText";
import Grid, { GridProps } from "@material-ui/core/Grid";
import { Merge, OptionsProps } from "../types";

interface extendedFiledProps extends UseFieldHookProps {
  options: OptionsProps[];
  label: string;
}

type MySwitchMixedProps = Merge<SwitchProps, extendedFiledProps>;

interface MySwitchExtendedProps {
  FormLabelProps?: FormLabelProps;
  FormGroupProps?: FormGroupProps;
  FormControlLabelProps?: FormControlLabelProps;
  FormControlProps?: FormControlProps;
  FormHelperTextProps?: FormHelperTextProps;
  GridProps?: GridProps;
  enableGrid: boolean;
}

type MySwitchAllProps = Merge<MySwitchMixedProps, MySwitchExtendedProps>;

const valueExists = (myValue: any[] | any, value: any) => {
  return Array.isArray(myValue) && myValue.indexOf(value) > -1;
};

const MyCheckboxGroup: FC<MySwitchAllProps> = ({
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
  const switches = options.map((oneSwitch) => (
    <FormControlLabel
      {...FormControlLabelProps}
      control={<Switch {...others} />}
      key={oneSwitch.value}
      name={name}
      onChange={handleChange}
      label={oneSwitch.label}
      value={oneSwitch.value}
      checked={valueExists(value, oneSwitch.value)}
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
      <FormGroup {...FormGroupProps}>{switches}</FormGroup>
      {isError ? (
        <FormHelperText {...FormHelperTextProps}>{error}</FormHelperText>
      ) : null}
    </FormControl>
  );

  if (Boolean(enableGrid)) {
    return <Grid {...GridProps}>{result}</Grid>;
  } else {
    return result;
  }
};

export default MyCheckboxGroup;
