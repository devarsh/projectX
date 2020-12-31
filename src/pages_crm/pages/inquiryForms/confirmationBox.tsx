import { Fragment } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";

export const ConfirmationBox = ({
  name,
  label,
  value,
  error,
  handleChange,
  isSubmitting,
}) => {
  const isError = Boolean(error);
  return (
    <Fragment>
      <FormControl
        key={name}
        component="fieldset"
        disabled={isSubmitting}
        error={isError}
      >
        <FormControlLabel
          name={name}
          control={<Checkbox />}
          onChange={handleChange}
          label={label}
          checked={Boolean(value)}
        />
        {isError ? <FormHelperText>{error}</FormHelperText> : null}
      </FormControl>
    </Fragment>
  );
};
