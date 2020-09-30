import * as React from "react";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { useQuery } from "react-query";
import {
  formAtom,
  formFieldAtom,
  formFieldRegisterSelector,
  formFieldUnregisterSelector,
  subscribeToFormFieldsSelector,
} from "./atoms";

import {
  FormFieldAtomType,
  UseFieldHookProps,
  FormFieldRegisterSelectorAttributes,
} from "./types";
import { FormContext } from "./context";
import { getIn } from "./util";

export const useField = ({
  fieldKey,
  name,
  validate,
  dependentFields,
}: UseFieldHookProps) => {
  //formContext provides formName for scoping of fields, and initialValue for the field
  const formContext = React.useContext(FormContext);
  //formState provides will be used to determine if form is submitting
  const formState = useRecoilValue(formAtom(formContext.formName));
  //fieldKeyRef used to inititalize fieldKey, if fieldKey is not passed
  //fieldName will be used to determine fieldKey, fieldKey will be used to
  //access atom from recoil storing field state
  const fieldKeyRef = React.useRef(
    Boolean(fieldKey)
      ? `${formContext.formName}/${fieldKey}`
      : `${formContext.formName}/${name}`
  );
  //fieldData atom stores current field state
  const [fieldData, setFieldData] = useRecoilState<FormFieldAtomType>(
    formFieldAtom(fieldKeyRef.current)
  );

  //This effect will update fieldName, in case of arrayField, when fields array index postion
  //updates. ie. arrayFieldName[current-index].fieldName - here currentIndex represents
  //fields current postion in the arrayField
  React.useEffect(() => {
    setFieldData((currVal) => ({
      ...currVal,
      name: name,
    }));
  }, [name, setFieldData]);

  //fieldDataRef will store current reference of fieldState and will provide latest value to
  //onChange and onBlur handlers when the memozied version of handlers are passed as props
  //shaving off rerenders.
  const fieldDataRef = React.useRef<FormFieldAtomType>(fieldData);
  fieldDataRef.current = fieldData;

  //registerField function registers the currentField to the fields registry if not registered,
  //and keeping track of all the active fields in the form
  const registerField = useSetRecoilState(
    formFieldRegisterSelector(formContext.formName)
  );
  //unregisterField function unregistered the currentField from the fields registry
  const unregisterField = useSetRecoilState(
    formFieldUnregisterSelector(formContext.formName)
  );

  //This effect will register and unregister fields when they mount and unmount
  //set initial value of the field, if initial value is provided.
  //Set validation Fn if passed to the field state to call validation on any
  //untouched fields when form is submitted.
  //If an option is set not resetField on unmount unregister will not be called.
  React.useEffect(() => {
    const currentfield = fieldKeyRef.current;
    //Since our keys are prepended with formName, remove the formName and get the filedValue from
    //initialValues object
    const defaultValue =
      typeof formContext.initialValues === "object"
        ? getIn(
            formContext.initialValues,
            currentfield.replace(`${formContext.formName}/`, ""),
            null
          )
        : null;
    const registrationValue: FormFieldRegisterSelectorAttributes = {
      defaultValue: defaultValue,
      fieldName: currentfield,
    };
    registerField(registrationValue);
    if (isValidationFnRef.current === true) {
      setFieldData((currVal) => ({ ...currVal, validate }));
    }
    if (formContext.resetFieldOnUnmount === true) {
      return () => {
        unregisterField(currentfield);
      };
    }
  }, [setFieldData, registerField, unregisterField, formContext]);

  //Subscribe to cross fields values, provide an array of dependent field names,
  //this field will be rerendered when any of the provided dependent field's value updates.
  const dependentFieldsState = useRecoilValue(
    subscribeToFormFieldsSelector(dependentFields)
  );

  /**
   * Start of field Validation Logic
   * It uses react-query which will always run the validation against the latest value
   */
  //A helper to check if field has been passed validation Fn to validate
  const isValidationFnRef = React.useRef(
    typeof validate === "function" ? true : false
  );
  //runValidation will trigger validation when called from handleChange or handleBlur handler
  const [runValidation, setRunValidation] = React.useState(false);
  //runValidationRef will always provide latest value to the memozied handleChange and handleBlur handlers
  //that will trigger runValiation based on the condition
  const runValidationRef = React.useRef(runValidation);
  runValidationRef.current = runValidation;
  //react query hook needs a function as second parameter
  //if validation fn is not passed a noop function is provided
  const alwaysValidate = typeof validate === "function" ? validate : () => "";
  const { data, status, error, refetch } = useQuery(
    [
      fieldData.fieldKey,
      {
        name: fieldData.name,
        value: fieldData.value,
      },
    ],
    alwaysValidate,
    {
      enabled: false,
      refetchOnWindowFocus: false,
      cacheTime: 0,
    }
  );
  //This effect will be responsible for updating fields error state everytime the validation runs
  React.useEffect(() => {
    if (status === "error") {
      if (typeof error === "string") {
        setFieldData((old) => ({ ...old, error, validationRunning: false }));
      }
      if (error instanceof Error) {
        setFieldData((old) => ({
          ...old,
          error: error.message,
          validationRunning: false,
        }));
      }
    } else if (status === "success") {
      if (typeof data === "string" || data === null) {
        setFieldData((old) => ({
          ...old,
          error: data,
          validationRunning: false,
        }));
      }
    } else if (status === "loading") {
      setFieldData((old) => ({ ...old, validationRunning: true }));
    }
  }, [status, setFieldData, data]);
  //This effect will trigger validation upon onChange or onBlur as per the configuration provided
  React.useEffect(() => {
    if (runValidation === true) {
      refetch();
    }
  }, [fieldData.value, runValidation, refetch]);
  /**
   * End of field validation logic
   */

  //handleChange will be responsible for setting fieldValue when will be passed as a props to the
  //inputs, it can take event, date, number, string
  //It will run validation if validationRun == 'onChange'
  const handleChange = React.useCallback(
    (eventOrTextValue: React.ChangeEvent<any> | Date | string | number) => {
      if (fieldDataRef.current !== null) {
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
        if (runValidationRef.current !== false) {
          setRunValidation(false);
        }
        if (
          isValidationFnRef.current &&
          formContext.validationRun === "onChange"
        ) {
          setRunValidation(true);
        }
      }
    },
    [setFieldData, formContext.validationRun]
  );
  //handleBlur will set touch property in field state to true for every field touched by user
  //It will run validation if validationRun == 'onBlur'
  const handleBlur = React.useCallback(async () => {
    if (fieldDataRef.current !== null) {
      setFieldData((currVal) => {
        if (currVal.touched) {
          return currVal;
        } else {
          return {
            ...currVal,
            touched: true,
          };
        }
      });
      if (runValidationRef.current !== false) {
        setRunValidation(false);
      }
      if (isValidationFnRef.current && formContext.validationRun === "onBlur") {
        setRunValidation(true);
      }
    }
  }, [setFieldData, formContext.validationRun]);
  return {
    ...fieldData,
    isSubmitting: formState.isSubmitting,
    handleChange,
    handleBlur,
    dependentValues: dependentFieldsState,
  };
};

// Checkbox helper that will provide an array if multiple checkboxes are present under same name
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
