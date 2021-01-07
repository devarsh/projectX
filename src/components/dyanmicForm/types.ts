import { GridSize, GridSpacing, GridDirection } from "@material-ui/core/Grid";
import {
  AllTextFieldProps,
  AllSelectFieldProps,
  AllCheckboxGroupProps,
  AllCheckboxProps,
  AllDatePickerProps,
  AllDateTimePickerProps,
  AllTimePickerProps,
  AllRadioProps,
  AllRatingProps,
  AllSliderProps,
  AllSwitchGroupProps,
  AllSwitchProps,
  AllNumberFormatProps,
  AllPasswordFieldProps,
  AllSpacerProps,
  AllToggleButtonGroupProps,
  AllInputMaskProps,
  AllAutocompleteProps,
} from "./typesFields";
import {
  TextFieldPropsOptional,
  SelectPropsOptional,
  CheckboxGroupPropsOptional,
  CheckboxPropsOptional,
  DatePickerPropsOptional,
  DateTimePickerPropsOptional,
  TimePickerPropsOptional,
  RadioPropsOptional,
  RatingPropsOptional,
  SliderPropsOptional,
  SwitchPropsOptional,
  SwitchGroupPropsOptional,
  NumberFormatPropsOptional,
  PasswordFieldPropsOptional,
  ToggleButtonGroupPropsOptional,
  InputMaskPropsOptional,
  AutocompletePropsOptional,
} from "./typesFields";
import { Merge } from "components/common/types";
import { InitialValuesType, SubmitFnType } from "packages/form";

export interface FormRenderConfigType {
  ordering: "auto" | "sequence";
  renderType: "simple" | "tabs" | "stepper" | "accordian"; //implimentation pending
  labels?: {
    next?: string;
    prev?: string;
    complete?: string;
  };
  groups?: { [key: string]: string };
  gridConfig: {
    item?: {
      xs?: GridSize;
      sm?: GridSize;
      md?: GridSize;
      spacing?: GridSpacing;
    };
    container: {
      direction?: GridDirection;
      spacing?: GridSpacing;
    };
  };
}

export interface UserFlowType {
  componentName: string;
  sequence: number;
}

export interface FormMetaDataType {
  name: string;
  label: string;
  resetFieldOnUmnount: boolean;
  validationRun: "onBlur" | "onChange" | "all";
  render: FormRenderConfigType;
  componentProps: ComponentTypeProps;
  flow?: UserFlowType[];
  submitAction?: string;
  refID?: string | number;
  confirmationBox?: {
    name: string;
    label: string;
  };
}

export interface ComponentTypeProps {
  textField?: TextFieldPropsOptional;
  select?: SelectPropsOptional;
  checkbox?: CheckboxPropsOptional;
  checkboxGroup?: CheckboxGroupPropsOptional;
  datetimePicker?: DateTimePickerPropsOptional;
  datePicker?: DatePickerPropsOptional;
  timePicker?: TimePickerPropsOptional;
  radio?: RadioPropsOptional;
  rating?: RatingPropsOptional;
  slider?: SliderPropsOptional;
  switch?: SwitchPropsOptional;
  switchGroup?: SwitchGroupPropsOptional;
  numberFormat?: NumberFormatPropsOptional;
  passwordField?: PasswordFieldPropsOptional;
  toggleButtonGroup?: ToggleButtonGroupPropsOptional;
  inputMask?: InputMaskPropsOptional;
  autocomplete?: AutocompletePropsOptional;
}

export interface MetaDataType {
  form: FormMetaDataType;
  fields: FieldMetaDataType[];
}

export type FieldMetaDataTypeX =
  | AllTextFieldProps
  | AllSelectFieldProps
  | AllCheckboxGroupProps
  | AllCheckboxProps
  | AllDatePickerProps
  | AllDateTimePickerProps
  | AllTimePickerProps
  | AllRadioProps
  | AllRatingProps
  | AllSliderProps
  | AllSwitchGroupProps
  | AllSwitchProps
  | AllNumberFormatProps
  | AllPasswordFieldProps
  | AllToggleButtonGroupProps
  | AllSpacerProps
  | AllInputMaskProps
  | AllAutocompleteProps;

export type FieldMetaDataType = Merge<
  FieldMetaDataTypeX,
  { template?: FieldMetaDataType[] }
>;

/* Yup Rules Types*/
export interface YupSchemaMetaDataType {
  type: "string" | "number" | "boolean" | "date" | "array";
  arrayType?: "string" | "number" | "boolean" | "date";
  rules?: YupRulesType[];
}

interface YupRulesType {
  name: string;
  params: any[];
}

export interface RenderedFieldsType {
  fields: JSX.Element[];
  sequence: number[];
  fieldNames: string[];
  excluded?: boolean;
}

export interface GroupWiseRenderedFieldsType {
  [key: string]: RenderedFieldsType;
}

export interface RouterState {
  formCode?: string;
  productCode?: string;
}

//This is to create custom types to extend base types

export type FieldMetaDataTypeOptional =
  | TextFieldPropsOptional
  | SelectPropsOptional
  | CheckboxPropsOptional
  | CheckboxGroupPropsOptional
  | DateTimePickerPropsOptional
  | DatePickerPropsOptional
  | TimePickerPropsOptional
  | RadioPropsOptional
  | RatingPropsOptional
  | SliderPropsOptional
  | SwitchPropsOptional
  | SwitchGroupPropsOptional
  | NumberFormatPropsOptional
  | PasswordFieldPropsOptional
  | ToggleButtonGroupPropsOptional
  | InputMaskPropsOptional
  | AutocompletePropsOptional;

export type ExtendedFieldMetaDataTypeOptional = {
  [key: string]: FieldMetaDataTypeOptional;
};

export interface RenderFunctionType {
  (
    fieldObj: FieldMetaDataType,
    formRenderConfig: FormRenderConfigType,
    formName: string,
    componentProps?: ComponentTypeProps
  ): JSX.Element;
}

export interface FormWrapperProps {
  metaData: MetaDataType;
  initialValues?: InitialValuesType;
  onSubmitHandler: SubmitFnType;
  hidden?: boolean;
}
