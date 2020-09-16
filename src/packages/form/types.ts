export interface TemplateFieldRowType {
  fieldKey: string;
  cells: TemplateFieldCellsObjectType;
}

export interface TemplateFieldCellsObjectType {
  [key: string]: TemplateFieldCellType;
}

export interface TemplateFieldCellType {
  name: string;
  key: string;
}

export interface InititalValuesType {
  [key: string]: any;
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
  validate?: null | ValidateFnType | EmptyFnType;
}

export interface FormFieldArrayRowsType {
  templateFieldRows: TemplateFieldRowType[];
  lastInsertIndex: number;
}

export interface UseFormHookProps {
  onSubmit: SubmitFnType;
  inititalValues?: InititalValuesType;
  persist?: boolean;
}

export interface UseFieldHookProps {
  fieldKey: string;
  name: string;
  validate?: ValidateFnType;
  dependentFields?: string[];
}

export interface UseFieldArrayHookProps {
  arrayFieldName: string;
  template: any;
}

export interface ValidateFnType {
  (
    fieldData: FormFieldAtomType,
    setValidationRunning: (isRunning: boolean) => void
  ): string;
}

export interface EmptyFnType {
  (): void;
}

export interface SubmitFnType {
  (
    obj: Object,
    startSubmit: () => void,
    endSubmit: (submitSuccessful?: boolean, message?: string) => void,
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
