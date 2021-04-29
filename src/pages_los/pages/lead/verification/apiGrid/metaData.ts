import { GridMetaDataType } from "components/dataTableStatic";

export const GridMetaData: GridMetaDataType = {
  gridConfig: {
    dense: true,
    gridLabel: "Verification API Status",
    rowIdColumn: "tokenID",
    defaultColumnConfig: {
      width: 150,
      maxWidth: 250,
      minWidth: 100,
    },
    allowColumnReordering: false,
    disableSorting: false,
    disableGroupBy: false,
    disableRowSelect: true,
    containerHeight: {
      min: "40vh",
      max: "50vh",
    },
  },
  columns: [
    {
      columnName: "Transaction ID",
      componentType: "default",
      accessor: "tokenID",
      sequence: 0,
      alignment: "left",
    },
    {
      columnName: "Initiated At",
      componentType: "date",
      accessor: "initateDate",
      sequence: 2,
      alignment: "left",
    },
    {
      columnName: "Request Type",
      componentType: "default",
      accessor: "requestType",
      sequence: 3,
      alignment: "left",
    },
    {
      columnName: "Entity Type",
      componentType: "default",
      accessor: "entity_type",
      sequence: 4,
      alignment: "left",
    },

    {
      columnName: "Entity Name",
      componentType: "default",
      accessor: "entityName",
      sequence: 5,
      alignment: "left",
    },

    {
      columnName: "Current Status",
      componentType: "default",
      accessor: "tokenStatus",
      sequence: 6,
      alignment: "left",
    },
  ],
};
