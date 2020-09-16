export interface InititalValuesType {
  [key: string]: string;
}

export interface TemplateFieldRow {
  fieldKey: string;
  values: TemplateFieldRowValues;
}

export interface TemplateFieldRowValues {
  [key: string]: TemplateFieldRowValue;
}

export interface TemplateFieldRowValue {
  name: string;
  key: string;
}

export interface InititalValuesAtomType {
  initialValues: InititalValuesType;
  version: number;
}

export interface FormAtomType {
  submitAttempt: number;
  isSubmitting: boolean;
  validationRun: string;
  submitSuccessful: boolean;
  resetFieldOnUnmount: boolean;
}

export interface FormFeedbackAtomType {
  message: string;
  isError: boolean;
}

export interface FormFieldAtomType {
  fieldKey: string;
  name: string;
  value: any;
  touched: boolean;
  error: string | null;
  validationRunning: boolean;
  validate?: null | ValidateFn | emptyFn;
}

export interface FormFieldArrayRowsType {
  templateFieldRows: TemplateFieldRow[];
  lastInsertIndex: number;
}

export interface FormProps {
  onSubmit: SubmitFn;
  inititalValues?: InititalValuesType;
  persist?: boolean;
}

export interface FieldProps {
  fieldKey: string;
  name: string;
  validate?: ValidateFn;
  dependentFields?: string[];
}

export interface FieldArrayProps {
  arrayFieldName: string;
  template: any;
}

export interface ValidateFn {
  (
    fieldData: FormFieldAtomType,
    setValidationRunning: (isRunning: boolean) => void
  ): string;
}

export interface emptyFn {
  (): void;
}

export interface SubmitFn {
  (
    obj: Object,
    startSubmit: () => void,
    endSubmit: (submitSuccessful?: boolean, message?: string) => void,
    setFieldErrors: (fieldsErrorObj: FieldsErrorObj) => void
  ): void;
}

export type RenderFn = (optons: RenderFnArgs) => JSX.Element;

export interface RenderFnArgs {
  row: TemplateFieldRow;
  fields: string[];
  rowIndex: number;
  removeFn: (index: number) => void;
}

export interface FieldsErrorObj {
  [key: string]: string | null;
}
