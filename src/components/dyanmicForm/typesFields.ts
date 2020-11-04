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
import { SpacerProps } from "components/common/spacer";
import { ToggleButtonGroupProps } from "components/common/toggleButtonGroup";
import { AutocompleteProps } from "components/common/autocomplete";
import { NumberFormatProps } from "components/derived/numberFormat";
import { PasswordFieldProps } from "components/derived/passwordField";
import { InputMaskProps } from "components/derived/inputMask";
import { ValidateFnType, shouldExcludeFnType } from "packages/form";
import { TopLevelCondition } from "json-rules-engine";
export interface FieldRenderProps<T> {
  componentType: T;
  group?: number;
  sequence?: number;
}

export interface CustomRuleType {
  conditions: TopLevelCondition;
  success: any;
  failure: any;
}

export interface FieldMetaData<T> {
  defaultValue?: any;
  schemaValidation?: YupSchemaMetaDataType;
  render: FieldRenderProps<T>;
  validate?: typeof ValidateFnType | CustomRuleType;
  shouldExclude?: typeof shouldExcludeFnType | CustomRuleType | Boolean;
  isReadOnly?: typeof shouldExcludeFnType | CustomRuleType | Boolean;
}

export type Omitted<T> = Omit<T, "fieldKey" | "enableGrid">;

export type AllAutocompleteProps = Merge<
  Omitted<AutocompleteProps>,
  FieldMetaData<"autocomplete">
>;

export type AutocompletePropsOptional = Optional<AllAutocompleteProps>;

export type AllSpacerProps = Merge<SpacerProps, FieldMetaData<"spacer">>;

export type AllInputMaskProps = Merge<
  Omitted<InputMaskProps>,
  FieldMetaData<"inputMask">
>;
export type InputMaskPropsOptional = Optional<AllInputMaskProps>;

export type AllToggleButtonGroupProps = Merge<
  Omitted<ToggleButtonGroupProps>,
  FieldMetaData<"toggleButtonGroup">
>;
export type ToggleButtonGroupPropsOptional = Optional<ToggleButtonGroupProps>;

export type AllNumberFormatProps = Merge<
  Omitted<NumberFormatProps>,
  FieldMetaData<"numberFormat">
>;

export type NumberFormatPropsOptional = Optional<NumberFormatProps>;

export type AllPasswordFieldProps = Merge<
  Omitted<PasswordFieldProps>,
  FieldMetaData<"passwordField">
>;

export type PasswordFieldPropsOptional = Optional<PasswordFieldProps>;

export type AllCheckboxProps = Merge<
  Omitted<CheckboxProps>,
  FieldMetaData<"checkbox">
>;
export type AllCheckboxGroupProps = Merge<
  Omitted<CheckboxGroupProps>,
  FieldMetaData<"checkboxGroup">
>;
export type CheckboxPropsOptional = Optional<CheckboxProps>;
export type CheckboxGroupPropsOptional = Optional<CheckboxGroupProps>;

export type AllDatePickerProps = Merge<
  Omitted<DatePickerProps>,
  FieldMetaData<"datePicker">
>;
export type AllDateTimePickerProps = Merge<
  Omitted<DateTimePickerProps>,
  FieldMetaData<"datetimePicker">
>;
export type AllTimePickerProps = Merge<
  Omitted<TimePickerProps>,
  FieldMetaData<"timePicker">
>;
export type DatePickerPropsOptional = Optional<DatePickerProps>;
export type DateTimePickerPropsOptional = Optional<DateTimePickerProps>;
export type TimePickerPropsOptional = Optional<TimePickerProps>;

export type AllRadioProps = Merge<FieldMetaData<"radio">, Omitted<RadioProps>>;
export type RadioPropsOptional = Optional<RadioProps>;

export type AllRatingProps = Merge<
  Omitted<RatingProps>,
  FieldMetaData<"rating">
>;
export type RatingPropsOptional = Optional<RatingProps>;

export type AllSelectFieldProps = Merge<
  Omitted<SelectProps>,
  FieldMetaData<"select">
>;
export type SelectPropsOptional = Optional<SelectProps>;

export type AllSliderProps = Merge<
  Omitted<SliderProps>,
  FieldMetaData<"slider">
>;
export type SliderPropsOptional = Optional<SliderProps>;

export type AllSwitchProps = Merge<
  Omitted<SwitchProps>,
  FieldMetaData<"switch">
>;
export type AllSwitchGroupProps = Merge<
  SwitchGroupProps,
  FieldMetaData<"switchGroup">
>;
export type SwitchPropsOptional = Optional<SwitchProps>;
export type SwitchGroupPropsOptional = Optional<SwitchGroupProps>;

export type AllTextFieldProps = Merge<
  Omitted<TextFieldProps>,
  FieldMetaData<"textField">
>;
export type TextFieldPropsOptional = Optional<TextFieldProps>;
