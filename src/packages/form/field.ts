import * as React from "react";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import {
  formAtom,
  formFieldAtom,
  formFieldRegisterSelector,
  formFieldUnregisterSelector,
  subscribeToFormFieldsSelector,
} from "./atoms";
import { handleValidationHelper } from "./util";
import { FormFieldAtomType, UseFieldHookProps, FormAtomType } from "./types";
import { FormNameContext } from "./context";

export const useField = ({
  fieldKey,
  name,
  validate,
  dependentFields,
}: UseFieldHookProps) => {
  //We use context to get formName to get formName on initital render
  const formName = React.useContext(FormNameContext);

  //To make sure fieldKey is not empty it is usually the same as field name, but in case of array Fields it will different since
  //field name will be dependent on position of field on the array and fieldKey will be used to keep track of original atom that has the
  //form value
  const fieldKeyRef = React.useRef(
    (fieldKey ?? "") !== "" ? `${formName}/${fieldKey}` : `${formName}/${name}`
  );

  //Get Form State to get initital values, form options etc
  const formState = useRecoilValue(formAtom(formName));

  const isValidationFnRef = React.useRef(
    typeof validate === "function" ? true : false
  );
  //fieldData atom stores all the information of the current field .ie currentValue, error, touched, validationFn, etc
  const [fieldData, setFieldData] = useRecoilState<FormFieldAtomType>(
    formFieldAtom(fieldKeyRef.current)
  );
  //The refs to make sure we have the latest value in our onChange and OnBlur callbacks and they are memoized
  const fieldDataRef = React.useRef<FormFieldAtomType>(fieldData);
  const formStateRef = React.useRef<FormAtomType>(formState);

  fieldDataRef.current = fieldData;
  formStateRef.current = formState;

  //a global register and unregister fns to add and remove fields from store - keeping track of all the fields
  const registerField = useSetRecoilState(formFieldRegisterSelector(formName));
  const unregisterField = useSetRecoilState(
    formFieldUnregisterSelector(formName)
  );

  //This effect will be executed only once to register the current field to fields queue, and upon unmount it will be removed from the
  //tracking queue, unless the paramter on the form mentions not to unmount the form.
  React.useEffect(() => {
    const currentfield = fieldKeyRef.current; //to satisfy eslint
    registerField(currentfield);
    if (isValidationFnRef.current === true) {
      setFieldData((currVal) => ({ ...currVal, validate }));
    }
    if ((formStateRef.current?.resetFieldOnUnmount ?? false) === true) {
      return () => unregisterField(currentfield);
    }
  }, [setFieldData, registerField, unregisterField]);

  //change fieldName everytime arrayField renders with index position changed, since index position is part of name
  //but the same atom is retained
  React.useEffect(() => {
    setFieldData((currVal) => ({
      ...currVal,
      name: name,
    }));
  }, [name, setFieldData]);
  //Subscribe to dependentValues and get an array of values
  const dependentValues = useRecoilValue(
    subscribeToFormFieldsSelector(dependentFields)
  );

  const setValidationRunning = React.useCallback(
    (value: boolean) => {
      setFieldData((currVal) => ({
        ...currVal,
        validationRunning: value,
      }));
    },
    [setFieldData]
  );
  const handleValidation = React.useCallback(
    async (fieldData, validationRunningFn) => {
      let result;
      try {
        result = await Promise.resolve(
          handleValidationHelper(fieldData, validationRunningFn)
        );
      } catch (e) {
        result = e.message;
      }
      setFieldData((currVal) => ({
        ...currVal,
        error: result,
      }));
    },
    [setFieldData]
  );
  const handleChange = React.useCallback(
    (eventOrTextValue: React.ChangeEvent<any> | Date | string | number) => {
      if (fieldDataRef.current !== null && formStateRef.current !== null) {
        eventOrTextValue = eventOrTextValue ?? "";
        let val = eventOrTextValue;
        if (
          !(
            eventOrTextValue instanceof Date ||
            typeof eventOrTextValue === "string" ||
            typeof eventOrTextValue === "number"
          )
        ) {
          if (
            (eventOrTextValue as React.ChangeEvent<any>) &&
            (eventOrTextValue as React.ChangeEvent<any>).persist
          ) {
            (eventOrTextValue as React.ChangeEvent<any>).persist();
          }
          const {
            type,
            value,
            checked,
            options,
            multiple,
          } = eventOrTextValue.target;
          let parsed;
          val = /number|range/.test(type)
            ? ((parsed = parseFloat(value)), isNaN(parsed) ? "" : parsed)
            : /checkbox/.test(type)
            ? getValueForCheckbox(fieldDataRef.current.value, checked, value)
            : !!multiple
            ? getSelectedValues(options)
            : value;
        }
        setFieldData((currVal) => ({ ...currVal, value: val }));
        if (
          isValidationFnRef.current &&
          formStateRef.current.validationRun === "onChange"
        ) {
          //update currentFieldData to reflect our most recent setState before passing to validationFn
          const currentFieldData = { ...fieldDataRef.current, value: val };
          handleValidation(currentFieldData, setValidationRunning);
        }
      }
    },
    [setFieldData, setValidationRunning, handleValidation]
  );

  const handleBlur = React.useCallback(async () => {
    if (fieldDataRef.current !== null && formStateRef.current !== null) {
      setFieldData((currVal) => ({
        ...currVal,
        touched: true,
      }));
      if (
        isValidationFnRef.current &&
        formStateRef.current.validationRun === "onBlur"
      ) {
        //update currentFieldData to reflect our most recent setState before passing to validationFn
        const currentFieldData = { ...fieldDataRef.current, touched: true };
        handleValidation(currentFieldData, setValidationRunning);
      }
    }
  }, [setFieldData, setValidationRunning, handleValidation]);
  return {
    ...fieldData,
    isSubmitting: formState.isSubmitting,
    handleChange,
    handleBlur,
    setValidationRunning,
    dependentValues,
  };
};

// /** Return the next value for a checkbox */
function getValueForCheckbox(
  currentValue: string | any[],
  checked: boolean,
  valueProp: any
) {
  // If the current value was a boolean, return a boolean
  if (typeof currentValue === "boolean") {
    return Boolean(checked);
  }

  // If the currentValue was not a boolean we want to return an array
  let currentArrayOfValues: any[] = [];
  let isValueInArray = false;
  let index = -1;

  if (!Array.isArray(currentValue)) {
    // eslint-disable-next-line eqeqeq
    if (!valueProp || valueProp == "true" || valueProp == "false") {
      return Boolean(checked);
    }
  } else {
    // If the current value is already an array, use it
    currentArrayOfValues = currentValue;
    index = currentValue.indexOf(valueProp);
    isValueInArray = index >= 0;
  }

  // If the checkbox was checked and the value is not already present in the aray we want to add the new value to the array of values
  if (checked && valueProp && !isValueInArray) {
    return currentArrayOfValues.concat(valueProp);
  }

  // If the checkbox was unchecked and the value is not in the array, simply return the already existing array of values
  if (!isValueInArray) {
    return currentArrayOfValues;
  }

  // If the checkbox was unchecked and the value is in the array, remove the value and return the array
  return currentArrayOfValues
    .slice(0, index)
    .concat(currentArrayOfValues.slice(index + 1));
}

function getSelectedValues(options: any[]) {
  return Array.from(options)
    .filter((el) => el.selected)
    .map((el) => el.value);
}
