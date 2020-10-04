import {
  FormArrayFieldRowsAtomType,
  FormFieldRegistryAtomType,
  FormAtomType,
} from "../types";
import { DBSchema } from "idb";
import { initiateDB } from "./db";

export interface FieldType {
  name: string;
  fieldKey: string;
  value: any;
  touched: boolean;
  error: string | null;
}

export interface RecoilFormsDB extends DBSchema {
  formAtom: {
    value: FormAtomType;
    key: string;
  };
  formFieldAtom: {
    value: {
      [key: string]: FieldType;
    };
    key: string;
  };
  formArrayFieldRowsAtom: {
    value: FormArrayFieldRowsAtomType;
    key: string;
  };
  formFieldRegistryAtom: {
    value: FormFieldRegistryAtomType;
    key: string;
  };
  formArrayFieldRegistryAtom: {
    value: string[];
    key: string;
  };
}

type Await<T> = T extends {
  then(onfulfilled?: (value: infer U) => unknown): unknown;
}
  ? U
  : T;
export type StoreType = Await<ReturnType<typeof initiateDB>>;
