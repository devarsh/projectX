import { atomFamily, selectorFamily, DefaultValue } from "recoil";

import {
  FormAtomType,
  FormFeedbackAtomType,
  FormFieldAtomType,
  FormFieldArrayRowsType,
  FormFieldRegisterSelectorAttributes,
} from "./types";

export const formAtom = atomFamily<FormAtomType, string>({
  key: "formAtom",
  default: {
    submitAttempt: 0,
    isSubmitting: false,
    submitSuccessful: false,
    validationRun: "onChange",
    resetFieldOnUnmount: true,
  },
});

export const formFeedbackAtom = atomFamily<FormFeedbackAtomType, string>({
  key: "formFeedbackAtom",
  default: {
    message: "",
    isError: false,
  },
});

export const formFieldAtom = atomFamily<FormFieldAtomType, string>({
  key: "formFieldAtom",
  default: (fieldKey) => ({
    fieldKey: fieldKey ?? "",
    name: fieldKey ?? "",
    value: "",
    touched: false,
    error: null,
    validationRunning: false,
    validate: null,
  }),
});

export const formArrayFieldRowsAtom = atomFamily<
  FormFieldArrayRowsType,
  string
>({
  key: "formArrayFieldRowsAtom",
  default: {
    templateFieldRows: [],
    lastInsertIndex: -1,
  },
  dangerouslyAllowMutability: true,
});

export const formArrayFieldResetCounterAtom = atomFamily<number, string>({
  key: "formArrayFieldResetCounter",
  default: 0,
});

export const formFieldRegistryAtom = atomFamily<string[], string>({
  key: "formFieldRegistryAtom",
  default: [],
});

export const formFieldRegisterSelector = selectorFamily<
  FormFieldRegisterSelectorAttributes,
  string
>({
  key: "formFieldRegisterSelector",
  set: (formName) => ({ set, get }, newValue) => {
    if (!(newValue instanceof DefaultValue)) {
      const fields = get(formFieldRegistryAtom(formName));
      const valueExists = fields.indexOf(newValue.fieldName) > -1;
      if (!valueExists) {
        const newFields = [...fields, newValue.fieldName];
        set(formFieldRegistryAtom(formName), newFields);
        if (newValue.defaultValue !== null) {
          set(formFieldAtom(newValue.fieldName), (prev) => ({
            ...prev,
            value: newValue.defaultValue,
          }));
        }
      }
    }
  },
  get: (_) => () => {
    return { defaultValue: "", fieldName: "" };
  },
});

export const formFieldUnregisterSelector = selectorFamily<string, string>({
  key: "fieldRegisteryRemove",
  set: (formName) => ({ set, get, reset }, newValue) => {
    if (!(newValue instanceof DefaultValue)) {
      const fields = get(formFieldRegistryAtom(formName));
      const index = fields.indexOf(newValue);
      if (index > -1) {
        reset(formFieldAtom(newValue));
        const newFields = [
          ...fields.slice(0, index),
          ...fields.slice(index + 1),
        ];
        set(formFieldRegistryAtom(formName), newFields);
      }
    }
  },
  get: (_) => () => {
    return "";
  },
});

export const subscribeToFormFieldsSelector = selectorFamily<
  FormFieldAtomType[],
  string[] | undefined
>({
  key: "subscribeToFormFields",
  get: (fields = []) => ({ get }) => {
    if (!Array.isArray(fields)) {
      fields = [fields];
    }
    let fieldValues: FormFieldAtomType[] = [];
    for (let field of fields) {
      if (typeof field === "string" && field !== "") {
        let fieldState = get(formFieldAtom(field));
        fieldValues.push(fieldState);
      }
    }
    return fieldValues;
  },
});
