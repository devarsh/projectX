import * as React from "react";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import {
  form,
  formField,
  fieldRegisteryAdd,
  fieldRegisteryRemove,
  subscribeToFormFields,
} from "./atoms";
import { handleValidation, getIn, isString } from "./util";
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

  //Initital Value Setter function
  React.useEffect(() => {
    const defaultValue: string | undefined = getIn(
      formState.inititalValues,
      fieldKey
    );
    if (defaultValue !== undefined) {
      setFieldData((currVal) => ({ ...currVal, value: defaultValue }));
    }
  }, [formState.resetFlagForInitValues]);

  //Form field registration
  React.useEffect(() => {
    registerField(fieldKey);
    if (isValidationFn) {
      setFieldData((currVal) => ({ ...currVal, validate }));
    }
    if (formState.resetFieldOnUnmount === true) {
      return () => unregisterField(fieldKey);
    }
  }, [fieldKey]);
  //change fieldName everytime arrayField renders with index position changed, since index position is part of name
  //but the same atom is retained
  React.useEffect(() => {
    setFieldData((currVal) => ({
      ...currVal,
      name: name,
    }));
  }, [name]);
  //Subscribe to dependentValues and get an array of values
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
        const myResult = result ?? "";
        const myValue = value;
        setFieldData((currVal) => ({
          ...currVal,
          error: myResult,
          value: myValue,
        }));
      } catch (e) {
        const myValue = value;
        setFieldData((currVal) => ({
          ...currVal,
          value: myValue,
          error: e.message,
        }));
      }
    } else {
      const myValue = value;
      setFieldData((currVal) => ({ ...currVal, value: myValue }));
    }
  };

  const setValidationRunning = (value: boolean) => {
    setFieldData((currVal) => ({
      ...currVal,
      validationRunning: value,
    }));
  };

  const handleBlur = async () => {
    if (isValidationFn && formState.validationRun === "onBlur") {
      try {
        const result = await Promise.resolve(
          handleValidation(fieldData, setValidationRunning)
        );
        const myResult = result ?? "";
        setFieldData((currVal) => ({
          ...currVal,
          touched: true,
          error: myResult,
        }));
      } catch (e) {
        setFieldData((currVal) => ({
          ...currVal,
          touched: true,
          error: e.message,
        }));
      }
    } else {
      setFieldData((currVal) => ({ ...currVal, touched: true }));
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
