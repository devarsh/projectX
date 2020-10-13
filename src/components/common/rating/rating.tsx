import { FC, Fragment, useState, useCallback } from "react";
import { useField, UseFieldHookProps } from "packages/form";
import Rating, { RatingProps } from "@material-ui/lab/Rating";
import InputLabel, { InputLabelProps } from "@material-ui/core/InputLabel";
import Grid, { GridProps } from "@material-ui/core/Grid";

interface ExtendedFieldProps extends UseFieldHookProps {
  label: string;
  InputLabelProps?: InputLabelProps;
  GridProps?: GridProps;
  enableGrid: boolean;
}

const MyRating: FC<ExtendedFieldProps & RatingProps> = ({
  name: fieldName,
  validate,
  dependentFields,
  fieldKey: fieldID,
  label,
  InputLabelProps,
  GridProps,
  enableGrid,
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
  const [focus, setFocus] = useState(false);
  const customBlur = useCallback(() => {
    handleBlur();
    setFocus(false);
  }, [handleBlur, setFocus]);
  const focusHandler = useCallback(() => {
    setFocus(true);
  }, [setFocus]);
  const customChange = useCallback(
    (_, value) => {
      handleChange(value);
    },
    [handleChange]
  );
  const result = (
    <Fragment key={fieldKey}>
      <InputLabel {...InputLabelProps} focused={focus} disabled={isSubmitting}>
        {label}
      </InputLabel>
      <Rating
        {...others}
        key={fieldKey}
        id={fieldKey}
        name={name}
        value={value === "" ? 0 : value}
        //@ts-ignore
        onFocus={focusHandler}
        onChange={customChange}
        onBlur={customBlur}
        disabled={isSubmitting}
      />
    </Fragment>
  );
  if (Boolean(enableGrid)) {
    return (
      <Grid {...GridProps} key={fieldKey}>
        {result}
      </Grid>
    );
  }
  return result;
};

export default MyRating;
