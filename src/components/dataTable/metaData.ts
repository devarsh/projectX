import { GridMetaDataType } from "./types";

export const metaData: GridMetaDataType = {
  columns: [
    {
      accessor: "tran_cd",
      columnName: "Transaction Code",
      sequence: 0,
      componentType: "default",
      disableSortBy: false,
      disableFilters: false,
      filterComponentType: "OptionsFilter",
      filterComponentProps: {
        type: "multiple",
      },
      width: 100,
      minWidth: 100,
      maxWidth: 150,
      isVisible: true,
    },
  ],
  gridConfig: {
    dense: true,
    pageSize: [5, 10, 15],
    defaultPageSize: 5,
    gridLabel: "Demo Page 1",
    rowIDColumn: "tran_cd",
    defaultColumnConfig: {
      width: 100,
      minWidth: 100,
      maxWidth: 150,
    },
  },
};
