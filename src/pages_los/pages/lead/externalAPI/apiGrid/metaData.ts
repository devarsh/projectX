import { GridMetaDataType } from "components/dataTableStatic";

export const GridMetaData: GridMetaDataType = {
  gridConfig: {
    dense: true,
    gridLabel: "API Progress",
    rowIdColumn: "transactionID",
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
      accessor: "transactionID",
      sequence: 0,
      alignment: "left",
    },
    {
      columnName: "3rd Party TransactionID",
      componentType: "default",
      accessor: "perfiosTransactionID",
      sequence: 1,
      alignment: "left",
    },
    {
      columnName: "Transaction Initiated At",
      componentType: "date",
      accessor: "InitateDate",
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
      accessor: "entityType",
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
      accessor: "status",
      sequence: 6,
      alignment: "left",
    },

    {
      columnName: "Status Result",
      componentType: "default",
      accessor: "remarks",
      sequence: 7,
      alignment: "left",
    },
  ],
};
