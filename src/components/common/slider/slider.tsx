import { FC, useState, useEffect, useCallback, Fragment } from "react";
import { useField, UseFieldHookProps } from "packages/form";
import Slider, { SliderProps } from "@material-ui/core/Slider";
import InputLabel, { InputLabelProps } from "@material-ui/core/InputLabel";

interface ExtendedFieldProps extends UseFieldHookProps {
  label: string;
  InputLabelProps?: InputLabelProps;
}

const MySlider: FC<ExtendedFieldProps & SliderProps> = ({
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
  const [localValue, setLocalValue] = useState(Number(value));
  useEffect(() => {
    setLocalValue(Number(value));
  }, [value]);
  const [focus, setFocus] = useState(false);
  const localValueHandler = useCallback(
    (_, sliderValue) => {
      setLocalValue(sliderValue);
    },
    [setLocalValue]
  );
  const customHandleChange = useCallback(
    (_, sliderValue) => {
      handleChange(sliderValue);
    },
    [handleChange]
  );
  const customBlur = useCallback(() => {
    handleBlur();
    setFocus(false);
  }, [handleBlur, setFocus]);
  const focusHandler = useCallback(() => {
    setFocus(true);
  }, [setFocus]);

  return (
    // @ts-ignore
    <Fragment key={fieldKey}>
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
    </Fragment>
  );
};

export default MySlider;
