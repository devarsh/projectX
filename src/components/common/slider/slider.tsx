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

  const [focus, setFocus] = React.useState(false);
  const customHandler = React.useCallback(
    (event, sliderValue) => {
      event?.persist?.();
      if (event && event.target) {
        event.target.value = sliderValue;
        handleChange(event);
      }
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
        value={value === "" ? 0 : value}
        //@ts-ignore
        disabled={isSubmitting}
        onFocus={focusHandler}
        onChangeCommitted={customHandler}
        onBlur={customBlur}
      />
    </React.Fragment>
  );
};

export default MySlider;
