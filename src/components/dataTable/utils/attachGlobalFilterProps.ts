import { HeaderFilterMultiType } from "../types";
import { APISDK } from "registry/fns/sdk";

export const transformHeaderFiltersNew = (
  headerFilters: HeaderFilterMultiType
) => {
  if (Array.isArray(headerFilters)) {
    headerFilters.sort((first, second) => {
      if (first.level > second.level) return 1;
      if (first.level < second.level) return -1;
      return 0;
    });
    const newArray: any[] = [];
    headerFilters.reduce<string[]>((accum, filter, index) => {
      const {
        accessor,
        filterComponentProps,
        columnName,
        filterComponentType,
      } = filter;
      newArray.push({
        filterComponentProps: {
          ...filterComponentProps,
          dependencies: [...accum],
          last: index === headerFilters.length - 1,
          columnName,
          accessor,
          result_type:
            filterComponentType === "groupByFilter"
              ? "getGroups"
              : "daysFilter"
              ? "getRange"
              : "getGroups",
        },
        filterComponentType,
      });
      accum.push(filter.accessor);
      return accum;
    }, []);
    return newArray;
  }
};

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
