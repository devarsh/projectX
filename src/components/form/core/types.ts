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

export interface FormFieldAtom {
  name: string;
  value: string;
  touched: boolean;
  error: string | null;
  validationRunning: boolean;
  validate?: null | ValidateFn | emptyFn;
  arrayFieldName: string;
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

export interface FieldProps {
  name: string;
  validate?: ValidateFn;
  dependentFields?: string[];
  arrayFieldName?: string;
}

export interface FieldArrayProps {
  arrayFieldName: string;
  template: any;
}

export type RenderFn = (
  row: TemplateFieldRow,
  fields: string[],
  rowIndex: number
) => any;

export interface TemplateFieldRow {
  fieldKey: string;
  values: {
    [key: string]: TemplateFieldRowValue;
  };
}

export interface TemplateFieldRowValue {
  name: string;
  key: string;
}

export interface FieldsErrorObj {
  [key: string]: string | null;
}
