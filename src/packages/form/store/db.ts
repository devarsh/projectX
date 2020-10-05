import { openDB } from "idb";
import { RecoilFormsDB } from "./types";
import { FormFieldAtomSerializableType } from "../types";
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

  const setFormField = async (
    formFieldsAtom: FormFieldAtomSerializableType[],
    replace: boolean
  ) => {
    try {
      let tx = await (await db).transaction("formFieldAtom", "readwrite");
      let store = await tx.objectStore("formFieldAtom");
      let result = {};
      if (Boolean(replace) === false) {
        await store.get(formName);
        if (result === undefined) {
          result = {};
        }
      }
      for (const oneField of formFieldsAtom) {
        result[oneField.fieldKey] = oneField;
      }
      return await store.put(result, formName);
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
  const setFormArrayFieldRows = async (
    arrayField: FormArrayFieldRowsAtomType[],
    replace: boolean
  ) => {
    try {
      let tx = await (await db).transaction(
        "formArrayFieldRowsAtom",
        "readwrite"
      );
      let store = await tx.objectStore("formArrayFieldRowsAtom");
      let result = {};
      if (Boolean(replace) === false) {
        await store.get(formName);
        if (result === undefined) {
          result = {};
        }
      }
      for (const oneField of arrayField) {
        result[oneField.fieldName] = oneField;
      }
      return (await db).put("formArrayFieldRowsAtom", result, formName);
    } catch (e) {
      console.log(e);
    }
  };
  const getFormArrayFieldRows = async () => {
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
  const sanitizeStore = async () => {
    const fields = await getFormFields();
    const fieldsRegistry = await getFormFieldsRegistry();
    if (Array.isArray(fieldsRegistry) && typeof fields === "object") {
      const newFields = fieldsRegistry.map((one) => {
        return fields[one];
      });
      setFormField(newFields, true);
    }
    const arrayFieldsRegistry = await getFormArrayFieldsRegistry();
    const arrayFields = await getFormArrayFieldRows();
    if (Array.isArray(arrayFieldsRegistry) && typeof arrayFields === "object") {
      const newArrayFields = arrayFieldsRegistry.map((one) => {
        return arrayFields[one];
      });
      setFormArrayFieldRows(newArrayFields, true);
    }
  };

  return {
    setForm,
    getForm,
    setFormField,
    getFormFields,
    setFormFieldRegistry,
    getFormFieldsRegistry,
    setFormArrayFieldRows,
    getFormArrayFieldRows,
    setFormArrayFieldsRegistry,
    getFormArrayFieldsRegistry,
    clearFormStore,
    sanitizeStore,
  };
}
