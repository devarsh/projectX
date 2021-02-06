import TextField from "@material-ui/core/TextField";
import { useState, useEffect } from "react";

export const EditableTextField = ({
  value: initialValue,
  row: { index, original },
  column: { id },
  updateGridData,
}) => {
  const externalTouched = Boolean(original?._touched?.id);
  const externalError = original?._error?.id ?? "";
  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(externalError);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateGridData(index, id, value, true, error);
  };

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue);

    setError(externalError);
  }, [initialValue, externalError]);

  return (
    <TextField
      name={id}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      InputLabelProps={{ shrink: true }}
      size="small"
      fullWidth
      margin="none"
      InputProps={{ style: { marginTop: "0px" } }}
    />
  );
};
