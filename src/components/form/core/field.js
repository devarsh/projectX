import * as React from "react";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import {
  form,
  formField,
  fieldRegisteryAdd,
  fieldRegisteryRemove,
  subscribeToFormFields,
} from "./atoms";

import { handleValidation } from "./util";

export const useField = ({ name, validate, dependentFields }) => {
  const formState = useRecoilValue(form);
  const [fieldData, setFieldData] = useRecoilState(formField(name));
  const registerField = useSetRecoilState(fieldRegisteryAdd);
  const unregisterField = useSetRecoilState(fieldRegisteryRemove);
  const isValidationFn = typeof validate === "function" ? true : false;
  React.useEffect(() => {
    registerField(name);
    if (isValidationFn) {
      setFieldData({ ...fieldData, validate });
    }
    return () => unregisterField(name);
  }, []);
  const dependentValues = useRecoilValue(
    subscribeToFormFields(dependentFields)
  );

  const handleChange = async (e) => {
    const value = e.target.value;
    if (isValidationFn && formState.validationRun === "onChange") {
      try {
        const result = await Promise.resolve(
          handleValidation(fieldData, setValidationRunning)
        );
        setFieldData({
          ...fieldData,
          value,
          error: result,
        });
      } catch (e) {
        setFieldData({ ...fieldData, value, error: e.message });
      }
    } else {
      setFieldData({ ...fieldData, value: e.target.value });
    }
  };

  const setValidationRunning = (value) => {
    setFieldData({
      ...fieldData,
      validationRunning: value,
    });
  };

  const handleBlur = async () => {
    if (isValidationFn && formState.validationRun === "onBlur") {
      try {
        const result = await Promise.resolve(
          handleValidation(fieldData, setValidationRunning)
        );
        setFieldData({ ...fieldData, touched: true, error: result });
      } catch (e) {
        setFieldData({ ...fieldData, touched: true, error: e.message });
      }
    } else {
      setFieldData({ ...fieldData, touched: true });
    }
  };
  return {
    ...fieldData,
    isSubmitting: formState.isSubmitting,
    handleChange,
    handleBlur,
    setValidationRunning,
    dependentValues,
  };
};
