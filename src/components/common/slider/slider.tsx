import React from "react";
import { useField, UseFieldHookProps } from "packages/form";
import Slider, { SliderProps } from "@material-ui/core/Slider";
import InputLabel, { InputLabelProps } from "@material-ui/core/InputLabel";

interface ExtendedFieldProps extends UseFieldHookProps {
  label: string;
  InputLabelProps?: InputLabelProps;
}

const MySlider: React.FC<ExtendedFieldProps & SliderProps> = ({
  name: fieldName,
  fieldKey: fieldID,
  label,
  InputLabelProps,
  ...others
}) => {
  const {
    handleChange,
    handleBlur,
    isSubmitting,
    fieldKey,
    name,
    value,
  } = useField({
    name: fieldName,
    fieldKey: fieldID,
  });
  const [localValue, setLocalValue] = React.useState(Number(value));
  React.useEffect(() => {
    setLocalValue(Number(value));
  }, [value]);
  const [focus, setFocus] = React.useState(false);
  const localValueHandler = React.useCallback(
    (_, sliderValue) => {
      setLocalValue(sliderValue);
    },
    [setLocalValue]
  );
  const customHandleChange = React.useCallback(
    (_, sliderValue) => {
      handleChange(sliderValue);
    },
    [handleChange]
  );
  const customBlur = React.useCallback(() => {
    handleBlur();
    setFocus(false);
  }, [handleBlur, setFocus]);
  const focusHandler = React.useCallback(() => {
    setFocus(true);
  }, [setFocus]);

  return (
    // @ts-ignore
    <React.Fragment key={fieldKey}>
      <InputLabel {...InputLabelProps} focused={focus} disabled={isSubmitting}>
        {label}
      </InputLabel>
      <Slider
        {...others}
        key={fieldKey}
        id={fieldKey}
        name={name}
        value={localValue}
        //@ts-ignore
        disabled={isSubmitting}
        onFocus={focusHandler}
        onChange={localValueHandler}
        onChangeCommitted={customHandleChange}
        onBlur={customBlur}
      />
    </React.Fragment>
  );
};

export default MySlider;
