import { atomFamily, atom, selector, selectorFamily } from "recoil";

import { FormAtomType, FormFeedbackAtom, FormFieldAtom } from "./types";

export const form = atom<FormAtomType>({
  key: "form",
  default: {
    submitAttempt: 0,
    isSubmitting: false,
    validationRun: "onBlur",
    submitSuccessful: false,
  },
});

export const formFeedback = atom<FormFeedbackAtom>({
  key: "formFeedback",
  default: {
    message: "",
    isError: false,
  },
});

export const formField = atomFamily<FormFieldAtom, string>({
  key: "formField",
  default: (name) => ({
    name: name ?? "",
    value: "",
    touched: false,
    error: null,
    validationRunning: false,
    validate: null,
    arrayFieldName: name ?? "",
  }),
});

export const fieldRegistry = atom<string[]>({
  key: "fieldRegistry",
  default: [],
});

export const fieldRegisteryAdd = selector<string>({
  key: "fieldRegisteryAdd",
  set: ({ set, get }, newValue) => {
    if (typeof newValue !== "string") return;
    const fields = get(fieldRegistry);
    const valueExists = fields.indexOf(newValue) > -1;
    if (!valueExists) {
      const newFields = [...fields, newValue];
      set(fieldRegistry, newFields);
    }
  },
  get: ({ get }) => {
    return "";
  },
});

export const fieldRegisteryRemove = selector<string>({
  key: "fieldRegisteryRemove",
  set: ({ set, get, reset }, newValue) => {
    if (typeof newValue !== "string") return;
    const fields = get(fieldRegistry);
    const index = fields.indexOf(newValue);
    if (index > -1) {
      reset(formField(newValue));
      const newFields = [...fields.slice(0, index), ...fields.slice(index + 1)];
      set(fieldRegistry, newFields);
    }
  },
  get: ({ get }) => {
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
    let fieldValues = [];
    for (let field of fields) {
      if (typeof field === "string" && field !== "") {
        let fieldState = get(formField(field));
        fieldValues.push(fieldState);
      }
    }
    return fieldValues;
  },
});
