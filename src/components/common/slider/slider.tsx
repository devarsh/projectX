import React from "react";
import { useField, FieldProps } from "packages/form";
import Slider, { SliderProps } from "@material-ui/core/Slider";
import InputLabel, { InputLabelProps } from "@material-ui/core/InputLabel";

interface ExtendedFieldProps extends FieldProps {
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
  const { handleChange, handleBlur, isSubmitting, fieldKey, name } = useField({
    name: fieldName,
    fieldKey: fieldID,
  });

  const [focus, setFocus] = React.useState(false);
  const customHandler = React.useCallback(
    (event, sliderValue) => {
      event?.persist?.();
      if (event && event.target && event.target.value) {
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
        //@ts-ignore
        disabled={isSubmitting}
        onFocus={focusHandler}
        onChange={customHandler}
        onBlur={customBlur}
      />
    </React.Fragment>
  );
};

export default MySlider;
