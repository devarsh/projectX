import { GridColumnType } from "../types";
import { DefaultRowCellRenderer, DateRowCellRenderer } from "../components";

export const attachComponentsToMetaData = (columns: GridColumnType[]) => {
  if (Array.isArray(columns)) {
    return columns.map((column) => {
      const { componentType, ...others } = column;
      switch (componentType) {
        case "date":
          return {
            ...others,
            Cell: DateRowCellRenderer,
          };
        case "default":
          return {
            ...others,
            Cell: DefaultRowCellRenderer,
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
