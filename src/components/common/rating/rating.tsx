import React from "react";
import { useField, FieldProps } from "packages/form";
import Rating, { RatingProps } from "@material-ui/lab/Rating";
import InputLabel, { InputLabelProps } from "@material-ui/core/InputLabel";

interface ExtendedFieldProps extends FieldProps {
  label: string;
  InputLabelProps?: InputLabelProps;
}

const MyRating: React.FC<ExtendedFieldProps & RatingProps> = ({
  name: fieldName,
  validate,
  dependentFields,
  fieldKey: fieldID,
  label,
  InputLabelProps,
  ...others
}) => {
  const {
    value,
    handleChange,
    handleBlur,
    isSubmitting,
    fieldKey,
    name,
  } = useField({
    name: fieldName,
    fieldKey: fieldID,
  });
  const [focus, setFocus] = React.useState(false);
  const customBlur = React.useCallback(() => {
    handleBlur();
    setFocus(false);
  }, [handleBlur, setFocus]);
  const focusHandler = React.useCallback(() => {
    setFocus(true);
  }, [setFocus]);
  const customChange = React.useCallback(
    (_, value) => {
      console.log(value);
      handleChange(value);
    },
    [handleChange]
  );
  return (
    <React.Fragment key={fieldKey}>
      <InputLabel {...InputLabelProps} focused={focus} disabled={isSubmitting}>
        {label}
      </InputLabel>
      <Rating
        {...others}
        key={fieldKey}
        id={fieldKey}
        name={name}
        value={value}
        //@ts-ignore
        onFocus={focusHandler}
        onChange={customChange}
        onBlur={customBlur}
        disabled={isSubmitting}
      />
    </React.Fragment>
  );
};

export default MyRating;
