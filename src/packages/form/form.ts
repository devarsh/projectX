import React from "react";
import { useRecoilCallback, useRecoilValue } from "recoil";
import {
  form,
  formFeedback,
  formField,
  fieldRegistry,
  initialValuesAtom,
} from "./atoms";
import { setIn, getIn, handleValidation } from "./util";
import {
  FieldsErrorObj,
  FormFieldAtom,
  InititalValues,
  FormProps,
} from "./types";
import { FormNameContext } from "./context";

export const useForm = ({ onSubmit, inititalValues }: FormProps) => {
  //Set Initital Values in Ref for performance
  const initialValuesRef = React.useRef<InititalValues | undefined>(
    inititalValues
  );
  const formName = React.useContext<string>(FormNameContext);

  const formState = useRecoilValue(form(formName));
  const setInitValues = React.useCallback(
    useRecoilCallback(
      ({ set, snapshot }) => (initValues: InititalValues | undefined) => {
        if (initValues !== undefined && typeof initValues === "object") {
          const loadableFields = snapshot.getLoadable(fieldRegistry(formName));
          if (loadableFields.state === "hasValue") {
            const fields = loadableFields.contents;
            for (const field of fields) {
              const trimFormNameFromFieldName = field.replace(
                `${formName}/`,
                ""
              );
              let defaultValue = getIn(
                initValues,
                trimFormNameFromFieldName,
                ""
              );
              defaultValue = defaultValue === initValues ? "" : defaultValue;
              set(formField(field), (currVal) => ({
                ...currVal,
                touched: false,
                value: defaultValue,
                error: "",
                validationRunning: false,
              }));
            }
          }
          set(initialValuesAtom(formName), (oldValues) => ({
            initialValues: initValues,
            version: oldValues.version + 1,
          }));
        }
      }
    ),
    []
  );
  const startSubmit = React.useCallback(
    useRecoilCallback(({ set }) => () => {
      set(form(formName), (currVal) => ({
        ...currVal,
        isSubmitting: true,
        submitAttempt: currVal.submitAttempt + 1,
      }));
    }),
    []
  );

  const endSubmit = React.useCallback(
    useRecoilCallback(
      ({ set }) => (
        submitSuccessful: boolean = false,
        message: string = ""
      ) => {
        set(form(formName), (currVal) => ({
          ...currVal,
          isSubmitting: false,
          submitSuccessful,
        }));
        set(formFeedback(formName), { message, isError: !submitSuccessful });
      }
    ),
    []
  );
  const setFieldErrors = React.useCallback(
    useRecoilCallback(({ set }) => (fieldsErrorObj: FieldsErrorObj = {}) => {
      for (const field of Object.entries(fieldsErrorObj)) {
        const [fieldName, error] = field;
        set(formField(fieldName), (currVal) => ({ ...currVal, error: error }));
      }
    }),
    []
  );
  const handleClear = React.useCallback(
    useRecoilCallback(
      ({ snapshot, set }) => (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        const loadableFields = snapshot.getLoadable(fieldRegistry(formName));
        if (loadableFields.state === "hasValue") {
          const fields = loadableFields.contents;
          for (const field of fields) {
            set(formField(field), (currVal) => ({
              ...currVal,
              touched: false,
              value: "",
              error: "",
              validationRunning: false,
            }));
          }
        }
      }
    ),
    []
  );

  const handleReset = React.useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      e.preventDefault();
      setInitValues(initialValuesRef.current);
    },
    [setInitValues]
  );

  const handleSubmit = React.useCallback(
    useRecoilCallback(({ snapshot, set }) => (e: React.FormEvent<any>) => {
      const _handleSubmit = async (e: React.FormEvent<any>) => {
        const loadableFields = snapshot.getLoadable(fieldRegistry(formName));
        if (loadableFields.state === "hasValue") {
          const fields = loadableFields.contents;
          const fieldsAggrigator: FormFieldAtom[] = [];
          let hasError = false;
          for (const field of fields) {
            const loadableFieldState = snapshot.getLoadable(formField(field));
            if (loadableFieldState.state === "hasValue") {
              const _fieldState = loadableFieldState.contents;
              const fieldState = { ..._fieldState };
              if (!fieldState.touched) {
                fieldState.validate =
                  typeof fieldState.validate === "function"
                    ? fieldState.validate
                    : () => null;
                let result: any;
                try {
                  result = await Promise.resolve(
                    handleValidation(fieldState, () => {})
                  );
                } catch (e) {
                  result = e.message;
                }
                if (hasError === false) {
                  hasError = (result ?? "") !== "" ? true : false;
                }
                const newValue = {
                  ...fieldState,
                  touched: true,
                  error: result,
                };
                fieldsAggrigator.push(newValue);
                set(formField(field), newValue);
              } else {
                fieldsAggrigator.push(fieldState);
                if (hasError === false) {
                  hasError = (fieldState.error ?? "") !== "" ? true : false;
                }
              }
            }
          }
          //if form has no errors would procced with submitting the form
          if (!hasError) {
            if (typeof onSubmit === "function") {
              let obj = {};
              for (const field of fieldsAggrigator) {
                obj = setIn(obj, field.name, field.value);
              }
              onSubmit(obj, startSubmit, endSubmit, setFieldErrors);
            }
          }
        }
      };
      e.preventDefault();
      _handleSubmit(e);
    }),
    []
  );
  //Init Form with initital values
  React.useEffect(() => {
    setTimeout(() => setInitValues(initialValuesRef.current), 0);
  }, [setInitValues]);
  return { handleSubmit, handleReset, handleClear, ...formState };
};

export const useFormFeedback = () => {
  const formName = React.useContext<string>(FormNameContext);
  const formFeedBackState = useRecoilValue(formFeedback(formName));
  return formFeedBackState;
};
