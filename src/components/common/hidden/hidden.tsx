import { FC, useEffect } from "react";
import { useField, UseFieldHookProps } from "packages/form";
import { GridProps } from "@material-ui/core/Grid";
import { transformDependentFieldsState } from "packages/form";

interface MyGridExtendedProps {
  GridProps?: GridProps;
  enableGrid: boolean;
  setValueOnDependentFieldsChange?: any;
}

export type MyHiddenFieldProps = UseFieldHookProps & MyGridExtendedProps;

const MyHiddenField: FC<MyHiddenFieldProps> = ({
  name: fieldName,
  fieldKey: fieldID,
  setValueOnDependentFieldsChange,
  dependentFields,
}) => {
  const { handleBlur, handleChange, dependentValues } = useField({
    name: fieldName,
    fieldKey: fieldID,
    dependentFields,
  });
  //set touch property to true of the field
  useEffect(() => {
    handleBlur();
  }, [handleBlur]);

  useEffect(() => {
    if (typeof setValueOnDependentFieldsChange === "function") {
      let result = setValueOnDependentFieldsChange(
        transformDependentFieldsState(dependentValues)
      );
      if (result !== undefined || result !== null) {
        handleChange(result);
      }
    }
  }, [dependentValues, handleChange, setValueOnDependentFieldsChange]);

  return null;
};

export default MyHiddenField;
