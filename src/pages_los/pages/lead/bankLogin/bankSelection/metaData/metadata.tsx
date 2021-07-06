import { GridMetaDataType } from "components/dataTableStatic";

export const BankSelectionGridMetaData: GridMetaDataType = {
  gridConfig: {
    dense: true,
    gridLabel: "Bank Selection",
    rowIdColumn: "branchID",
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
      accessor: "bankName",
      columnName: "Bank Name",
      sequence: 1,
      alignment: "left",
      componentType: "default",
    },

    {
      accessor: "fromPayout",
      columnName: "From Payout",
      sequence: 2,
      alignment: "left",
      componentType: "default",
    },
    {
      accessor: "toPayout",
      columnName: "To Payout",
      sequence: 3,
      alignment: "left",
      componentType: "default",
    },
    {
      accessor: "processingFees",
      columnName: "processing Fees",
      sequence: 4,
      alignment: "left",
      componentType: "default",
    },
  ],
};
