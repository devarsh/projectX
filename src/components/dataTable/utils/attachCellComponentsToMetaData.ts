import { GridColumnType } from "../types";
import {
  DefaultRowCellRenderer,
  DateRowCellRenderer,
  CurrencyRowCellRenderer,
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
