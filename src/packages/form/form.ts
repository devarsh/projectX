import React from "react";
import { useRecoilCallback, useRecoilValue } from "recoil";
import { form, formFeedback, formField, fieldRegistry } from "./atoms";
import { setIn, handleValidation } from "./util";
import {
  FieldsErrorObj,
  SubmitFn,
  FormFieldAtom,
  InititalValues,
} from "./types";

export const useForm = (
  onSubmit: SubmitFn,
  inititalValues: InititalValues | undefined
) => {
  //Init Form with initital values
  React.useEffect(() => {
    setInitValues(inititalValues);
  }, []);
  const setInitValues = useRecoilCallback(
    ({ set }) => (initValues: InititalValues | undefined) => {
      if (initValues !== undefined && typeof initValues === "object") {
        set(form, (currVal) => ({
          ...currVal,
          inititalValues: initValues,
        }));
      }
    }
  );
  const fireInitValues = useRecoilCallback(
    ({ set }) => (initValues: InititalValues | undefined) => {
      if (initValues !== undefined && typeof initValues === "object") {
        set(form, (currVal) => ({
          ...currVal,
          resetFlagForInitValues: currVal.resetFlagForInitValues++,
        }));
      }
    }
  );
  const startSubmit = useRecoilCallback(({ set }) => () => {
    set(form, (currVal) => ({
      ...currVal,
      isSubmitting: true,
      submitAttempt: currVal.submitAttempt + 1,
    }));
  });

  const endSubmit = useRecoilCallback(
    ({ set }) => (submitSuccessful: boolean = false, message: string = "") => {
      set(form, (currVal) => ({
        ...currVal,
        isSubmitting: false,
        submitSuccessful,
      }));
      set(formFeedback, { message, isError: !submitSuccessful });
    }
  );
  const setFieldErrors = useRecoilCallback(
    ({ set }) => (fieldsErrorObj: FieldsErrorObj = {}) => {
      for (const field of Object.entries(fieldsErrorObj)) {
        const [fieldName, error] = field;
        set(formField(fieldName), (currVal) => ({ ...currVal, error: error }));
      }
    }
  );
  const handleClear = useRecoilCallback(
    ({ snapshot, reset }) => (e: React.FormEvent<HTMLInputElement>) => {
      e.preventDefault();
      const loadableFields = snapshot.getLoadable(fieldRegistry);
      if (loadableFields.state === "hasValue") {
        const fields = loadableFields.contents;
        for (const field of fields) {
          reset(formField(field));
        }
      }
    }
  );

  const handleReset = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    fireInitValues(inititalValues);
  };

  const handleSubmit = useRecoilCallback(
    ({ snapshot, set }) => async (e: React.FormEvent<HTMLInputElement>) => {
      e.preventDefault();
      const loadableFields = snapshot.getLoadable(fieldRegistry);
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
    }
  );
  return { handleSubmit, handleReset, handleClear };
};

export const useFormFeedback = () => {
  const formFeedBackState = useRecoilValue(formFeedback);
  return formFeedBackState;
};
