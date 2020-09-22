import { openDB } from "idb";
import { RecoilFormsDB, FieldType } from "./types";
import {
  FormArrayFieldRowsAtomType,
  FormFieldRegistryAtomType,
  FormFeedbackAtomType,
} from "../types";

export async function inititateDb(formName: string) {
  const db = openDB<RecoilFormsDB>("recoilFormsDB", 1, {
    upgrade(dbInst, _, newVersion) {
      switch (newVersion) {
        case 1:
          dbInst.createObjectStore("persistance");
          dbInst.createObjectStore("formfields");
          dbInst.createObjectStore("formFieldsRegistry");
          dbInst.createObjectStore("arrayFields");
          dbInst.createObjectStore("formFeedback");
      }
    },
  });

  const setFormField = async (formFields: FieldType[]) => {
    try {
      let tx = await (await db).transaction("formfields", "readwrite");
      let store = await tx.objectStore("formfields");
      let result = await store.get(formName);
      if (result === undefined) {
        result = {};
      }
      for (const oneField of formFields) {
        result[oneField.fieldKey] = oneField;
      }
      await store.put(result, formName);
    } catch (e) {
      console.log(e);
    }
  };

  const getFormFields = async () => {
    return (await db).get("formfields", formName);
  };

  const setFormFeedBack = async (formFeedBack: FormFeedbackAtomType) => {
    return (await db).put("formFeedback", formFeedBack, formName);
  };

  const getFormFeedBack = async () => {
    return (await db).get("formFeedback", formName);
  };

  const setFormName = async () => {
    return (await db).put("persistance", true, formName);
  };

  const setFormFieldRegistry = async (
    formFields: FormFieldRegistryAtomType
  ) => {
    return (await db).put("formFieldsRegistry", formFields, formName);
  };
  const getFormFieldsRegistry = async () => {
    return (await db).get("formFieldsRegistry", formName);
  };
  const setArrayFields = async (arrayField: FormArrayFieldRowsAtomType) => {
    return (await db).put("arrayFields", arrayField, formName);
  };
  const getArrayFields = async () => {
    return (await db).get("arrayFields", formName);
  };
  const clearFormStore = async () => {
    await (await db).delete("persistance", formName);
    await (await db).delete("formfields", formName);
    await (await db).delete("formFieldsRegistry", formName);
    await (await db).delete("arrayFields", formName);
  };

  return {
    setFormName,
    setFormField,
    setFormFeedBack,
    getFormFeedBack,
    getFormFields,
    setFormFieldRegistry,
    getFormFieldsRegistry,
    setArrayFields,
    getArrayFields,
    clearFormStore,
  };
}
