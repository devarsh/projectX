import { GridColumnType } from "../types";
import { DefaultRowCellRenderer, DefaultColumnFilter } from "../components";
import { useCallback } from "react";

export const attachComponentsToMetaData = (columns: GridColumnType[]) => {
  if (Array.isArray(columns)) {
    return columns.map((column) => {
      const { componentType, ...others } = column;
      switch (componentType) {
        case "default":
          return { ...others, Cell: DefaultRowCellRenderer };
        default:
          return { ...others, Cell: DefaultRowCellRenderer };
      }
    });
  }
  return [];
};

export const attachFilterComponentToMetaData = (columns: GridColumnType[]) => {
  if (Array.isArray(columns)) {
    return columns.map((column) => {
      const { filterComponentType, ...others } = column;
      switch (filterComponentType) {
        case "ValueFilter":
          return { ...others, Filter: DefaultColumnFilter };
        case "RangeFilter":
          return { ...others, Filter: DefaultColumnFilter };
        case "OptionsFilter":
          return { ...others, Filter: DefaultColumnFilter };
        default:
          return { ...others, Filter: DefaultColumnFilter };
      }
    });
  }
  return [];
};

export const attachAlignmentProps = (columns: GridColumnType[]) => {
  if (Array.isArray(columns)) {
    return columns.map((column) => {
      const { alignmnent, ...others } = column;
      switch (alignmnent) {
        case "right":
          return { ...others, TableCellProps: { align: "right" } };
        default:
          return others;
      }
    });
  }
  return [];
};

export const extractHiddenColumns = (columns: GridColumnType[]) => {
  if (Array.isArray(columns)) {
    return columns.reduce<String[]>((accumulator, column) => {
      if (column.isVisible === false) {
        accumulator.push(column.accessor);
      }
      return accumulator;
    }, []);
  }
  return [];
};

export const sortColumnsBySequence = (columns: GridColumnType[]) => {
  if (Array.isArray(columns)) {
    return columns.sort((column1, column2) => {
      if (column1.sequence < column2.sequence) return -1;
      if (column2.sequence > column1.sequence) return 1;
      return 0;
    });
  }
  return [];
};

// export const getRowID = (rowIDColumn) =>
//   useCallback((row) => row[rowIDColumn], []);
