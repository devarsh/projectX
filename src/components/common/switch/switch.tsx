import { FC } from "react";
import { useField, UseFieldHookProps } from "packages/form";
import FormControlLabel, {
  FormControlLabelProps,
} from "@material-ui/core/FormControlLabel";
import FormControl, { FormControlProps } from "@material-ui/core/FormControl";
import Switch, { SwitchProps } from "@material-ui/core/Switch";
import FormHelperText, {
  FormHelperTextProps,
} from "@material-ui/core/FormHelperText";
import { Merge } from "../types";

interface extendedFiledProps extends UseFieldHookProps {
  label: string;
}

type MySwitchMixedProps = Merge<SwitchProps, extendedFiledProps>;

interface MySwitchExtendedProps {
  FormControlLabelProps?: FormControlLabelProps;
  FormControlProps?: FormControlProps;
  FormHelperTextProps?: FormHelperTextProps;
}

type MySwitchAllProps = Merge<MySwitchMixedProps, MySwitchExtendedProps>;

const MySwitch: FC<MySwitchAllProps> = ({
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
        control={<Switch {...others} />}
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

export default MySwitch;
