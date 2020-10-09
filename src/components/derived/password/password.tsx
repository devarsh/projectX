import { useState, useCallback } from "react";
import { TextField, TextFieldProps } from "components/common/textField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
const PasswordField: React.FC<TextFieldProps> = ({
  name,
  validate,
  dependentFields,
  fieldKey,
  ...others
}) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const handleVisibility = useCallback(() => {
    setPasswordVisibility((old) => !old);
  }, [setPasswordVisibility]);
  return (
    <TextField
      {...others}
      name={name}
      validate={validate}
      dependentFields={dependentFields}
      fieldKey={fieldKey}
      type={passwordVisibility ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleVisibility}
              edge="end"
            >
              {passwordVisibility ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordField;
