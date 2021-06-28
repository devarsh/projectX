import { singletonFunctionRegisrationFactoryForTableCells } from "components/utils";
import { CurrencyRowCellRenderer } from "./currencyRowCellRenderer";
import { DateRowCellRenderer } from "./dateRowCellRenderer";
import { DefaultRowCellRenderer } from "./defaultRowCellRenderer";
import { EditableAutocomplete } from "./editableAutocomplete";
import { EditableSelect } from "./editableSelect";
import { EditableTextField } from "./editableTextField";
import { EditableMaskInputField } from "./editableMaskInputField";
import { EditableNumberFormat } from "./editableNumberFormat";
import { ActionCellRenderer } from "./actionCellRenderer";
import { DateCalculateRenderer } from "./dateDifferenceRowCellRender";
export type CellComponentType =
  | "currency"
  | "date"
  | "default"
  | "action"
  | "editableAutocomplete"
  | "editableSelect"
  | "editableTextField"
  | "editableMaskInputField"
  | "editableNumberFormat"
  | "dateDiffere";

singletonFunctionRegisrationFactoryForTableCells.registerFn(
  "currency",
  CurrencyRowCellRenderer
);
singletonFunctionRegisrationFactoryForTableCells.registerFn(
  "date",
  DateRowCellRenderer
);
singletonFunctionRegisrationFactoryForTableCells.registerFn(
  "default",
  DefaultRowCellRenderer
);
singletonFunctionRegisrationFactoryForTableCells.registerFn(
  "editableAutocomplete",
  EditableAutocomplete
);
singletonFunctionRegisrationFactoryForTableCells.registerFn(
  "editableSelect",
  EditableSelect
);
singletonFunctionRegisrationFactoryForTableCells.registerFn(
  "editableTextField",
  EditableTextField
);
singletonFunctionRegisrationFactoryForTableCells.registerFn(
  "editableMaskInputField",
  EditableMaskInputField
);
singletonFunctionRegisrationFactoryForTableCells.registerFn(
  "editableNumberFormat",
  EditableNumberFormat
);
singletonFunctionRegisrationFactoryForTableCells.registerFn(
  "action",
  ActionCellRenderer
);
singletonFunctionRegisrationFactoryForTableCells.registerFn(
  "dateDiffere",
  DateCalculateRenderer
);
