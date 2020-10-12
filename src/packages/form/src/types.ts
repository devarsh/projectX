import { ObjectSchema } from "yup";
export interface TemplateFieldRowType {
  fieldIndexKey: string;
  cells: TemplateFieldCellsObjectType;
}

export interface TemplateFieldCellsObjectType {
  [key: string]: TemplateFieldCellType;
}

export interface TemplateFieldCellType {
  name: string;
  key: string;
}

export interface FormContextType {
  formName: string;
  validationRun?: string;
  resetFieldOnUnmount?: boolean;
  initialValues?: InitialValuesType;
  validationSchema?: ObjectSchema;
}

export type FormFieldRegistryAtomType = string[];

export interface FormFieldRegisterSelectorAttributes {
  fieldName: string;
  defaultValue: any;
}

export interface InitialValuesType {
  [key: string]: any;
}

export interface FormAtomType {
  submitAttempt: number;
  isSubmitting: boolean;
  submitSuccessful: boolean;
  serverSentError: string;
}

export interface FormFieldAtomType {
  fieldKey: string;
  name: string;
  value: any;
  touched: boolean;
  error: string | null;
  validationRunning: boolean;
  validate?: null | typeof ValidateFnType | EmptyFnType;
}

export interface FormArrayFieldRowsAtomType {
  fieldName: string;
  templateFieldRows: TemplateFieldRowType[];
  lastInsertIndex: number;
  resetFlag: boolean;
}

export interface UseFormHookProps {
  onSubmit: SubmitFnType;
}

export interface UseFieldHookProps {
  fieldKey: string;
  name: string;
  validate?: typeof ValidateFnType;
  dependentFields?: string[];
}

export interface UseFieldArrayHookProps {
  arrayFieldName: string;
  template: any;
}

export declare function ValidateFnType(
  data: FormFieldAtomType
): Promise<string>;

export interface EmptyFnType {
  (args: FormFieldAtomType): string;
}

export interface SubmitFnType {
  (
    obj: Object,
    endSubmit: (submitSuccessful: boolean, message?: string) => void,
    setFieldErrors: (fieldsErrorObj: FieldsErrorObjType) => void
  ): void;
}

export interface RenderFnOptionsType {
  row: TemplateFieldRowType;
  fields: string[];
  rowIndex: number;
  removeFn: (index: number) => void;
}

export type RenderFn = (options: RenderFnOptionsType) => JSX.Element;

export interface FieldsErrorObjType {
  [key: string]: string | null;
}
