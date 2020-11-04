import { FC, useEffect, useState, useRef, useCallback } from "react";
import { useField, UseFieldHookProps } from "packages/form";

import { SelectProps } from "@material-ui/core/Select";
import { TextFieldProps } from "@material-ui/core/TextField";
import { TextField } from "components/styledComponent";
import MenuItem, { MenuItemProps } from "@material-ui/core/MenuItem";
import Grid, { GridProps } from "@material-ui/core/Grid";
import { OptionsProps, Merge } from "../types";
import CircularProgress, {
  CircularProgressProps,
} from "@material-ui/core/CircularProgress";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Checkbox } from "components/styledComponent/checkbox";
import { dependentOptionsFn } from "../types";

interface extendedFieldProps extends UseFieldHookProps {
  options?: OptionsProps[] | dependentOptionsFn;
  multiple?: boolean;
  showCheckbox?: boolean;
}
type MySelectProps = Merge<TextFieldProps, extendedFieldProps>;

interface MySelectExtendedProps {
  MenuItemProps?: MenuItemProps;
  SelectProps?: SelectProps;
  CircularProgressProps?: CircularProgressProps;
  GridProps?: GridProps;
  enableGrid: boolean;
}

export type MySelectAllProps = Merge<MySelectProps, MySelectExtendedProps>;

const MySelect: FC<MySelectAllProps> = ({
  name: fieldName,
  validate,
  validationRun,
  shouldExclude,
  isReadOnly,
  postValidationSetCrossFieldValues,
  runPostValidationHookAlways,
  dependentFields,
  fieldKey: fieldID,
  options,
  MenuItemProps,
  SelectProps,
  GridProps,
  enableGrid,
  multiple,
  showCheckbox,
  //@ts-ignore
  isFieldFocused,
  InputProps,
  inputProps,
  CircularProgressProps,
  ...others
}) => {
  const {
    formName,
    value,
    error,
    touched,
    handleChange,
    handleBlur,
    runValidation,
    validationRunning,
    isSubmitting,
    fieldKey,
    name,
    dependentValues,
    excluded,
    incomingMessage,
    whenToRunValidation,
    readOnly,
  } = useField({
    name: fieldName,
    fieldKey: fieldID,
    dependentFields,
    validate,
    validationRun,
    runPostValidationHookAlways,
    postValidationSetCrossFieldValues,
    isReadOnly,
    shouldExclude,
  });

  const focusRef = useRef();
  useEffect(() => {
    if (isFieldFocused) {
      setTimeout(() => {
        //@ts-ignore
        focusRef?.current?.focus?.();
      }, 1);
    }
  }, [isFieldFocused]);

  const [_options, setOptions] = useState<OptionsProps[]>([]);
  const lastOptionsPromise = useRef<Promise<any> | null>(null);
  const [loadingOptions, setLoadingOptions] = useState(false);

  const syncAsyncSetOptions = useCallback(
    (options, dependentValues) => {
      if (Array.isArray(options)) {
        setOptions(options);
      } else if (typeof options === "function") {
        try {
          setLoadingOptions(true);
          setOptions([{ label: "loading...", value: null }]);
          let currentPromise = Promise.resolve(
            options(dependentValues, formName)
          );
          lastOptionsPromise.current = currentPromise;
          currentPromise
            .then((result) => {
              setLoadingOptions(false);
              if (lastOptionsPromise.current === currentPromise) {
                if (Array.isArray(result)) {
                  setOptions(result);
                } else {
                  setOptions([{ label: "Couldn't fetch", value: null }]);
                  console.log(
                    `expected optionsFunction in select component to return array of OptionsType but got: ${result}`
                  );
                }
              }
            })
            .catch((e) => {
              setLoadingOptions(false);
              setOptions([{ label: "Couldn't fetch", value: null }]);
              console.log(`error occured while fetching options`, e?.message);
            });
        } catch (e) {
          setLoadingOptions(false);
          setOptions([{ label: "Couldn't fetch", value: null }]);
          console.log(`error occured while fetching options`, e?.message);
        }
      }
    },
    [setOptions, formName]
  );

  useEffect(() => {
    syncAsyncSetOptions(options, dependentValues);
  }, [options, dependentValues, syncAsyncSetOptions]);

  useEffect(() => {
    if (incomingMessage !== null && typeof incomingMessage === "object") {
      const { value, options } = incomingMessage;
      handleChange(value);
      if (whenToRunValidation === "onBlur") {
        runValidation({ value: value }, true);
      }
      if (Array.isArray(options)) {
        setOptions(options);
      }
    }
  }, [
    incomingMessage,
    setOptions,
    handleChange,
    runValidation,
    whenToRunValidation,
  ]);
  //dont move it to top it can mess up with hooks calling mechanism, if there is another
  //hook added move this below all hook calls
  if (excluded) {
    return null;
  }
  const isError = touched && (error ?? "") !== "";
  const menuItems = _options.map((menuItem, index) => {
    return (
      <MenuItem
        {...MenuItemProps}
        //keep button value to true else keyboard navigation for select will stop working
        button={true}
        key={menuItem.value ?? index}
        value={menuItem.value}
      >
        {showCheckbox ? (
          <Checkbox
            checked={
              Boolean(multiple)
                ? Array.isArray(value) && value.indexOf(menuItem.value) >= 0
                : value === menuItem.value
            }
          />
        ) : null}
        {menuItem.label}
      </MenuItem>
    );
  });
  const result = (
    <TextField
      {...others}
      select={true}
      key={fieldKey}
      id={fieldKey}
      name={name}
      value={multiple && !Array.isArray(value) ? [value] : value}
      error={isError}
      helperText={isError ? error : null}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled={isSubmitting}
      SelectProps={{
        ...SelectProps,
        native: false,
        multiple: multiple,
        renderValue: multiple
          ? (values: any[] | any) => {
              if (!Array.isArray(values)) {
                values = [values];
              }
              if (Array.isArray(_options)) {
                return _options.reduce((acc, current) => {
                  if (values.indexOf(current.value) >= 0) {
                    if (acc === "") {
                      return current.label;
                    } else {
                      return `${acc},${current.label}`;
                    }
                  }
                  return acc;
                }, "");
              }
              return "";
            }
          : undefined,
        //@ts-ignore
      }}
      InputLabelProps={{
        shrink: true,
      }}
      inputRef={focusRef}
      InputProps={{
        endAdornment:
          validationRunning || loadingOptions ? (
            <InputAdornment position="end">
              <CircularProgress
                color="primary"
                variant="indeterminate"
                {...CircularProgressProps}
              />
            </InputAdornment>
          ) : null,
        ...InputProps,
      }}
      inputProps={{
        readOnly: readOnly,
        tabIndex: readOnly ? -1 : undefined,
        ...inputProps,
      }}
    >
      {menuItems}
    </TextField>
  );
  if (Boolean(enableGrid)) {
    return <Grid {...GridProps}>{result}</Grid>;
  } else {
    return result;
  }
};

export default MySelect;
