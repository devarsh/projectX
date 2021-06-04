import { GridMetaDataType } from "components/dataTableStatic";

export const GridMetaData: GridMetaDataType = {
  gridConfig: {
    dense: true,
    gridLabel: "Verification Status",
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
      showTooltip: true,
      maxWidth: 800,
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
      columnName: "Status",
      componentType: "default",
      accessor: "status",
      sequence: 6,
      alignment: "left",
    },
    {
      columnName: "Remarks",
      componentType: "default",
      accessor: "remarks",
      showTooltip: true,
      sequence: 6,
      alignment: "left",
    },
  ],
};
