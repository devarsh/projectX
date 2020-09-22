import React from "react";
import { useRecoilTransactionObserver_UNSTABLE, RecoilValue } from "recoil";
import {
  FormFieldAtomType,
  FormFieldRegistryAtomType,
  FormArrayFieldRowsAtomType,
  FormFeedbackAtomType,
} from "../types";
import { FormContext } from "../context";
import { atomKeys } from "../atoms";
import { StoreType, FieldType } from "./types";
import { inititateDb } from "./db";

export const AutoSaving = () => {
  const formContext = React.useContext(FormContext);
  const dbRef = React.useRef<null | StoreType>(null);
  React.useEffect(() => {
    const initDB = async () => {
      dbRef.current = await inititateDb(formContext.formName);
    };
    initDB();
  });

  useRecoilTransactionObserver_UNSTABLE(async ({ snapshot }) => {
    if (dbRef.current !== null) {
      //@ts-ignore
      const nodes: Iterable<RecoilValue<any>> = snapshot.getNodes_UNSTABLE({
        isModified: true,
      });
      const fieldsToBeUpdated: FieldType[] = [];
      for (const oneNode of nodes) {
        let node = snapshot.getLoadable(oneNode);
        if (node.state === "hasValue") {
          if (typeof node.contents === "object" && node.contents !== null) {
            if (oneNode.key.indexOf(atomKeys.formFieldAtom) > -1) {
              const myFieldAtom = node.contents as FormFieldAtomType;
              fieldsToBeUpdated.push({
                fieldKey: myFieldAtom.fieldKey,
                name: myFieldAtom.name,
                error: myFieldAtom.error,
                value: myFieldAtom.value,
                touched: myFieldAtom.touched,
              });
            } else if (
              oneNode.key.indexOf(atomKeys.formFieldRegistryAtom) > -1
            ) {
              const myFormFieldRegistry = node.contents as FormFieldRegistryAtomType;
              dbRef.current.setFormFieldRegistry(myFormFieldRegistry);
            } else if (
              oneNode.key.indexOf(atomKeys.formArrayFieldRowsAtom) > -1
            ) {
              const myFormArrayField = node.contents as FormArrayFieldRowsAtomType;
              dbRef.current.setArrayFields(myFormArrayField);
            } else if (oneNode.key.indexOf(atomKeys.formFeedbackAtom) > -1) {
              const myFormFeedback = node.contents as FormFeedbackAtomType;
              dbRef.current.setFormFeedBack(myFormFeedback);
            }
          }
        }
      }
      dbRef.current.setFormField(fieldsToBeUpdated);
    }
  });
  return null;
};
