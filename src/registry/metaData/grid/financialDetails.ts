import { GridMetaDataType } from "components/dataTableStatic";

export const FinancialGridMetaData: GridMetaDataType = {
  columns: [
    {
      columnName: "Lead ID",
      componentType: "default",
      accessor: "leadID",
      sequence: 0,
      alignment: "left",
      isVisible: false,
    },
    {
      columnName: "Serial No",
      componentType: "default",
      accessor: "serialNo",
      sequence: 1,
      alignment: "left",
    },
    {
      columnName: "Financial Year",
      componentType: "default",
      accessor: "financialYear",
      sequence: 2,
      alignment: "left",
    },
    {
      columnName: "Revenue",
      componentType: "default",
      accessor: "revenue",
      sequence: 3,
      alignment: "left",
    },
    {
      columnName: "EBITDA",
      componentType: "default",
      accessor: "ebitDa",
      sequence: 4,
      alignment: "left",
    },
    {
      columnName: "Depreciation",
      componentType: "default",
      accessor: "depreciation",
      sequence: 5,
      alignment: "left",
    },
    {
      columnName: "EBIT",
      componentType: "default",
      accessor: "ebit",
      sequence: 6,
      alignment: "left",
    },
    {
      columnName: "Interest Expenses",
      componentType: "default",
      accessor: "interestExpenses",
      sequence: 7,
      alignment: "left",
    },
    {
      columnName: "EBT",
      componentType: "default",
      accessor: "ebt",
      sequence: 7,
      alignment: "left",
    },
    {
      columnName: "Tax",
      componentType: "default",
      accessor: "tax",
      sequence: 7,
      alignment: "left",
    },
  ],
  gridConfig: {
    dense: true,
    gridLabel: "Financial Details",
    rowIdColumn: "serialNo",
    defaultColumnConfig: {
      width: 150,
      maxWidth: 250,
      minWidth: 100,
    },
    allowColumnReordering: false,
    containerHeight: {
      min: "40vh",
      max: "50vh",
    },
  },
};
