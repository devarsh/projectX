import { useRecoilCallback, useRecoilValue } from "recoil";
import { form, formFeedback, formField, fieldRegistry } from "./atoms";
import { setIn, handleValidation } from "./util";

export const useForm = (onSubmit) => {
  const startSubmit = useRecoilCallback(({ snapshot, set }) => () => {
    const formState = snapshot.getLoadable(form).contents;
    set(form, {
      ...formState,
      isSubmitting: true,
      submitAttempt: formState.submitAttempt + 1,
    });
  });
  const endSubmit = useRecoilCallback(
    ({ snapshot, set }) => (submitSuccessful = false, message = "") => {
      const formState = snapshot.getLoadable(form).contents;
      set(form, {
        ...formState,
        isSubmitting: false,
        submitSuccessful,
      });
      set(formFeedback, { message, isError: !submitSuccessful });
    }
  );
  const setFieldErrors = useRecoilCallback(
    ({ snapshot, set }) => (fieldsErrorObj = {}) => {
      for (const field of Object.entries(fieldsErrorObj)) {
        const fieldState = snapshot.getLoadable(formField(field[0])).contents;
        set(formField(field[0]), { ...fieldState, error: field[1] });
      }
    }
  );

  const handleSubmit = useRecoilCallback(({ snapshot, set }) => async (e) => {
    e.preventDefault();
    const fields = snapshot.getLoadable(fieldRegistry).contents;
    const fieldsAggrigator = [];
    let hasError = false;

    for (const field of fields) {
      const _fieldState = snapshot.getLoadable(formField(field)).contents;
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
        hasError = (result ?? "") !== "" ? true : false;
        const newValue = {
          ...fieldState,
          touched: true,
          error: result,
        };
        fieldsAggrigator.push(newValue);
        set(formField(field), newValue);
      } else {
        fieldsAggrigator.push(fieldState);
        hasError = (fieldState.error ?? "") !== "" ? true : false;
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
  });

  return { handleSubmit };
};

export const useFormFeedback = () => {
  const formFeedBackState = useRecoilValue(formFeedback);
  return formFeedBackState;
};
