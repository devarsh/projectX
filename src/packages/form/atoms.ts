import { atomFamily, atom, selectorFamily, DefaultValue } from "recoil";

import {
  FormAtomType,
  FormFeedbackAtom,
  FormFieldAtom,
  InititalValuesVer,
} from "./types";

export const form = atomFamily<FormAtomType, string>({
  key: "form",
  default: {
    submitAttempt: 0,
    isSubmitting: false,
    submitSuccessful: false,
    validationRun: "onBlur",
    resetFieldOnUnmount: true,
  },
});

export const initialValuesAtom = atomFamily<InititalValuesVer, string>({
  key: "initialValuesAtom",
  default: {
    initialValues: {},
    version: 0,
  },
});

export const formFeedback = atomFamily<FormFeedbackAtom, string>({
  key: "formFeedback",
  default: {
    message: "",
    isError: false,
  },
});

export const formField = atomFamily<FormFieldAtom, string>({
  key: "formField",
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

export const fieldRegistry = atomFamily<string[], string>({
  key: "fieldRegistry",
  default: [],
});

export const fieldRegisteryAdd = selectorFamily<string, string>({
  key: "fieldRegisteryAdd",
  set: (formName) => ({ set, get }, newValue) => {
    if (!(newValue instanceof DefaultValue)) {
      const fields = get(fieldRegistry(formName));
      const valueExists = fields.indexOf(newValue) > -1;
      if (!valueExists) {
        const newFields = [...fields, newValue];
        set(fieldRegistry(formName), newFields);
      }
    }
  },
  get: (formName) => () => {
    return "";
  },
});

export const fieldRegisteryRemove = selectorFamily<string, string>({
  key: "fieldRegisteryRemove",
  set: (formName) => ({ set, get, reset }, newValue) => {
    if (!(newValue instanceof DefaultValue)) {
      const fields = get(fieldRegistry(formName));
      const index = fields.indexOf(newValue);
      if (index > -1) {
        reset(formField(newValue));
        const newFields = [
          ...fields.slice(0, index),
          ...fields.slice(index + 1),
        ];
        set(fieldRegistry(formName), newFields);
      }
    }
  },
  get: (formName) => () => {
    return "";
  },
});

export const subscribeToFormFields = selectorFamily<
  FormFieldAtom[],
  string[] | undefined
>({
  key: "subscribeToFormFields",
  get: (fields = []) => ({ get }) => {
    if (!Array.isArray(fields)) {
      fields = [fields];
    }
    let fieldValues: FormFieldAtom[] = [];
    for (let field of fields) {
      if (typeof field === "string" && field !== "") {
        let fieldState = get(formField(field));
        fieldValues.push(fieldState);
      }
    }
    return fieldValues;
  },
});
