import { GridColumnType } from "../types";
import { DefaultRowCellRenderer } from "../components";
import { ValueFilter } from "../components/filters";

export const attachComponentsToMetaData = (columns: GridColumnType[]) => {
  if (Array.isArray(columns)) {
    return columns.map((column) => {
      const { componentType, accessor, ...others } = column;
      switch (componentType) {
        case "default":
          return {
            ...others,
            accessor,
            id: accessor,
            Cell: DefaultRowCellRenderer,
          };
        default:
          return {
            ...others,
            accessor,
            id: accessor,
            Cell: DefaultRowCellRenderer,
          };
      }
    });
  }
  return [];
};

export const extractFilterComponentsForOptionsAndRange = (
  columns: GridColumnType[]
) => {
  if (Array.isArray(columns)) {
    return columns.reduce((accumulator: any[], column) => {
      const { filterComponentType, accessor } = column;
      switch (filterComponentType) {
        case "RangeFilter":
          accumulator.push({
            accessor: accessor,
            result_type: "getRange",
            filter_conditions: [],
          });
          break;
        case "OptionsFilter":
          accumulator.push({
            accessor: accessor,
            result_type: "getGroups",
            filter_conditions: [],
          });
          break;
      }
      return accumulator;
    }, []);
  }
  return [];
};

export const attachFilterComponentToMetaData = (columns: GridColumnType[]) => {
  if (Array.isArray(columns)) {
    return columns.map((column) => {
      const { filterComponentType, ...others } = column;
      switch (filterComponentType) {
        case "ValueFilter":
          return {
            ...others,
            Filter: ValueFilter,
            filter: "valueFilter",
          };
        case "RangeFilter":
          return { ...others, Filter: ValueFilter, filter: "rangeFilter" };
        case "OptionsFilter":
          return {
            ...others,
            Filter: ValueFilter,
            filter: "optionsFilter",
          };
        default:
          return { ...others, Filter: ValueFilter, filter: "valueFilter" };
      }
    });
  }
  return [];
};

export const attachAlignmentProps = (columns: GridColumnType[]) => {
  if (Array.isArray(columns)) {
    return columns.map((column) => {
      const { alignment, ...others } = column;
      switch (alignment) {
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
    return columns.reduce<string[]>((accumulator, column) => {
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
    let result = columns.sort((column1, column2) => {
      if (Number(column1.sequence) < Number(column2.sequence)) return -1;
      if (Number(column2.sequence) > Number(column1.sequence)) return 1;
      return 0;
    });
    return result.map(({ sequence, ...others }) => others);
  }
  return [];
};

export const formatSortBy = (sortBy = []) => {
  const formatted = sortBy.map((one: any, index) => ({
    [one?.id ?? ""]: one?.desc ? "desc" : "asc",
    seq: index + 1,
  }));
  return formatted;
};

export const formatFilterBy = (filterBy = []) => {
  const formatted = filterBy.map((one: any, index) => ({
    accessor: one.id,
    ...one.value,
  }));
  return formatted;
};
