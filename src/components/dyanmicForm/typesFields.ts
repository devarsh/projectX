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
import { NumberFormatProps } from "components/derived/numberFormat";
import { PasswordFieldProps } from "components/derived/passwordField";
import { SpacerProps } from "components/common/spacer";
import { ToggleButtonGroupProps } from "components/common/toggleButtonGroup";

export interface FieldRenderProps<T> {
  componentType: T;
  group?: number;
  sequence?: number;
}
export interface FieldMetaData<T> {
  defaultValue?: any;
  schemaValidation?: YupSchemaMetaDataType;
  render: FieldRenderProps<T>;
}

export type Omitted<T> = Omit<T, "fieldKey" | "enableGrid">;

export type AllSpacerProps = Merge<FieldMetaData<"spacer">, SpacerProps>;

export type AllToggleButtonGroupProps = Merge<
  FieldMetaData<"toggleButtonGroup">,
  Omitted<ToggleButtonGroupProps>
>;
export type ToggleButtonGroupPropsOptional = Optional<ToggleButtonGroupProps>;

export type AllNumberFormatProps = Merge<
  FieldMetaData<"numberFormat">,
  Omitted<NumberFormatProps>
>;

export type NumberFormatPropsOptional = Optional<NumberFormatProps>;

export type AllPasswordFieldProps = Merge<
  FieldMetaData<"passwordField">,
  Omitted<PasswordFieldProps>
>;

export type PasswordFieldPropsOptional = Optional<PasswordFieldProps>;

export type AllCheckboxProps = Merge<
  FieldMetaData<"checkbox">,
  Omitted<CheckboxProps>
>;
export type AllCheckboxGroupProps = Merge<
  FieldMetaData<"checkboxGroup">,
  Omitted<CheckboxGroupProps>
>;
export type CheckboxPropsOptional = Optional<CheckboxProps>;
export type CheckboxGroupPropsOptional = Optional<CheckboxGroupProps>;

export type AllDatePickerProps = Merge<
  FieldMetaData<"datePicker">,
  Omitted<DatePickerProps>
>;
export type AllDateTimePickerProps = Merge<
  FieldMetaData<"datetimePicker">,
  Omitted<DateTimePickerProps>
>;
export type AllTimePickerProps = Merge<
  FieldMetaData<"timePicker">,
  Omitted<TimePickerProps>
>;
export type DatePickerPropsOptional = Optional<DatePickerProps>;
export type DateTimePickerPropsOptional = Optional<DateTimePickerProps>;
export type TimePickerPropsOptional = Optional<TimePickerProps>;

export type AllRadioProps = Merge<FieldMetaData<"radio">, Omitted<RadioProps>>;
export type RadioPropsOptional = Optional<RadioProps>;

export type AllRatingProps = Merge<
  FieldMetaData<"rating">,
  Omitted<RatingProps>
>;
export type RatingPropsOptional = Optional<RatingProps>;

export type AllSelectFieldProps = Merge<
  FieldMetaData<"select">,
  Omitted<SelectProps>
>;
export type SelectPropsOptional = Optional<SelectProps>;

export type AllSliderProps = Merge<
  FieldMetaData<"slider">,
  Omitted<SliderProps>
>;
export type SliderPropsOptional = Optional<SliderProps>;

export type AllSwitchProps = Merge<
  FieldMetaData<"switch">,
  Omitted<SwitchProps>
>;
export type AllSwitchGroupProps = Merge<
  FieldMetaData<"switchGroup">,
  SwitchGroupProps
>;
export type SwitchPropsOptional = Optional<SwitchProps>;
export type SwitchGroupPropsOptional = Optional<SwitchGroupProps>;

export type AllTextFieldProps = Merge<
  FieldMetaData<"textField">,
  Omitted<TextFieldProps>
>;
export type TextFieldPropsOptional = Optional<TextFieldProps>;
