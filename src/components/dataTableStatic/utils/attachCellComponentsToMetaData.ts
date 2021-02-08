import { GridColumnType } from "../types";
import {
  DefaultRowCellRenderer,
  DateRowCellRenderer,
  CurrencyRowCellRenderer,
} from "components/dataTable/components/cells";
import {
  EditableTextField,
  EditableAutocomplete,
  EditableSelect,
} from "../components/cells";

export const attachCellComponentsToMetaData = (columns: GridColumnType[]) => {
  if (Array.isArray(columns)) {
    return columns.map((column) => {
      const { componentType, ...others } = column;
      switch (componentType) {
        case "date":
          return {
            ...others,
            Cell: DateRowCellRenderer,
          };
        case "currency":
          return {
            ...others,
            Cell: CurrencyRowCellRenderer,
          };
        case "editableTextField":
          return {
            ...others,
            Cell: EditableTextField,
          };
        case "editableAutocomplete":
          return {
            ...others,
            Cell: EditableAutocomplete,
          };
        case "editableSelect":
          return {
            ...others,
            Cell: EditableSelect,
          };
        default:
          return {
            ...others,
            Cell: DefaultRowCellRenderer,
          };
      }
    });
  }
  return [];
};
