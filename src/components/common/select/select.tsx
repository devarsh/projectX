import { FC, useEffect, useState } from "react";
import { useField, UseFieldHookProps, FormFieldAtomType } from "packages/form";
import InputLabel, { InputLabelProps } from "@material-ui/core/InputLabel";
import FormControl, { FormControlProps } from "@material-ui/core/FormControl";
import Select, { SelectProps } from "@material-ui/core/Select";
import MenuItem, { MenuItemProps } from "@material-ui/core/MenuItem";
import FormHelperText, {
  FormHelperTextProps,
} from "@material-ui/core/FormHelperText";
import Grid, { GridProps } from "@material-ui/core/Grid";
import { Merge, OptionsProps } from "../types";

interface dependentOptionsFn {
  (optionsFn: FormFieldAtomType[]): OptionsProps[];
}

interface extendedFiledProps extends UseFieldHookProps {
  options: OptionsProps[] | dependentOptionsFn;
  label: string;
}
type MySelectProps = Merge<SelectProps, extendedFiledProps>;

interface MySelectExtendedProps {
  InputLabelProps?: InputLabelProps;
  FormControlProps?: FormControlProps;
  FormHelperTextProps?: FormHelperTextProps;
  MenuItemProps?: MenuItemProps;
  GridProps?: GridProps;
  enableGrid: boolean;
}

type MySelectAllProps = Merge<MySelectProps, MySelectExtendedProps>;

const MySelect: FC<MySelectAllProps> = ({
  name: fieldName,
  validate,
  dependentFields,
  fieldKey: fieldID,
  label,
  options,
  FormControlProps,
  InputLabelProps,
  FormHelperTextProps,
  MenuItemProps,
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
    dependentValues,
  } = useField({
    name: fieldName,
    validate,
    dependentFields,
    fieldKey: fieldID,
  });
  const [_options, setOptions] = useState<OptionsProps[]>([]);
  useEffect(() => {
    async function runner() {
      if (Array.isArray(options)) {
        setOptions(options);
      } else if (typeof options === "function") {
        let result;
        try {
          result = await Promise.resolve(options(dependentValues));
          if (Array.isArray(result)) {
            setOptions(result);
          } else {
            console.log(
              `expected optionsFunction in select component to return array of OptionsType but got: ${result}`
            );
            result = [];
          }
        } catch (e) {
          console.log(e);
          result = [];
        }
        setOptions(result);
      }
    }
    runner();
  }, [options, dependentValues]);
  const isError = touched && (error ?? "") !== "";
  const menuItems = _options.map((menuItem) => (
    // @ts-ignore
    <MenuItem {...MenuItemProps} key={menuItem.value} value={menuItem.value}>
      {menuItem.label}
    </MenuItem>
  ));
  const result = (
    // @ts-ignore
    <FormControl
      {...FormControlProps}
      key={fieldKey}
      component="fieldset"
      disabled={isSubmitting}
      error={isError}
    >
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-label`}
        {...others}
        name={name}
        onBlur={handleBlur}
        onChange={handleChange}
        value={value}
      >
        {menuItems}
      </Select>
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

export default MySelect;
