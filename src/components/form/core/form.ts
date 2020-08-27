import { useRecoilCallback, useRecoilValue } from "recoil";
import { form, formFeedback, formField, fieldRegistry } from "./atoms";
import { setIn, handleValidation } from "./util";
import { FieldsErrorObj, SubmitFn, FormFieldAtom } from "./types";

export const useForm = (
  onSubmit: SubmitFn,
  onReset: () => void | undefined
) => {
  const startSubmit = useRecoilCallback(({ snapshot, set }) => () => {
    const loadableFormState = snapshot.getLoadable(form);
    if (loadableFormState.state === "hasValue") {
      const value = loadableFormState.contents;
      set(form, {
        ...value,
        isSubmitting: true,
        submitAttempt: value.submitAttempt + 1,
      });
    }
  });
  const endSubmit = useRecoilCallback(
    ({ snapshot, set }) => (
      submitSuccessful: boolean = false,
      message: string = ""
    ) => {
      const loadableFormState = snapshot.getLoadable(form);
      if (loadableFormState.state === "hasValue") {
        const value = loadableFormState.contents;
        set(form, {
          ...value,
          isSubmitting: false,
          submitSuccessful,
        });
        set(formFeedback, { message, isError: !submitSuccessful });
      }
    }
  );
  const setFieldErrors = useRecoilCallback(
    ({ snapshot, set }) => (fieldsErrorObj: FieldsErrorObj = {}) => {
      for (const field of Object.entries(fieldsErrorObj)) {
        const loadableFieldState = snapshot.getLoadable(formField(field[0]));
        if (loadableFieldState.state === "hasValue") {
          const value = loadableFieldState.contents;
          set(formField(field[0]), { ...value, error: field[1] });
          if (typeof onReset === "function") {
            onReset();
          }
        }
      }
    }
  );

  const handleReset = useRecoilCallback(
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
              let result;
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
              obj = setIn(obj, field.arrayFieldName, field.value);
            }
            onSubmit(obj, startSubmit, endSubmit, setFieldErrors);
          }
        }
      }
    }
  );
  return { handleSubmit, handleReset };
};

export const useFormFeedback = () => {
  const formFeedBackState = useRecoilValue(formFeedback);
  return formFeedBackState;
};
