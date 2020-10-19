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
type ValidationRunType = "onChange" | "onBlur" | "all";

export interface FormContextType {
  formName: string;
  validationRun?: ValidationRunType;
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
  excluded: boolean;
  readOnly: boolean;
  validate?: null | typeof ValidateFnType | EmptyFnType;
  incomingMessage?: any;
}

export interface DependentValuesType {
  [key: string]: FormFieldAtomType;
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
  validationRun?: ValidationRunType;
  dependentFields?: string[] | string;
  shouldExclude?: typeof shouldExcludeFnType;
  isReadyOnly?: typeof shouldExcludeFnType;
  postValidationSetCrossFieldValues?: typeof PostValidationSetCrossFieldValuesFnType;
  runPostValidationHookAlways?: boolean;
}

export interface UseFieldArrayHookProps {
  arrayFieldName: string;
  template: any;
}

export interface SubscritionFieldsType {
  [key: string]: string[] | string | undefined;
}

export declare function shouldExcludeFnType(
  fieldData: FormFieldAtomType,
  dependentFieldsValues: DependentValuesType
): Promise<boolean> | boolean;

export declare function ValidateFnType(
  data: FormFieldAtomType
): Promise<any> | any;

export declare function PostValidationSetCrossFieldValuesFnType(
  fieldData: FormFieldAtomType
):
  | Promise<InitialValuesType | undefined | null>
  | InitialValuesType
  | undefined
  | null;

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
