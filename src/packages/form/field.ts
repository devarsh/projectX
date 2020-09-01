import * as React from "react";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import {
  form,
  formField,
  fieldRegisteryAdd,
  fieldRegisteryRemove,
  subscribeToFormFields,
} from "./atoms";

import { handleValidation, isString } from "./util";

import { FormFieldAtom, FieldProps } from "./types";

export const useField = ({
  fieldKey,
  name,
  validate,
  dependentFields,
}: FieldProps) => {
  const formState = useRecoilValue(form);
  const [fieldData, setFieldData] = useRecoilState<FormFieldAtom>(
    formField(fieldKey)
  );
  const registerField = useSetRecoilState(fieldRegisteryAdd);
  const unregisterField = useSetRecoilState(fieldRegisteryRemove);
  const isValidationFn = typeof validate === "function" ? true : false;
  React.useEffect(() => {
    registerField(fieldKey);
    if (isValidationFn) {
      setFieldData({ ...fieldData, validate });
    }
    if (formState.resetFieldOnUnmount === true) {
      return () => unregisterField(fieldKey);
    }
  }, [fieldKey]);
  //change everytime arrayField renders this field will be used as new name
  React.useEffect(() => {
    setFieldData({
      ...fieldData,
      name: name,
    });
  }, [name]);
  const dependentValues = useRecoilValue(
    subscribeToFormFields(dependentFields)
  );

  const handleChange = async (
    eventOrTextValue: string | React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = eventOrTextValue;
    if (!isString(eventOrTextValue)) {
      eventOrTextValue?.persist?.();
      value = eventOrTextValue.target.value;
    } else {
      value = eventOrTextValue;
    }
    if (isValidationFn && formState.validationRun === "onChange") {
      try {
        const result = await Promise.resolve(
          handleValidation(fieldData, setValidationRunning)
        );
        if (typeof result === "string" || result === null) {
          setFieldData({
            ...fieldData,
            value,
            error: result,
          });
        }
      } catch (e) {
        setFieldData({ ...fieldData, value, error: e.message });
      }
    } else {
      setFieldData({ ...fieldData, value: value });
    }
  };

  const setValidationRunning = (value: boolean) => {
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
        if (typeof result === "string" || result === null) {
          setFieldData({ ...fieldData, touched: true, error: result });
        }
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
