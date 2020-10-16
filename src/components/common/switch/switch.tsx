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
import Grid, { GridProps } from "@material-ui/core/Grid";
import { Merge } from "../types";

interface extendedFiledProps extends UseFieldHookProps {
  label: string;
}

type MySwitchMixedProps = Merge<SwitchProps, extendedFiledProps>;

interface MySwitchExtendedProps {
  FormControlLabelProps?: FormControlLabelProps;
  FormControlProps?: FormControlProps;
  FormHelperTextProps?: FormHelperTextProps;
  GridProps?: GridProps;
  enableGrid: boolean;
}

export type MySwitchAllProps = Merge<MySwitchMixedProps, MySwitchExtendedProps>;

const MySwitch: FC<MySwitchAllProps> = ({
  name: fieldName,
  validate,
  shouldExclude,
  dependentFields,
  fieldKey: fieldID,
  label,
  FormControlProps,
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
  } = useField({
    name: fieldName,
    validate,
    dependentFields,
    fieldKey: fieldID,
    shouldExclude: shouldExclude,
  });
  if (excluded) {
    return null;
  }
  const isError = touched && (error ?? "") !== "";

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

  if (Boolean(enableGrid)) {
    return <Grid {...GridProps}>{result}</Grid>;
  } else {
    return result;
  }
};

export default MySwitch;
