import React from "react";
import { useRecoilCallback, useRecoilValue } from "recoil";
import {
  formAtom,
  formFieldAtom,
  formFieldRegistryAtom,
  formArrayFieldRowsAtom,
  formArrayFieldRegistryAtom,
} from "./atoms";
import { setIn, getIn } from "./util";
import {
  FieldsErrorObjType,
  FormFieldAtomType,
  InitialValuesType,
  UseFormHookProps,
} from "./types";
import { FormContext } from "./context";

export const useForm = ({ onSubmit }: UseFormHookProps) => {
  const formContext = React.useContext(FormContext);

  const formState = useRecoilValue(formAtom(formContext.formName));

  const setInitValues = React.useCallback(
    useRecoilCallback(
      ({ set, snapshot }) => (initValues: InitialValuesType) => {
        const loadableFields = snapshot.getLoadable(
          formFieldRegistryAtom(formContext.formName)
        );
        if (loadableFields.state === "hasValue") {
          const fields = loadableFields.contents;

          for (const field of fields) {
            const trimFormNameFromFieldName = field.replace(
              `${formContext.formName}/`,
              ""
            );
            let defaultValue =
              typeof initValues === "object"
                ? getIn(initValues, trimFormNameFromFieldName, "")
                : "";
            set(formFieldAtom(field), (currVal) => ({
              ...currVal,
              touched: false,
              value: defaultValue,
              error: "",
              validationRunning: false,
            }));
          }
          //Inititalize ArrayField
          const loadableArrayFields = snapshot.getLoadable(
            formArrayFieldRegistryAtom(formContext.formName)
          );
          if (loadableArrayFields.state === "hasValue") {
            const arrayFields = loadableArrayFields.contents;
            for (const arrayField of arrayFields) {
              set(formArrayFieldRowsAtom(arrayField), (old) => ({
                ...old,
                resetFlag: true,
              }));
            }
          }
        }
      }
    ),
    []
  );

  const startSubmit = React.useCallback(
    useRecoilCallback(({ set }) => () => {
      set(formAtom(formContext.formName), (currVal) => ({
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
        set(formAtom(formContext.formName), (currVal) => ({
          ...currVal,
          isSubmitting: false,
          submitSuccessful,
          serverSentError: message,
        }));
      }
    ),
    []
  );
  //need to change this to pass arrayField errors to respective arrayField
  //Todo: loop to registered field and grab errors from the object and set the same.
  const setFieldErrors = React.useCallback(
    useRecoilCallback(
      ({ set }) => (fieldsErrorObj: FieldsErrorObjType = {}) => {
        for (const field of Object.entries(fieldsErrorObj)) {
          const [fieldName, error] = field;
          set(
            formFieldAtom(`${formContext.formName}/${fieldName}`),
            (currVal) => ({
              ...currVal,
              error: error,
            })
          );
        }
      }
    ),
    []
  );
  const handleClear = React.useCallback(
    useRecoilCallback(
      ({ snapshot, set }) => (e: React.FormEvent<any> | any) => {
        e?.preventDefault?.();
        const loadableFields = snapshot.getLoadable(
          formFieldRegistryAtom(formContext.formName)
        );
        if (loadableFields.state === "hasValue") {
          const fields = loadableFields.contents;
          for (const field of fields) {
            set(formFieldAtom(field), (currVal) => ({
              ...currVal,
              touched: false,
              value: "",
              error: "",
              validationRunning: false,
            }));
          }
        }
        const loadableArrayFields = snapshot.getLoadable(
          formArrayFieldRegistryAtom(formContext.formName)
        );
        if (loadableArrayFields.state === "hasValue") {
          const arrayFields = loadableArrayFields.contents;
          for (const arrayField of arrayFields) {
            set(formArrayFieldRowsAtom(arrayField), (old) => ({
              ...old,
              resetFlag: false,
              templateFieldRows: [],
              lastInsertIndex: -1,
            }));
          }
        }
      }
    ),
    []
  );

  const handleReset = React.useCallback(
    (e: React.FormEvent<any>) => {
      e.preventDefault();
      if (
        typeof formContext.initialValues === "object" &&
        Object.keys(formContext.initialValues).length > 0
      ) {
        setInitValues(formContext.initialValues);
      } else {
        handleClear(null);
      }
    },
    [setInitValues, handleClear, formContext.initialValues]
  );

  const handleSubmit = React.useCallback(
    useRecoilCallback(({ snapshot, set }) => (e: React.FormEvent<any>) => {
      const _handleSubmit = async (e: React.FormEvent<any>) => {
        const loadableFields = snapshot.getLoadable(
          formFieldRegistryAtom(formContext.formName)
        );
        if (loadableFields.state === "hasValue") {
          const fields = loadableFields.contents;
          const fieldsAggrigator: FormFieldAtomType[] = [];
          let hasError = false;
          for (const field of fields) {
            const loadableFieldState = snapshot.getLoadable(
              formFieldAtom(field)
            );
            if (loadableFieldState.state === "hasValue") {
              const _fieldState = loadableFieldState.contents;
              const fieldState = { ..._fieldState };
              if (!fieldState.touched || fieldState.validationRunning) {
                const customValidator =
                  typeof fieldState.validate === "function"
                    ? fieldState.validate
                    : async (data: FormFieldAtomType) => data.error;
                let result: any;
                try {
                  result = await Promise.resolve(customValidator(fieldState));
                } catch (e) {
                  result = e.message;
                }
                if (hasError === false) {
                  hasError = Boolean(result);
                }
                const newValue = {
                  ...fieldState,
                  touched: true,
                  error: result,
                };
                fieldsAggrigator.push(newValue);
                set(formFieldAtom(field), newValue);
              } else {
                fieldsAggrigator.push(fieldState);
                if (hasError === false) {
                  hasError = Boolean(fieldState.error);
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
              onSubmit(obj, endSubmit, setFieldErrors);
            }
          } else {
            endSubmit(false);
          }
        }
      };
      e.preventDefault();
      startSubmit();
      _handleSubmit(e);
    }),
    []
  );

  return { handleSubmit, handleReset, handleClear, ...formState };
};
