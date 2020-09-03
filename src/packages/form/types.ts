export interface FormAtomType {
  submitAttempt: number;
  isSubmitting: boolean;
  validationRun: string;
  submitSuccessful: boolean;
  resetFieldOnUnmount: boolean;
  resetFlagForInitValues: number;
  inititalValues: InititalValues | undefined;
}

export interface FormFeedbackAtom {
  message: string;
  isError: boolean;
}

export interface InititalValues {
  [key: string]: string;
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
  value: string;
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

export type RenderFn = (
  row: TemplateFieldRow,
  fields: string[],
  rowIndex: number
) => any;

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
