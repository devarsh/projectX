import React from "react";
import { useRecoilTransactionObserver_UNSTABLE, RecoilValue } from "recoil";
import {
  FormAtomType,
  FormFieldAtomType,
  FormFieldRegistryAtomType,
  FormArrayFieldRowsAtomType,
} from "../types";
import { FormContext } from "../context";
import { atomKeys } from "../atoms";
import { FieldType, StoreType } from "./types";
import { initiateDB } from "./db";

export const AutoSaving = () => {
  const formContext = React.useContext(FormContext);
  const dbRef = React.useRef<StoreType | null>(null);
  React.useEffect(() => {
    const initDB = async () => {
      dbRef.current = await initiateDB(formContext.formName);
    };
    initDB();
  }, [formContext.formName]);

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
          switch (oneNode.key) {
            case atomKeys.formAtom: {
              const value = node.contents as FormAtomType;
              dbRef.current.setForm(value);
              break;
            }
            case atomKeys.formFieldAtom: {
              const value = node.contents as FormFieldAtomType;
              fieldsToBeUpdated.push({
                fieldKey: value.fieldKey,
                name: value.name,
                error: value.error,
                value: value.value,
                touched: value.touched,
              });
              break;
            }
            case atomKeys.formFieldRegistryAtom: {
              const value = node.contents as FormFieldRegistryAtomType;
              dbRef.current.setFormFieldRegistry(value);
              break;
            }
            case atomKeys.formArrayFieldRowsAtom: {
              const value = node.contents as FormArrayFieldRowsAtomType;
              dbRef.current.setFormArrayFields(value);
              break;
            }
            case atomKeys.formArrayFieldRegistryAtom: {
              const value = node.contents as string[];
              dbRef.current.setFormArrayFieldsRegistry(value);
              break;
            }
            default: {
              break;
            }
          }
        }
      }
      dbRef.current.setFormField(fieldsToBeUpdated);
      return null;
    }
  });
};
