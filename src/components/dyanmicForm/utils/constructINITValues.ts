import { getIn, setIn, InitialValuesType } from "packages/form";
import { FieldMetaDataType } from "../types";

export const constructInitialValue = (
  fields: FieldMetaDataType[],
  initialValues?: InitialValuesType
) => {
  if (!Array.isArray(fields)) {
    return {};
  }
  let initialValuesObj = {};
  for (const field of fields) {
    const { defaultValue, name } = field;
    const value = getIn(initialValues, name, undefined);
    if (Boolean(value)) {
      initialValuesObj = setIn(initialValuesObj, name, value);
    } else if (Boolean(defaultValue)) {
      initialValuesObj = setIn(initialValuesObj, name, defaultValue);
    }
  }
  return initialValuesObj;
};
