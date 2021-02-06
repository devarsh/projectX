import { AutocompleteRenderOnly } from "components/common/autocomplete/render";
import { useState, useEffect } from "react";

export const EditableAutocomplete = ({
  value: initialValue,
  row: { index, original },
  column: { id, options, validation },
  updateGridData,
}) => {
  console.log(id, options, validation);
  const externalTouched = Boolean(original?._touched?.id);
  const externalError = original?._error?.id ?? "";
  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(externalError);

  const onChange = (value) => {
    setValue(value);
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
    <AutocompleteRenderOnly
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      size="small"
      fullWidth
      error={error}
      handleChange={onChange}
      handleBlur={onBlur}
      options={options}
      loading={false}
      renderInput={() => null}
    />
  );
};
