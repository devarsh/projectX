import { SelectRenderOnly } from "components/common/select/render";
import { useState, useEffect, useCallback } from "react";
import { combineAndRunValidation } from "./utils";

export const EditableSelect = ({
  value: initialValue,
  row: { index, original },
  column: { id, options, validation, schemaValidation },
  updateGridData,
}) => {
  const validationFn = useCallback(
    (value) => combineAndRunValidation(validation, schemaValidation),
    [validation, schemaValidation]
  );
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
    <SelectRenderOnly
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      size="small"
      fullWidth
      touched={externalTouched}
      error={error}
      handleChange={onChange}
      handleBlur={onBlur}
      options={options}
      loading={false}
    />
  );
};
