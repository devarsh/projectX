import {
  FormArrayFieldRowsAtomType,
  FormFieldRegistryAtomType,
  FormAtomType,
  FormFieldAtomSerializableType,
} from "../types";
import { DBSchema } from "idb";
import { initiateDB } from "./db";

export interface RecoilFormsDB extends DBSchema {
  formAtom: {
    value: FormAtomType;
    key: string;
  };
  formFieldAtom: {
    value: {
      [key: string]: FormFieldAtomSerializableType;
    };
    key: string;
  };
  formArrayFieldRowsAtom: {
    value: {
      [key: string]: FormArrayFieldRowsAtomType;
    };
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
