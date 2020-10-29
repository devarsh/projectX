import { useContext, useRef, useEffect, useCallback } from "react";
import {
  useRecoilState,
  useSetRecoilState,
  useRecoilValue,
  useRecoilCallback,
} from "recoil";
import {
  formAtom,
  formFieldAtom,
  formFieldRegistryAtom,
  formFieldRegisterSelector,
  formFieldUnregisterSelector,
  subscribeToFormFieldsSelector,
  formFieldExcludeAddSelector,
  formFieldExcludeRemoveSelector,
} from "./atoms";
import {
  FormFieldAtomType,
  FormFieldRegistryAtomType,
  UseFieldHookProps,
  FormFieldRegisterSelectorAttributes,
  InitialValuesType,
  PostValidationSetCrossFieldValuesFnType,
  ValidateFnType,
} from "./types";
import { FormContext } from "./context";
import { getIn, yupReachAndValidate } from "./util";

export const useField = ({
  fieldKey,
  name,
  dependentFields,
  validate,
  validationRun,
  shouldExclude,
  isReadOnly,
  postValidationSetCrossFieldValues,
  runPostValidationHookAlways,
}: UseFieldHookProps) => {
  //formContext provides formName for scoping of fields, and initialValue for the field
  const formContext = useContext(FormContext);
  //formState provides will be used to determine if form is submitting
  const formState = useRecoilValue(formAtom(formContext.formName));
  //fieldKeyRef used to inititalize fieldKey, if fieldKey is not passed
  //fieldName will be used to determine fieldKey, fieldKey will be used to
  //access atom from recoil storing field state
  const fieldKeyRef = useRef(
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
  useEffect(() => {
    if (name.indexOf(`${formContext.formName}/`) === 0) {
      setFieldData((currVal) => ({
        ...currVal,
        name: name,
      }));
    }
  }, [name, setFieldData, formContext.formName]);

  //fieldDataRef will store current reference of fieldState and will provide latest value to
  //onChange and onBlur handlers when the memozied version of handlers are passed as props
  //shaving off rerenders.
  const fieldDataRef = useRef<FormFieldAtomType>(fieldData);
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
  //If an option is set not resetField on unmount unregister will not be called.
  useEffect(() => {
    const currentfield = fieldKeyRef.current;
    //Since our keys are prepended with formName, remove the formName and get the filedValue from
    //initialValues object
    let defaultValue: any = null;
    const value =
      typeof formContext.initialValues === "object"
        ? getIn(
            formContext.initialValues,
            currentfield.replace(`${formContext.formName}/`, ""),
            null
          )
        : null;
    if (Boolean(value)) {
      defaultValue = { value: value };
    }

    const registrationValue: FormFieldRegisterSelectorAttributes = {
      defaultValue: defaultValue,
      fieldName: currentfield,
    };
    registerField(registrationValue);

    if (Boolean(formContext.resetFieldOnUnmount) === true) {
      return () => {
        unregisterField(currentfield);
      };
    }
  }, [setFieldData, registerField, unregisterField, formContext]);

  //This hook with register validation method on field instance

  const isValidationFnRef = useRef(
    typeof validate === "function" ? true : false
  );

  //eslint is disabled since validate frequently changes and is not in our control
  //always enable and check  if we are not excluding any other field
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const extractedFieldName = fieldData.name.replace(
      `${formContext.formName}/`,
      ""
    );
    const wrappedValidation = wrapValidationMethod(
      yupReachAndValidate(formContext.validationSchema, extractedFieldName),
      validate,
      postValidationSetCrossFieldValues,
      runPostValidationHookAlways
    );
    if (typeof wrappedValidation === "function") {
      isValidationFnRef.current = true;
      setFieldData((currVal) => ({ ...currVal, validate: wrappedValidation }));
    }
  }, [
    setFieldData,
    formContext.formName,
    formContext.validationSchema,
    fieldData.name,
  ]);

  //Subscribe to cross fields values, provide an array of dependent field names,
  //this field will be rerendered when any of the provided dependent field's value updates.

  const addRemoveExcludedFields = useRecoilCallback(
    ({ set }) => ({ fieldName, flag }) => {
      if (flag === "add") {
        set(formFieldExcludeAddSelector(formContext.formName), fieldName);
      } else if (flag === "remove") {
        set(formFieldExcludeRemoveSelector(formContext.formName), fieldName);
      }
    },
    [formContext.formName]
  );

  const dependentFieldsState = useRecoilValue(
    subscribeToFormFieldsSelector({
      formName: formContext.formName,
      fields: dependentFields,
    })
  );
  // this determine if the field should be excluded
  useEffect(() => {
    if (typeof shouldExclude === "function") {
      let result = shouldExclude(fieldData, dependentFieldsState);
      if (result === true && fieldData.excluded === false) {
        setFieldData((old) => ({
          ...old,
          excluded: true,
        }));
        addRemoveExcludedFields({ fieldName: fieldData.name, flag: "add" });
      } else if (result === false && fieldData.excluded === true) {
        setFieldData((old) => ({
          ...old,
          excluded: false,
        }));
        addRemoveExcludedFields({ fieldName: fieldData.name, flag: "remove" });
      }
    }
    if (typeof isReadOnly === "function") {
      let result = isReadOnly(fieldData, dependentFieldsState);
      if (result === true && fieldData.readOnly === false) {
        setFieldData((old) => ({
          ...old,
          readOnly: true,
        }));
      } else if (result === false && fieldData.readOnly === true) {
        setFieldData((old) => ({
          ...old,
          readOnly: true,
        }));
      }
    }
  });

  const passCrossFieldMessage = useRecoilCallback(
    ({ snapshot, set }) => (fieldsObj: InitialValuesType) => {
      const fieldsLoadable = snapshot.getLoadable(
        formFieldRegistryAtom(formContext.formName)
      );
      let fields: FormFieldRegistryAtomType = [];
      if (fieldsLoadable.state === "hasValue") {
        fields = fieldsLoadable.contents;
      }
      for (const field of Object.entries(fieldsObj)) {
        if (fields.indexOf(`${formContext.formName}/${field[0]}`) >= 0) {
          set(formFieldAtom(`${formContext.formName}/${field[0]}`), (old) => ({
            ...old,
            incomingMessage: field[1],
          }));
        }
      }
    },
    [formContext.formName]
  );

  /**
   * Start of field Validation Logic
   * It will always run the validation against the latest value and if promise provides cancelFn
   * it will call cancel function and cancel the query
   */
  const whenToRunValidation = useRef(
    Boolean(validationRun)
      ? validationRun
      : Boolean(formContext.validationRun)
      ? formContext.validationRun
      : "all"
  );

  const lastValidationPromise = useRef<Promise<any> | null>(null);
  const lastValidationValue = useRef<any | null>(null);

  const handleValidation = useCallback(
    (
      data: FormFieldAtomType,
      alwaysRun?: boolean,
      touchAndValidate?: boolean
    ) => {
      if (typeof fieldDataRef.current.validate !== "function") {
        return;
      }
      if (lastValidationValue.current === data.value && !!alwaysRun === false) {
        return;
      }
      setFieldData((old) => ({
        ...old,
        validationRunning: true,
      }));
      const currentPromise = Promise.resolve(
        fieldDataRef.current.validate(data)
      );
      //@ts-ignore
      lastValidationValue.current = data.value;
      lastValidationPromise.current = currentPromise;
      currentPromise
        .then((result) => {
          const { error, crossFieldMessages } = result;
          if (lastValidationPromise.current === currentPromise) {
            let finalResult;
            if (
              typeof error === "string" ||
              error === undefined ||
              error === null
            ) {
              finalResult = error;
            } else {
              finalResult = "unkown error check console";
              console.log("unknown error type", error);
            }
            if (!Boolean(touchAndValidate)) {
              setFieldData((old) => {
                return {
                  ...old,
                  validationRunning: false,
                  error: finalResult,
                };
              });
            } else {
              setFieldData((old) => {
                return {
                  ...old,
                  validationRunning: false,
                  touched: true,
                  error: finalResult,
                };
              });
            }
            if (typeof crossFieldMessages === "object") {
              passCrossFieldMessage(crossFieldMessages);
            }
          }
        })
        .catch((err) => {
          if (lastValidationPromise.current === currentPromise) {
            let finalResult;
            if (err instanceof Error) {
              finalResult = err.message;
            } else {
              finalResult = "unkown error type check console";
              console.log("unknown error type", err);
            }
            if (!Boolean(touchAndValidate)) {
              setFieldData((old) => {
                return {
                  ...old,
                  validationRunning: false,
                  error: finalResult,
                };
              });
            } else {
              setFieldData((old) => {
                return {
                  ...old,
                  validationRunning: false,
                  touched: true,
                  error: finalResult,
                };
              });
            }
          }
        });
    },
    [setFieldData, passCrossFieldMessage]
  );
  /**
   * End of validation Logic
   */

  const setTouched = useCallback(() => {
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
  }, [setFieldData]);
  const setValue = useCallback(
    (val: any, alwaysRun?: boolean) => {
      if (!!alwaysRun === false) {
        setFieldData((currVal) => {
          if (currVal.value === val) {
            return currVal;
          } else {
            return {
              ...currVal,
              value: val,
            };
          }
        });
      } else {
        setFieldData((currVal) => {
          return {
            ...currVal,
            value: val,
          };
        });
      }
    },
    [setFieldData]
  );
  const runValidation = useCallback(
    (mergeObj: any, alwaysRun?: boolean, touchAndValidate?: boolean) => {
      if (mergeObj) {
        handleValidation(
          { ...fieldDataRef.current, ...mergeObj },
          alwaysRun,
          touchAndValidate
        );
      } else {
        handleValidation(fieldDataRef.current, alwaysRun, touchAndValidate);
      }
    },
    []
  );

  //handleChange will be responsible for setting fieldValue when will be passed as a props to the
  //inputs, it can take event, date, number, string
  //It will run validation if validationRun == 'onChange'
  const handleChange = useCallback(
    (
      eventOrTextValue: React.ChangeEvent<any> | Date | string | number | any[]
    ) => {
      if (fieldDataRef.current !== null) {
        eventOrTextValue = eventOrTextValue ?? "";
        let val = eventOrTextValue;
        if (
          !(
            eventOrTextValue instanceof Date ||
            typeof eventOrTextValue === "string" ||
            typeof eventOrTextValue === "number" ||
            Array.isArray(eventOrTextValue)
          )
        ) {
          //Since React 17 we dont need this but commeting it incase any issues are faced
          // if (
          //   (eventOrTextValue as React.ChangeEvent<any>) &&
          //   (eventOrTextValue as React.ChangeEvent<any>).persist
          // ) {
          //   (eventOrTextValue as React.ChangeEvent<any>).persist();
          // }
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
        setValue(val);
        if (
          isValidationFnRef.current &&
          (whenToRunValidation.current === "onChange" ||
            whenToRunValidation.current === "all")
        ) {
          runValidation({ value: val });
        }
      }
    },
    [setValue, runValidation, formContext.validationRun]
  );

  //handleBlur will set touch property in field state to true for every field touched by user
  //It will run validation if validationRun == 'onBlur'
  const handleBlur = useCallback(async () => {
    if (fieldDataRef.current !== null) {
      setTouched();
      if (
        isValidationFnRef.current &&
        (whenToRunValidation.current === "onBlur" ||
          whenToRunValidation.current === "all")
      ) {
        runValidation({ touched: true });
      }
    }
  }, [setTouched, runValidation, formContext.validationRun]);

  return {
    ...fieldData,
    formName: formContext.formName,
    whenToRunValidation: whenToRunValidation.current,
    isSubmitting: formState.isSubmitting,
    handleChange,
    handleBlur,
    setTouched,
    setValue,
    runValidation,
    dependentValues: dependentFieldsState,
  };
};

