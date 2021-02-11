import {
  FC,
  useEffect,
  useRef,
  useState,
  Fragment,
  ComponentType,
  HTMLAttributes,
  lazy,
  Suspense,
} from "react";
import { TextFieldProps } from "@material-ui/core/TextField";
import Grid, { GridProps } from "@material-ui/core/Grid";
import CircularProgress, {
  CircularProgressProps,
} from "@material-ui/core/CircularProgress";
import Autocomplete, {
  AutocompleteProps,
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import { CreateFilterOptionsConfig } from "@material-ui/lab/useAutocomplete";
import { Checkbox } from "components/styledComponent/checkbox";
import { TextField } from "components/styledComponent/textfield";
import { useField, UseFieldHookProps } from "packages/form";
import { Merge, OptionsProps, dependentOptionsFn } from "../types";
import Chip, { ChipProps } from "@material-ui/core/Chip";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import { useOptionsFetcher } from "../utils";

const ListBoxComponentVirtualized = lazy(() =>
  import("./virtualized").then((module) => ({
    default: module.ListBoxComponent,
  }))
);
//will use it if there is a neeed for advance sorter
//import matchSorter from "match-sorter";

interface AutoCompleteExtendedProps {
  enableGrid: boolean;
  showCheckbox: boolean;
  GridProps?: GridProps;
  CircularProgressProps?: CircularProgressProps;
  TextFieldProps?: TextFieldProps;
  ChipProps?: ChipProps;
  CreateFilterOptionsConfig?: CreateFilterOptionsConfig<OptionsProps>;
  options?: OptionsProps[] | dependentOptionsFn;
  label?: string;
  placeholder?: string;
  required?: boolean;
  enableVirtualized?: boolean;
  _optionsKey?: string;
  disableCaching?: boolean;
}

type MyAutocompleteProps = Merge<
  AutocompleteProps<OptionsProps, true, true, true>,
  AutoCompleteExtendedProps
>;

export type MyAllAutocompleteProps = Merge<
  MyAutocompleteProps,
  UseFieldHookProps
>;

const getOptionLabel = (option: OptionsProps) => option?.label ?? "";
const getOptionValue = (option: OptionsProps) => option?.value ?? "";

const MyAutocomplete: FC<MyAllAutocompleteProps> = ({
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
  GridProps,
  enableGrid,
  multiple,
  disableClearable,
  freeSolo,
  TextFieldProps,
  CircularProgressProps,
  ChipProps,
  showCheckbox,
  CreateFilterOptionsConfig,
  runValidationOnDependentFieldsChange,
  label,
  placeholder,
  limitTags,
  required,
  enableVirtualized,
  //@ts-ignore
  isFieldFocused,
  _optionsKey,
  disableCaching,
  ...others
}) => {
  const {
    formState,
    error,
    touched,
    handleChange,
    handleBlur,
    runValidation,
    isSubmitting,
    validationRunning,
    fieldKey,
    name,
    dependentValues,
    excluded,
    incomingMessage,
    whenToRunValidation,
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
    runValidationOnDependentFieldsChange,
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
  const [inputValue, setInputValue] = useState("");
  const { loadingOptions } = useOptionsFetcher(
    formState,
    options,
    setOptions,
    handleChange,
    dependentValues,
    incomingMessage,
    runValidation,
    whenToRunValidation,
    _optionsKey,
    disableCaching
  );
  //dont move it to top it can mess up with hooks calling mechanism, if there is another
  //hook added move this below all hook calls
  if (excluded) {
    return null;
  }
  const isError = touched && (error ?? "") !== "";
  const result = (
    <Suspense fallback={"loading..."}>
      <Autocomplete
        {...others}
        limitTags={limitTags ?? 2}
        key={fieldKey}
        multiple={multiple}
        disableClearable={disableClearable}
        freeSolo={freeSolo}
        options={_options}
        getOptionLabel={getOptionLabel}
        ListboxComponent={
          Boolean(enableVirtualized)
            ? (ListBoxComponentVirtualized as ComponentType<
                HTMLAttributes<HTMLElement>
              >)
            : undefined
        }
        onChange={(_, value) => {
          if (!Array.isArray(value)) {
            value = [value];
          }
          value = value.map((one) => {
            if (typeof one === "object") {
              if (!Boolean(freeSolo)) {
                return getOptionValue(one);
              }
              return getOptionLabel(one);
            }
            return one;
          });

          if (!Boolean(multiple) && Array.isArray(value)) {
            //@ts-ignore
            handleChange(value[0]);
          } else {
            handleChange(value);
          }
        }}
        onBlur={handleBlur}
        disabled={isSubmitting}
        filterOptions={
          Boolean(CreateFilterOptionsConfig) &&
          typeof CreateFilterOptionsConfig === "object"
            ? createFilterOptions(CreateFilterOptionsConfig)
            : undefined
        }
        renderTags={(value, getTagProps) => {
          return value.map((option, index) => {
            if (typeof option === "string") {
              return (
                <Chip
                  key={option}
                  variant="outlined"
                  {...ChipProps}
                  label={option}
                  {...getTagProps({ index })}
                />
              );
            }
            return (
              <Chip
                key={`${option.label}-${index}`}
                variant="outlined"
                {...ChipProps}
                label={option.label}
                {...getTagProps({ index })}
              />
            );
          });
        }}
        renderInput={(params) => (
          <TextField
            {...TextFieldProps}
            {...params}
            name={name}
            label={label}
            placeholder={placeholder}
            value={inputValue}
            autoComplete="disabled"
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            error={!isSubmitting && isError}
            required={required}
            helperText={!isSubmitting && isError ? error : null}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <Fragment>
                  {validationRunning || loadingOptions ? (
                    <CircularProgress
                      color="primary"
                      variant="indeterminate"
                      {...CircularProgressProps}
                    />
                  ) : null}
                  {params.InputProps.endAdornment}
                </Fragment>
              ),
            }}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              ...params.inputProps,
              autoComplete: "new-user-street-address",
            }}
          />
        )}
        renderOption={(option, { selected }) => {
          let label = getOptionLabel(option);
          const matches = match(label, inputValue);
          const parts = parse(label, matches);
          const labelJSX = parts.map((part, index) => (
            <span
              key={index}
              style={{ fontWeight: part.highlight ? 700 : 400 }}
            >
              {part.text}
            </span>
          ));
          return (
            <Fragment>
              {showCheckbox ? <Checkbox checked={selected} /> : null}
              {labelJSX}
            </Fragment>
          );
        }}
      />
    </Suspense>
  );
  if (Boolean(enableGrid)) {
    return <Grid {...GridProps}>{result}</Grid>;
  } else {
    return result;
  }
};

export default MyAutocomplete;
