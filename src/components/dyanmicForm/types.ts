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
} from "./typesFields";

export interface FormRenderConfigType {
  ordering: "auto" | "sequence";
  renderType: "simple" | "tabs" | "stepper" | "accordian"; //implimentation pending
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

export interface FormMetaDataType {
  name: string;
  label: string;
  resetFieldOnUmnount: boolean;
  validationRun: "onBlur" | "onChange" | "all";
  render: FormRenderConfigType;
  componentProps: ComponentTypeProps;
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
}

export interface MetaDataType {
  form: FormMetaDataType;
  fields: FieldMetaDataType[];
}

export type FieldMetaDataType =
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
  | AllSwitchProps;

/* Yup Rules Types*/
export interface YupSchemaMetaDataType {
  type: string;
  rules?: YupRulesType[];
}

interface YupRulesType {
  name: string;
  params: any[];
}

interface RenderedFieldsType {
  fields: JSX.Element[];
  sequence: number[];
  fieldNames: string[];
}

export interface GroupWiseRenderedFieldsType {
  [key: string]: RenderedFieldsType;
}