//copied from formik

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

//Need to rethink this API - its too messy
function wrapValidationMethod(
  schemaValidation?: typeof ValidateFnType,
  validationFn?: typeof ValidateFnType,
  postValidationSetCrossFieldValuesFn?: typeof PostValidationSetCrossFieldValuesFnType,
  runPostValidationHookAlways?: boolean
) {
  if (
    typeof schemaValidation !== "function" &&
    typeof validationFn !== "function" &&
    typeof postValidationSetCrossFieldValuesFn !== "function"
  ) {
    return undefined;
  }
  const shouldRunAlways = Boolean(runPostValidationHookAlways);
  if (!shouldRunAlways) {
    const wrapperFunction = async (field: any) => {
      let errorMsg: any = null;
      let crossFieldMessages: InitialValuesType | null | undefined;
      if (typeof schemaValidation === "function") {
        errorMsg = await schemaValidation(field);
      }
      if (Boolean(errorMsg)) {
        return { error: errorMsg };
      }
      if (typeof validationFn === "function") {
        errorMsg = await validationFn(field);
      }
      if (Boolean(errorMsg)) {
        return { error: errorMsg };
      }
      if (typeof postValidationSetCrossFieldValuesFn === "function") {
        crossFieldMessages = await postValidationSetCrossFieldValuesFn(field);
        if (
          crossFieldMessages === null ||
          crossFieldMessages === undefined ||
          typeof crossFieldMessages !== "object"
        ) {
          crossFieldMessages = {};
        }
      }
      return { error: errorMsg, crossFieldMessages };
    };
    return wrapperFunction;
  } else {
    const wrapperFunctionAlways = async (field: any) => {
      let errorMsg: any = null;
      let crossFieldMessages: InitialValuesType | null | undefined;
      if (typeof postValidationSetCrossFieldValuesFn === "function") {
        crossFieldMessages = await postValidationSetCrossFieldValuesFn(field);
        if (
          crossFieldMessages === null ||
          crossFieldMessages === undefined ||
          typeof crossFieldMessages !== "object"
        ) {
          crossFieldMessages = {};
        }
      }
      if (typeof schemaValidation === "function") {
        errorMsg = await schemaValidation(field);
      }
      if (Boolean(errorMsg)) {
        return { error: errorMsg, crossFieldMessages };
      }
      if (typeof validationFn === "function") {
        errorMsg = await validationFn(field);
      }
      return { error: errorMsg, crossFieldMessages };
    };
    return wrapperFunctionAlways;
  }
}
