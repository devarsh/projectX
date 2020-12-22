import { GridColumnType, HeaderFilterMultiType } from "../types";
import { DefaultRowCellRenderer } from "../components";
import {
  ValueFilter,
  RangeFilterWrapper,
  OptionsFilter,
} from "../components/filters";
import { APISDK } from "registry/fns/sdk";
import { useState, useRef } from "react";
import { filter } from "lodash";

export const transformHeaderFilters = (
  gridCode: string,
  headerFilters?: HeaderFilterMultiType
) => {
  if (Array.isArray(headerFilters)) {
    const result = headerFilters.map((filter) => {
      const {
        accessor,
        filterComponentType,
        filterComponentProps,
        ...others
      } = filter;
      switch (filterComponentType) {
        case "groupByFilter":
          return new Promise((res) => {
            APISDK.fetchGridColumnFilterProps(gridCode, {
              accessor: accessor,
              result_type: "getGroups",
              filter_conditions: [],
            }).then((result) => {
              if (result.status === "success") {
                res({
                  filterComponentType,
                  filterComponentProps: {
                    accessor,
                    ...others,
                    ...filterComponentProps,
                    ...result.data,
                  },
                });
              } else {
                res({
                  filterComponentType,
                  filterComponentProps: {
                    accessor,
                    ...others,
                    ...filterComponentProps,
                  },
                });
              }
            });
          });
        //Uncomment if you plan on using rangeFilter - this much precision is not usually required.

        // case "daysFilter":
        //   return new Promise((res) => {
        //     APISDK.fetchGridColumnFilterProps(gridCode, {
        //       accessor: accessor,
        //       result_type: "getRange",
        //       filter_conditions: [],
        //     }).then((result) => {
        //       if (result.status === "success") {
        //         res({
        //           filterComponentType,
        //           filterComponentProps: {
        //             accessor,
        //             ...filterComponentProps,
        //             ...result.data,
        //           },
        //           ...others,
        //         });
        //       } else {
        //         res({
        //           filterComponentType,
        //           filterComponentProps: { accessor, ...filterComponentProps },
        //           ...others,
        //         });
        //       }
        //     });
        //   });
        default:
          return new Promise((res) => {
            res({
              filterComponentType,
              filterComponentProps: {
                accessor,
                ...others,
                ...filterComponentProps,
              },
            });
          });
      }
    });
    return Promise.all(result);
  }
  return Promise.resolve([]);
};

export const attachComponentsToMetaData = (columns: GridColumnType[]) => {
  if (Array.isArray(columns)) {
    return columns.map((column) => {
      const { componentType, ...others } = column;
      switch (componentType) {
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

export const attachFilterComponentToMetaData = (columns: GridColumnType[]) => {
  if (Array.isArray(columns)) {
    return columns.map((column) => {
      const {
        filterComponentType,
        filterComponentProps,
        accessor,
        ...others
      } = column;
      switch (filterComponentType) {
        case "valueFilter":
          return {
            ...others,
            accessor,
            filterComponentProps,
            Filter: ValueFilter,
            filter: "valueFilter",
            id: accessor,
          };
        case "rangeFilter":
          return {
            ...others,
            Filter: RangeFilterWrapper,
            filter: "rangeFilter",
            accessor,
            id: accessor,
            filterComponentProps: {
              ...filterComponentProps,
              query: {
                accessor: accessor,
                result_type: "getRange",
                filter_conditions: [],
              },
            },
          };
        case "optionsFilter":
          return {
            ...others,
            Filter: OptionsFilter,
            //filter:'optionsFilter'
            accessor,
            id: accessor,
            filterComponentProps: {
              ...filterComponentProps,
              query: {
                accessor: accessor,
                result_type: "getGroups",
                filter_conditions: [],
              },
            },
          };
        default:
          return {
            ...others,
            accessor,
            filterComponentProps,
            Filter: ValueFilter,
            filter: "valueFilter",
          };
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

export const useFilterState = () => {
  const [state, setState] = useState<object | null>(null);
  const [gridCurrentPageSize, setGridCurrentPageSize] = useState(0);
  const addHeaderFilter = (accessor, filterValue) => {
    if (typeof state !== "object" || state === null) {
      setState({ [accessor]: filterValue });
    } else {
      setState((old) => ({ ...old, [accessor]: filterValue }));
    }
  };
  const removeHeaderFilter = (accessor) => {
    if (typeof state === "object" && state !== null) {
      const result = delete state[accessor];
      if (result) {
        if (Object.keys(state).length === 0) {
          setState(null);
        }
        setState(state);
      }
    }
  };
  const clearHeaderFilter = () => {
    setState(null);
  };
  return {
    addHeaderFilter,
    removeHeaderFilter,
    clearHeaderFilter,
    state,
    setGridCurrentPageSize,
    gridCurrentPageSize,
  };
};

export const useLocalFilterState = () => {
  const filterState = useRef<object>({});
  const addFilterState = (accessor, state) => {
    let currentState;
    currentState = { [accessor]: state };

    if (filterState.current === null) {
      filterState.current = currentState;
    } else {
      filterState.current = {
        ...filterState.current,
        ...currentState,
      };
    }
  };
  const getFilterState = (accessor) => {
    if (typeof filterState.current === "object") {
      return filterState.current[accessor];
    }
    return;
  };
  const removeFilterState = (accessor) => {
    if (typeof filterState.current === "object") {
      delete filterState.current[accessor];
    }
  };
  const clearFilterState = () => {
    filterState.current = {};
  };

  return {
    addFilterState,
    removeFilterState,
    clearFilterState,
    getFilterState,
  };
};
