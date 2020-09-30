import { atomFamily, selectorFamily, DefaultValue } from "recoil";

import {
  FormAtomType,
  FormFieldAtomType,
  FormArrayFieldRowsAtomType,
  FormFieldRegisterSelectorAttributes,
  FormFieldRegistryAtomType,
} from "./types";

export const atomKeys = {
  formAtom: "formAtom",
  formFieldAtom: "formFieldAtom",
  formArrayFieldRowsAtom: "formArrayFieldRowsAtom",
  formArrayFieldRegistryAtom: "formArrayFieldRegistryAtom",
  formFieldRegistryAtom: "formFieldRegistryAtom",
  formFieldRegisterSelector: "formFieldRegisterSelector",
  formFieldUnregisterSelector: "formFieldUnregisterSelector",
  formArrayFieldRegisterSelector: "formArrayFieldRegisterSelector",
  formArrayFieldUnregisterSelector: "formArrayFieldUnregisterSelector",
  subscribeToFormFieldsSelector: "subscribeToFormFieldsSelector",
};

export const formAtom = atomFamily<FormAtomType, string>({
  key: atomKeys.formAtom,
  default: {
    submitAttempt: 0,
    isSubmitting: false,
    submitSuccessful: false,
    serverSentError: "",
  },
});

export const formFieldAtom = atomFamily<FormFieldAtomType, string>({
  key: atomKeys.formFieldAtom,
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
  FormArrayFieldRowsAtomType,
  string
>({
  key: atomKeys.formArrayFieldRowsAtom,
  default: {
    templateFieldRows: [],
    lastInsertIndex: -1,
    resetFlag: true, //always make sure its true, its tied to fieldArray inititalization
  },
  dangerouslyAllowMutability: true,
});

export const formArrayFieldRegistryAtom = atomFamily<string[], string>({
  key: atomKeys.formArrayFieldRegistryAtom,
  default: [],
});

export const formArrayFieldRegisterSelector = selectorFamily<string, string>({
  key: atomKeys.formArrayFieldRegisterSelector,
  set: (formName) => ({ set, get }, newValue) => {
    if (!(newValue instanceof DefaultValue)) {
      const fields = get(formArrayFieldRegistryAtom(formName));
      const valueExists = fields.indexOf(newValue) > -1;
      if (!valueExists) {
        const newFields = [...fields, newValue];
        set(formArrayFieldRegistryAtom(formName), newFields);
      }
    }
  },
  get: (_) => () => {
    return "";
  },
});

export const formArrayFieldUnregisterSelector = selectorFamily<string, string>({
  key: atomKeys.formArrayFieldUnregisterSelector,
  set: (formName) => ({ set, get, reset }, newValue) => {
    if (!(newValue instanceof DefaultValue)) {
      const fields = get(formArrayFieldRegistryAtom(formName));
      const index = fields.indexOf(newValue);
      if (index > -1) {
        reset(formArrayFieldRegistryAtom(newValue));
        const newFields = [
          ...fields.slice(0, index),
          ...fields.slice(index + 1),
        ];
        set(formArrayFieldRegistryAtom(formName), newFields);
      }
    }
  },
  get: (_) => () => {
    return "";
  },
});

export const formFieldRegistryAtom = atomFamily<
  FormFieldRegistryAtomType,
  string
>({
  key: atomKeys.formFieldRegistryAtom,
  default: [],
});

export const formFieldRegisterSelector = selectorFamily<
  FormFieldRegisterSelectorAttributes,
  string
>({
  key: atomKeys.formFieldRegisterSelector,
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
  key: atomKeys.formFieldUnregisterSelector,
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
  key: atomKeys.subscribeToFormFieldsSelector,
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
