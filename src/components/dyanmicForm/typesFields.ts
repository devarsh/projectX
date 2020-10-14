import { YupSchemaMetaDataType } from "./types";
import { Merge, Optional } from "components/common/types";
import { TextFieldProps } from "components/common/textField";
import { SelectProps } from "components/common/select";
import { CheckboxProps, CheckboxGroupProps } from "components/common/checkbox";
import {
  DatePickerProps,
  DateTimePickerProps,
  TimePickerProps,
} from "components/common/datetime";
import { RadioProps } from "components/common/radio";
import { RatingProps } from "components/common/rating";
import { SliderProps } from "components/common/slider";
import { SwitchGroupProps, SwitchProps } from "components/common/switch";

export interface FieldMetaData<T> {
  defaultValue?: any;
  schemaValidation?: YupSchemaMetaDataType;
  render: {
    componentType: T;
    group?: string;
    sequence?: number;
  };
}

export type AllCheckboxProps = Merge<FieldMetaData<"checkbox">, CheckboxProps>;
export type AllCheckboxGroupProps = Merge<
  FieldMetaData<"checkboxGroup">,
  CheckboxGroupProps
>;
export type CheckboxPropsOptional = Optional<CheckboxProps>;
export type CheckboxGroupPropsOptional = Optional<CheckboxGroupProps>;

export type AllDatePickerProps = Merge<
  FieldMetaData<"datePicker">,
  DatePickerProps
>;
export type AllDateTimePickerProps = Merge<
  FieldMetaData<"datetimePicker">,
  DateTimePickerProps
>;
export type AllTimePickerProps = Merge<
  FieldMetaData<"timePicker">,
  TimePickerProps
>;
export type DatePickerPropsOptional = Optional<DatePickerProps>;
export type DateTimePickerPropsOptional = Optional<DateTimePickerProps>;
export type TimePickerPropsOptional = Optional<TimePickerProps>;

export type AllRadioProps = Merge<FieldMetaData<"radio">, RadioProps>;
export type RadioPropsOptional = Optional<RadioProps>;

export type AllRatingProps = Merge<FieldMetaData<"rating">, RatingProps>;
export type RatingPropsOptional = Optional<RatingProps>;

export type AllSelectFieldProps = Merge<FieldMetaData<"select">, SelectProps>;
export type SelectPropsOptional = Optional<SelectProps>;

export type AllSliderProps = Merge<FieldMetaData<"slider">, SliderProps>;
export type SliderPropsOptional = Optional<SliderProps>;

export type AllSwitchProps = Merge<FieldMetaData<"switch">, SwitchProps>;
export type AllSwitchGroupProps = Merge<
  FieldMetaData<"switchGroup">,
  SwitchGroupProps
>;
export type SwitchPropsOptional = Optional<SwitchProps>;
export type SwitchGroupPropsOptional = Optional<SwitchGroupProps>;

export type AllTextFieldProps = Merge<
  FieldMetaData<"textField">,
  TextFieldProps
>;
export type TextFieldPropsOptional = Optional<TextFieldProps>;
