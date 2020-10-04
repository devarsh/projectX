import { openDB } from "idb";
import { RecoilFormsDB, FieldType } from "./types";
import {
  FormArrayFieldRowsAtomType,
  FormAtomType,
  FormFieldRegistryAtomType,
} from "../types";

export async function initiateDB(formName: string) {
  const db = openDB<RecoilFormsDB>("recoilFormsDB", 1, {
    upgrade(dbInst, _, newVersion) {
      switch (newVersion) {
        case 1:
          dbInst.createObjectStore("formAtom");
          dbInst.createObjectStore("formFieldAtom");
          dbInst.createObjectStore("formFieldRegistryAtom");
          dbInst.createObjectStore("formArrayFieldRowsAtom");
          dbInst.createObjectStore("formArrayFieldRegistryAtom");
      }
    },
  });

  const setForm = async (formAtom: FormAtomType) => {
    return (await db).put("formAtom", formAtom, formName);
  };
  const getForm = async () => {
    return (await db).get("formAtom", formName);
  };

  const setFormField = async (formFieldsAtom: FieldType[]) => {
    try {
      let tx = await (await db).transaction("formFieldAtom", "readwrite");
      let store = await tx.objectStore("formFieldAtom");
      let result = await store.get(formName);
      if (result === undefined) {
        result = {};
      }
      for (const oneField of formFieldsAtom) {
        result[oneField.fieldKey] = oneField;
      }
      await store.put(result, formName);
    } catch (e) {
      console.log(e);
    }
  };

  const getFormFields = async () => {
    return (await db).get("formFieldAtom", formName);
  };

  const setFormFieldRegistry = async (
    formFields: FormFieldRegistryAtomType
  ) => {
    return (await db).put("formFieldRegistryAtom", formFields, formName);
  };
  const getFormFieldsRegistry = async () => {
    return (await db).get("formFieldRegistryAtom", formName);
  };
  const setFormArrayFields = async (arrayField: FormArrayFieldRowsAtomType) => {
    return (await db).put("formArrayFieldRowsAtom", arrayField, formName);
  };
  const getFormArrayFields = async () => {
    return (await db).get("formArrayFieldRowsAtom", formName);
  };
  const setFormArrayFieldsRegistry = async (formArrayFields: string[]) => {
    return (await db).put(
      "formArrayFieldRegistryAtom",
      formArrayFields,
      formName
    );
  };

  const getFormArrayFieldsRegistry = async () => {
    return (await db).get("formArrayFieldRegistryAtom", formName);
  };
  const clearFormStore = async () => {
    await (await db).delete("formAtom", formName);
    await (await db).delete("formFieldAtom", formName);
    await (await db).delete("formFieldRegistryAtom", formName);
    await (await db).delete("formArrayFieldRowsAtom", formName);
    await (await db).delete("formArrayFieldRegistryAtom", formName);
  };

  return {
    setForm,
    getForm,
    setFormField,
    getFormFields,
    setFormFieldRegistry,
    getFormFieldsRegistry,
    setFormArrayFields,
    getFormArrayFields,
    setFormArrayFieldsRegistry,
    getFormArrayFieldsRegistry,
    clearFormStore,
  };
}
