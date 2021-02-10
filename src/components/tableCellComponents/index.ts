import { singletonFunctionRegisrationFactoryForTableCells } from "components/utils";
import { CurrencyRowCellRenderer } from "./currencyRowCellRenderer";
import { DateRowCellRenderer } from "./dateRowCellRenderer";
import { DefaultRowCellRenderer } from "./defaultRowCellRenderer";
import { EditableAutocomplete } from "./editableAutocomplete";
import { EditableSelect } from "./editableSelect";
import { EditableTextField } from "./editableTextField";

export type CellComponentType =
  | "currency"
  | "date"
  | "default"
  | "editableAutocomplete"
  | "editableSelect"
  | "editableTextField";

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
