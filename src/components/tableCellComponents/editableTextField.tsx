import TextField from "@material-ui/core/TextField";
import { useState, useEffect } from "react";

export const EditableTextField = ({
  value: initialValue,
  row: { index, original },
  column: { id, validation },
  updateGridData,
}) => {
  const externalTouched = Boolean(original?._touched?.[id]);
  const externalError = original?._error?.[id] ?? "";

  const [loading, setLoading] = useState(false);

  const [value, setValue] = useState(initialValue);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    setLoading(true);
    validation(value).then((result) => {
      setLoading(false);
      updateGridData(index, id, value, true, result);
    });
  };

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

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
      error={Boolean(externalTouched) && Boolean(externalError)}
      helperText={
        Boolean(externalTouched) && Boolean(externalError)
          ? externalError
          : null
      }
      disabled={loading}
    />
  );
};
