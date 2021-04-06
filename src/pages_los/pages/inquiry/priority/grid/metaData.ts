import { GridMetaDataType } from "components/dataTableStatic";

export const PriorityGridMetaData: GridMetaDataType = {
  gridConfig: {
    dense: true,
    gridLabel: "Priority History",
    rowIdColumn: "serialNo",
    defaultColumnConfig: {
      width: 150,
      maxWidth: 250,
      minWidth: 100,
    },
    allowColumnReordering: true,
    disableSorting: true,
    hideHeader: false,
    disableGroupBy: true,
    containerHeight: {
      min: "40vh",
      max: "50vh",
    },
  },
  columns: [
    {
      columnName: "Serial No",
      componentType: "default",
      accessor: "serialNo",
      sequence: 0,
      alignment: "left",
    },
    {
      columnName: "Transaction Date",
      componentType: "date",
      accessor: "enteredDate",
      sequence: 1,
      alignment: "left",
    },
    {
      columnName: "Priority",
      componentType: "default",
      accessor: "priority",
      sequence: 2,
      alignment: "left",
    },
    {
      columnName: "Priority Hold Days",
      componentType: "default",
      accessor: "priorityHoldDays",
      sequence: 3,
      alignment: "left",
    },
    {
      columnName: "Entered By",
      componentType: "default",
      accessor: "enteredBy",
      sequence: 4,
      alignment: "left",
    },

    {
      columnName: "Priority Days",
      componentType: "default",
      accessor: "daysDifference",
      sequence: 5,
      alignment: "left",
    },

    {
      columnName: "Remarks",
      componentType: "default",
      accessor: "priorityRemarks",
      sequence: 6,
      alignment: "left",
    },
  ],
};
