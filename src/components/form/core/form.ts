import { useRecoilCallback, useRecoilValue } from "recoil";
import { form, formFeedback, formField, fieldRegistry } from "./atoms";
import { setIn, handleValidation } from "./util";
import { FieldsErrorObj, SubmitFn, FormFieldAtom } from "./types";

export const useForm = (onSubmit: SubmitFn) => {
  const startSubmit = useRecoilCallback(({ snapshot, set }) => () => {
    const lodableFormState = snapshot.getLoadable(form);
    if (lodableFormState.state === "hasValue") {
      const value = lodableFormState.contents;
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
      const lodableFormState = snapshot.getLoadable(form);
      if (lodableFormState.state === "hasValue") {
        const value = lodableFormState.contents;
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
        const lodableFieldState = snapshot.getLoadable(formField(field[0]));
        if (lodableFieldState.state === "hasValue") {
          const value = lodableFieldState.contents;
          set(formField(field[0]), { ...value, error: field[1] });
        }
      }
    }
  );

  const handleSubmit = useRecoilCallback(
    ({ snapshot, set }) => async (e: React.FormEvent<HTMLInputElement>) => {
      e.preventDefault();
      const lodableFields = snapshot.getLoadable(fieldRegistry);
      if (lodableFields.state === "hasValue") {
        const fields = lodableFields.contents;
        const fieldsAggrigator: FormFieldAtom[] = [];
        let hasError = false;
        for (const field of fields) {
          const lodableFieldState = snapshot.getLoadable(formField(field));
          if (lodableFieldState.state === "hasValue") {
            const _fieldState = lodableFieldState.contents;
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
              obj = setIn(obj, field.name, field.value);
            }
            onSubmit(obj, startSubmit, endSubmit, setFieldErrors);
          }
        }
      }
    }
  );
  return { handleSubmit };
};

export const useFormFeedback = () => {
  const formFeedBackState = useRecoilValue(formFeedback);
  return formFeedBackState;
};
