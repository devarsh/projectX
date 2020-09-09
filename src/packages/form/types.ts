export interface FormAtomType {
  submitAttempt: number;
  isSubmitting: boolean;
  validationRun: string;
  submitSuccessful: boolean;
  resetFieldOnUnmount: boolean;
}

export interface FormFeedbackAtom {
  message: string;
  isError: boolean;
}

export interface InititalValues {
  [key: string]: string;
}

export interface FormProps {
  onSubmit: SubmitFn;
  inititalValues?: InititalValues;
}

export interface FieldProps {
  fieldKey: string;
  name: string;
  validate?: ValidateFn;
  dependentFields?: string[];
}

export interface FormFieldAtom {
  fieldKey: string;
  name: string;
  value: any;
  touched: boolean;
  error: string | null;
  validationRunning: boolean;
  validate?: null | ValidateFn | emptyFn;
}

export interface FieldArrayProps {
  arrayFieldName: string;
  template: any;
}

export interface ValidateFn {
  (
    fieldData: FormFieldAtom,
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

export interface FieldsErrorObj {
  [key: string]: string | null;
}
